import "../../styles/headermyprofile.scoped.scss";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import dayjs from "dayjs";

import ReactFlagsSelect from "react-flags-select";
import supportedCountry from "../../context/supportedCountry";

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

// MUI
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// for image zoom
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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

import { settingUserType } from "../../context/user_types";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const EditCreatedCampaigns = ({ campaignId, handleCampaignUpdated }) => {
  const { t } = useTranslation();
 // for snackbar message.
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


  const [toogleProfilePic, setToogleProfilePic] = useState(false);
  const [name_header, setNameHeader] = useState("");

  const [lastName_header, setLastName_Header] = useState("");
  const [middleName_header, setMiddleNameHeader] = useState("");

  const [user_typeText, setUserTypeText] = useState("");
  const [code, setCode] = useState("");
  const [original_email, setOriginalEmail] = useState(null);
  const [userData, setUserData] = useState(null);

  const [files, setFiles] = useState([]);

  const [profileImage, setProfileImage] = useState(null);

  const [email_private, setEmail_private] = useState(true);
  const [phone_private, setPhone_private] = useState(true);
  const [weight_private, setWeight_private] = useState(true); //show this, but only if it's "athlete" user, and it's not null (as for athlete, it can't be set null anyway...)
  const [birthdate_private, setBirthdate_private] = useState(true);

  const [bio, setBio] = useState("");

  const [passportImage, setPassportImage] = useState(null);

  const [selectedDate, setSelectedDate] = useState(); // this one, you upload in database as update field... (can't be empty after it.. ) WITH "Save" button

  const [passportExpiryDate, setPassportExpiryDate] = useState(null);

  const [nationality_selected, setNationality_selected] = useState("");

  const popupPassportRef = useRef(null);

  const filePondRef1 = useRef(null);
  const filePondRef2 = useRef(null);

  const [athleteStatement, setAthleteStatement] = useState();

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


        setSnackbarMessage("Only .png, .jpg and .jpeg format allowed !");
        setSnackbarStatus("error");
        setOpenSnackbar(true);

        if (filePondRef1.current) {
          filePondRef1.current.removeFiles();
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
        // fetchLatestInLocalStorage(userData.userId);
        getCampaignDetails();

        setToogleProfilePic(!toogleProfilePic);
      }

      /*   setUserData((prevUserData) => ({
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
      } */
    } catch (error) {
      console.log(error);
    }
  };

 

  const handleathleteStatementChange = (event) => {
    setAthleteStatement(event.target.value);
    // "prevUserData" comes from the useState hook
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        athleteStatement: event.target.value,
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

  const handlemiddleNameChange = (event) => {
    // and also update the object..
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        middleName: event.target.value,
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

  const handleCancel = (event) => {
    handleCampaignUpdated();
  };

  // ? filepond passport upload
  // const [files, setFiles] = useState([]);

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

        setPassportImage(filename);
        // return filename;
      },
      onerror: (response) => {

        setSnackbarMessage("Only .png, .jpg and .jpeg format allowed !");
        setSnackbarStatus("error");
        setOpenSnackbar(true);


        if (filePondRef2.current) {
          filePondRef2.current.removeFiles();
        }
        
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
        setPassportUpload(!passportUpload);
      }

      setSnackbarStatus("success");
      setSnackbarMessage("Profile details saved successfully !");
      setOpenSnackbar(true);
    } catch (error) {
      console.log(error);
    }
  };
  // ? filepond passport upload

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    var name = e.target.name.value;

    var middleName = e.target.middleName.value;

    var familyName = e.target.familyName.value;

    var lastName = e.target.lastName.value;

    var phone = e.target.phone.value;
    var cryptoaddr = e.target.cryptoaddr.value;

    var athleteStatement = e.target.athleteStatement.value;

    // nationality_selected

    if (!e.target.weight) {
      var weight = null;
    } else {
      var weight = e.target.weight.value;

      // if "lb" is selected. we upload in database in "kg". so we do converstion from "lb" -> "kg"
      if (selectedWeight === "Lb") {
        weight = weight * 0.45359237;
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

          familyName,
          lastName,

          middleName,

          bio: bio,
        }
      );

      if (response.status === 200) {
        setSnackbarStatus("success");
        setSnackbarMessage("Profile details saved successfully !");

        setOpenSnackbar(true);
        getCampaignDetails();
      }
    } catch (error) {
      console.log(error);

      setSnackbarMessage("There was some error !");
      setSnackbarStatus("error");

      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    getCampaignDetails();
  }, []);

  const getCampaignDetails = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listUserOfCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log("detalji o campaign ");
      console.log(response.data);

      if (response.data) {
        setUserData(response);
        setOriginalEmail(response.data.email);

        if (!toogleProfilePic) {
          setProfileImage(response.data.picture);
        }

        setNameHeader(response.data.name);
        setMiddleNameHeader(response.data.middleName);
        setLastName_Header(response.data.lastName);

        setUserTypeText(settingUserType(response.data.user_type));
        setCode(response.data.nationality);

        setEmail_private(response.data.email_private);
        setPhone_private(response.data.phone_private);
        setWeight_private(response.data.weight_private);
        setBirthdate_private(response.data.birthdate_private);

        setAthleteStatement(response.data.athleteStatement);

        console.log(
          "athlete statement prima: " + response.data.athleteStatement
        );
        setBio(response.data.bio);

        if (!passportUpload) {
          setPassportImage(response.data.passport_photo);
        }

        setSelectedDate(dayjs(response.data.birthdate));

        setPassportExpiryDate(() => {
          // "Sep 17, 2025"

          if (response.data.passport_expiry) {
            let passport_expiry_date = moment(
              response.data.passport_expiry,
              "YYYY-MM-DD"
            );
            return passport_expiry_date.format("MMMM DD, YYYY");
          } else {
            return "";
          }
        });
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  return (
    <>
      <div className=" flex justify-start ">
        <IconButton
          className="back-icon"
          aria-label="back"
          onClick={() => {
            handleCampaignUpdated();
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>

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
                   ref={filePondRef1}
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
                  />
                </>
              )}
            </div>

            <h1 className="text-lg font-medium">
              {name_header} {middleName_header && <>({middleName_header}) </>}{" "}
              {lastName_header}
            </h1>
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

      <div>
        <form
          action="#"
          onSubmit={handleSubmit}
          className="lexend-font text-black_second p-2"
        >
          <p className="text-lg mb-4 mt-4 ">
            <b className="text-2xl font-bold ">
              {t("myprofile.myaccount.content1")}
            </b>
          </p>

          <div className="flex flex-col w-full md:w-[80%]">
            <div className="flex flex-col w-full">
              <p className="text-sm font-medium">
                {t("myprofile.myaccount.content2")}
              </p>
              <TextField
                value={userData && userData.data.name}
                onChange={handleNameChange}
                placeholder="John Doe"
                id="name"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 30,
                }}
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col w-full">
              <p className="text-sm font-medium">
                {t("myprofile.myaccount.content3")}
              </p>

              <TextField
                value={userData && userData.data.middleName}
                onChange={handlemiddleNameChange}
                id="middleName"
                name="middleName"
                type="text"
                placeholder="Middle name"
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col w-full">
              <p className="text-sm font-medium">
                {t("myprofile.myaccount.content4")}
              </p>

              <TextField
                value={userData && userData.data.familyName}
                onChange={handlefamilyNameChange}
                id="familyName"
                name="familyName"
                type="text"
                placeholder="Family name"
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col w-full">
              <p className="text-sm font-medium">
                {t("myprofile.myaccount.content5")}
              </p>

              <TextField
                value={userData && userData.data.lastName}
                onChange={handlelastNameChange}
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="flex gap-2 w-full">
                <div className="flex flex-col w-full">
                  <p className="text-sm font-medium">
                    {t("myprofile.myaccount.content7")}
                  </p>
                  <TextField
                    value={userData && userData.data.phone}
                    onChange={handlePhoneChange}
                    placeholder="+1 212 456 7890"
                    id="phone"
                    name="phone"
                    type="number"
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
                    <MenuItem value={1}>
                      {t("myprofile.myaccount.private")}
                    </MenuItem>
                    <MenuItem value={0}>
                      {t("myprofile.myaccount.public")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <div className="flex flex-col w-full ">
                <p className="text-sm font-medium">
                  {t("myprofile.myaccount.content8")}
                </p>
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

              <FormControl className="h-5" sx={{ minWidth: 120 }}>
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
                  <MenuItem value={1}>
                    {t("myprofile.myaccount.private")}
                  </MenuItem>
                  <MenuItem value={0}>
                    {t("myprofile.myaccount.public")}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex items-end col-span-2 w-full">
              <div className="flex flex-col justify-center w-full">
                {user_typeText === "AH" && (
                  <div className="flex mt-2  ">
                    <div className="flex flex-col w-full">
                      <p className="text-sm font-medium">
                        {t("myprofile.myaccount.content9")}
                      </p>
                      <TextField
                        value={userData && userData.data.weight}
                        onChange={handleWeightChange}
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="85 kg/185 lb"
                        sx={sxTextField}
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
                                    onClick={() =>
                                      handleWeightOptionSelect(option)
                                    }
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

                    <FormControl className="h-5" sx={{ minWidth: 120 }}>
                      <Select
                        name="weight_private"
                        id="weight_private"
                        value={weight_private}
                        onChange={handleWeightPrivacyChange}
                        disableUnderline
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
                        <MenuItem value={1}>
                          {t("myprofile.myaccount.private")}
                        </MenuItem>
                        <MenuItem value={0}>
                          {t("myprofile.myaccount.public")}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full mt-4">
              <p className="text-sm font-medium">
                {t("myprofile.myaccount.content10")}
              </p>
              <ReactFlagsSelect
                countries={supportedCountry}
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
                placeholder={t("myprofile.myaccount.content11")}
              />
            </div>
          </div>

          <p className="pb-2 mt-2">
            <b>{t("myprofile.myaccount.content12")}</b>
          </p>
          <div className="row-span-3 flex items-center justify-start gap-2">
            {!passportUpload && (
              <>
                <div className="flex flex-col justify-start">
                  <Popup
                    ref={popupPassportRef}
                    trigger={
                      <img
                        src={
                          BACKEND_SERVER_BASE_URL +
                          "/imageUpload/passport_pics/" +
                          passportImage
                        }
                        alt="Profile"
                        className="w-[120px] h-[90px] object-fit  passport-photo cursor-pointer"
                      />
                    }
                    position="right center"
                    contentStyle={{ width: "auto" }}
                    modal
                    nested
                  >
                    <TransformWrapper>
                      <TransformComponent>
                        <img
                          src={
                            BACKEND_SERVER_BASE_URL +
                            "/imageUpload/passport_pics/" +
                            passportImage
                          }
                          alt="Profile"
                          className="w-[500px] h-96 object-fit "
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </Popup>

                  {passportExpiryDate && (
                    <p className="pt-2 " style={{ color: "#DEDEDE" }}>
                      {t("myprofile.myaccount.content13")}:{" "}
                      <b>{passportExpiryDate}</b>
                    </p>
                  )}
                </div>

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
                  style={{ textTransform: "none" }}
                  sx={{
                    height: "40px",
                    bgcolor: "#fff",
                    color: "#444444",
                    borderRadius: 2,
                    border: `1px solid #444444`,
                  }}
                  onClick={() => {
                    setPassportUpload(!passportUpload);
                  }}
                >
                  <img src="/myaccount/upload.svg" className="w-4 mr-2" />{" "}
                  <span className="lexend-font font-semibold ">
                    {t("myprofile.myaccount.content14")}
                  </span>
                </Button>
              </>
            )}

            {passportUpload && (
              <>
                <FilePond
                ref={filePondRef2}
                  className="filepond--root large"
                  type="file"
                  onupdatefiles={setFiles}
                  allowMultiple={false}
                  maxFiles={1}
                  server={server}
                  name="image"
                  labelIdle={t("myprofile.myaccount.content15")}
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
                  className="w-28"
                  style={{ textTransform: "none" }}
                  sx={{
                    height: "40px",
                    bgcolor: "#fff",
                    color: "#444444",
                    borderRadius: 2,
                    border: `1px solid #444444`,
                  }}
                  onClick={sendPassportUpload}
                >
                  <img src="/myaccount/save.svg" className="w-4 mr-2" />{" "}
                  <span className="lexend-font font-semibold ">
                    {t("myprofile.myaccount.content16")}
                  </span>
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

          <div className="mt-8 mb-4 lexend-font text-black_second  ">
            <p className="text-lg ">
              <b className="text-2xl font-bold ">
                {t("myprofile.myaccount.content17")}
              </b>
            </p>

            <div className="flex flex-col w-full md:w-[82%] min-h-32 md:pr-4 mt-2 h-full">
              <p className="font-medium mb-2">
                {t("myprofile.myaccount.content18")}
              </p>
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
                  maxLength: 250,
                  style: {
                    resize: "vertical",
                  },
                }}
              />
            </div>

            {bio && (
              <>
                <p className="text-xs mt-1 text-gray-600">
                  {`${250 - bio.length} ${t("myprofile.myaccount.content34")} `}
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col w-full md:w-[82%] min-h-32 md:pr-4 mt-2 h-full">
            <p className="font-medium mb-2">
              {t("myprofile.myaccount.content24")}
            </p>
            <TextField
              value={userData && userData.data.athleteStatement}
              onChange={handleathleteStatementChange}
              placeholder={t("myprofile.myaccount.content25")}
              multiline
              rows={3}
              className="w-full h-full rounded-md border border-gray-900"
              type="text"
              name="athleteStatement"
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

            {athleteStatement && (
              <>
                <p className="text-xs mt-1 text-gray-600">
                  {`${255 - athleteStatement.length} ${t(
                    "myprofile.myaccount.content34"
                  )} `}
                </p>
              </>
            )}
          </div>

          <p className="text-lg mt-6">
            <b className="text-2xl font-bold ">
              {t("myprofile.myaccount.content26")}
            </b>
          </p>
          <div className="flex items-end col-span-2">
            <div className="flex w-full md:w-[80%] flex-col justify-center">
              <p className="font-medium  mt-2 text-sm">
                {t("myprofile.myaccount.content27")}
              </p>
              <TextField
                value={userData && userData.data.cryptoaddress}
                onChange={handleCryptoChange}
                id="cryptoaddr"
                name="cryptoaddr"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
                sx={sxTextField}
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

          <div className="flex flex-col mt-8 w-full md:w-[80%] gap-2 ">
            <Button
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "50px",
                bgcolor: "#D24949",

                color: "#fff",
                borderRadius: 3,
                border: `1px solid #D24949`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
              type="submit"
              variant="text"
            >
              <span className="popins-font">
                {t("myprofile.myaccount.content28")}
              </span>
            </Button>

            <Button
              onClick={handleCancel}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "50px",
                bgcolor: "#fff",
                color: "#444444",
                borderRadius: 3,
                border: `1px solid #444444`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
              variant="text"
            >
              <span className="popins-font">
                {t("myprofile.myaccount.content29")}
              </span>
            </Button>
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

export { EditCreatedCampaigns };
