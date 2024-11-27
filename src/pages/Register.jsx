import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "../styles/register.scoped.scss";
import { useTranslation } from "react-i18next";

import { useRef, useState, useEffect } from "react";
import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";

import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import ReactFlagsSelect from "react-flags-select";
import supportedCountry from "../context/supportedCountry";

// MUI
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Menu from "@mui/material/Menu";

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
import HorizontalLinearAlternativeLabelStepper from "../components/Supporters/HorizontalLinearAlternativeLabelStepper";
import { NavbarClean } from "../components/NavbarClean";
import { FooterClean } from "../components/FooterClean";

//registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

const lexend_font = {
  fontFamily: "'Lexend', sans-serif",
};

const sxTextField = {
  mb: 1,
  mr: 1,

  width: "100%",

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

let APP_SITE_KEY =
  import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Register = () => {
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

  const { t } = useTranslation();

  // ? this is for phone
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isPhonerHelper, setIsPhoneErrorHelper] = useState("* Required");
  const isPhoneErrorFocus = useRef(null);

  // ? this is for password  Password
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordHelper, setIsPasswordErrorHelper] = useState("* Required");
  const isPasswordErrorFocus = useRef(null);

  // ? this for error in the "input" to display
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailErrorHelper, setIsEmailErrorHelper] = useState("* Required");
  const isEmailErrorFocus = useRef(null);

  // ? FILEPOND for IMAGE
  const [files, setFiles] = useState([]);

  // ? FILEPOND for IMAGE
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ? image upload
  /*   const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  const handlePhotoChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }; */

  const [uploadedFile, setUploadedFile] = useState(null);

  const server = {
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

        setUploadedFile(filename);
        // return filename;
      },
      onerror: (response) => {
        console.error("Error uploading file:", response);
        return response;
      },
    },

    revert: (uniqueFileId, load, error) => {
      // console.log("ovo mu je" + editCoverImage)

      // Send request to the server to delete the file with the uniqueFileId
      fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertProfilePicture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: uploadedFile }),
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

  const validateEmail = (email) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\+[1-9]\d{7,14}$/;
    return phonePattern.test(phone);
  };

  // ? image upload

  const [email_private, setEmail_private] = useState(true);
  const [phone_private, setPhone_private] = useState(true);
  const [weight_private, setWeight_private] = useState(true);

  const handleEmailPrivacyChange = (event) => {
    setEmail_private(event.target.value);
  };

  const handlePhonePrivacyChange = (event) => {
    setPhone_private(event.target.value);
  };

  const handleWeightPrivacyChange = (event) => {
    setWeight_private(event.target.value);
  };

  {
    /*this is for nationality */
  }
  const [nationality_selected, setNationality_selected] = useState("");
  const [selectedRole, setSelectedRole] = useState("GP");

  const [selectedGender, setSelectedGender] = useState("M");

  // ? captcha

  const recaptcha = useRef();

  // ? captcha

  // this is for password <input> field, MUI library we use
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ? HERE, for crypto..

  const cryptoOptions = ["BTC", "ETH", "USDT", "BNB", "SOL", "DOGE", "ADA"]; // supported cryptos

  const [cryptoMenuAnchorEl, setCryptoMenuAnchorEl] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  const handleCryptoMenuClick = (event) => {
    setCryptoMenuAnchorEl(event.currentTarget);
  };

  const handleCryptoMenuClose = () => {
    setCryptoMenuAnchorEl(null);
  };

  const handleCryptoOptionSelect = (option) => {
    setSelectedCrypto(option);
    setCryptoMenuAnchorEl(null); // Close the menu after selection (optional)
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

  useEffect(() => {
    // make captcha required
    window.addEventListener("load", () => {
      const $recaptcha = document.querySelector("#g-recaptcha-response");
      if ($recaptcha) {
        $recaptcha.setAttribute("required", "required");
      }
    });

    if (isEmailError && isEmailErrorFocus.current) {
      isEmailErrorFocus.current.focus();
    }

    if (isPhoneError && isPhoneErrorFocus.current) {
      isPhoneErrorFocus.current.focus();
    }

    if (isPasswordError && isPasswordErrorFocus.current) {
      isPasswordErrorFocus.current.focus();
    }
  }, [isEmailError, isPhoneError, isPasswordError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ? for image upload. now FilePond
    /* 
    let formData = new FormData();
    await formData.append("image", image.raw);

    var profile_uploaded = await axios.post(
      `http://localhost:5000/profile_photo/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

     */

    var email = e.target.email.value;
    var password = e.target.pass.value;
    var name = e.target.name.value;
    var middleName = e.target.middleName.value;
    var lastName = e.target.lastName.value;

    var phone = e.target.phone.value;
    var bio = ""; // because we don't user bio field right now, or maybe we will use it.

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setIsPasswordError(true);
      setIsPasswordErrorHelper(t("register.content3"));

      isPasswordErrorFocus.current.focus();

      setSnackbarStatus("error");
      setSnackbarMessage(t("register.content3"));
      setOpenSnackbar(true);

      recaptcha.current.reset();
    } else {
      setIsPasswordError(false);
    }

    if (!e.target.weight) {
      var weight = null;
    } else {
      //var weight = e.target.weight.value;

      // if "lb" is selected. we upload in database in "kg". so we do converstion from "lb" -> "kg"
      if (selectedWeight === "Lb") {
        var weight = e.target.weight * 0.45359237;

        //
      }
    }

    var cryptoaddr = e.target.cryptoaddr.value;

    // check again, if email is correctly inserted
    /*  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
     

      setIsEmailError(true);
      setIsEmailErrorHelper(t("register.content1"));

      setSnackbarStatus("error");
      setSnackbarMessage(t("register.content1"));
      setOpenSnackbar(true);

      recaptcha.current.reset();
    }

    const phoneRegex =
      /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

    if (!phoneRegex.test(phone)) {
     

      setIsPhoneError(true);
      setIsPhoneErrorHelper(t("register.content2"));

      setSnackbarStatus("error");
      setSnackbarMessage(t("register.content2"));
      setOpenSnackbar(true);

      recaptcha.current.reset();
    } else {
      setIsPhoneError(false);
    }
      */

    // check if captcha okay
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      setSnackbarStatus("error");
      setSnackbarMessage(t("register.content4"));
      setOpenSnackbar(true);
    } else {
      if (
        nationality_selected &&
        isEmailError === false &&
        isPhoneError === false &&
        isPasswordError === false
      ) {
        const res = await fetch(`${BACKEND_SERVER_BASE_URL}/captcha/verify`, {
          method: "POST",
          body: JSON.stringify({ captchaValue }),
          headers: {
            "content-type": "application/json",
          },
        });

        const data = await res.json();

        // response in json we have "success" field, that google send us, if it's verified or not
        if (data.success) {
          // make form submission

          try {
            var response = await axios.post(
              `${BACKEND_SERVER_BASE_URL}/auth/register`,
              {
                user_type: selectedRole,
                email,
                password,
                email_private,
                phone_private,
                weight_private,
                name,
                middleName,
                lastName,
                phone,
                nationality: nationality_selected,
                weight,
                cryptoaddress: cryptoaddr,
                picture: uploadedFile,

                cryptoaddress_type: selectedCrypto,
                bio,
                gender: selectedGender,
              }
            );
          } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
              if (error.response && error.response.status === 409) {
                setSnackbarStatus("error");
                setSnackbarMessage(error.response.data.message);
                setOpenSnackbar(true);
              } else {
                setSnackbarStatus("error");
                setSnackbarMessage(
                  "An error occurred: " +
                    (error.response?.data?.message || error.message)
                );
                setOpenSnackbar(true);
              }
            } else {
              setSnackbarStatus("error");
              setSnackbarMessage(
                "An unexpected error occurred: " + error.message
              );
              setOpenSnackbar(true);
            }
          }

          if (response) {
            setSnackbarStatus("success");
            setSnackbarMessage(t("register.content5"));
            setOpenSnackbar(true);
          }
        } else {
          setSnackbarStatus("error");
          setSnackbarMessage(t("register.content6"));
          setOpenSnackbar(true);
        }
      } else {
        if (nationality_selected === "") {
          recaptcha.current.reset();

          setSnackbarStatus("error");
          setSnackbarMessage(t("register.content7"));
          setOpenSnackbar(true);
        } else if (isEmailError === true) {
          setSnackbarStatus("error");
          setSnackbarMessage(t("register.content8"));
          setOpenSnackbar(true);
        } else if (isPasswordError === true) {
          setSnackbarStatus("error");
          setSnackbarMessage(t("register.content10"));
          setOpenSnackbar(true);
        } else if (isPhoneError === true) {
          setSnackbarStatus("error");
          setSnackbarMessage(t("register.content9"));
          setOpenSnackbar(true);
        }
      }
    }
  };

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChangeGender = (event) => {
    setSelectedGender(event.target.value);
  };

  // ? for dropdown menu
  // Get the current year,
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  years.reverse();
  // ? for dropdown menu

  return (
    <>
      <NavbarClean />

      <form
        action="#"
        className=" flex flex-col wrap justify-start items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start w-full">
          <div className=" flex  flex-col p-8 items-center  ">
            {/* START FORM SUBMISSION (login), FOR LOGIN */}

            <div
              action="#"
              className="sign-in-form flex flex-col wrap justify-start items-start "
            >
              <div className="">
                {/* server="http://localhost:5000/profile_photo/upload" */}

                <FilePond
                  type="file"
                  /* className={"profile_pic_upload"} */
                  className="filepond--root athlete"
                  onupdatefiles={setFiles}
                  allowMultiple={false}
                  maxFiles={1}
                  server={server}
                  name="image"
                  labelIdle={t("register.content11")}
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
                  imagePreviewHeight={150}
                  imageCropAspectRatio="1:1"
                  imageResizeTargetWidth={150}
                  imageResizeTargetHeight={150}
                  /*  rectangle or circle  */
                  /*                  stylePanelLayout="compact circle "
                   */
                  stylePanelLayout="compact circle"
                  styleLoadIndicatorPosition="center bottom"
                  styleProgressIndicatorPosition="center bottom"
                  styleButtonRemoveItemPosition="center  bottom"
                  styleButtonProcessItemPosition="center bottom"
                  imageEditAllowEdit={false}
                />
              </div>

              <div className="flex m-0 flex-col w-full">
                <label
                  htmlFor="roleDropdowns"
                  className="lexend-font mb-1 mt-1 font-medium text-sm"
                >
                  {t("register.content12")}
                </label>
                <Select
                  labelId="roleDropdowns"
                  id="roleDropdown"
                  value={selectedRole}
                  onChange={handleChangeRole}
                  className="w-full"
                  sx={{
                    fontFamily: "'Lexend', sans-serif",

                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      fontFamily: "'Lexend', sans-serif",
                    },
                    "& fieldset": {
                      borderRadius: 2,
                    },
                  }}
                  style={{ color: "#000" }}
                >
                  {/* <MenuItem value={"AH"} sx={lexend_font}>
                    {t("register.user_type1")}
                  </MenuItem>*/}
                  <MenuItem value={"GP"} sx={lexend_font}>
                    {t("register.user_type2")}
                  </MenuItem>
                  <MenuItem value={"NP"} sx={lexend_font}>
                    {t("register.user_type3")}
                  </MenuItem>
                  <MenuItem value={"EM"} sx={lexend_font}>
                    {t("register.user_type4")}
                  </MenuItem>
                  <MenuItem value={"ITM"} sx={lexend_font}>
                    {t("register.user_type5")}
                  </MenuItem>
                  <MenuItem value={"MM"} sx={lexend_font}>
                    {t("register.user_type6")}
                  </MenuItem>
                  <MenuItem value={"SM"} sx={lexend_font}>
                    {t("register.user_type7")}
                  </MenuItem>
                  <MenuItem value={"VM"} sx={lexend_font}>
                    {t("register.user_type8")}
                  </MenuItem>
                  <MenuItem value={"LM"} sx={lexend_font}>
                    {t("register.user_type9")}
                  </MenuItem>
                  <MenuItem value={"RS"} sx={lexend_font}>
                    {t("register.user_type10")}
                  </MenuItem>
                </Select>
              </div>

              <div className="flex mb-1 justify-around items-center mt-4 gap-2 w-full ">
                <div className="flex flex-col grow ">
                  <label
                    htmlFor="email"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("register.content13")} *
                  </label>
                  <TextField
                    placeholder="johndoe@gmail.com"
                    id="email"
                    name="email"
                    required
                    onInvalid={() => {
                      recaptcha.current.reset();
                    }}
                    inputRef={isEmailErrorFocus}
                    error={isEmailError}
                    helperText={isEmailError ? isEmailErrorHelper : ""}
                    onChange={(e) => {
                      const emailValue = e.target.value;

                      if (!validateEmail(emailValue) && emailValue.length > 0) {
                        setIsEmailError(true);
                        setIsEmailErrorHelper(t("register.content8"));
                        isEmailErrorFocus.current.focus();
                        recaptcha.current.reset();
                      } else {
                        setIsEmailError(false);
                        setIsEmailErrorHelper("");
                      }

                      /*  
          setSnackbarStatus("error");
          setSnackbarMessage((t("register.content8")));
          setOpenSnackbar(true); */
                    }}
                    type="email"
                    maxLength="80"
                    inputProps={{
                      maxLength: 80,
                    }}
                    sx={sxTextField}
                  />
                </div>

                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    name="email_private"
                    id="email_private"
                    value={email_private}
                    disableUnderline
                    onChange={handleEmailPrivacyChange}
                    sx={{
                      mt: 2.2,
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
                      value={true}
                      sx={{ fontFamily: "'Lexend', sans-serif" }}
                    >
                      {t("register.private")}
                    </MenuItem>
                    <MenuItem
                      value={false}
                      sx={{ fontFamily: "'Lexend', sans-serif" }}
                    >
                      {t("register.public")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <label
                htmlFor="friendMiddleName"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("register.content14")} *
              </label>
              <TextField
                placeholder="John"
                id="name"
                name="name"
                required
                onInvalid={() => {
                  recaptcha.current.reset();
                }}
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                sx={sxTextField}
              />

              <label
                htmlFor="middleName"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("register.content15")}
              </label>

              <TextField
                placeholder="Johnson"
                id="middleName"
                name="middleName"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                sx={sxTextField}
              />

              <label
                htmlFor="lastName"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("register.content16")} *
              </label>
              <TextField
                placeholder="Doe"
                id="lastName"
                name="lastName"
                required
                onInvalid={() => {
                  recaptcha.current.reset();
                }}
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                sx={sxTextField}
              />

              <label
                htmlFor="pass"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("register.content17")}
              </label>
              <TextField
                placeholder="********"
                id="pass"
                name="pass"
                required
                onInvalid={() => {
                  recaptcha.current.reset();
                }}
                type={showPassword ? "text" : "password"}
                sx={sxTextField}
                inputRef={isPasswordErrorFocus}
                error={isPasswordError}
                helperText={isPasswordHelper}
                className="max-w-[434px]"
                onChange={(e) => {
                  const passwordValue = e.target.value;

                  const passwordRegex1 =
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

                  if (
                    passwordValue.length == 0 ||
                    passwordRegex1.test(passwordValue)
                  ) {
                    setIsPasswordError(false);
                    setIsPasswordErrorHelper("");
                  } else {
                    setIsPasswordError(true);
                    setIsPasswordErrorHelper(t("register.content3"));
                    isPasswordErrorFocus.current.focus();
                    recaptcha.current.reset();
                  }
                }}
                InputProps={{
                  maxLength: 255,

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <div className="flex mb-2.5 justify-around w-full items-center mt-0 gap-2">
                <div className="flex flex-col grow">
                  <label
                    htmlFor="phone"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("register.content18")} *
                  </label>
                  <TextField
                    placeholder="+1 212 456 7890"
                    id="phone"
                    name="phone"
                    required
                    onInvalid={() => {
                      recaptcha.current.reset();
                    }}
                    inputRef={isPhoneErrorFocus}
                    error={isPhoneError}
                    helperText={isPhoneError ? isPhonerHelper : ""}
                    onChange={(e) => {
                      const phoneValue = e.target.value;

                      console.log(
                        "validatePhoneNumber je: " +
                          validatePhoneNumber(phoneValue)
                      );

                      if (
                        !validatePhoneNumber(phoneValue) &&
                        phoneValue.length > 0
                      ) {
                        setIsPhoneError(true);
                        setIsPhoneErrorHelper(t("register.content9"));
                        isPhoneErrorFocus.current.focus();
                        recaptcha.current.reset();
                      } else {
                        setIsPhoneError(false);
                        setIsPhoneErrorHelper("");
                      }
                    }}
                    type="tel"
                    inputProps={{
                      maxLength: 15,
                      inputMode: "numeric",
                      pattern: "/^+[1-9]d{7,14}$/",
                    }}
                    sx={sxTextField}
                  />
                </div>

                {/* sx={{ m: 1, minWidth: 120 }} */}
                <FormControl sx={{ minWidth: 120, mt: 2.2 }}>
                  <Select
                    name="phone_private"
                    id="phone_private"
                    value={phone_private}
                    disableUnderline
                    onChange={handlePhonePrivacyChange}
                    sx={{
                      minWidth: 120,
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
                    <MenuItem value={true} sx={lexend_font}>
                      {t("register.private")}
                    </MenuItem>
                    <MenuItem value={false} sx={lexend_font}>
                      {t("register.public")}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <ReactFlagsSelect
                countries={supportedCountry}
                selected={nationality_selected}
                onSelect={(code) => setNationality_selected(code)}
                className="w-full lexend-font "
                searchable={true}
                id="nationality"
                name="nationality"
                placeholder="Nationality *"
              />

              <label
                htmlFor="roleDropdowns"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("register.content19")}
              </label>

              <Select
                labelId="roleDropdowns"
                id="roleDropdown"
                value={selectedGender}
                onChange={handleChangeGender}
                className="w-full "
                sx={{
                  minWidth: 120,
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
                <MenuItem value={"M"} sx={lexend_font}>
                  {t("register.content20")}
                </MenuItem>
                <MenuItem value={"F"} sx={lexend_font}>
                  {t("register.content21")}
                </MenuItem>
              </Select>

              {selectedRole === "AH" && (
                <div className="flex mb-2.5 justify-around w-full items-center mt-2 gap-2">
                  <div className="flex flex-col grow">
                    <label
                      htmlFor="weight"
                      className="lexend-font mb-1 mt-1 font-medium text-sm"
                    >
                      {t("register.content22")} *
                    </label>

                    <TextField
                      id="weight"
                      name="weight"
                      required
                      onInvalid={() => {
                        recaptcha.current.reset();
                      }}
                      type="number"
                      onChange={(event) =>
                        event.target.value < 0
                          ? (event.target.value = 0)
                          : event.target.value
                      }
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
                              {/* Icon for dropdown, e.g., a downward arrow */}
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
                                  sx={lexend_font}
                                >
                                  {option}
                                </MenuItem>
                              ))}
                            </Menu>
                          </InputAdornment>
                        ),

                        inputMode: "numeric",
                        pattern: "/^+[1-9]d{7,14}$/",
                      }}
                    />
                  </div>

                  <FormControl sx={{ minWidth: 120 }}>
                    <Select
                      name="weight_private"
                      id="weight_private"
                      value={weight_private}
                      onChange={handleWeightPrivacyChange}
                      disableUnderline
                      sx={{
                        mt: 2.2,
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
                      <MenuItem value={true} sx={lexend_font}>
                        {t("register.private")}
                      </MenuItem>
                      <MenuItem value={false} sx={lexend_font}>
                        {t("register.public")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}

              <label
                htmlFor="cryptoaddr"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("register.content23")}
              </label>

              <TextField
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
                        {/* Icon for dropdown, e.g., a downward arrow */}
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
                            sx={lexend_font}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />

              <ReCAPTCHA
                ref={recaptcha}
                sitekey={APP_SITE_KEY}
                onExpired={() => {
                  recaptcha.reset();
                }}
                className="mt-2 g-recaptcha-response self-center "
              />

              <div className="flex self-start mt-2">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#D24949",
                        "&.Mui-checked": {
                          color: "#D24949",
                        },
                      }}
                      id="tos"
                      name="tos"
                      className="mr-2"
                    />
                  }
                  label={
                    <span className="lexend-font">
                      {t("register.tos1")}{" "}
                      <Link to="/tos" className="text-red_second font-bold ">
                        {t("register.tos2")}
                      </Link>
                    </span>
                  }
                />
              </div>
            </div>

            {/* END FORM SUBMISSION (login), FOR LOGIN */}
          </div>
        </div>

        <div className="flex justify-center items-center mb-32 flex-col w-full">
          <Button
            className="w-[80%] md:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[20%]"
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
            value="Login"
            id="login-btn"
          >
            <span className="popins-font">{t("register.content24")}</span>
          </Button>
        </div>
      </form>

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

      <FooterClean />
    </>
  );
};

export { Register };
