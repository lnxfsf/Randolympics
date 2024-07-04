import "../../../styles/passverify.scoped.scss";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import moment from "moment";
import Flag from "react-world-flags";
import countryList from "react-select-country-list";

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
  const name = user.name;
  const nationality = user.nationality;
  const user_type = user.user_type;
  var accountCreatedAt = user.createdAt;
  var passportStatus = user.passportStatus;
  var passportUploadedDate = user.passportUploadedDate;
  var passportLastValidatedRejected = user.passportLastValidatedRejected;

  if (accountCreatedAt) {
    accountCreatedAt = moment(accountCreatedAt, "YYYY-MM-DD  HH:mm:ss");
    accountCreatedAt = accountCreatedAt.format("YYYY-MM-DD  HH:mm:ss");
  }

  if (passportUploadedDate) {
    passportUploadedDate = moment(passportUploadedDate, "YYYY-MM-DD  HH:mm:ss");
    passportUploadedDate = passportUploadedDate.format("YYYY-MM-DD  HH:mm:ss");
  }

  if (passportLastValidatedRejected) {
    passportLastValidatedRejected = moment(
      passportLastValidatedRejected,
      "YYYY-MM-DD  HH:mm:ss"
    );
    passportLastValidatedRejected = passportLastValidatedRejected.format(
      "YYYY-MM-DD  HH:mm:ss"
    );
  }

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



  

  const reject = async () => {

    


    setNameVerify(false)
    setBirthdateVerify(false)
    setNationalityVerify(false)
    setPassportExpiryVerify(false)
    
    setPassportExpiryDate(null)

    passportLastValidatedRejected = new Date();


    try {
        var response = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/auth/update_user_data`,
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
  }



  const cancel = () => {
    // reset fields, to what was before.
    setNameVerify(user.name_verify)
    setBirthdateVerify(user.birthdate_verify)
    setNationalityVerify(user.nationality_verify)
    setPassportExpiryVerify(user.passport_expiry_verify)
    
    setPassportExpiryDate(dayjs(user.passport_expiry))


    // and exit popup
    popupRef.current.close();
  };

  const saveChanges = async () => {




    passportLastValidatedRejected = new Date();  // as last time, when we edited passport data (validated/rejected..)
    

      try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/auth/update_user_data`,
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
      
      popupRef.current.close();


      
    } 
  };

  const [userTypeText, setUserTypeText] = useState(() => {
    if (user_type == "AH") {
      return "Athlete";
    } else if (user_type == "GP") {
      return "Global President";
    } else if (user_type == "NP") {
      return "National President";
    } else if (user_type == "EM") {
      return "Event Manager";
    } else if (user_type == "ITM") {
      return "IT Manager Page editor";
    } else if (user_type == "MM") {
      return "Marketing Manager";
    } else if (user_type == "SM") {
      return "Sales Manager";
    } else if (user_type == "VM") {
      return "Validation Manager";
    } else if (user_type == "LM") {
      return "Legal Manager";
    } else if (user_type == "RS") {
      return "Referee & Support";
    }
  });

  const handlePassportExpiryDateChange = (date) => {
    setPassportExpiryDate(date);
  };

  const [profileLastUpdatedAt, setProfileLastUpdatedAt] = useState(() => {
    let lastUpdatedAt = moment(user.updatedAt, "YYYY-MM-DD HH:mm:ss");
    return lastUpdatedAt.format("YYYY-MM-DD HH:mm:ss");
  });

  return (
    <>
      <tr key={index}>
        <Popup
          ref={popupRef}
          trigger={
            <td className="cursor-pointer select-none underline">{name}</td>
          }
          position="right center"
          contentStyle={{ width: "auto" }}
          modal
          nested
        >
          <div className="m-4">
            <div className="flex justify-between items-center gap-16 mt-2">
              <img
                src={
                  BACKEND_SERVER_BASE_URL +
                  "/imageUpload/profile_pics/" +
                  user.picture
                }
                className="ProfileImagePassVerify"
              />

              <Popup
                ref={popupPassportRef}
                trigger={
                  <img
                    src={
                      BACKEND_SERVER_BASE_URL +
                      "/imageUpload/passport_pics/" +
                      user.passport_photo
                    }
                    alt="Profile"
                    className="w-32 h-20 object-fit cursor-pointer"
                  />
                }
                position="right center"
                contentStyle={{ width: "auto" }}
                modal
                nested
              >
                <TransformWrapper>
                  <TransformComponent>
                    <img src={
                    BACKEND_SERVER_BASE_URL +
                    "/imageUpload/passport_pics/" +
                    user.passport_photo
                  } alt="Profile" className="w-[500px] h-96 object-fit " />
                  </TransformComponent>
                </TransformWrapper>
              </Popup>
            </div>

            <div className="flex justify-between items-center gap-16 mt-2">
              <p>Name: {user.name}</p>
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
              <p>Email: {user.email}</p>
            </div>

            <div className="mt-2 mb-2">
              <p>Phone: {user.phone}</p>
            </div>

            <div className="mt-2 mb-2">
              <p>Cryptoaddress: {user.crypto}</p>
            </div>

            <div className="flex justify-between items-center gap-16">
              <p>Country: {countryList().getLabel(user.nationality)} </p>
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
              <p>Birthdate</p>
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
              <p>Profile last edited: {profileLastUpdatedAt}</p>
            </div>

            {user_type === "AH" && (
              <>
                <div className="mt-2 mb-4">
                  <p>Weight: {user.weight}</p>
                </div>
              </>
            )}

            <div className="flex justify-between items-center gap-16">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="w-32"
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
                    onChange={() => {
                      setPassportExpiryVerify(!passportExpiryVerify);
                    }}
                  />
                }
                label={<span>Verify passport expiry date</span>}
                labelPlacement="start"
              />
            </div>

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
          </div>
        </Popup>

        {/* // ! e evo, prikazi sada country flag, taman, nesto da radis ono.. */}
        <td>
          <Flag className="flag-photo-pass-verify" code={nationality} />
        </td>

        {/* i ovo, u imenima ! (samo gore rasporedis.. koje ime ide..) */}
        <td>{userTypeText}</td>

        <td>{passportStatus}</td>

        <td>{accountCreatedAt}</td>

        <td>{passportUploadedDate}</td>

        <td>{passportLastValidatedRejected}</td>
      </tr>
    </>
  );
};

export { PassVerify };
