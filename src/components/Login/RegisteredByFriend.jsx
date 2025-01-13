import { NavbarHomeCollapsed } from "../NavbarHomeCollapsed";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";


const RegisteredByFriend = () => {
  const location = useLocation();
  const { email } = location.state || {};

  const { t } = useTranslation();



  return (
    <>
      <NavbarHomeCollapsed />

     
      <div className="flex justify-center items-center mt-32">
       
       {email ? (
        <p>{t("myprofile.myaccount.content35")}<b>{email}</b>!</p>
       ) : (
        <p>{t("myprofile.myaccount.content36")}</p>
       )}
        

      </div>


    </>
  );
};

export { RegisteredByFriend };
