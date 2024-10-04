

import { FooterClean } from "../../components/FooterClean";
import { Navbar } from "../../components/Navbar";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

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



const ContactUsForm = () => {

    const { t } = useTranslation();


    
    return (<>

<div className="lexend-font text-black_second flex flex-col justify-center items-center min-h-screen ">
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
            name="name"
            required
            type="text"
            inputProps={{
              maxLength: 255,
            }}
            sx={sxTextField}
          />

          <label className="lexend-font mb-1 mt-1 font-medium text-sm">
            {t("contact.content2")}
          </label>
          <TextField
            placeholder="example@gmail.com"
            id="name"
            name="name"
            required
            type="email"
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
            id="name"
            name="name"
            required
            type="email"
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
            id="name"
            name="name"
            required
            multiline
            rows={4}
            type="email"
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
          <span className="popins-font">
            {t("myprofile.myaccount.content28")}
          </span>
        </Button>
      </div>
    </>)
}

export {ContactUsForm}