import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import "../styles/sponsors.scoped.scss";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";

import { useRef } from "react";
import { ContactUsForm } from "./Contact/ContactUsForm";

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

const Sponsors = () => {
  const { t } = useTranslation();

  const sponsorsRef = useRef(null);
  const contactRef = useRef(null);


  return (
    <>
      <Navbar />

      <div
        className="sponsorsHeroSection flex justify-start text-black_second md:justify-center items-center flex-col lexend-font"
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

      <div ref={sponsorsRef} className="m-8">
        <p className="text-2xl md:text-3xl font-semibold text-black_second">
          {t("sponsors.content1")}
          <br />
          {t("sponsors.content2")}
        </p>

        <p className="text-red_second font-semibold mt-2">
          {t("sponsors.content3")}
        </p>

        <p className=" font-semibold mt-2 text-black_second">
          {t("sponsors.content4")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3 mt-8 text-black_second">
          <div>
            <div className="flex flex-col ">
              <div className="flex justify-start items-center">
                <img src="/sponsors/acaimania.png" className="w-20 md:w-32" />

                <div className="flex flex-col ml-4">
                  <p className=" font-semibold mt-2">
                    {t("sponsors.firstBussiness1")}
                  </p>

                  <p className=" font-semibold mt-2">
                    {t("sponsors.firstBussiness2")}
                  </p>

                  <p className=" font-semibold mt-2">
                    {" "}
                    Instagram:{" "}
                    <a
                      href="https://instagram.com/acaimaniashop"
                      className="underline text-blue_first"
                      target="_blank"
                    >
                      {t("sponsors.firstBussiness3")}
                    </a>
                  </p>
                </div>
              </div>

              <p className=" font-semibold mt-2 mb-6">
                {t("sponsors.firstBussiness4")}
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col ">
              <div className="flex justify-start items-center">
                <img src="/sponsors/izinga.png" className="w-20 md:w-32" />

                <div className="flex flex-col ml-4">
                  <p className=" font-semibold mt-2">
                    {t("sponsors.secondBussiness1")}
                  </p>

                  <p className=" font-semibold mt-2">
                    {t("sponsors.secondBussiness2")}
                  </p>

                  <p className=" font-semibold mt-2">
                    <a
                      href="https://izinga.co"
                      className="underline text-blue_first"
                      target="_blank"
                    >
                      {t("sponsors.secondBussiness3")}
                    </a>
                  </p>
                </div>
              </div>

              <p className="mb-6 font-semibold m-2">
                {t("sponsors.secondBussiness4")}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center flex-col items-center">
          <img
            src="/sponsors/FeatureYourBusiness.png"
            className="lg:w-[70%] 2xl:w-[50%]"
          />

          <p className="text-center font-semibold text-black_second">
            {t("sponsors.contact1")}
            <br />
            <a  onClick={() => {contactRef.current.scrollIntoView({ behavior: "smooth" });}} className="text-red_second cursor-pointer underline decoration-red_second" >
              {t("sponsors.contact2")}
            </a>
            {t("sponsors.contact3")}
          </p>
        </div>
      </div>

      <div className="m-8 mt-16">
        <p className="text-2xl md:text-3xl font-semibold text-black_second">
          {t("sponsors.content6")}
        </p>

        <p className="text-red_second font-semibold mt-2">
          {t("sponsors.content7")}
        </p>

        <p className=" font-semibold mt-2 text-black_second">
          {t("sponsors.content8")}
        </p>
      </div>

      <div ref={contactRef} />
      <ContactUsForm />

      <Footer />
    </>
  );
};

export { Sponsors };
