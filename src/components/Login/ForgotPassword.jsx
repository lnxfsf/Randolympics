import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { NavbarClean } from "../NavbarClean";
import { Footer } from "../Footer";
import { useTranslation } from "react-i18next";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;
import axios from "axios";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();

  const [resultText, setResultText] = useState(t("register.content13"));

  // za toast
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const handleSnackbarErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarError(false);
  };

  const [snackbarText, setSnackbarText] = useState("");

  // ---------

  // ? sent ?
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShow(!show);

    if (show) {
      navigate("/login");
    } else {
      var email = e.target.email.value;

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(email)) {
        setSnackbarText(t("login.content14"));
        openSnackbarError(true);
      }

      try {
        var response = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/auth/forgot_password`,
          { email },
          {
            headers: {
              'Accept-Language': i18n.language || 'en',
            }
          }
        );
      } catch (error) {
        //console.log(error);
        setResultText(error.response.data.message);
      }
    }
  };

  return (
    <>
      <NavbarClean />

      <div className="flex flex-wrap flex-col m-12 items-center text-black_second lexend-font">
        <form
          action="#"
          className="sign-in-form flex flex-col wrap justify-start items-center max-md:w-full"
          onSubmit={handleSubmit}
        >
          {!show && (
            <>
              <label for="email" className="lexend-font self-start">
                {t("login.content2")}
              </label>
              <TextField
                /* label="Email" */
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                required
                type="email"
                inputProps={{
                  maxLength: 80,
                }}
                sx={{
                  mt: 0.5,
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "'Lexend', sans-serif",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red",
                    },

                  "& .MuiInputLabel-root": {
                    fontFamily: "'Lexend', sans-serif",
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />

              <Button
                className="w-full  md:w-[420px] "
                style={{ marginTop: "20px", textTransform: "none" }}
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
                <span className="lexend-font font-semibold">
                  {t("login.content15")}
                </span>
              </Button>
            </>
          )}

          {show && (
            <>
              <p className="lexend-font ">{resultText}</p>

              <Button
                className="w-full  md:w-[420px]"
                style={{ marginTop: "20px", textTransform: "none" }}
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
                <span className="lexend-font font-semibold">
                  {t("login.content16")}
                </span>
              </Button>
            </>
          )}
        </form>
      </div>

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

      <Footer />
    </>
  );
};

export { ForgotPassword };
