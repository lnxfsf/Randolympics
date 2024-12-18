import "../../styles/headermyprofile.scoped.scss";

import React, { useState, useEffect, useRef } from "react";
import Flag from "react-world-flags";
import axios from "axios";
import { Button } from "@mui/material";

import { useTranslation } from "react-i18next";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';



// FilePond css
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginFileValidateType from "filepond-plugin-image-edit";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import "@pqina/pintura/pintura.css";
import zIndex from "@mui/material/styles/zIndex";

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

import { settingUserType } from "../../context/user_types";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;

const HeaderMyProfile = ({ ShowEditProfile, setSnackbarMessage, setSnackbarStatus, setOpenSnackbar   }) => {
  const { t } = useTranslation();

  const [toogleProfilePic, setToogleProfilePic] = useState(false);
  const [name_header, setNameHeader] = useState("");

  const [lastName_header, setLastName_Header] = useState("");
  const [middleName_header, setMiddleNameHeader] = useState("");

  const [user_typeText, setUserTypeText] = useState("");
  const [code, setCode] = useState("");
  const [original_email, setOriginalEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  const filePondRef = useRef(null);


  const [files, setFiles] = useState([]);

  const [profileImage, setProfileImage] = useState(null);

  const serverProfile = {
    /* url: 'http://localhost:5000/profile_photo/upload', */

    process: {
      url: `${BACKEND_SERVER_BASE_URL}/imageUpload/profilePicture`,
      method: "POST",
      headers: {},
      withCredentials: false,

      onload: (response) => {
        // Parse the JSON response to get the filename

        const jsonResponse = JSON.parse(response);
        const filename = jsonResponse;

     
        

        setProfileImage(filename);

        // return filename;
      },
      onerror: (response) => {


        // sent as string, so it needs to be parsed in JSON
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
      //  console.log("ovo mu je" + profileImage)

      // Send request to the server to delete the file with the uniqueFileId
      fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertProfilePicture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: profileImage }),
      })
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

  const fetchLatestInLocalStorage = async (userId) => {
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/fetchLatestData`,
        { userId: userId }
      );

      if (response.status === 200) {
        setUserData(response); //we update it again.. yes.. but this is latest btw..

        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(response));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(response));
        }

        
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profileUpload = async () => {
    try {
      // we just upload profile_image URL, in database !

      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
        {
          original_email,
          name: userData.name,
          picture: profileImage,
        }
      );

      if (response.status === 200) {
        fetchLatestInLocalStorage(userData.userId);

        setToogleProfilePic(!toogleProfilePic);
      }

      setUserData((prevUserData) => ({
        ...prevUserData,
        data: {
          ...prevUserData.data,
          picture: profileImage,
        },
      }));

      // to update in localStorage
      if (response.status === 200) {
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(userData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);

      setOriginalEmail(userJson.data.email);

      if (!toogleProfilePic) {
        setProfileImage(userJson.data.picture);
      }

      setNameHeader(userJson.data.name);
      setMiddleNameHeader(userJson.data.middleName);
      setLastName_Header(userJson.data.lastName);



      setUserTypeText(settingUserType(userJson.data.user_type));
      setCode(userJson.data.nationality);
    }
  }, []);

  return (
    <>
      <p className="lexend-font font-medium text-black_second text-xl p-2">
        {t("myprofile.myaccount.content30")}
      </p>
      <div className="flex flex-col md:flex-row justify-start mt-4 lexend-font text-black_second p-2 md:w-[80%]">
        <div className="flex grow">
          <div className="flex flex-col items-start">
            <div className="flex justify-center items-center ">
              {!toogleProfilePic && (
                <>
                  <div className="image_editProfile">
                    <img
                      src={
                        S3_BUCKET_CDN_BASE_URL +
                        "/profile_pictures/" +
                        profileImage
                      }
                      className="image_editProfile"
                      style={{ position: "relative", zIndex: "-1" }}
                    />
                  </div>
                </>
              )}

              {toogleProfilePic && (
                <>
                  <FilePond
                    ref={filePondRef}

                  

                    className="filepond--root small"
                    type="file"
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={1}
                    server={serverProfile}
                    name="image"
                    labelIdle={t("myprofile.myaccount.content31")}
                    accept="image/png, image/jpeg, image/gif"
                    dropOnPage
                    dropValidation
                    allowPaste={true}
                    allowReplace={true}
                    credits={""}
                    allowFileEncode={true}
                    allowFileTypeValidation={true}
                    allowImagePreview={true}
                    allowImageCrop={false}
                    allowImageResize={false}
                    allowImageTransform={false}
                    imagePreviewHeight={100}
                    imageCropAspectRatio="1:1"
                    imageResizeTargetWidth={100}
                    imageResizeTargetHeight={100}
                    stylePanelLayout="compact circle"
                    styleLoadIndicatorPosition="center bottom"
                    styleProgressIndicatorPosition="center bottom"
                    styleButtonRemoveItemPosition="center  bottom"
                    styleButtonProcessItemPosition="center bottom"
                    imageEditAllowEdit={false}



                    allowFileSizeValidation={true}
                    maxFileSize="4Mb"
                 


                    onaddfile={(error, file) => {
                      if (error) {
                        if (error.status === 500 || error.main === "File is too large") {
                          setSnackbarMessage("File is too large! Maximum allowed size is 4MB.");
                          setSnackbarStatus("error");
                          setOpenSnackbar(true);
                          filePondRef.current.removeFiles(); // Remove the invalid file
                        }
                      }
                    }}


                  />
                </>
              )}
            </div>

            <h1 className="text-lg font-medium">{name_header} {middleName_header && ( <>({middleName_header}) </> )} {lastName_header}</h1>
         
          </div>

          <div className="flex flex-grow">
            <div className="flex flex-col justify-center pl-4">
              {!toogleProfilePic && (
                <>
                  <Button
                    className="w-28   "
                    style={{ textTransform: "none" }}
                    sx={{
                      height: "40px",
                      bgcolor: "#fff",
                      color: "#444444",
                      borderRadius: 2,
                      border: `1px solid #444444`,
                    }}
                    onClick={() => {
                      setToogleProfilePic(!toogleProfilePic);
                    }}
                  >
                    <img src="/myaccount/upload.svg" className="w-4 mr-2" />{" "}
                    <span className="lexend-font font-semibold ">
                      {t("myprofile.myaccount.content32")}
                    </span>
                  </Button>
                </>
              )}
           {/*//    TODO, if image is empty, then show "Cancel", and in that case, it just reverts this image, as nothing changed, and won't communicate with BACKEND_SERVER_BASE_URL */}
              {toogleProfilePic && (
                <>
                  {/* <p className="edit-photo" onClick={profileUpload}>
                    <u>Save photo</u>


                  </p> */}

                  <Button
                    className="w-36"
                    style={{ textTransform: "none" }}
                    sx={{
                      height: "40px",
                      bgcolor: "#fff",
                      color: "#444444",
                      borderRadius: 2,
                      border: `1px solid #444444`,
                    }}
                    onClick={profileUpload}
                  >
                    <img src="/myaccount/save.svg" className="w-4 mr-2" />{" "}
                    <span className="lexend-font font-semibold ">
                      {t("myprofile.myaccount.content33")}
                    </span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-self-end mr-4">
          <div className="flex flex-col justify-center md:pl-4">
            <h1 className="text-lg font-medium text-right text-gray_third">
              {user_typeText}
            </h1>
          </div>

          <div className="flex flex-col justify-center pl-4">
            <Flag className="flag-photo" code={code} />
          </div>
        </div>
      </div>
    </>
  );
};

export { HeaderMyProfile };
