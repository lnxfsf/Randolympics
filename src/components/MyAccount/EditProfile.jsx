import "../../styles/editprofile.scoped.scss";

import React, { useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";

import ReactFlagsSelect from "react-flags-select";
import supportedCountry from "../../context/supportedCountry";

import { HeaderMyProfile } from "./HeaderMyProfile";

// MUI
import Flag from "react-world-flags";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";

//we display it as fragment, inside MyProfile...

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

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

import { useRef, useEffect } from "react";
import { useRouteError } from "react-router-dom";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

import moment from "moment";

const sxTextField = {
  m: 1,
  mt: 0,
  ml: 0,

  width: "w-full",

  /*  "& .MuiInputBase-input": { height: 39, padding: 1 },
   */
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    fontFamily: "'Lexend', sans-serif",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Lexend', sans-serif",

    "&.Mui-focused": {
      color: "black",
    },
  },
};

const EditProfile = () => {
  /*   const [toogleProfilePic, setToogleProfilePic] = useState(false);
   */
  const [userData, setUserData] = useState(null);

  const handleathleteStatementChange = (event) => {
    // "prevUserData" comes from the useState hook
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        athleteStatement: event.target.value,
      },
    }));
  };

  const handleathleteStatusChange = (event) => {
    // "prevUserData" comes from the useState hook
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        athleteStatus: event.target.value,
      },
    }));
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);

    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        bio: event.target.value,
      },
    }));
  };

  const handleEmailChange = (event) => {
    // "prevUserData" comes from the useState hook
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        email: event.target.value,
      },
    }));
  };

  const handleNameChange = (event) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        name: event.target.value,
      },
    }));
  };

  const handleCryptoChange = (event) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        cryptoaddress: event.target.value,
      },
    }));
  };

  const handleCancel = (event) => {
    // this one is used, if "Cancel" is clicked. so it can revert storedData to original contents...
    const storedOriginalData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    // we will set setUserData if clicked on this !
    if (storedOriginalData) {
      setUserData(JSON.parse(storedOriginalData));
    }
  };

  const handlePhoneChange = (event) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        phone: event.target.value,
      },
    }));
  };

  const handleWeightChange = (event) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        weight: event.target.value,
      },
    }));
  };

  const handleNationalityChange = (code) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        nationality: code,
      },
    }));
  };

  const [original_email, setOriginalEmail] = useState(null);
  // for country flags...
  const [code, setCode] = useState(""); //  us

  // it's PRIVATE, if it's true...
  const [email_private, setEmail_private] = useState(true);
  const [phone_private, setPhone_private] = useState(true);
  const [weight_private, setWeight_private] = useState(true); //show this, but only if it's "athlete" user, and it's not null (as for athlete, it can't be set null anyway...)
  const [birthdate_private, setBirthdate_private] = useState(true);

  const [name_header, setNameHeader] = useState(""); //show this, but only if it's "athlete" user, and it's not null (as for athlete, it can't be set null anyway...)

  const [user_type, setUserType] = useState(""); //  AH"
  const [user_typeText, setUserTypeText] = useState(""); // Athlete

  const [resultText, setResultText] = useState("");
  const [resultTextColor, setResultTextColor] = useState("black");

  const [bio, setBio] = useState("");

  const [passportImage, setPassportImage] = useState(null);
  /* const [profileImage, setProfileImage] = useState(null); */

  //For date.  okay, it saves as date object
  const [selectedDate, setSelectedDate] = useState(); // this one, you upload in database as update field... (can't be empty after it.. ) WITH "Save" button

  const [passportExpiryDate, setPassportExpiryDate] = useState(null);

  useEffect(() => {
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);

      setOriginalEmail(userJson.data.email);

      setEmail_private(userJson.data.email_private);
      setPhone_private(userJson.data.phone_private);
      setWeight_private(userJson.data.weight_private);
      setBirthdate_private(userJson.data.birthdate_private);

      setCode(userJson.data.nationality); //this is for big flag in upper part ..
      setNameHeader(userJson.data.name);

      settingUserType(userJson.data.user_type);

      setSelectedCrypto(userJson.data.cryptoaddress_type);

      setBio(userJson.data.bio);

      if (!passportUpload) {
        setPassportImage(userJson.data.passport_photo);
      }

      setSelectedDate(dayjs(userJson.data.birthdate));

      setPassportExpiryDate(() => {
        // "Sep 17, 2025"

        if (userJson.data.passport_expiry) {
          let passport_expiry_date = moment(
            userJson.data.passport_expiry,
            "YYYY-MM-DD"
          );
          return passport_expiry_date.format("MMMM DD, YYYY");
        } else {
          return "";
        }
      });

      // fetch latest data, and store it in localstorage. (so it can display realtime data for passport updates.. ). okay, this will execute just once ! at render ! so no problem here !
      fetchLatestInLocalStorage(userJson.data.userId);
    }
  }, []);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  //so we can find that user in database.. (if later on, user changes, his email )

  //console.log("json user data (only when logged in): " + userData.data.email)
  //console.log("hello: " + lolz)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    //console.log(date)

    // and also update the object.. so , it stores in session/localStorage as well
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        birthdate: selectedDate,
      },
    }));
  };

  //const FDate = dayjs(selectedDate);
  //setFormattedDate(FDate.format('MMMM DD, YYYY'));
  // console.log(formattedDate);

  const [selectedRole, setSelectedRole] = useState("AH"); //athlete , just for developing
  const [nationality_selected, setNationality_selected] = useState("");

  const handlelastNameChange = (event) => {
    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        lastName: event.target.value,
      },
    }));
  };

  const handlefamilyNameChange = (event) => {
    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        familyName: event.target.value,
      },
    }));
  };

  const handleEmailPrivacyChange = (event) => {
    setEmail_private(event.target.value);

    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        email_private: event.target.value,
      },
    }));
  };

  const handleBirthdatePrivacyChange = (event) => {
    setBirthdate_private(event.target.value);

    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        birthdate_private: event.target.value,
      },
    }));
  };

  const handlePhonePrivacyChange = (event) => {
    //console.log("clicked" + event.target.value)
    setPhone_private(event.target.value);

    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        phone_private: event.target.value,
      },
    }));
  };

  const handleWeightPrivacyChange = (event) => {
    setWeight_private(event.target.value);

    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        weight_private: event.target.value,
      },
    }));
  };


  // ? HERE, for crypto..

  const cryptoOptions = ["BTC", "ETH", "USDT", "BNB", "SOL", "DOGE", "ADA"]; // supported cryptos

  const [cryptoMenuAnchorEl, setCryptoMenuAnchorEl] = useState(null);

  const [selectedCrypto, setSelectedCrypto] = useState("");

  const handleCryptoMenuClick = (event) => {
    setCryptoMenuAnchorEl(event.currentTarget);
  };

  const handleCryptoMenuClose = () => {
    setCryptoMenuAnchorEl(null);
  };

  const handleCryptoOptionSelect = (option) => {
    setSelectedCrypto(option);
    setCryptoMenuAnchorEl(null);

    //also, update in object , for local/session storage...
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        cryptoaddress_type: option,
      },
    }));
  };

  // ? HERE

  // ? HERE, for weight..

  const weightOptions = ["Kg", "Lb"]; // supported cryptos

  const [weightMenuAnchorEl, setWeightMenuAnchorEl] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("Kg");

  const handleWeightMenuClick = (event) => {
    setWeightMenuAnchorEl(event.currentTarget);
  };

  const handleWeightMenuClose = () => {
    setWeightMenuAnchorEl(null);
  };

  const handleWeightOptionSelect = (option) => {
    setSelectedWeight(option);
    setWeightMenuAnchorEl(null); // Close the menu after selection (optional)
  };

  // ? HERE, for weight..

  // ? filepond passport upload
  const [files, setFiles] = useState([]);

  const server = {
    /* url: 'http://localhost:5000/profile_photo/upload', */

    process: {
      url: `${BACKEND_SERVER_BASE_URL}/imageUpload/passportPicture`,
      method: "POST",
      headers: {},
      withCredentials: false,

      onload: (response) => {
        // Parse the JSON response to get the filename

        const jsonResponse = JSON.parse(response);
        const filename = jsonResponse;

        console.log("Uploaded filename:", filename);
        setPassportImage(filename);
        // return filename;
      },
      onerror: (response) => {
        console.error("Error uploading file:", response);
        return response;
      },
    },

    revert: (uniqueFileId, load, error) => {
      // Send request to the server to delete the file with the uniqueFileId
      fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertPassportPicture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: passportImage }),
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

        /* setProfileImage(filename); */

        // return filename;
      },
      onerror: (response) => {
        console.error("Error uploading file:", response);
        return response;
      },
    },
  };

  // this is for toggle
  const [passportUpload, setPassportUpload] = useState(false);

  const sendPassportUpload = async () => {
    // it's absolutely normal, on refresh, it doesnt show new profile picture, but maybe old. that's because it takes time to write to database.
    // so it's not a bug, that's way most websites function as well. github for instance, takes some time, to load new profile picture, it shows old for few minutes. And yours is just few seconds..

    // this is so we can  set in session/localStorage as well
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        passport_photo: passportImage,
      },
    }));

    try {
      // we just upload passport_image URL, in database !

      // ? you're handling "passportUploadedDate", only once, you actually save date in that user ! so it's in backend, on this route..
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
        {
          original_email,
          // this one, is used, just, to upload passport photo ... (on backend, he won't mind, he just receives this one field, and updates it.. )
          passport_photo: passportImage,
        }
      );

      // to update in localStorage
      if (response.status === 200) {
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(userData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(userData));
        }

        fetchLatestInLocalStorage(userData.userId);
        setPassportUpload(!passportUpload);
      }

      setResultText("Profile details saved successfully !");
    } catch (error) {
      console.log(error);
    }
  };
  // ? filepond passport upload

  const handleSubmit = async (e) => {
    e.preventDefault();

    // var email = e.target.email.value;

    var name = e.target.name.value;

    var familyName = e.target.familyName.value;

    var lastName = e.target.lastName.value;

    var phone = e.target.phone.value;
    var cryptoaddr = e.target.cryptoaddr.value;

    var athleteStatement = e.target.athleteStatement.value;
    var athleteStatus = e.target.athleteStatus.value;

    // nationality_selected

    if (!e.target.weight) {
      var weight = null;
    } else {
      var weight = e.target.weight.value;

      // if "lb" is selected. we upload in database in "kg". so we do converstion from "lb" -> "kg"
      if (selectedWeight === "Lb") {
        weight = weight * 0.45359237;
        console.log(weight);
      }
    }

    // if birthdate is set
    if (e.target.birthdate) {
      var birthdate = e.target.birthdate.value;
    } else {
      var birthdate = null;
    }

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
        {
          original_email,
          //email,

          //email_private,
          //phone_private,
          //weight_private,
          name,
          phone,
          nationality: nationality_selected,
          weight,
          cryptoaddress: cryptoaddr,
          //picture: uploadedFile,

          cryptoaddress_type: selectedCrypto,

          email_private: email_private,
          phone_private: phone_private,
          weight_private: weight_private,

          birthdate: selectedDate,
          birthdate_private: birthdate_private,

          athleteStatement: athleteStatement,
          athleteStatus: athleteStatus,

          familyName,
          lastName,

          bio: bio,
        }
      );

      if (response.status === 200) {
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(userData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(userData));
        }

        setResultText("Profile details saved successfully !");
      }
    } catch (error) {
      console.log(error);
      setResultText("There was some error !");
      setResultTextColor("red");
    }
  };

  const toogleProfileUpload = async () => {
    setToogleProfilePic(!toogleProfilePic);

    try {
      // we just upload profile_image URL, in database !
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
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

      setResultText("Profile details saved successfully !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <HeaderMyProfile ShowEditProfile={true} />

        {/*  <div className="flex justify-start">
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
                    <u>Edit photo</u>
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
        
        */}

        {/* -------------- */}

        <div className="mt-4 mb-4 lexend-font text-black_second  ">
          <p className="text-lg ">
            <b className="text-2xl font-bold ">Your presentation</b>
          </p>

          <div className="flex flex-col w-full min-h-32 pr-4 mt-2 h-full">
            <p className="font-medium mb-2">About me</p>
            <TextField
              value={userData && userData.data.bio}
              onChange={handleBioChange}
              placeholder="Bio"
              id="bio"
              name="bio"
              multiline
              rows={4}
              className="w-full h-full rounded-md border border-gray-900"
              type="text"
              sx={{
                /* width: "2px",  */
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
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
              inputProps={{
                maxLength: 255,
                style: {
                  resize: "vertical",
                },
              }}
            />
          </div>
        </div>

        <form
          action="#"
          onSubmit={handleSubmit}
          className="lexend-font text-black_second"
        >
          <p className="text-lg mb-4 ">
            <b className="text-2xl font-bold ">Personal Information</b>
          </p>

          <div className="flex flex-col w-[80%]">
            <div className="flex flex-col w-full">
              <p className="text-sm font-medium">Name</p>
              <TextField
                value={userData && userData.data.name}
                /*  onChange={handleNameChange} */

                disabled
                placeholder="John Doe"
                id="name"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                sx={sxTextField}
              />
            </div>

            <div className="flex gap-2 w-full">
              <div className="flex flex-col w-full">
                <p className="text-sm font-medium">Email</p>
                <TextField
                  // TODO if we change email, then we need to send confirmation email to that new (and not allow sign in, if not confirmed that new email...)
                  // now on change, needs to update values, so it can edit it
                  value={userData && userData.data.email}
                  onChange={handleEmailChange}
                  className="w-full"
                  placeholder="johndoe@gmail.com"
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  inputProps={{
                    maxLength: 80,
                  }}
                  sx={sxTextField}
                />
              </div>

              <FormControl className="h-5" sx={{ minWidth: 120 }}>
                <Select
                  name="email_private"
                  id="email_private"
                  value={email_private}
                  disableUnderline
                  onChange={handleEmailPrivacyChange}
                  sx={{
                    mt: 2.5,
                    fontFamily: "'Lexend', sans-serif",

                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      fontFamily: "'Lexend', sans-serif",
                    },
                    "& fieldset": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem
                    value={1}
                    sx={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    Private
                  </MenuItem>
                  <MenuItem
                    value={0}
                    sx={{ fontFamily: "'Lexend', sans-serif" }}
                  >
                    Public
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex gap-2 w-full">
                <div className="flex flex-col w-full">
                  <p className="text-sm font-medium">Phone number</p>
                  <TextField
                    value={userData && userData.data.phone}
                    onChange={handlePhoneChange}
                    placeholder="+1 212 456 7890"
                    id="phone"
                    name="phone"
                    type="tel"
                    inputProps={{
                      maxLength: 15,
                    }}
                    sx={sxTextField}
                  />
                </div>

                <FormControl className="h-5" sx={{ minWidth: 120 }}>
                  <Select
                    name="phone_private"
                    id="phone_private"
                    value={phone_private}
                    disableUnderline
                    onChange={handlePhonePrivacyChange}
                    sx={{
                      mt: 2.5,
                      fontFamily: "'Lexend', sans-serif",

                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        fontFamily: "'Lexend', sans-serif",
                      },
                      "& fieldset": {
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem value={1}>Private</MenuItem>
                    <MenuItem value={0}>Public</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            

 <div className="flex gap-2 w-full">
          
          <div className="flex flex-col w-full ">
           <p className="text-sm font-medium">Birthdate</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              className="w-full"
                           
                              value={selectedDate}
                              onChange={handleDateChange}
                              format="MMMM DD, YYYY"

                             
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                
               </div>	
                
                
                
                      <FormControl
                          className="h-5"
                         
                          sx={{ minWidth: 120 }}
                        >
                          <Select
                            name="birthdate_private"
                            id="birthdate_private"
                            value={birthdate_private}
                            disableUnderline
                            onChange={handleBirthdatePrivacyChange}
                           sx={{
                              mt: 3.4,
                              fontFamily: "'Lexend', sans-serif",
        
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                fontFamily: "'Lexend', sans-serif",
                              },
                              "& fieldset": {
                                borderRadius: 2,
                              },
                            }}
                          >
                            <MenuItem value={1}>Private</MenuItem>
                            <MenuItem value={0}>Public</MenuItem>
                          </Select>
                        </FormControl>
                
                
                      </div>


       <div className="flex flex-col w-full mt-4">
       <p className="text-sm font-medium">Country</p>
              <ReactFlagsSelect
                countries={supportedCountry}
                disabled
                // to fill it with the one, which user's is currently selected...
                selected={
                  nationality_selected ||
                  (userData && userData.data.nationality)
                }
                onSelect={(code) => {
                  setNationality_selected(code);
                  handleNationalityChange(code);
                }}
                className="w-full"
                searchable={true}
                id="nationality"
                name="nationality"
                placeholder="Nationality"
              />
            </div>
                
                
          </div>

          <p className="pb-2 mt-2">
                  <b>Passport photo</b>
                </p>
          <div className="row-span-3 flex items-center justify-start gap-2">
            {!passportUpload && (
              <>
               
                <img
                  src={
                    BACKEND_SERVER_BASE_URL +
                    "/imageUpload/passport_pics/" +
                    passportImage
                  }
                  alt="Profile"
                  className="w-[120px] h-[90px] object-fit  passport-photo"
                />
                {passportExpiryDate && (
                  <p className="pt-2 " style={{ color: "#DEDEDE" }}>
                    Passport expires: <b>{passportExpiryDate}</b>
                  </p>
                )}
               
               
               {/*  <p
                  className="edit-photo"
                  onClick={() => {
                    setPassportUpload(!passportUpload);
                  }}
                >
                  <u>Edit passport photo</u>
                </p> */}

                <Button
                className="w-28   "
                style={{  textTransform: 'none' }}
               
                sx={{
                  height: "40px",
                  bgcolor: "#fff",
                  color: "#444444",
                  borderRadius: 2,
                  border: `1px solid #444444`,
          
                }}
                onClick={() => {setPassportUpload(!passportUpload);}}

              >
                <img src="/myaccount/upload.svg" className="w-4 mr-2" /> <span className="lexend-font font-semibold " >Change</span>
              </Button>


              </>
            )}

            {passportUpload && (
              <>
                <FilePond
                  className="filepond--root large"
                  type="file"
                  onupdatefiles={setFiles}
                  allowMultiple={false}
                  maxFiles={1}
                  server={server}
                  name="image"
                  labelIdle='Drag & Drop passport picture or <span class="filepond--label-action">Browse</span> <br/>(mandatory !)'
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
                  imagePreviewHeight={90}
                  imageCropAspectRatio="1:1"
                  /*            imageResizeTargetWidth={100}
                    imageResizeTargetHeight={100} */
                  stylePanelLayout="compact"
                  styleLoadIndicatorPosition="center bottom"
                  styleProgressIndicatorPosition="center bottom"
                  styleButtonRemoveItemPosition="center  bottom"
                  styleButtonProcessItemPosition="center bottom"
                  imageEditAllowEdit={false}
                />

              {/*   <p className="edit-photo" onClick={sendPassportUpload}>
                  <u>Save passport photo</u>
                </p> */}


                <Button
                className="w-28   "
                style={{  textTransform: 'none' }}
               
                sx={{
                  height: "40px",
                  bgcolor: "#fff",
                  color: "#444444",
                  borderRadius: 2,
                  border: `1px solid #444444`,
          
                }}
                onClick={sendPassportUpload}

              >
                <img src="/myaccount/save.svg" className="w-4 mr-2" /> <span className="lexend-font font-semibold " >Save</span>
              </Button>



              </>
            )}

            {/* 

              <FilePond
                type="file"
                
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={server}

                name="image"
                labelIdle='Drag & Drop passport picture or <span class="filepond--label-action">Browse</span> <br/>(mandatory !)'
                accept="image/png, image/jpeg, image/gif"
                dropOnPage
                dropValidation
                allowPaste={true}
                allowReplace={true}
                credits={""}
                allowFileEncode={true}
                allowFileTypeValidation={true}
                allowImagePreview={true}
                allowImageCrop={true}
                allowImageResize={true}
                allowImageTransform={true}
                imagePreviewHeight={222}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={100}
                imageResizeTargetHeight={100}
                stylePanelLayout="compact"
                styleLoadIndicatorPosition="center bottom"
                styleProgressIndicatorPosition="center bottom"
                styleButtonRemoveItemPosition="center  bottom"
                styleButtonProcessItemPosition="center bottom"
                imageEditAllowEdit={false}

              />
              */}
          </div>

          <div className="flex items-end col-span-2">
            <TextField
              value={userData && userData.data.familyName}
              onChange={handlefamilyNameChange}
              label="Family name"
              id="familyName"
              name="familyName"
              type="text"
              placeholder="Family name"
              sx={{
                m: 1,
                width: "280px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
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
              value={userData && userData.data.lastName}
              onChange={handlelastNameChange}
              label="Last name"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              sx={{
                m: 1,
                width: "280px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
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
          </div>

          <div className="flex items-end col-span-2">
            <div className="flex flex-col justify-center">
              <TextField
                value={userData && userData.data.cryptoaddress}
                onChange={handleCryptoChange}
                label="Crypto"
                id="cryptoaddr"
                name="cryptoaddr"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
                sx={{
                  m: 1,
                  width: "280px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
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
                InputProps={{
                  maxLength: 150,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle BTC/ETH/XMR"
                        onClick={handleCryptoMenuClick}
                        edge="end"
                      >
                        {selectedCrypto}
                      </IconButton>
                      <Menu
                        id="crypto-menu"
                        anchorEl={cryptoMenuAnchorEl}
                        open={Boolean(cryptoMenuAnchorEl)}
                        onClose={handleCryptoMenuClose}
                      >
                        {cryptoOptions.map((option) => (
                          <MenuItem
                            key={option}
                            onClick={() => handleCryptoOptionSelect(option)}
                            selected={option === selectedCrypto}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="flex items-end col-span-2">
            <div className="flex flex-col justify-center">
              {selectedRole === "AH" && (
                <div className="flex justify-end items-end flex-col">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      className="h-5"
                      name="weight_private"
                      id="weight_private"
                      value={weight_private}
                      onChange={handleWeightPrivacyChange}
                      disableUnderline
                      sx={{
                        boxShadow: "none",
                        height: 15,
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                    >
                      <MenuItem value={1}>Private</MenuItem>
                      <MenuItem value={0}>Public</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    value={userData && userData.data.weight}
                    onChange={handleWeightChange}
                    label="Weight"
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="85 kg/185 lb"
                    sx={{
                      m: 1,
                      width: "280px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 5,
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle kg / lb"
                            onClick={handleWeightMenuClick}
                            edge="end"
                          >
                            {selectedWeight}
                          </IconButton>
                          <Menu
                            id="weight-menu"
                            anchorEl={weightMenuAnchorEl}
                            open={Boolean(weightMenuAnchorEl)}
                            onClose={handleWeightMenuClose}
                          >
                            {weightOptions.map((option) => (
                              <MenuItem
                                key={option}
                                onClick={() => handleWeightOptionSelect(option)}
                                selected={option === selectedWeight}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </Menu>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              )}
            </div>
           
          </div>

          <div className="flex items-end col-span-2">
            <div className="flex flex-col ml-0 mt-0  w-[280px]">
              <div className="flex mb-1 justify-end items-end flex-col">
                <FormControl
                  className="h-5"
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                >
                  <Select
                    name="birthdate_private"
                    id="birthdate_private"
                    value={birthdate_private}
                    disableUnderline
                    onChange={handleBirthdatePrivacyChange}
                    sx={{
                      boxShadow: "none",
                      height: 32,
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                  >
                    <MenuItem value={1}>Private</MenuItem>
                    <MenuItem value={0}>Public</MenuItem>
                  </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-full"
                      label="Birthdate"
                      value={selectedDate}
                      onChange={handleDateChange}
                      format="MMMM DD, YYYY"
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="flex items-baseline col-span-2 mt-4 ml-4 gap-2">
            <div className="flex m-0 flex-col">
              <FormControl>
                <InputLabel id="athleteStatus-label">
                  Athlete status:
                </InputLabel>
                <Select
                  value={userData && userData.data.athleteStatus}
                  onChange={handleathleteStatusChange}
                  labelId="athleteStatus-label"
                  id="athleteStatus"
                  name="athleteStatus"
                  label="Athlete status:"
                  className="w-[280px]"
                  style={{ color: "#000" }}
                >
                  {/*   <MenuItem value={"s1"}>Has not logged in yet</MenuItem>

                <MenuItem value={"s2"}>Logged in but no status</MenuItem> */}

                  <MenuItem value={"s3"}>
                    I'm 99% taking the challenge and going
                  </MenuItem>

                  <MenuItem value={"s4"}>I'm most likely going</MenuItem>

                  <MenuItem value={"s5"}>I'm maybe going</MenuItem>

                  <MenuItem value={"s6"}>I'm definitely not going</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex   flex-col">
              <TextField
                value={userData && userData.data.athleteStatement}
                onChange={handleathleteStatementChange}
                name="athleteStatement"
                label="Athlete statement"
                placeholder="I can't wait to go"
                type="text"
                inputProps={{
                  maxLength: 15,
                }}
                sx={{
                  m: 1,
                  width: "280px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
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
            </div>
          </div>

          <div className="flex justify-end mt-2 gap-2 items-end">
            <Button
              onClick={handleCancel}
              className="w-[200px]"
              style={{ marginTop: "20px" }}
              sx={{
                height: "50px",
                bgcolor: "#fff",
                color: "#000",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}
              variant="text"
            >
              <span className="popins-font">Cancel</span>
            </Button>

            <Button
              className="w-[200px]"
              style={{ marginTop: "20px" }}
              sx={{
                height: "50px",
                bgcolor: "#AF2626",
                color: "#fff",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}
              type="submit"
              variant="text"
            >
              <span className="popins-font">Save</span>
            </Button>
          </div>

          <p
            className="mt-4 flex justify-end "
            style={{ color: `${resultTextColor}` }}
          >
            {resultText}
          </p>
        </form>
      </div>
    </>
  );
};

export { EditProfile };
