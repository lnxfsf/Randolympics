import Flag from "react-world-flags";
import { useState, useEffect, useRef } from "react";
import {useTranslation} from "react-i18next";

const LoginAndTraffic = ({ row, index }) => {

  const { t, i18n } = useTranslation();




  const nationality = row.nationality;
  const user_type = row.user_type;
  const numberOfLogins = row.numberOfLogins;

  const [userTypeText, setUserTypeText] = useState();




  useEffect(() => {
    functionSetUserTypeText();
  }, [i18n.language]);

  const functionSetUserTypeText = () => {
    if (user_type === "AH") {
      setUserTypeText(t("userTypes.user_type1"));
    } else if (user_type === "GP") {
      setUserTypeText(t("userTypes.user_type2"));
    } else if (user_type === "NP") {
      setUserTypeText(t("userTypes.user_type3"));
    } else if (user_type === "EM") {
      setUserTypeText(t("userTypes.user_type4"));
    } else if (user_type === "ITM") {
      setUserTypeText(t("userTypes.user_type6"));
    } else if (user_type === "MM") {
      setUserTypeText(t("userTypes.user_type7"));
    } else if (user_type === "SM") {
      setUserTypeText(t("userTypes.user_type8"));
    } else if (user_type === "VM") {
      setUserTypeText(t("userTypes.user_type9"));
    } else if (user_type === "LM") {
      setUserTypeText(t("userTypes.user_type10"));
    } else if (user_type === "RS") {
      setUserTypeText(t("userTypes.user_type11"));
    }
  };

  return (
    <>
      <tr key={index}>

        <td>{userTypeText}</td>

        <td className="">
          <Flag className="flag-photo-pass-verify  " code={nationality} />
        </td>

        <td>{numberOfLogins}</td>
      </tr>
    </>
  );
};

export { LoginAndTraffic };
