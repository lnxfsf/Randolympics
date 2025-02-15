import React, { useState, useEffect, useRef } from "react";

import { Button } from "@mui/material";
import { InputAdornment } from '@mui/material';

import axios from "axios";

import { WarningTextPopup } from "../../components/Supporters/WarningTextPopup";

import Popup from "reactjs-popup";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import dayjs from "dayjs";

import ReactFlagsSelect from "react-flags-select";

import "../../styles/supporters.scoped.scss";

import supportedCountry, { getTranslatedCountries } from "../../context/supportedCountry";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

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

// FilePond css
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginFileValidateType from "filepond-plugin-image-edit";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import "@pqina/pintura/pintura.css";
import zIndex from "@mui/material/styles/zIndex";


import { useTranslation } from "react-i18next";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

const validatePhoneNumber = (phone) => {
  const sanitizedPhone = phone.replace(/\s+/g, "");

  const phonePattern = /^\+[1-9]\d{7,14}$/;
  return phonePattern.test(sanitizedPhone);
};

const SupporterSecondPart = ({
  secondIsVisible,
  setHowItWorks,
  isCelebrity,
  friendName,
  setFriendName,
  friendMiddleName,
  setFriendMiddleName,
  inputLabelPropsTextField,
  sxTextField,
  friendLastName,
  setFriendLastName,
  friendEmail,
  setFriendEmail,
  friendPhone,
  setFriendPhone,
  friendBirthdate,
  setFriendBirthdate,
  friendNationality,
  setFriendNationality,
  friendGender,
  setFriendGender,
  setSendEmailToFriend,
  fb_link,
  setFb_link,
  ig_link,
  setIg_link,

  tw_link,
  setTw_link,

  tt_link,
  setTT_link,
  yt_link,
  setYT_link,



  setSecondIsVisible,
  setThirdIsVisible,
  setFirstIsVisible,
  files,
  setFiles,
  server,

  openSnackbarFailure,
  handleSnackbarFailureClose,
  openSnackbarSuccess,
  handleSnackbarSuccessClose,
  snackbarMessage,
  setSnackbarMessage,

  setOpenSnackbarFailure,
  setOpenSnackbarSuccess,

  filePondRef1,
  filePondRef2,
}) => {
  const [popupWarning, setPopupWarning] = useState(false);
  const { t } = useTranslation();

  // 12 yrs, is minium to participate in this
  const maxAllowedDate = dayjs().subtract(15, "year");

  // ? this is for phone
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isPhonerHelper, setIsPhoneErrorHelper] = useState("");
  const isPhoneErrorFocus = useRef(null);

  useEffect(() => {
    if (isPhoneError && isPhoneErrorFocus.current) {
      isPhoneErrorFocus.current.focus();
    }
  }, [isPhoneError]);

  const validateAthlete = async () => {
    // with this, we check if such athlete exists (so, we show that different screen, and immediatelly stop execution other stuff..)
    const responseAthleteUser = await axios.get(
      `${BACKEND_SERVER_BASE_URL}/auth/campaignDoesUserExist`,
      {
        params: {
          email: friendEmail,
        },
      }
    );

    // if it did, found already existing Athlete user, then it shows something else
    if (responseAthleteUser.data.found) {
      setSnackbarMessage(t("popupMessages.text8"));
      setOpenSnackbarFailure(true);
      return;
    }


    const noSpecialCharsRegex = /^[\p{L} ]+$/u;
    if (friendName === "") {
      setSnackbarMessage(t("popupMessages.text9"));
      setOpenSnackbarFailure(true);

      return;
    } else if(!noSpecialCharsRegex.test(friendName)){
        setSnackbarMessage(t("popupMessages.text24"));
        setOpenSnackbarFailure(true);
        return;

      }
    

    

    if (friendLastName === "") {
      setSnackbarMessage(t("popupMessages.text10"));
      setOpenSnackbarFailure(true);
      return;
    } else if(!noSpecialCharsRegex.test(friendLastName)){
        setSnackbarMessage(t("popupMessages.text25"));
        setOpenSnackbarFailure(true);
        return;

    }

    if (friendEmail === "" && !isCelebrity) {
      setSnackbarMessage(t("popupMessages.text11"));
      setOpenSnackbarFailure(true);
      return;
    }

    if (isPhoneError === true) {
      setSnackbarMessage(t("popupMessages.text12"));
      setOpenSnackbarFailure(true);
      return;
    }

    if (!isCelebrity) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(friendEmail)) {
        setSnackbarMessage(t("popupMessages.text13"));
        setOpenSnackbarFailure(true);
        return;
      }
    }

    if (friendNationality === "") {
      setSnackbarMessage(t("popupMessages.text14"));
      setOpenSnackbarFailure(true);
      return;
    }

    // if all fields are empty
    if (fb_link === "" && ig_link === "" && tw_link === "" && tt_link === "" && yt_link === "" && isCelebrity ) {
      setSnackbarMessage(t("popupMessages.text15") );
      setOpenSnackbarFailure(true);
      return;
    }

    const socialMediaRegex =
      /^(https?:\/\/)?(www\.)?(facebook|instagram|x)\.com\/[A-Za-z0-9._%-]+$|^\/?@?[A-Za-z0-9._%-]+$/;

      const socialMediaRegexWithoutSlash =
      /^(https?:\/\/)?(www\.)?(tiktok|youtube)\.com\/[A-Za-z0-9._%-]+$|^\@[A-Za-z0-9._%-]+$/;

    if (isCelebrity && fb_link !== "" && !socialMediaRegex.test(fb_link)) {
      setSnackbarMessage(t("popupMessages.content134"));
      setOpenSnackbarFailure(true);
      return;
    }

    if (isCelebrity && ig_link !== "" && !socialMediaRegex.test(ig_link)) {
      setSnackbarMessage(t("popupMessages.content135"));
      setOpenSnackbarFailure(true);
      return;
    }

    if (isCelebrity && tw_link !== "" && !socialMediaRegex.test(tw_link)) {
      setSnackbarMessage(t("popupMessages.content136"));
      setOpenSnackbarFailure(true);
      return;
    }

    if (isCelebrity && tt_link !== "" && !socialMediaRegexWithoutSlash.test(tt_link)) {
      setSnackbarMessage(t("popupMessages.content137"));
      setOpenSnackbarFailure(true);
      return;
    }

    if (isCelebrity && yt_link !== "" && !socialMediaRegexWithoutSlash.test(yt_link)) {
      setSnackbarMessage(t("popupMessages.content138"));
      setOpenSnackbarFailure(true);
      return;
    }


    // at last remove spaces from phone number
    setFriendPhone(friendPhone.replace(/\s+/g, ""));

    setPopupWarning(true);

    // ako je sve proslo onda ide okej ovde (nema return ..)
    // ! setSecondIsVisible(false);
    // ! setThirdIsVisible(true);
  };

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col first-content-container ${
          secondIsVisible ? "show" : "hide"
        } `}
      >
        {!isCelebrity && (
          <>
            {/* // ! signing up for a friend  */}

            <div className="flex items-center  justify-start md:justify-center w-full min-h-screen">
              <div className="basis-1/2 justify-center items-center hidden lg:block 2xl:m-32 image-container min-h-screen">
                <img src="supporters/2.jpg" className="image_supporter" />
              </div>

              <div className="basis-1/2 flex flex-wrap flex-col  justify-start md:justify-center  items-start md:items-center lg:items-start m-8 md:m-16 text-black_second grow">
                <div className="flex justify-around w-full  lexend-font">
                  <div className="flex flex-col items-center">
                    <div
                      style={{
                        backgroundColor: "#ffeaea",
                        borderRadius: "50%",
                      }}
                      className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#D24949]">1</p>
                    </div>

                    <p className="text-sm font-medium text-center mt-3 text-[#D24949]">
                      {isCelebrity
                        ? t("campaign.content95")
                        : t("campaign.content15")}
                      <br /> {t("campaign.content16")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-15">
                    <div
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: "50%",
                      }}
                      className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#82889E]">2</p>
                    </div>

                    <p className="text-sm font-medium text-center mt-3 text-[#82889E] ">
                      {t("campaign.content17")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-15">
                    <div
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: "50%",
                      }}
                      className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#82889E]">3</p>
                    </div>

                    <p className="text-sm font-medium text-center mt-3 text-[#82889E] ">
                      {t("campaign.content18")}
                    </p>
                  </div>
                </div>

                <p className="text-2xl text-center mt-8 mb-12 font-bold text-black_second lexend-font">
                  {t("campaign.content24")}
                </p>

                <div className="flex flex-col w-full">
                  <div className="ml-2 flex ">
                    <FilePond
                      ref={filePondRef1}
                      className="filepond--root athlete"
                      type="file"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      maxFiles={1}
                      server={server}
                      name="image"
                      labelIdle={t("campaign.content40")}
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
                      imagePreviewHeight={150}
                      imageCropAspectRatio="1:1"
                      imageResizeTargetWidth={100}
                      imageResizeTargetHeight={100}
                      stylePanelLayout="compact circle "
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
                            setOpenSnackbarFailure(true);
                            filePondRef1.current.removeFiles(); // Remove the invalid file
                          }
                        }
                      }}
                    />
                  </div>

                  <label
                    htmlFor="friendName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content25")} *
                  </label>

                  <TextField
                    value={friendName}
                    onChange={(e) => {
                      setFriendName(e.target.value);
                    }}
                    placeholder="John"
                    id="friendName"
                    name="friendName"
                    type="text"
                    inputProps={{
                      maxLength: 255,
                    }}
                    InputLabelProps={inputLabelPropsTextField}
                    sx={sxTextField}
                  />

                  <label
                    htmlFor="friendMiddleName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content26")}
                  </label>

                  <TextField
                    value={friendMiddleName}
                    onChange={(e) => {
                      setFriendMiddleName(e.target.value);
                    }}
                    placeholder="Johnson"
                    id="friendMiddleName"
                    name="friendMiddleName"
                    type="text"
                    inputProps={{
                      maxLength: 255,
                    }}
                    InputLabelProps={inputLabelPropsTextField}
                    sx={sxTextField}
                  />

                  <label
                    htmlFor="friendLastName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content27")} *
                  </label>

                  <TextField
                    value={friendLastName}
                    onChange={(e) => {
                      setFriendLastName(e.target.value);
                    }}
                    id="friendLastName"
                    placeholder="Doe"
                    type="text"
                    inputProps={{
                      maxLength: 255,
                    }}
                    InputLabelProps={inputLabelPropsTextField}
                    sx={sxTextField}
                  />

                  <label
                    htmlFor="gender"
                    className="lexend-font mt-1 font-medium text-sm"
                  >
                    {t("campaign.content28")}
                  </label>

                  <Select
                    labelId="roleDropdowns"
                    id="gender"
                    /*  label="gender" */
                    value={friendGender}
                    onChange={(event) => {
                      setFriendGender(event.target.value);
                    }}
                    className="w-full mb-2"
                    sx={{
                      fontFamily: "'Lexend', sans-serif",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2, // Adjust the radius as needed
                        fontFamily: "'Lexend', sans-serif",
                      },
                      "& fieldset": {
                        borderRadius: 2, // Ensure the fieldset has the same border-radius
                      },
                    }}
                  >
                    <MenuItem
                      value={"M"}
                      sx={{
                        fontFamily: "'Lexend', sans-serif",
                      }}
                    >
                      {t("campaign.content29")}
                    </MenuItem>
                    <MenuItem
                      value={"F"}
                      sx={{
                        fontFamily: "'Lexend', sans-serif",
                      }}
                    >
                      {t("campaign.content30")}
                    </MenuItem>
                  </Select>

                  <label
                    htmlFor="friendEmail"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content31")} *
                  </label>

                  <TextField
                    value={friendEmail}
                    onChange={(e) => {
                      setFriendEmail(e.target.value);
                    }}
                    placeholder={t("campaign.content130")}
                    id="friendEmail"
                    type="email"
                    inputProps={{
                      maxLength: 255,
                    }}
                    InputLabelProps={inputLabelPropsTextField}
                    sx={sxTextField}
                  />

                  <label
                    htmlFor="friendPhone"
                    className="lexend-font mb-1  mt-1 font-medium text-sm"
                  >
                    {t("campaign.content32")}
                  </label>

                  <TextField
                    value={friendPhone}
                    inputRef={isPhoneErrorFocus}
                    error={isPhoneError}
                    helperText={isPhoneError ? isPhonerHelper : ""}
                    onChange={(e) => {
                      setFriendPhone(e.target.value);

                      const phoneValue = e.target.value;

                      if (
                        !validatePhoneNumber(phoneValue) &&
                        phoneValue.length > 0
                      ) {
                        setIsPhoneError(true);
                        setIsPhoneErrorHelper(t("register.content9"));
                        isPhoneErrorFocus.current.focus();
                      } else {
                        setIsPhoneError(false);
                        setIsPhoneErrorHelper("");
                      }
                    }}
                    id="friendPhone"
                    placeholder="+1 425 555 0123"
                    type="tel"
                    inputProps={{
                      maxLength: 15,
                      inputMode: "numeric",
                      pattern: "/^+[1-9]d{7,14}$/",
                    }}
                    InputLabelProps={inputLabelPropsTextField}
                    sx={sxTextField}
                  />

                  <label
                    htmlFor="birthdate"
                    className="lexend-font mt-1 font-medium text-sm"
                  >
                    {t("campaign.content33")}
                  </label>

                  <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          style={{ backgroundColor: "#fff" }}
                          className="w-full"
                          id="birthdate"
                          value={friendBirthdate}
                          maxDate={maxAllowedDate}
                          onChange={(date) => {
                            setFriendBirthdate(date);
                          }}
                          slotProps={{
                            textField: {
                              helperText:
                                t("popupMessages.text16"), // Add the helper text
                            },
                          }}
                          format="MMMM DD, YYYY"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              fontFamily: "'Lexend', sans-serif",
                              borderRadius: 2,
                              // backgroundColor: "#fff",
                              // borderRadius: "15px", // or 5px, according to your design
                            },

                            /*  '& .MuiOutlinedInput-input': {
                              backgroundColor: '#fff',
                              borderRadius: 'inherit', // Ensures consistency
                            },
                          */
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </FormControl>

                  <label
                    htmlFor="nationality"
                    className="lexend-font mb-1  mt-4 font-medium text-sm"
                  >
                    {t("campaign.content34")} *
                  </label>

                  <ReactFlagsSelect
                    placeholder={t("campaign.content63")}
                    countries={supportedCountry}
                    className="w-full p-0 lexend-font rounded-lg"
                    selected={friendNationality}
                    onSelect={(code) => {
                      setFriendNationality(code);
                    }}
                    searchable={true}
                    id="nationality"
                    name="nationality"

                    selectButtonClassName="h-14"
                    searchPlaceholder={t("flagsDropdown.search_placeholder")}
                    customLabels={getTranslatedCountries()}
                  />

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="send"
                      name="radio-buttons-group"
                      className="mt-4"
                      onChange={(event) => {
                        const value = event.target.value;

                        if (value === "send") {
                          setSendEmailToFriend(true);
                        } else if (value === "dontsend") {
                          setSendEmailToFriend(false);
                        }
                      }}
                    >
                      <FormControlLabel
                        value="send"
                        control={
                          <Radio
                            sx={{
                              color: "#444444",
                              "&.Mui-checked": {
                                color: "#444444",
                              },
                            }}
                          />
                        }
                        label={t("campaign.content35")}
                        sx={{
                          marginBottom: "0px",
                          "& .MuiTypography-root": {
                            fontFamily: "'Lexend', sans-serif",
                            fontWeight: 500,
                          },
                        }}
                      />
                      <FormControlLabel
                        value="dontsend"
                        control={
                          <Radio
                            sx={{
                              color: "#444444",
                              "&.Mui-checked": {
                                color: "#444444",
                              },
                            }}
                          />
                        }
                        label={t("campaign.content36")}
                        sx={{
                          marginTop: "0px",
                          "& .MuiTypography-root": {
                            fontFamily: "'Lexend', sans-serif",
                            fontWeight: 500,
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="flex flex-col gap-2 w-full mt-8">
                  <Button
                    onClick={validateAthlete}
                    className="w-full md:w-50%"
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
                    
                  >
                    <img src="supporters/right_arrow.svg" className="mr-2" />{" "}
                    <span className="lexend-font">
                      {t("campaign.content23")}
                    </span>
                  </Button>

                  <Button
                    onClick={() => {
                      setFirstIsVisible(true);
                      setSecondIsVisible(false);
                    }}
                    className="w-full md:w-50%"
                    style={{ textTransform: "none" }}
                    sx={{
                      height: "50px",
                      bgcolor: "#fff",
                      color: "#444444",
                      borderRadius: 3,
                      border: `1px solid #D24949`,
                      "&:hover": {
                        background: "rgba(210, 73, 73, 1)",
                        color: "white",
                        border: `1px solid rgba(210, 73, 73, 1)`,
                      },
                    }}
                    
                  >
                    <img src="supporters/left_arrow.svg" className="mr-2" />{" "}
                    <span className="lexend-font">
                      {t("campaign.content37")}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* for case of celebrity !  */}
        {isCelebrity && (
          <>
            <div className="flex items-center  justify-start md:justify-center w-full">
              <div className="basis-1/2 justify-center items-center hidden lg:block 2xl:m-32 image-container min-h-screen">
                <img src="/supporters/3.jpg" className="image_supporter" />
              </div>

              <div className="basis-1/2 flex flex-wrap flex-col  justify-start md:justify-center  items-start md:items-center lg:items-start m-8 md:m-16 text-black_second grow">
                <div className="flex justify-around w-full  lexend-font">
                  <div className="flex flex-col items-center">
                    <div
                      style={{
                        backgroundColor: "#ffeaea",
                        borderRadius: "50%",
                      }}
                      className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#D24949]">1</p>
                    </div>

                    <p className="text-sm font-medium text-center mt-3 text-[#D24949]">
                      {isCelebrity
                        ? t("campaign.content95")
                        : t("campaign.content15")}
                      <br /> {t("campaign.content16")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-15">
                    <div
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: "50%",
                      }}
                      className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#82889E]">2</p>
                    </div>

                    <p className="text-sm font-medium text-center mt-3 text-[#82889E] ">
                      {t("campaign.content17")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center w-15">
                    <div
                      style={{
                        backgroundColor: "#F5F5F5",
                        borderRadius: "50%",
                      }}
                      className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                    >
                      <p className="text-sm font-bold text-[#82889E]">3</p>
                    </div>

                    <p className="text-sm font-medium text-center mt-3 text-[#82889E] ">
                      {t("campaign.content18")}
                    </p>
                  </div>
                </div>

                <p className="text-2xl text-center mt-8 mb-12 font-bold text-black_second lexend-font">
                  {t("campaign.content38")}
                </p>

                <div className="flex flex-col w-full">
                  <div className="ml-2 flex ">
                    <FilePond
                      ref={filePondRef2}
                      className="filepond--root athlete"
                      type="file"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      maxFiles={1}
                      server={server}
                      name="image"
                      labelIdle={t("campaign.content39")}
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
                      imagePreviewHeight={150}
                      imageCropAspectRatio="1:1"
                      imageResizeTargetWidth={100}
                      imageResizeTargetHeight={100}
                      stylePanelLayout="compact circle "
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
                            setSnackbarMessage(
                              t("campaign.content141")
                            );
                            setOpenSnackbarFailure(true);
                            filePondRef2.current.removeFiles();
                          }
                        }
                      }}
                    />
                  </div>

                  <label
                    htmlFor="friendName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content25")} *
                  </label>

                  <div className="flex flex-col justify-start">
                    <TextField
                      value={friendName}
                      onChange={(e) => {
                        setFriendName(e.target.value);
                      }}
                      placeholder="John"
                      id="friendName"
                      name="name"
                      type="text"
                      inputProps={{
                        maxLength: 30,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />
                  </div>

                  <label
                    htmlFor="friendMiddleName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content26")}
                  </label>

                  <div className="flex flex-col justify-start">
                    <TextField
                      value={friendMiddleName}
                      onChange={(e) => {
                        setFriendMiddleName(e.target.value);
                      }}
                      placeholder="Johnson"
                      id="friendMiddleName"
                      name="name"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />
                  </div>

                  <label
                    htmlFor="friendLastName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content27")} *
                  </label>

                  <div className="flex flex-col justify-start">
                    <TextField
                      value={friendLastName}
                      onChange={(e) => {
                        setFriendLastName(e.target.value);
                      }}
                      id="friendLastName"
                      placeholder="Doe"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />
                  </div>

                  <div className="flex mt-0 mb-2 flex-col">
                    <label
                      htmlFor="gender"
                      className="lexend-font mt-1 font-medium text-sm"
                    >
                      {t("campaign.content28")}
                    </label>
                    <Select
                      labelId="roleDropdowns"
                      id="gender"
                      value={friendGender}
                      onChange={(event) => {
                        setFriendGender(event.target.value);
                      }}
                      className="w-full"
                      sx={{
                        fontFamily: "'Lexend', sans-serif",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2, // Adjust the radius as needed
                          fontFamily: "'Lexend', sans-serif",
                        },

                        "& fieldset": {
                          borderRadius: 2, // Ensure the fieldset has the same border-radius
                        },
                      }}
                    >
                      <MenuItem value={"M"}>{t("campaign.content29")}</MenuItem>
                      <MenuItem value={"F"}>{t("campaign.content30")}</MenuItem>
                    </Select>
                  </div>

                  <label
                    htmlFor="nationality"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content34")} *
                  </label>

                  <ReactFlagsSelect
                    placeholder={t("campaign.content63")}
                    countries={supportedCountry}
                    className="w-full rounded-md p-0 lexend-font"

                    // to fill it with the one, which user's is currently selected...
                    selected={friendNationality}
                    onSelect={(code) => {
                      setFriendNationality(code);
                    }}
                    /*  className={classNameFlagsSelect} */
                    searchable={true}
                    id="nationality"
                    name="nationality"

                    selectButtonClassName="h-14"
                    searchPlaceholder={t("flagsDropdown.search_placeholder")}
                    customLabels={getTranslatedCountries()}
                  />

                  <p className="lexend-font text-2xl font-semibold mb-1 mt-3">
                    {t("campaign.content41")}
                  </p>
                
                  <label
                    htmlFor="fbl"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content42")}
                  </label>




                  <div className="flex flex-col justify-start">
                    <TextField
                      value={fb_link}
                      onChange={(e) => {
                        setFb_link(e.target.value);
                      }}
                      placeholder="/officialjohndoe"
                      id="fbl"
                      name="fbl"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}


                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                           <img width={32} src="/supporters/facebook_icon.svg" />
                          </InputAdornment>
                        ),
                      }}



                    />
                  </div>

                  <label
                    htmlFor="igl"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content43")}
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={ig_link}
                      onChange={(e) => {
                        setIg_link(e.target.value);
                      }}
                      placeholder="@officialjohndoe"
                      id="igl"
                      name="name"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}


                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                           <img width={32} src="/supporters/instagram_icon.svg" />
                          </InputAdornment>
                        ),
                      }}


                    />
                  </div>

                  <label
                    htmlFor="igl"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content44")}
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={tw_link}
                      onChange={(e) => {
                        setTw_link(e.target.value);
                      }}
                      placeholder="@officialjohndoe"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}

                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                           <img width={32} src="/supporters/x_logo.svg" />
                          </InputAdornment>
                        ),
                      }}

                    />
                  </div>   

                  <label
                    
                    className="lexend-font mb-1 mt-1 font-medium text-sm"

                  >
                    {t("campaign.content108")}
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={tt_link}
                      onChange={(e) => {
                        setTT_link(e.target.value);
                      }}
                      placeholder="@officialjohndoe"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}


                      
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                           <img width={32} src="/supporters/tiktok_icon.svg" />
                          </InputAdornment>
                        ),
                      }}

                    />
                  </div>

                  <label
                    
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                    
                  >
                    {t("campaign.content109")}
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={yt_link}
                      onChange={(e) => {
                        setYT_link(e.target.value);
                      }}
                      placeholder="@officialjohndoe"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                           <img width={32} src="/supporters/youtube_icon.svg" />
                          </InputAdornment>
                        ),
                      }}

                    />
                  </div>




                  <label className="lexend-font  font-medium text-sm text-[#82889e]">
                    {t("campaign.content45")}
                  </label>
                </div>

                <div className="flex flex-col gap-2 w-full mt-8">
                  <Button
                    onClick={validateAthlete}
                    className="w-full md:w-50%"
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
                    
                  >
                    <img src="supporters/right_arrow.svg" className="mr-2" />{" "}
                    <span className="lexend-font">
                      {t("campaign.content23")}
                    </span>
                  </Button>

                  <Button
                    onClick={() => {
                      setFirstIsVisible(true);
                      setSecondIsVisible(false);
                    }}
                    className="w-full md:w-50%"
                    style={{ textTransform: "none" }}
                    sx={{
                      height: "50px",
                      bgcolor: "#fff",
                      color: "#444444",
                      borderRadius: 3,
                      border: `1px solid #D24949`,
                      "&:hover": {
                        background: "rgba(210, 73, 73, 1)",
                        color: "white",
                        border: `1px solid rgba(210, 73, 73, 1)`,
                      },
                    }}
                    id="go_back_btn"
                  >
                    <img src="/supporters/left_arrow.svg" className="mr-2 " />{" "}
                    <span className="lexend-font">
                      {t("campaign.content37")}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        <Popup
          open={popupWarning}
          onClose={() => setPopupWarning(false)}
          position="right center"
          className="popup-content "
        >
          <WarningTextPopup
            isCelebrity={isCelebrity}
            setSecondIsVisible={setSecondIsVisible}
            setThirdIsVisible={setThirdIsVisible}
            setPopupWarning={setPopupWarning}
            popupWarning={popupWarning}
          />
        </Popup>
      </div>
    </>
  );
};

export { SupporterSecondPart };
