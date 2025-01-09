import { FooterClean } from "../components/FooterClean";
import { Navbar } from "../components/Navbar";
import "../styles/sponsors.scoped.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { useRef } from "react";

const Sponsors = () => {
  const { t } = useTranslation();

  const sponsorsRef = useRef(null);

  return (
    <>
      <Navbar />

      <div
        className="sponsorsHeroSection flex justify-start md:justify-center items-center flex-col lexend-font"
        style={{ color: "white" }}
      >
        <p
          className="text-2xl md:text-4xl lg:text-5xl 2xl:text-7xl p-2 font-semibold  text-center"
          style={{ color: "white" }}
        >
          {t("sponsors.hero1")}
          <br />
          {t("sponsors.hero2")}
        </p>

        <p className="font-semibold mt-4" style={{ color: "white" }}>
          {t("sponsors.hero3")}
        </p>

        <Button
          onClick={() => {
            sponsorsRef.current.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-36 "
          style={{ textTransform: "none" }}
          sx={{
            mt: 3,
            height: "45px",
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
          <span
            className="lexend-font text-white"
            style={{ textTransform: "none" }}
          >
            {t("sponsors.hero4")}
          </span>
        </Button>
      </div>

      <div ref={sponsorsRef}>ddddd ddddd</div>

      <FooterClean />
    </>
  );
};

export { Sponsors };
