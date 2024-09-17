import "../../styles/headermyprofile.scoped.scss";

import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";
import axios from "axios";
import { Button } from "@mui/material";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

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
  FilePondPluginImageEdit
);

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const HeaderMyProfile = ({ ShowEditProfile }) => {
  const [toogleProfilePic, setToogleProfilePic] = useState(false);
  const [name_header, setNameHeader] = useState("");
  const [user_typeText, setUserTypeText] = useState("");
  const [code, setCode] = useState("");
  const [original_email, setOriginalEmail] = useState(null);
  const [userData, setUserData] = useState(null);

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

        console.log("Uploaded filename:", filename);

        setProfileImage(filename);

        // return filename;
      },
      onerror: (response) => {
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

        console.log(response);
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profileUpload = async () => {
    try {
      // we just upload profile_image URL, in database !

      console.log("da li on uopste i salje ! ");
      console.log(profileImage);

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
      settingUserType(userJson.data.user_type);
      setCode(userJson.data.nationality);
    }
  }, []);

  const settingUserType = (user_type) => {
    switch (user_type) {
      case "AH":
        setUserTypeText("Athlete");
        break;
      case "GP":
        setUserTypeText("Global President");
        break;
      case "NP":
        setUserTypeText("National President");
        break;
      case "EM":
        setUserTypeText("Event Manager");
        break;
      case "ITM":
        setUserTypeText("IT Manager");
        break;
      case "IME":
        setUserTypeText("IT Manager Page Editor"); // Note: Corrected from "ITM"
        break;
      case "MM":
        setUserTypeText("Marketing Manager");
        break;
      case "SM":
        setUserTypeText("Sales Manager");
        break;
      case "VM":
        setUserTypeText("Validation Manager");
        break;
      case "LM":
        setUserTypeText("Legal Manager");
        break;
      case "RS":
        setUserTypeText("Referee & support");
        break;
      default:
        setUserTypeText("Guest");

        break;
    }
  };

  return (
    <>
      <p className="lexend-font font-medium text-black_second text-xl p-2">
        My account
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
                        BACKEND_SERVER_BASE_URL +
                        "/imageUpload/profile_pics/" +
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
                    className="filepond--root small"
                    type="file"
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={1}
                    server={serverProfile}
                    name="image"
                    labelIdle='Drag & Drop profile picture or <span class="filepond--label-action">Browse</span> <br/>(optional)'
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
                  />
                </>
              )}
            </div>

            <h1 className="text-lg font-medium">{name_header}</h1>
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
                    <span className="lexend-font font-semibold ">Change</span>
                  </Button>
                </>
              )}
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
                    <span className="lexend-font font-semibold ">Save photo</span>
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
