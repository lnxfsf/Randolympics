import { FooterClean } from "../components/FooterClean";
import { Navbar } from "../components/Navbar";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { ContactUsForm } from "./Contact/ContactUsForm";

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

const ContactUs = () => {
  const { t } = useTranslation();

  /* {t("home.sixthScreen.title2")} */
  return (
    <>
      <Navbar />

     
     <ContactUsForm />



      <FooterClean />
    </>
  );
};

export { ContactUs };
