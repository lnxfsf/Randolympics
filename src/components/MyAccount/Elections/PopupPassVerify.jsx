import { Button, Avatar } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import axios from "axios";

import moment from "moment";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import countryList from "react-select-country-list";

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


const PopupPassVerify = ({ user, setUpdatedPassportPopup, popupRef, setOpen }) => {

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
    passportLastValidatedRejected = passportLastValidatedRejected.format(
      "YYYY/MM/DD  HH:mm"
    );
  }

  const [birhdateDate, setBirhdateDate] = useState(() => {
    if (user.birthdate) {
      let birthdate = moment(user.birthdate, "YYYY-MM-DD");
      return birthdate.format("YYYY-MM-DD");
    } else {
      return "Not entered";
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
      <div className="m-4 lexend-font text-black_second">
        
        
        <div className="flex justify-between items-center gap-16 mt-2">
          {/* <img
            src={
              BACKEND_SERVER_BASE_URL +
              "/imageUpload/profile_pics/" +
              user.picture
            }
            className="ProfileImagePassVerify"
          /> */}

          <Avatar
            sx={{ width: 97, height: 97 }}
            src={
              S3_BUCKET_CDN_BASE_URL +
              "/profile_pictures/" +
              user.picture
            }
          />




          <img
                src={
                  S3_BUCKET_CDN_BASE_URL +
                  "/passport_pictures/" +
                  user.passport_photo
                }
                alt="Profile"
                className="w-32 h-20 object-fit cursor-pointer"
                onClick={() => {setOpen1(true);}}
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




        <div className="flex justify-between items-center gap-16 mt-2">
          <p>
            <span className="font-semibold">Name: </span> {user.name}
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
            label={<span>Verify name</span>}
            labelPlacement="start"
          />
        </div>
        {/* e, ovde pored njega samo check !  */}

        <div className="mt-2 mb-2">
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>

        <div className="mt-2 mb-2">
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
        </div>

        <div className="mt-2 mb-2">
          <p>
            <span className="font-semibold">Cryptoaddress:</span> {user.crypto}
          </p>
        </div>

        <div className="flex justify-between items-center gap-16">
          <p>
            <span className="font-semibold">Country:</span>{" "}
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
            label={<span>Verify nationality</span>}
            labelPlacement="start"
          />
        </div>

        <div className="flex justify-between items-center gap-16">
          <p>
            <span className="font-semibold">Birthdate</span> {birhdateDate}
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
                disabled={currentUserTypeLoggedIn === "GP"}
                onChange={() => {
                  setBirthdateVerify(!birthdateVerify);
                }}
              />
            }
            label={<span>Verify birthdate</span>}
            labelPlacement="start"
          />
        </div>

        <div className="mt-2 mb-2">
          <p className="text-xl font-bold mb-2">Account status</p>
          <p>
            <span className="font-semibold">Profile last edited:</span>{" "}
            {profileLastUpdatedAt}
          </p>
          <p>
            <span className="font-semibold">Passport Uploaded:</span>{" "}
            {passportUploadedDate}
          </p>
          <p>
            <span className="font-semibold">Last Validated/Rejected Date:</span>{" "}
            {passportLastValidatedRejected}
          </p>
        </div>

        {user_type === "AH" && (
          <>
            <div className="mt-2 mb-4">
              <p>Weight: {user.weight}</p>
            </div>
          </>
        )}

        <div className="flex justify-between items-center md:gap-16">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                disabled={currentUserTypeLoggedIn === "GP"}
                className="w-full md:w-32"
                label="Passport Expiry Date"
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
                disabled={currentUserTypeLoggedIn === "GP"}
                onChange={() => {
                  setPassportExpiryVerify(!passportExpiryVerify);
                }}
              />
            }
            label={<span>Verify passport expiry date</span>}
            labelPlacement="start"
          />
        </div>

        {currentUserTypeLoggedIn !== "GP" && (
          <>
            <div className="flex justify-around items-center gap-2 m-4">
              <div>
                <Button
                  onClick={reject}
                  className="w-[85px]"
                  style={{ marginTop: "0px", padding: "0px" }}
                  sx={{
                    fontSize: "8pt",
                    height: "30px",
                    bgcolor: "#fff",
                    color: "#232323",
                    borderRadius: 15,
                    border: `1px solid #fff`,
                    "&:hover": {
                      background: "rgb(196, 43, 43)",
                      color: "white",
                      border: `1px solid rgb(196, 43, 43)`,
                    },
                  }}
                >
                  <span className="popins-font">Reject</span>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={cancel}
                  className="w-[85px]"
                  style={{ marginTop: "0px", padding: "0px" }}
                  sx={{
                    fontSize: "8pt",
                    height: "30px",
                    bgcolor: "#fff",
                    color: "#232323",
                    borderRadius: 15,
                    border: `1px solid #fff`,
                    "&:hover": {
                      background: "rgb(196, 43, 43)",
                      color: "white",
                      border: `1px solid rgb(196, 43, 43)`,
                    },
                  }}
                >
                  <span className="popins-font">Cancel</span>
                </Button>

                <Button
                  onClick={saveChanges}
                  className="w-[120px]"
                  style={{ marginTop: "0px", padding: "0px" }}
                  sx={{
                    fontSize: "8pt",
                    height: "30px",
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
                >
                  <span className="popins-font">Save changes</span>
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
