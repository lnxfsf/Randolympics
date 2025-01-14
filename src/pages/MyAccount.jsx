import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/myaccount.scoped.scss";
import React, { useState, useEffect, useRef } from "react";

import { EditProfile } from "../components/MyAccount/EditProfile";
import { Settings } from "../components/MyAccount/Settings";
import { Team } from "../components/MyAccount/Team";
import { Elections } from "../components/MyAccount/Elections";

import { LgnTraffcHistory } from "../components/MyAccount/LgnTraffcHistory";
import { PassportVrfy } from "../components/MyAccount/PassportVrfy";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { NewsAdmin } from "../components/NewsAdmin/NewsAdmin";
import { useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { WarningPassportMessage } from "../components/MyAccount/WarningPassportMessage";
import { CreatedCampaigns } from "../components/MyAccount/CreatedCampaigns";

const MyAccount = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const hash = location.hash.replace("#", "");

  let { logoutUser } = useContext(AuthContext);

  const [user_type, setUserType] = useState("");
  const [passportStatus, setPassportStatus] = useState();

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserType(userJson.data.user_type);

      setPassportStatus(userJson.data.passportStatus);
    }

    // you get like "elections" extracted from URL ".. #elections"
    // and now, you choose something to be selected
    switch (hash) {
      case "myAccount":
        setSelectedItem("myAccount");
        break;

      case "elections":
        setSelectedItem("elections");
        break;
      case "team":
        setSelectedItem("team");
        break;

      case "settings":
        setSelectedItem("settings");
        break;

      case "createdCampaigns":
        setSelectedItem("createdCampaigns");
        break;

      case "news":
        setSelectedItem("news");
        break;

      case "loginTrafficHistory":
        setSelectedItem("loginTrafficHistory");
        break;

      case "passportVerification":
        setSelectedItem("passportVerification");
        break;
    }
  }, [hash]);

  const [selectedItem, setSelectedItem] = useState("myAccount");

  // Create refs for each list item
  const myAccountRef = useRef(null);
  const settingsRef = useRef(null);
  const createdCampaignsRef = useRef(null);
  const teamRef = useRef(null);
  const electionsRef = useRef(null);

  const newsBlogRef = useRef(null);

  const passportVerificationRef = useRef(null);
  const loginTrafficHisRef = useRef(null);

  const logoutRef = useRef(null);

  const handleClick = (id) => {
    setSelectedItem(id);

    if (id === "logout") {
      logoutUser();
    }
  };

  return (
    <>
      <Navbar />

      <div className="  gap-7 mt-6 flex">
        <div className="basis-1/4 hidden lg:block  ">
          <ul className="list flex flex-col lexend-font">
            <li
              style={{ listStyleType: "none" }}
              ref={myAccountRef}
              className={`list-item ${
                selectedItem === "myAccount" ? "selected" : ""
              }`}
              onClick={() => handleClick("myAccount")}
            >
              <div className="flex justify-between">
                <p className="text-red_second font-medium ">
                  {t("myprofile.side_nav.side_nav1")}
                </p>
                <img src="/myaccount/user.svg" className="icon" />
              </div>
            </li>

            <li
              style={{ listStyleType: "none" }}
              ref={settingsRef}
              className={`list-item ${
                selectedItem === "settings" ? "selected" : ""
              }`}
              onClick={() => handleClick("settings")}
            >
              <div className="flex justify-between">
                <p className="text-red_second font-medium ">
                  {t("myprofile.side_nav.side_nav2")}
                </p>
                <img src="/myaccount/settings.svg" className="icon" />
              </div>
            </li>

            <li
              style={{ listStyleType: "none" }}
              ref={createdCampaignsRef}
              className={`list-item ${
                selectedItem === "createdCampaigns" ? "selected" : ""
              }`}
              onClick={() => handleClick("createdCampaigns")}
            >
              <div className="flex justify-between">
                <p className="text-red_second font-medium ">
                  {t("myprofile.side_nav.side_nav9")}
                </p>
                <img src="/myaccount/team.svg" className="icon" />
              </div>
            </li>

            {user_type !== "SPT" && (
              <>
                <li
                  style={{ listStyleType: "none" }}
                  ref={teamRef}
                  className={`list-item ${
                    selectedItem === "team" ? "selected" : ""
                  }`}
                  onClick={() => handleClick("team")}
                >
                  <div className="flex justify-between">
                    <p className="text-red_second font-medium ">
                      {t("myprofile.side_nav.side_nav3")}
                    </p>

                    <img src="/myaccount/team.svg" className="icon" />
                  </div>
                </li>
              </>
            )}

            {(user_type === "AH" || user_type === "NP") && (
              <li
                style={{ listStyleType: "none" }}
                ref={electionsRef}
                className={`list-item ${
                  selectedItem === "elections" ? "selected" : ""
                }`}
                onClick={() => handleClick("elections")}
              >
                <div className="flex justify-between">
                  <p className="text-red_second font-medium ">
                    {t("myprofile.side_nav.side_nav4")}
                  </p>
                  <img src="/myaccount/ballot.svg" className="icon" />
                </div>
              </li>
            )}

            {(user_type === "EM" ||
              user_type === "ITM" ||
              user_type === "GP" ||
              user_type === "ITM" ||
              user_type === "SM" ||
              user_type === "MM") &&
              passportStatus === "validated" && (
                <li
                  style={{ listStyleType: "none" }}
                  ref={newsBlogRef}
                  className={`list-item ${
                    selectedItem === "news" ? "selected" : ""
                  }`}
                  onClick={() => handleClick("news")}
                >
                  <div className="flex justify-between">
                    <p className="text-red_second font-medium ">
                      {t("myprofile.side_nav.side_nav5")}
                    </p>

                    <img src="/myaccount/news.svg" className="icon" />
                  </div>
                </li>
              )}
            {/* GP, can only view, but can't approve, or edit passports */}
            {/* //? passport validation (GP and VM) */}
            {(user_type === "VM" || user_type === "GP") && (
              <li
                style={{ listStyleType: "none" }}
                ref={passportVerificationRef}
                className={`list-item ${
                  selectedItem === "passportVerification" ? "selected" : ""
                }`}
                onClick={() => handleClick("passportVerification")}
              >
                <div className="flex justify-between">
                  <p className="text-red_second font-medium ">
                    {t("myprofile.side_nav.side_nav6")}
                  </p>

                  <img src="/myaccount/passport.svg" className="icon" />
                </div>
              </li>
            )}

            {/*  Show Login & Traffic History (for all managers , can see it ! ) */}
            {(user_type === "VM" ||
              user_type === "EM" ||
              user_type === "ITM" ||
              user_type === "MM" ||
              user_type === "SM" ||
              user_type === "LM" ||
              user_type === "GP") && (
              <li
                style={{ listStyleType: "none" }}
                ref={loginTrafficHisRef}
                className={`list-item ${
                  selectedItem === "loginTrafficHistory" ? "selected" : ""
                }`}
                onClick={() => handleClick("loginTrafficHistory")}
              >
                <div className="flex justify-between">
                  <p className="text-red_second font-medium ">
                    {t("myprofile.side_nav.side_nav7")}
                  </p>

                  <img src="/myaccount/login_history.svg" className="icon" />
                </div>
              </li>
            )}

            <li
              style={{ listStyleType: "none" }}
              ref={logoutRef}
              className={`list-item ${
                selectedItem === "logout" ? "selected" : ""
              }`}
              onClick={() => handleClick("logout")}
            >
              <div className="flex justify-between">
                <p className="text-red_second font-medium ">
                  {t("myprofile.side_nav.side_nav8")}
                </p>

                <img src="/myaccount/exit.svg" className="icon" />
              </div>
            </li>
          </ul>

          <WarningPassportMessage />
        </div>

        <div className="w-full">
          {selectedItem === "myAccount" && <EditProfile />}
          {selectedItem === "settings" && <Settings />}

          {selectedItem === "createdCampaigns" && <CreatedCampaigns />}
          {selectedItem === "team" && <Team />}

          {selectedItem === "elections" && <Elections />}

          {selectedItem === "news" && <NewsAdmin />}

          {selectedItem === "passportVerification" && <PassportVrfy />}
          {selectedItem === "loginTrafficHistory" && <LgnTraffcHistory />}
        </div>
      </div>

      

      <Footer />
    </>
  );
};

export { MyAccount };
