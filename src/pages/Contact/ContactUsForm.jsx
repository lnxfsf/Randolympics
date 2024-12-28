import { FooterClean } from "../../components/FooterClean";
import { Navbar } from "../../components/Navbar";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

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

const validateEmail = (email) => {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailPattern.test(email);
};

const ContactUsForm = () => {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailErrorHelper, setIsEmailErrorHelper] = useState("");
  const isEmailErrorFocus = useRef(null);

  const nameRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);

  useEffect(() => {
    if (isEmailError && isEmailErrorFocus.current) {
      isEmailErrorFocus.current.focus();
    }
  }, [isEmailError]);

  const onSubmit = async () => {
    if (isEmailError || email === "") {
      setSnackbarStatus("error");
      setSnackbarMessage("Insert email");
      setOpenSnackbar(true);

      isEmailErrorFocus.current.focus();
      return;
    }

    if (name === "") {
      setSnackbarStatus("error");
      setSnackbarMessage("Insert name");
      setOpenSnackbar(true);

      nameRef.current.focus();
      return;
    }

    if (subject === "") {
      setSnackbarStatus("error");
      setSnackbarMessage("Insert subject");
      setOpenSnackbar(true);

      subjectRef.current.focus();
      return;
    }

    if (message === "") {
      setSnackbarStatus("error");
      setSnackbarMessage("Insert message");
      setOpenSnackbar(true);

      messageRef.current.focus();
      return;
    }

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/listsData/contactUsSendEmail`,
        {
          name,
          subject,
          message,
          email: email,
        }
      );

      if (response.status === 200) {
        setSnackbarStatus("success");
        setSnackbarMessage("Message sent");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarStatus("error");
      setSnackbarMessage("Message didn't sent");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <div className="lexend-font text-black_second flex flex-col justify-center items-center min-h-screen p-4 ">
        <p className="text-2xl md:text-4xl font-bold mt-8">
          {t("contact.title1")}
        </p>

        

        <p className="text-center mt-4">{t("contact.title2")}</p>
        <p className="w-full md:w-[45em] text-center">{t("contact.title3")}</p>
        <p>{t("contact.title4")}</p>

        <div className="w-full p-2 md:w-[50%]">
          <label className="lexend-font mb-1 mt-1 font-medium text-sm">
            {t("contact.content1")}
          </label>
          <TextField
            placeholder="John Doe"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            name="name"
            required
            type="text"
            inputProps={{
              maxLength: 255,
            }}
            sx={sxTextField}
            value={name}
            inputRef={nameRef}
          />

          <label className="lexend-font mb-1 mt-1 font-medium text-sm">
            {t("contact.content2")}
          </label>
          <TextField
            placeholder="example@gmail.com"
            value={email}
            required
            type="email"
            inputRef={isEmailErrorFocus}
            error={isEmailError}
            helperText={isEmailError ? isEmailErrorHelper : ""}
            onChange={(e) => {
              const emailValue = e.target.value;

              setEmail(e.target.value);

              if (!validateEmail(emailValue) && emailValue.length > 0) {
                setIsEmailError(true);
                setIsEmailErrorHelper(t("register.content8"));
                isEmailErrorFocus.current.focus();
              } else {
                setIsEmailError(false);
                setIsEmailErrorHelper("");
              }
            }}
            inputProps={{
              maxLength: 255,
            }}
            sx={sxTextField}
          />

          <label className="lexend-font mb-1 mt-1 font-medium text-sm">
            {t("contact.content3")}
          </label>
          <TextField
            placeholder={t("contact.content5")}
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            inputRef={subjectRef}
            required
            type="text"
            inputProps={{
              maxLength: 255,
            }}
            sx={sxTextField}
          />

          <label className="lexend-font mb-1 mt-1 font-medium text-sm">
            {t("contact.content4")}
          </label>
          <TextField
            placeholder={t("contact.content6")}
            required
            multiline
            rows={4}
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            inputRef={messageRef}
            inputProps={{
              maxLength: 255,
              style: {
                resize: "vertical",
              },
            }}
            sx={sxTextField}
          />
        </div>

        <Button
          className="w-[50%]"
          onClick={onSubmit}
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
          <span className="popins-font">{t("contact.content7")}</span>
        </Button>
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

export { ContactUsForm };
