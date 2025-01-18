import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const WarningPassportMessage = () => {
  const { t } = useTranslation();

  const [warningMessage, setWarningMessage] = useState();
  const [isRejected, setIsRejected] = useState(false);

  const [passportStatus, setPassportStatus] = useState();

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      setPassportStatus(userJson.data.passportStatus);

      warningBoxFunc(
        userJson.data.passportStatus,
        userJson.data.birthdate,
        userJson.data.passport_photo
      );
    }
  }, [isRejected, warningMessage]);

  const warningBoxFunc = (passportStatus, birthdate, passport_photo) => {
    if (passportStatus === "unvalidated") {
      if (birthdate == null && passport_photo == null) {
        setWarningMessage(t("myprofile.side_nav.passport1"));
      } else if (birthdate == null && passport_photo !== null) {
        setWarningMessage(t("myprofile.side_nav.passport2"));
      } else if (birthdate !== null && passport_photo == null) {
        setWarningMessage(t("myprofile.side_nav.passport3"));
      } else {
        setWarningMessage(t("myprofile.side_nav.passport4"));
      }
    } else if (passportStatus === "rejected") {
      setWarningMessage(t("myprofile.side_nav.passport5"));
      setIsRejected(true);
    } else if (passportStatus === "validated") {
      setWarningMessage("");
      setIsRejected(false);
    }
  };

  return (
    <>
      {warningMessage && (
        <>
          <div
            className={`flex flex-col p-2 mt-4 m-4 pl-2 ${
              isRejected === true ? "error_box_rejected" : "error_box"
            } lexend-font  `}
          >
            <div className="flex">
              {/*  <img src="/myaccount/triangle-exclamation.svg" /> */}
              <WarningAmberIcon />
              <p className="pl-2 font-bold text-lg md:text-xl">
                {t("myprofile.side_nav.passport6")}
              </p>
            </div>

            <div className="pl-8 pt-2 break-word">{warningMessage}</div>

            <div className="pl-8 pt-4">
              {" "}
              <p>{t("myprofile.side_nav.passport7")}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { WarningPassportMessage };
