import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import {useTranslation} from "react-i18next";


import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { HeaderMyProfile } from "./HeaderMyProfile";

import Popup from "reactjs-popup";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

//we display it as fragment, inside MyProfile...
let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Settings = () => {

  const { t } = useTranslation();

  let { logoutUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const popupRef = useRef(null);
  const popupRefResign = useRef(null);
  const popupRefWithdraw = useRef(null);

  const [original_email, setOriginalEmail] = useState(null);
  const [userId, setUserId] = useState("");
  const [bio, setBio] = useState("");
  const [user_type, setUser_type] = useState("");

  const [popupWithdraw, setPopupWithdraw] = useState(false);
  const [popupResign, setPopupResign] = useState(false);
  const [popupDeleteAcc, setPopupDeleteAcc] = useState(false);

  const cancelResign = () => {
    // and exit popup
    popupRefResign.current.close();
  };

  const cancel = () => {
    // and exit popup
    popupRef.current.close();
  };

  const deleteAccount = async () => {
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/deleteUser`,
        {
          userId: userId,
        }
      );

      if (response.status === 200) {
        popupRef.current.close();
        logoutUser();
      }
    } catch (error) {
      console.log(error);
    }
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

  // toast, snackbar

  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const handleSnackbarErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarError(false);
  };

  const [snackbarText, setSnackbarText] = useState("");

  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);

  const handleSnackbarSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarSuccess(false);
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
      setUserId(userJson.data.userId);
      setUser_type(userJson.data.user_type);

      setBio(userJson.data.bio);
    }
  }, []);

  const resignFromPosition = async () => {
    // just send, to backend,
    // just add, same for any account, doesn't matter which one it is (hasn't said.. so, just to all for now..)
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/resignFromCurrentPosition`,
        {
          userId,
          user_type,
        }
      );

      if (response.status === 200) {
        setSnackbarText(t('myprofile.settings.content1'));
        setOpenSnackbarSuccess(true);

        popupRefResign.current.close();
        popupRefWithdraw.current.close();  // withdraw also uses this function, as we hadn't defined withdraw functionality in backend 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="lexend-font text-black_second font-bold text-xl md:text-2xl p-2">
      {t('myprofile.settings.content2')}
      </p>


      <div className="flex flex-col p-2">
        <div
          className="rounded-md lexend-font text-black_second select-none font-medium"
          style={{ border: "1.5px solid #C6C6C6" }}
        >
      
      
{user_type !== "SPT" && (<> 
          <div
            className="h-8 flex justify-start items-center gap-2 cursor-pointer"
            onClick={() => {
              setPopupWithdraw(true);
            }}
          >
            <img src="/editprofile/withdraw.svg" className="w-5 ml-4" />
            <p>{t('myprofile.settings.content3')}</p>
          </div>

          <hr style={{ border: "1px solid #C6C6C6" }} />

          <div
            className="h-8 flex justify-start items-center gap-2 cursor-pointer "
            onClick={() => {
              setPopupResign(true);
            }}
          >
            <img src="/editprofile/resign.svg" className="w-4 ml-4" />
            <p>{t('myprofile.settings.content4')}</p>
          </div>


          <hr style={{ border: "1px solid #C6C6C6" }} />
</>)}
          <div
            className="h-8 flex justify-start items-center gap-2 cursor-pointer"
            onClick={() => {
              setPopupDeleteAcc(true);
            }}
          >
            <img src="/editprofile/delete.svg" className="w-4 ml-4" />
            <p className="text-[#FD5757]">{t('myprofile.settings.content5')}</p>
          </div>
        </div>

       

       
      </div>



      {/* popup for resign */}
      <Popup
        ref={popupRefResign}
        open={popupResign}
        onClose={() => {
          setPopupResign(false);
        }}
        position="right center"
        contentStyle={{ width: "auto" }}
      >
        <div className="m-4">
          <div className="flex gap-2 mb-2 justify-center lexend-font flex-col ">
            <p className="font-bold text-xl md:text-2xl">
            {t('myprofile.settings.content6')}
            </p>
            <p>{t('myprofile.settings.content7')}</p>
          </div>

          <div className="flex justify-center items-center gap-2 m-4">
      
            <Button
              onClick={resignFromPosition}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "40px",
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
            >
              <span className="lexend-font font-semibold">{t('myprofile.settings.yes')}</span>
            </Button>

            <Button
              onClick={cancelResign}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "40px",
                bgcolor: "#D24949",

                color: "#fff",
                borderRadius: 2,
                border: `1px solid #D24949`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
            >
              <span className="lexend-font font-semibold">{t('myprofile.settings.no')}</span>
            </Button>
          </div>
        </div>
      </Popup>

      {/* popup for withdraw */}
      <Popup
        ref={popupRefWithdraw}
        open={popupWithdraw}
        onClose={() => {
          setPopupWithdraw(false);
        }}
        position="right center"
        contentStyle={{ width: "auto" }}
      >
        <div className="m-4">
          <div className="flex gap-2 mb-2 justify-center lexend-font flex-col ">
            <p className="font-bold text-xl md:text-2xl">
            {t('myprofile.settings.content8')}
            </p>
            <p>{t('myprofile.settings.content9')}</p>
          </div>

          <div className="flex justify-center items-center gap-2 m-4">
            <Button
              onClick={resignFromPosition}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "40px",
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
            >
              <span className="lexend-font font-semibold">{t('myprofile.settings.yes')}</span>
            </Button>

            <Button
              onClick={() => {
                popupRefWithdraw.current.close();
              }}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "40px",
                bgcolor: "#D24949",

                color: "#fff",
                borderRadius: 2,
                border: `1px solid #D24949`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
            >
              <span className="lexend-font font-semibold">{t('myprofile.settings.no')}</span>
            </Button>
          </div>
        </div>
      </Popup>
     

      {/* popup for delete account */}
      <Popup
        ref={popupRef}
        open={popupDeleteAcc}
        onClose={() => {
          setPopupDeleteAcc(false);
        }}
        position="right center"
        contentStyle={{ width: "auto" }}
      >
        <div className="m-4">
          <div className="flex gap-2 mb-2 justify-center lexend-font flex-col ">
            <p className="font-bold text-xl md:text-2xl">
            {t('myprofile.settings.content10')}
            </p>
            <p>
            {t('myprofile.settings.content11')}
            </p>
          </div>

          <div className="flex justify-center items-center gap-2 m-4">
            <Button
              onClick={deleteAccount}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "40px",
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
            >
              <span className="lexend-font font-semibold">{t('myprofile.settings.yes')}</span>
            </Button>

            <Button
              onClick={cancel}
              className="w-full"
              style={{ textTransform: "none" }}
              sx={{
                height: "40px",
                bgcolor: "#D24949",

                color: "#fff",
                borderRadius: 2,
                border: `1px solid #D24949`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
            >
              <span className="popins-font">{t('myprofile.settings.no')}</span>
            </Button>
          </div>
        </div>
      </Popup>

      {/* error snackbar */}
      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleSnackbarErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>

      {/* success snackbar */}
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarSuccessClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </>
  );
};

export { Settings };
