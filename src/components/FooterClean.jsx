import { useNavigate } from "react-router-dom";

import { useTranslation, Trans } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

import { lngs } from "../../languages";
import { useState } from "react";


import { useCookies } from 'react-cookie';




const FooterClean = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  
  const [cookies, setCookie] = useCookies(['cookieConsentOpen']);

  const openCookieWindow = () => {
    setCookie("cookieConsentOpen", true, {path: "/"});

  }

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(`${event.target.value}`);
  };

  return (
    <>
      <div className="flex flex-col m-12">
        <hr className="w-full" />

        <div className="flex justify-between pt-12 flex-col lg:flex-row  ">
          <div>
            <p className="lexend-font font-bold">
              © 2024 Randolympics. {t("footer.copyright")}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-4 text-[#d24949] lexend-font font-bold flex-col lg:flex-row mt-4 lg:mt-0">
              <p className="cursor-pointer select-none " onClick={()=> {
                window.scrollTo(0, 0);;
                navigate("/privacyPolicy#cookiePolicy");
              }}>
                {t("footer.privacy")}
              </p>
              <p
                className="cursor-pointer select-none"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/tos");
                }}
              >
                {t("footer.tos")}
              </p>

              {/* as for now, we don't yet use non-essential cookies. https://law.stackexchange.com/questions/81602/why-does-the-gdpr-matter-to-me-a-us-citizen-with-no-property-in-europe/81624#81624 
            https://law.stackexchange.com/questions/94052/if-website-uses-cookies-only-after-users-login-can-i-ask-for-cookie-consent-dur
            */}
              <p className="cursor-pointer select-none " onClick={openCookieWindow} >{t("footer.cookie")}</p>
            </div>
          </div>
        </div>


        <div className="flex justify-between items-start mt-4  flex-col md:flex-row ">
          <div className="flex flex-col md:flex-row">
  <div className="lexend-font text-red_second font-bold flex flex-col space-y-3 md:space-y-2">
    <a href="/campaign">{t("navbar.btn2")}</a>
    <a href="/competitions">{t("navbar.btn6")}</a>
    <a href="/news">{t("navbar.btn3")}</a>
    <a href="/faq">{t("navbar.btn4")}</a>
  </div>
  
  <div className="lexend-font text-red_second font-bold flex flex-col space-y-3 md:space-y-2 md:ml-8 mt-3 md:mt-0">
    <a href="/supporters">{t("navbar.profile9")}</a>
    <a href="/randomize">{t("home.firstScreen.subtitle2")}</a>
    <a href="/login">{t("navbar.profile8")}</a>
    <a href="/register">{t("login.content9")}</a>
  </div>
  </div>
  
  <div className="mt-4 justify-self-end		">
    <Select
      labelId="language-switcher"
      value={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
      className="sm:w-[100px] h-10 "
      style={{ color: "#000", borderRadius: "10px" }}
    >
      {Object.keys(lngs).map((lng) => (
        <MenuItem key={lng} value={lng} >
          {lngs[lng].translations[i18n.resolvedLanguage]}
        </MenuItem>
      ))}
    </Select>
  </div>
</div>

      </div>
    </>
  );
};

export { FooterClean };
