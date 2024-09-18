

import { useNavigate } from "react-router-dom";

import { useTranslation, Trans } from 'react-i18next';
import { MenuItem, Select } from "@mui/material";

import { lngs } from '../../languages'; 


const FooterClean = () => {

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();


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
              © 2024 Randolympics. All rights reserved.
            </p>
          </div>



<div className="flex flex-col">
        

          <div className="flex gap-4 text-[#d24949] lexend-font font-bold flex-col lg:flex-row mt-4 lg:mt-0">
            <p className="cursor-pointer select-none ">Privacy policy</p>
            <p className="cursor-pointer select-none" onClick={() => {navigate("/tos")}}>Terms of service</p>

            {/* as for now, we don't yet use non-essential cookies. https://law.stackexchange.com/questions/81602/why-does-the-gdpr-matter-to-me-a-us-citizen-with-no-property-in-europe/81624#81624 
            https://law.stackexchange.com/questions/94052/if-website-uses-cookies-only-after-users-login-can-i-ask-for-cookie-consent-dur
            */}
            <p className="cursor-pointer select-none">Cookies settings</p>
            
          </div>

          <div className="lg:self-end mt-4 ">
         <Select
      labelId="language-switcher"
      value={i18n.resolvedLanguage}
      onChange={handleLanguageChange}
      className=" sm:w-[100px] h-10"
      style={{ color: "#000" }}
    >
      {Object.keys(lngs).map((lng) => (
        <MenuItem key={lng} value={lng}>
          {lngs[lng].nativeName}
        </MenuItem>
      ))}
    </Select>

         </div>

          </div>
          
        </div>




      </div>
    </>
  );
};

export { FooterClean };
