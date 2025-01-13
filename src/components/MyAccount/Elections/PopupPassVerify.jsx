import { Button, Avatar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import axios from "axios";

import moment from "moment";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import countryList from "react-select-country-list";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";

// for image zoom
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// for date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;

const PopupPassVerify = ({
  user,
  setUpdatedPassportPopup,
  popupRef,
  setOpen,
}) => {
  const { t } = useTranslation();

  const [open1, setOpen1] = useState(false);

  const name = user.name;
  const nationality = user.nationality;
  const user_type = user.user_type;
  var accountCreatedAt = user.createdAt;
  var passportStatus = user.passportStatus;
  var passportUploadedDate = user.passportUploadedDate;
  var passportLastValidatedRejected = user.passportLastValidatedRejected;

  if (accountCreatedAt) {
    accountCreatedAt = moment(accountCreatedAt, "YYYY-MM-DD  HH:mm:ss");
    accountCreatedAt = accountCreatedAt.format("YYYY/MM/DD  HH:mm");
  }

  if (passportUploadedDate) {
    passportUploadedDate = moment(passportUploadedDate, "YYYY-MM-DD  HH:mm:ss");
    passportUploadedDate = passportUploadedDate.format("YYYY/MM/DD  HH:mm");
  }

  if (passportLastValidatedRejected) {
    passportLastValidatedRejected = moment(
      passportLastValidatedRejected,
      "YYYY/MM/DD  HH:mm"
    );
    passportLastValidatedRejected =
      passportLastValidatedRejected.format("YYYY/MM/DD  HH:mm");
  }

  const [birhdateDate, setBirhdateDate] = useState(() => {
    if (user.birthdate) {
      let birthdate = moment(user.birthdate, "YYYY-MM-DD");
      return birthdate.format("YYYY-MM-DD");
    } else {
      return t("myprofile.validationManager.content21");
    }
  });

  const [profileLastUpdatedAt, setProfileLastUpdatedAt] = useState(() => {
    let lastUpdatedAt = moment(user.updatedAt, "YYYY-MM-DD HH:mm:ss");
    return lastUpdatedAt.format("YYYY/MM/DD HH:mm");
  });

  const handlePassportExpiryDateChange = (date) => {
    setPassportExpiryDate(date);
  };

  const [nameVerify, setNameVerify] = useState(user.name_verify);
  const [birthdateVerify, setBirthdateVerify] = useState(user.birthdate_verify);
  const [nationalityVerify, setNationalityVerify] = useState(
    user.nationality_verify
  );
  const [passportExpiryVerify, setPassportExpiryVerify] = useState(
    user.passport_expiry_verify
  );

  // popup
  // const popupRef = useRef(null);
  const popupPassportRef = useRef(null); // popup for showing passport image

  // for date , insert passport expiry date // okay, it will send normally
  const [passportExpiryDate, setPassportExpiryDate] = useState(
    dayjs(user.passport_expiry)
  ); // okay, directly passed from user,

  const [currentUserTypeLoggedIn, setCurrentUserTypeLoggedIn] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      return userJson.data.user_type;
    }
  });

  // -------------------
  const reject = async () => {
    setNameVerify(false);
    setBirthdateVerify(false);
    setNationalityVerify(false);
    setPassportExpiryVerify(false);

    setPassportExpiryDate(null);

    passportLastValidatedRejected = new Date();

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
        {
          original_email: user.email,

          /*  name_verify: false,
              birthdate_verify: false,
              nationality_verify: false,
              passport_expiry_verify: false,
              passport_expiry: null, 
               */
          passportLastValidatedRejected: passportLastValidatedRejected,

          isRejected: true,
          updating_from_VM: true, // this is, only for Validation Manager type anyways..
        }
      );

      if (response.status === 200) {
        setUpdatedPassportPopup((prev) => !prev);

        // popupRef.current.close();
        setOpen(false);
      }
    } catch (error) {
      //popupRef.current.close();
      setOpen(false);
    }

    // popupRef.current.close();
    setOpen(false);
  };

  const cancel = () => {
    // reset fields, to what was before.
    setNameVerify(user.name_verify);
    setBirthdateVerify(user.birthdate_verify);
    setNationalityVerify(user.nationality_verify);
    setPassportExpiryVerify(user.passport_expiry_verify);

    setPassportExpiryDate(dayjs(user.passport_expiry));

    // and exit popup
    //  popupRef.current.close();
    setOpen(false);
  };

  const saveChanges = async () => {
    passportLastValidatedRejected = new Date(); // as last time, when we edited passport data (validated/rejected..)

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
        {
          original_email: user.email,

          name_verify: nameVerify,
          birthdate_verify: birthdateVerify,
          nationality_verify: nationalityVerify,
          passport_expiry_verify: passportExpiryVerify,

          passport_expiry: passportExpiryDate,

          passportLastValidatedRejected: passportLastValidatedRejected,
          updating_from_VM: true,
        }
      );

      if (response.status === 200) {
        setUpdatedPassportPopup((prev) => !prev);

        // popupRef.current.close();
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      //popupRef.current.close();
    }
  };
  // -------------------

  return (
    <>
      <div className=" md:m-4 lexend-font text-black_second">
     
        <div className="flex justify-between items-center gap-4 md:gap-16 mt-2">
          <Avatar
            sx={{ width: 97, height: 97 }}
            src={S3_BUCKET_CDN_BASE_URL + "/profile_pictures/" + user.picture}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>

          <img
            src={
              user.passport_photo
                ? S3_BUCKET_CDN_BASE_URL +
                  "/passport_pictures/" +
                  user.passport_photo
                : "/myaccount/passport_placeholder.svg"
            }
            alt="Profile"
            className={`w-32 h-20 object-fit ${
              user.passport_photo && "cursor-pointer"
            } `}
            onClick={() => {
              if (user.passport_photo) {
                setOpen1(true);
              }
            }}
          />

          <Dialog
            open={open1}
            onClose={() => {
              setOpen1(false);
            }}
            scroll="paper" // Or "body" for a different scrolling behavior
            maxWidth="sm" // Adjust the width as needed
            fullWidth
          >
            <DialogContent
              dividers={true}
              style={{ maxHeight: "80vh", overflow: "auto" }}
            >
              <TransformWrapper>
                <TransformComponent>
                  <img
                    src={
                      S3_BUCKET_CDN_BASE_URL +
                      "/passport_pictures/" +
                      user.passport_photo
                    }
                    alt="Profile"
                    className="w-[500px] h-96 object-fit "
                  />
                </TransformComponent>
              </TransformWrapper>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-between md:items-center flex-col md:flex-row md:gap-16 mt-2 ">
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content5")}
            </span>{" "}
            {user.name}
          </p>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#FF0000",
                  "&.Mui-checked": {
                    color: "#FF0000",
                  },
                }}
                checked={nameVerify}
                disabled={currentUserTypeLoggedIn === "GP"}
                onChange={() => {
                  setNameVerify(!nameVerify);
                }}
              />
            }
            label={<span>{t("myprofile.validationManager.content6")}</span>}
            labelPlacement="start"
          />
        </div>
        <div className="mt-2 mb-2">
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content7")}
            </span>{" "}
            {user.email}
          </p>
        </div>

        <div className="mt-2 mb-2">
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content8")}
            </span>{" "}
            {user.phone}
          </p>
        </div>

        <div className="mt-2 mb-2 items-center">
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content9")}
            </span>{" "}
            {user.crypto}
          </p>
        </div>

        <div className="flex justify-between md:items-center flex-col md:flex-row md:gap-16">
          <p>
            <span className="font-semibold justify-self-end">
              {t("myprofile.validationManager.content10")}
            </span>{" "}
            {countryList().getLabel(user.nationality)}{" "}
          </p>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#FF0000",
                  "&.Mui-checked": {
                    color: "#FF0000",
                  },
                }}
                checked={nationalityVerify}
                disabled={currentUserTypeLoggedIn === "GP"}
                onChange={() => {
                  setNationalityVerify(!nationalityVerify);
                }}
              />
            }
            label={<span>{t("myprofile.validationManager.content11")}</span>}
            labelPlacement="start"
            disabled={!user.passport_photo}
          />
        </div>

        <div className="flex justify-between md:items-center flex-col md:flex-row md:gap-16">
          <p>
            <span className="font-semibold ">
              {t("myprofile.validationManager.content12")}
            </span>{" "}
            {birhdateDate}
          </p>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#FF0000",
                  "&.Mui-checked": {
                    color: "#FF0000",
                  },
                }}
                checked={birthdateVerify}
                disabled={currentUserTypeLoggedIn === "GP" || !user.birthdate}
                onChange={() => {
                  setBirthdateVerify(!birthdateVerify);
                }}
              />
            }
            label={<span>{t("myprofile.validationManager.content13")}</span>}
            labelPlacement="start"
          />
        </div>

        <div className="mt-2 mb-2">
          <p className="text-xl font-bold mb-2">
            {t("myprofile.validationManager.content14")}
          </p>
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content15")}
            </span>{" "}
            {profileLastUpdatedAt}
          </p>
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content16")}
            </span>{" "}
            {passportUploadedDate}
          </p>
          <p>
            <span className="font-semibold">
              {t("myprofile.validationManager.content17")}
            </span>{" "}
            {passportLastValidatedRejected}
          </p>
        </div>

        {user_type === "AH" && (
          <>
            <div className="mt-2 mb-4">
              <p>
                {t("myprofile.validationManager.content18")} {user.weight}
              </p>
            </div>
          </>
        )}

        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-16">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                disabled={currentUserTypeLoggedIn === "GP"}
                className="w-full"
                label={t("myprofile.validationManager.content22")}
                minDate={dayjs()}
                value={passportExpiryDate}
                onChange={handlePassportExpiryDateChange}
                format="MMMM DD, YYYY"
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  color: "#FF0000",
                  "&.Mui-checked": {
                    color: "#FF0000",
                  },
                }}
                checked={passportExpiryVerify}
                disabled={
                  currentUserTypeLoggedIn === "GP" ||
                  !passportExpiryDate?.isValid()
                }
                onChange={() => {
                  setPassportExpiryVerify(!passportExpiryVerify);
                }}
              />
            }
            label={<span>{t("myprofile.validationManager.content19")}</span>}
            labelPlacement="start"
          />
        </div>

        {currentUserTypeLoggedIn !== "GP" && (
          <>
            <div className="flex flex-col md:flex-row justify-around items-center gap-2 mt-8 md:m-4">
              <div className="max-md:w-full">
                <Button
                  onClick={reject}
                  className="w-full md:w-[85px]"
                  style={{ marginTop: "0px", padding: "0px", textTransform: "none"  }}
                  sx={{
                    height: "45px",
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
                  <span className="lexend-font text-xs">
                    {t("myprofile.validationManager.content20")}
                  </span>
                </Button>
              </div>

              <div className="flex gap-2 max-md:w-full">
                <Button
                  onClick={cancel}
                  className="w-full md:w-[85px]"
                  style={{ marginTop: "0px", padding: "0px", textTransform: "none"  }}
                  sx={{
                    height: "45px",
                    bgcolor: "#fff",
                    color: "#444444",
                    borderRadius: 3,
                    border: `1px solid #D24949`,
                    "&:hover": {
                      background: "rgb(210, 73, 73)",
                      color: "white",
                      border: `1px solid rgb(210, 73, 73)`,
                    },
                  }}
                >
                  <span className="lexend-font text-xs">
                    {t("myprofile.validationManager.content3")}
                  </span>
                </Button>

                <Button
                  onClick={saveChanges}
                  className=" w-full md:w-[120px]"
                  style={{ marginTop: "0px", padding: "0px", textTransform: "none" }}
                  sx={{
                    
                    height: "45px",
                    bgcolor: "#D24949",
                    color: "#fff",
                    borderRadius: 3,
                    border: `1px solid #D24949`,
                    "&:hover": {
                      background: "rgb(210, 73, 73,)",
                      color: "white",
                      border: `1px solid rgb(210, 73, 73,)`,
                    },
                  }}
                >
                  <span className="lexend-font text-xs">
                    {t("myprofile.validationManager.content4")}
                  </span>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { PopupPassVerify };
