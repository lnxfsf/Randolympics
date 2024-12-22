import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FooterClean } from "../components/FooterClean";

import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

    const cookiePolicyClick = () => {
      const element = document.getElementById("cookiePolicy");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

    }



useEffect(() => {

  const button = document.getElementById("cookiePolicyButton");
    if (button) {
      button.addEventListener("click", cookiePolicyClick);
    }



  
    const hash = window.location.hash;
    if (hash === "#cookiePolicy") {
      const element = document.getElementById("cookiePolicy");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }


    

    return () => {
      if (button) {
        button.removeEventListener("click", cookiePolicyClick);
      }
    };


}, []);


 

  return (
    <>
      <Navbar />

      <div className="min-h-screen m-4 md:m-8 lexend-font text-black_second">
        <div>
          <p className="text-4xl">{t("privacyPolicy.privacyPolicyTitle")}</p>
          <br/>

       
          <p
            className=""
            dangerouslySetInnerHTML={{
              __html: t(`privacyPolicy.privacyPolicyText`),
            }}
          />
         
      
        </div>

        <div className="mt-8">


      
      



          <p className="text-4xl " id="cookiePolicy" onClick={cookiePolicyClick}>
            {t("privacyPolicy.cookiePolicyTitle")}
          </p>
          <br/>
         
          <p
            className=""
            dangerouslySetInnerHTML={{
              __html: t(`privacyPolicy.cookiePolicyText`),
            }}
          />
         




      


<br/>
<br/>
    





        </div>
      </div>

      <FooterClean />
    </>
  );
};

export { PrivacyPolicy };
