import "../../../styles/passverify.scoped.scss";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import moment from "moment";
import Flag from "react-world-flags";
import countryList from "react-select-country-list";

import { PopupPassVerify } from "./PopupPassVerify";

import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";

import React, { useState, useEffect, useRef } from "react";

import axios from "axios";

import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const PassVerify = ({ user, index, setUpdatedPassport }) => {
  const [open, setOpen] = useState(false);

  //-------------

  const [updatedPassportPopup, setUpdatedPassportPopup] = useState(false);

  //--------------
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
      "YYYY-MM-DD  HH:mm"
    );
    passportLastValidatedRejected =
      passportLastValidatedRejected.format("YYYY-MM-DD  HH:mm");
  }

  const [birhdateDate, setBirhdateDate] = useState(() => {
    if (user.birthdate) {
      let birthdate = moment(user.birthdate, "YYYY-MM-DD");
      return birthdate.format("YYYY-MM-DD");
    } else {
      return "Not entered";
    }
  });

  const [nameVerify, setNameVerify] = useState(user.name_verify);
  const [birthdateVerify, setBirthdateVerify] = useState(user.birthdate_verify);
  const [nationalityVerify, setNationalityVerify] = useState(
    user.nationality_verify
  );
  const [passportExpiryVerify, setPassportExpiryVerify] = useState(
    user.passport_expiry_verify
  );

  // popup
  const popupRef = useRef(null);
  const popupPassportRef = useRef(null); // popup for showing passport image

  // for date , insert passport expiry date // okay, it will send normally
  const [passportExpiryDate, setPassportExpiryDate] = useState(
    dayjs(user.passport_expiry)
  ); // okay, directly passed from user,

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
        }
      );

      if (response.status === 200) {
        setUpdatedPassport((prev) => !prev);

        popupRef.current.close();
      }
    } catch (error) {
      popupRef.current.close();
    }

    popupRef.current.close();
  };

  const cancel = () => {
    // reset fields, to what was before.
    setNameVerify(user.name_verify);
    setBirthdateVerify(user.birthdate_verify);
    setNationalityVerify(user.nationality_verify);
    setPassportExpiryVerify(user.passport_expiry_verify);

    setPassportExpiryDate(dayjs(user.passport_expiry));

    // and exit popup
    popupRef.current.close();
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
        }
      );

      if (response.status === 200) {
        setUpdatedPassport((prev) => !prev);
        popupRef.current.close();
      }
    } catch (error) {
      // popupRef.current.close();
    }
  };
  // -------------------

  // ovo se ne azurira ! svaki put ! treba u useEffect da ga stavis vrv..
  const [userTypeText, setUserTypeText] = useState();

  const [currentUserTypeLoggedIn, setCurrentUserTypeLoggedIn] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      return userJson.data.user_type;
    }
  });

  useEffect(() => {
    functionSetUserTypeText();

    updateAnotherUpdatedPassport();
  }, [user_type, updatedPassportPopup]);

  const updateAnotherUpdatedPassport = () => {
    setUpdatedPassport(updatedPassportPopup);
  };

  const functionSetUserTypeText = () => {
    if (user_type === "AH") {
      setUserTypeText("Athlete");
    } else if (user_type === "GP") {
      setUserTypeText("Global President");
    } else if (user_type === "NP") {
      setUserTypeText("National President");
    } else if (user_type === "EM") {
      setUserTypeText("Event Manager");
    } else if (user_type === "ITM") {
      setUserTypeText("IT Manager Page editor");
    } else if (user_type === "MM") {
      setUserTypeText("Marketing Manager");
    } else if (user_type === "SM") {
      setUserTypeText("Sales Manager");
    } else if (user_type === "VM") {
      setUserTypeText("Validation Manager");
    } else if (user_type === "LM") {
      setUserTypeText("Legal Manager");
    } else if (user_type === "RS") {
      setUserTypeText("Referee & Support");
    }
  };

  const handlePassportExpiryDateChange = (date) => {
    setPassportExpiryDate(date);
  };

  const [profileLastUpdatedAt, setProfileLastUpdatedAt] = useState(() => {
    let lastUpdatedAt = moment(user.updatedAt, "YYYY-MM-DD HH:mm:ss");
    return lastUpdatedAt.format("YYYY-MM-DD HH:mm:ss");
  });

  return (
    <>
      <tr
        key={index}
        className="border-t-[1px] border-b-[1px] border-[#DEE2E6]"
      >
        {/*  <Popup
          ref={popupRef}
          trigger={<td className="cursor-pointer select-none">{name}</td>}
          position="right center"
          contentStyle={{ width: "auto" }}
          modal
          nested
        >
          <PopupPassVerify
            user={user}
            setUpdatedPassportPopup={setUpdatedPassportPopup}
            popupRef={popupRef}
          />
         
        </Popup>
 */}
        <td
          className="cursor-pointer select-none "
          onClick={() => {
            setOpen(true);
          }}
        >
          {name}
        </td>

        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          scroll="paper" // Or "body" for a different scrolling behavior
          maxWidth="sm" // Adjust the width as needed
          fullWidth
        >

<Box display="flex" justifyContent="space-between" alignItems="center">
          <DialogTitle>{name} </DialogTitle>


{/* chip for validation */}
<div
              className={`${
                passportStatus === "validated"
                  ? "bg-[#44BC491A]"
                  : passportStatus === "unvalidated"
                  ? "bg-[#6166731A]"
                  : "bg-[#FD57571A]"
              }
            
             p-1
             pl-4
             pr-4
            rounded-3xl
            mr-4
            
            `}
            >
              <div className="flex gap-2">
                <img /* src="/myaccount/unvalidated.svg"  */
                  src={`${
                    passportStatus === "validated"
                      ? "/myaccount/validated.svg"
                      : passportStatus === "unvalidated"
                      ? "/myaccount/unvalidated.svg"
                      : "/myaccount/rejected.svg"
                  }`}
                />
                <p
                  className={`${
                    passportStatus === "validated"
                      ? "text-[#44BC49]"
                      : passportStatus === "unvalidated"
                      ? "text-[#616673]"
                      : "text-[#FD5757]"
                  }
                  capitalize
                  `}
                >
                  {passportStatus}
                </p>
              </div>
            </div>
          </Box>

          <DialogContent
            dividers={true}
            style={{ maxHeight: "80vh", overflow: "auto" }}
          >
            <PopupPassVerify
              user={user}
              setUpdatedPassportPopup={setUpdatedPassportPopup}
              popupRef={popupRef}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>

        <td>
          <Flag className="flag-photo-pass-verify" code={nationality} />
        </td>

        <td>{userTypeText}</td>

        <td>
          <div className="flex justify-center items-center ">
          {/* chip for validation */}
            <div
              className={`${
                passportStatus === "validated"
                  ? "bg-[#44BC491A]"
                  : passportStatus === "unvalidated"
                  ? "bg-[#6166731A]"
                  : "bg-[#FD57571A]"
              }
            
             p-1
             pl-4
             pr-4
            rounded-3xl
            
            `}
            >
              <div className="flex gap-2">
                <img /* src="/myaccount/unvalidated.svg"  */
                  src={`${
                    passportStatus === "validated"
                      ? "/myaccount/validated.svg"
                      : passportStatus === "unvalidated"
                      ? "/myaccount/unvalidated.svg"
                      : "/myaccount/rejected.svg"
                  }`}
                />
                <p
                  className={`${
                    passportStatus === "validated"
                      ? "text-[#44BC49]"
                      : passportStatus === "unvalidated"
                      ? "text-[#616673]"
                      : "text-[#FD5757]"
                  }
                  capitalize
                  `}
                >
                  {passportStatus}
                </p>
              </div>
            </div>

          </div>
        </td>

        <td>{accountCreatedAt}</td>

        {/*  <td>{passportUploadedDate}</td>

        <td>{passportLastValidatedRejected}</td> */}
      </tr>
    </>
  );
};

export { PassVerify };
