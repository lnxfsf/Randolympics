import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { Button } from "@mui/material";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// FilePond css
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginFileValidateType from "filepond-plugin-image-edit";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import "@pqina/pintura/pintura.css";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit,
  FilePondPluginFileValidateSize
);

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const CreateNewsPost = ({ onBack }) => {
  const { t, i18n } = useTranslation();
 

  const filePondRef = useRef(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // error, "success"
  const [snackbarStatus, setSnackbarStatus] = useState("success");

  const handleSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [editTitle, setEditTitle] = useState("");
  const [editSubTitle, setEditSubTitle] = useState("");

  const [editContent, setEditContent] = useState("");

  const [tempEditCoverImage, setTempEditCoverImage] = useState("");

  const handleCancel = async () => {
    setEditTitle("");
    setEditSubTitle("");
    setEditContent("");
    // setEditCoverImage(post.cover_image)  // e evo je taj original vidis, on cuva, url od pravog (i ovaj mozes koristiti da obrises pre nego sačuvaš u database ovaj novi... )

    if (tempEditCoverImage) {
      // it must delete that image from server that was temporary uploaded, but not yet saved to that blog post
      fetch(
        `${BACKEND_SERVER_BASE_URL}/imageUpload/revertBlogs_news_picture_upload`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: tempEditCoverImage }),
        }
      )
        .then((response) => {
          if (response.ok) {
            load(); // Signal that the file has been reverted successfully
          } else {
            response.json().then((errorData) => error(errorData.message));
          }
        })
        .catch((err) => {
          console.error("Error reverting file:", err);
        });
    }

    setTempEditCoverImage(null);

    onBack(false, false);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    var title = e.target.title.value;
    var subtitle = e.target.subtitle.value;

    if (editTitle === "") {
      setSnackbarMessage(t("popupMessages.text3"));
      setSnackbarStatus("error");
      setOpenSnackbar(true);

      return;
    }

    if (editSubTitle === "") {
      setSnackbarMessage(t("popupMessages.text4"));
      setSnackbarStatus("error");
      setOpenSnackbar(true);

      return;
    }

    if (editContent === "") {
      setSnackbarMessage(t("popupMessages.text5"));
      setSnackbarStatus("error");
      setOpenSnackbar(true);

      return;
    }

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/blog/createnewspost`,
        {
          title: editTitle,
          subtitle: editSubTitle,
          content: editContent,
          cover_image: tempEditCoverImage,
        },
        {
          headers: {
            'Accept-Language': i18n.language || 'en',
          }
        }
      );

      if (response.status === 201) {
        onBack(false, true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    ["image", "video"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],

    [{ color: [] }, { background: [] }],

    ["clean"], // remove formatting button
  ];

  const modules = { toolbar: toolbarOptions };

  // ? filepond upload
  const [files, setFiles] = useState([]);

  const server = {
    /* url: 'http://localhost:5000/profile_photo/upload', */

    process: {
      url: `${BACKEND_SERVER_BASE_URL}/imageUpload/blogs_news_picture_upload`,
      method: "POST",
      headers: {},
      withCredentials: false,

      onload: (response) => {
        // Parse the JSON response to get the filename

        const jsonResponse = JSON.parse(response);
        const filename = jsonResponse;

        // e ovde, ne treba da menjas original, nego kopiju napravis samo (koju uploadujes.. (i onda ona postaje original posle... ))
        setTempEditCoverImage(filename);

        // setEditCoverImage(filename)
      },
      onerror: (response) => {
        const jsonResponse = JSON.parse(response);

        setSnackbarMessage(jsonResponse.message);
        setSnackbarStatus("error");
        setOpenSnackbar(true);

        if (filePondRef.current) {
          filePondRef.current.removeFiles();
        }

        console.error("Error uploading file:", response);
        return response;
      },
    },

    revert: (uniqueFileId, load, error) => {
      // console.log("ovo mu je" + editCoverImage)

      // Send request to the server to delete the file with the uniqueFileId

      // it reverts the image it had ! but it's not yet uploaded, so we can delete it from backend..
      fetch(
        `${BACKEND_SERVER_BASE_URL}/imageUpload/revertBlogs_news_picture_upload`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filename: tempEditCoverImage }),
        }
      )
        .then((response) => {
          if (response.ok) {
            load(); // Signal that the file has been reverted successfully
          } else {
            response.json().then((errorData) => error(errorData.message));
          }
        })
        .catch((err) => {
          console.error("Error reverting file:", err);
          error("Error reverting file");
        });
    },
  };

  return (
    <>
      <div className="m-4">
        <div className="flex justify-between mb-4">
          <IconButton
            className="back-icon"
            aria-label="back"
            onClick={() => {
              onBack(false, false);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>

        <form action="#" onSubmit={handleCreatePost}>
          <div className="flex flex-col gap-4">
            <FilePond
              /* className="filepond--root large" */
              ref={filePondRef}
              type="file"
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              server={server}
              name="image"
              labelIdle='Drag & Drop cover image or <span class="filepond--label-action">Browse</span> '
              accept="image/png, image/jpeg, image/gif"
              dropOnPage
              dropValidation
              allowPaste={true}
              allowReplace={true}
              credits={""}
              allowFileEncode={true}
              allowFileTypeValidation={true}
              allowImagePreview={true}
              /* so, with this "allowImageCrop", "allowImageResize" , user can upload a picture, and even if too high resolution, here you can scale it down ! before it's sent to backend to store
                       for now, we keep it original resolution, until I know what max resolution we should support 
                     */
              allowImageCrop={false}
              allowImageResize={false}
              allowImageTransform={false}
              imagePreviewHeight={222}
              imageCropAspectRatio="1:1"
              /*            imageResizeTargetWidth={100}
                        imageResizeTargetHeight={100} */

              stylePanelLayout="compact"
              styleLoadIndicatorPosition="center bottom"
              styleProgressIndicatorPosition="center bottom"
              styleButtonRemoveItemPosition="center  bottom"
              styleButtonProcessItemPosition="center bottom"
              imageEditAllowEdit={false}
              allowFileSizeValidation={true}
              maxFileSize="4Mb"
              onaddfile={(error, file) => {
                if (error) {
                  if (
                    error.status === 500 ||
                    error.main === "File is too large"
                  ) {
                    setSnackbarMessage(t("campaign.content141"));
                    setSnackbarStatus("error");
                    setOpenSnackbar(true);
                    filePondRef.current.removeFiles(); // Remove the invalid file
                  }
                }
              }}
            />

            <TextField
              value={editTitle}
              onChange={(event) => {
                setEditTitle(event.target.value);
              }}
              label="Title"
              placeholder={t("news.content1")}
              id="name"
              name="title"
              type="text"
              inputProps={{
                maxLength: 255,
              }}
              sx={{
                width: "auto",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "red",
                  },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            />

            <TextField
              value={editSubTitle}
              onChange={(event) => {
                setEditSubTitle(event.target.value);
              }}
              label="Subtitle"
              placeholder={t("news.content2")}
              id="name"
              name="subtitle"
              type="text"
              inputProps={{
                maxLength: 255,
              }}
              sx={{
                width: "auto",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "red",
                  },
                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            />

            <ReactQuill
              theme="snow"
              value={editContent}
              onChange={setEditContent}
              modules={modules}
            />

            <div className="flex justify-end mt-2 gap-2 items-end">
              <Button
                onClick={handleCancel}
                className="w-[200px]"
                style={{ marginTop: "20px" }}
                sx={{
                  height: "50px",
                  bgcolor: "#fff",
                  color: "#000",
                  borderRadius: 5,
                  border: `1px solid #D24949`,
                  "&:hover": {
                    background: "rgb(210, 73, 73)",
                    color: "white",
                    border: `1px solid rgb(210, 73, 73)`,
                  },
                }}
                variant="text"
              >
                <span className="lexend-font">{t("news.content3")}</span>
              </Button>

              <Button
                className="w-[200px]"
                style={{ marginTop: "20px" }}
                sx={{
                  height: "50px",
                  bgcolor: "#D24949",
                  color: "#fff",
                  borderRadius: 5,
                  border: `1px solid #D24949`,
                  "&:hover": {
                    background: "rgb(210, 73, 73)",
                    color: "white",
                    border: `1px solid rgb(210, 73, 73)`,
                  },
                }}
                type="submit"
                variant="text"
              >
                <span className="lexend-font">{t("news.content4")}</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbar}
          severity={snackbarStatus}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export { CreateNewsPost };
