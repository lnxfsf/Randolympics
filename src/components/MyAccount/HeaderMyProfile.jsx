import "../../styles/headermyprofile.scoped.scss";

import React, { useState, useEffect } from "react";
import Flag from "react-world-flags";
import axios from "axios";

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

const HeaderMyProfile = ({ShowEditProfile}) => {
 
  

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
  };

  const toogleProfileUpload = async () => {
    setToogleProfilePic(!toogleProfilePic);
    
    try {
      // we just upload profile_image URL, in database !
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/auth/update_user_data`,
        {
          original_email,
          // this one, is used, just, to upload passport photo ... (on backend, he won't mind, he just receives this one field, and updates it.. )
          picture: profileImage, // on salje u backend ! kako treba, al local nece
        }
      );

      // TODO, this doesn't (sometimes) save profileImage in userData (so we could save in localStorage , whole userData object ). IT'S only when we click big button "Save", that it save to localstorage. Even though it should save it with below code
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
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);

      setOriginalEmail(userJson.data.email);
      setProfileImage(userJson.data.picture);

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
      <div className="flex justify-start">
        <div className="flex justify-center items-center">
          {!toogleProfilePic && (
            <>
              <img
                src={
                  BACKEND_SERVER_BASE_URL +
                  "/imageUpload/profile_pics/" +
                  profileImage
                }
                className="image_editProfile"
              />
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

        <div className="flex flex-grow">
          <div className="flex flex-col justify-center pl-4">
            <h1 className="text-[25px]">{name_header}</h1>

            {!toogleProfilePic && (
              <>
                <p className="edit-photo" onClick={toogleProfileUpload}>
                
                
                {(ShowEditProfile) && (
                  <u>Edit photo</u>
                )}

                </p>
              </>
            )}
            {toogleProfilePic && (
              <>
                <p className="edit-photo" onClick={toogleProfileUpload}>
                  <u>Save photo</u>
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-self-end">
          <div className="flex flex-col justify-center pl-4">
            <p className="text-base text-right">User Type</p>
            <h1 className="text-[25px] text-right">{user_typeText}</h1>
          </div>
          <div className="flex flex-col justify-center pl-4">
            <Flag className="flag-photo" code={code} />
          </div>
        </div>
      </div>

      <hr className="mt-4" />
    </>
  );
};

export { HeaderMyProfile };
