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

const MyAccount = () => {
  let { logoutUser } = useContext(AuthContext);

  const [user_type, setUserType] = useState("");
  /*   const [passportStatus, setPassportStatus] = useState();
  const [birthdate, setBirthdate] = useState(); */

  const [warningMessage, setWarningMessage] = useState();
  const [isRejected, setIsRejected] = useState(false);


  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserType(userJson.data.user_type);


      /* setPassportStatus(userJson.data.setPassportStatus);
      setBirthdate(userJson.data.birthdate); */
    }


    warningBoxFunc(
      userJson.data.passportStatus,
      userJson.data.birthdate,
      userJson.data.passport_photo
    );


  }, [isRejected, warningMessage]);

  const [selectedItem, setSelectedItem] = useState("myAccount");

  // Create refs for each list item
  const myAccountRef = useRef(null);
  const settingsRef = useRef(null);
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

  const warningBoxFunc = (passportStatus, birthdate, passport_photo) => {



    if (passportStatus === "unvalidated") {
      if (birthdate == null && passport_photo == null) {
        setWarningMessage(
          "Your passport is not verified. Upload passport photo and birthdate to get verified."
        );
      } else if (birthdate == null && passport_photo !== null) {
        setWarningMessage(
          "Your passport is not verified. Insert your birthdate to get verified."
        );
      } else if (birthdate !== null && passport_photo == null) {
        setWarningMessage(
          "Your passport is not verified. Upload passport photo to get verified."
        );
      } else {
        setWarningMessage(
          "Your passport is not yet verified. Waiting for approval.."
        );
      }
    } else if (passportStatus === "rejected") {
      setWarningMessage("Your passport is rejected. Reupload passport and birthdate.");
      setIsRejected(true)

      // TODO, red warning box, ! izgleda interesantnije ovaj scenario !
    } else if (passportStatus === "validted") {
      setWarningMessage("");
      setIsRejected(false)
    }
  };
  return (
    <>
      <Navbar />

      <div className="flex pl-8 pt-8 text-[35px] ">My Account</div>

      <div className="flex p-12 pl-2  pt-12 gap-4">
        <div className="basis-1/3 side_nav p-4 ">
          <ul className="list flex flex-col">
            <li
              style={{ listStyleType: "none" }}
              ref={myAccountRef}
              className={`list-item ${selectedItem === "myAccount" ? "selected" : ""
                }`}
              onClick={() => handleClick("myAccount")}
            >
              <img src="/myaccount/user.svg" className="icon" />
              My Account
            </li>
            <li
              style={{ listStyleType: "none" }}
              ref={settingsRef}
              className={`list-item ${selectedItem === "settings" ? "selected" : ""
                }`}
              onClick={() => handleClick("settings")}
            >
              <img src="/myaccount/settings.svg" className="icon" />
              Settings
            </li>
            <li
              style={{ listStyleType: "none" }}
              ref={teamRef}
              className={`list-item ${selectedItem === "team" ? "selected" : ""
                }`}
              onClick={() => handleClick("team")}
            >
              <img src="/myaccount/team.svg" className="icon" />
              Team
            </li>

            {user_type !== "VM" && (
              <li
                style={{ listStyleType: "none" }}
                ref={electionsRef}
                className={`list-item ${selectedItem === "elections" ? "selected" : ""
                  }`}
                onClick={() => handleClick("elections")}
              >
                <img src="/myaccount/team.svg" className="icon" />
                Elections
              </li>
            )}




            {(user_type === "EM" || user_type === "ITM") && (
              <li
                style={{ listStyleType: "none" }}
                ref={newsBlogRef}
                className={`list-item ${selectedItem === "news" ? "selected" : ""
                }`}
                onClick={() => handleClick("news")}
              >
                <img src="/myaccount/news.svg" className="icon" />
                News
              </li>
            )}

            {/* // TODO when you do this, you also need to set up, for each voting system, that they can't vote unless they have verified passport !
             */}
            {/* GP, can only view, but can't approve, or edit passports */}
            {/* //? passport validation (GP and VM) */}
            {(user_type === "VM" || user_type === "GP") && (
              <li
                style={{ listStyleType: "none" }}
                ref={passportVerificationRef}
                className={`list-item ${selectedItem === "passportVerification" ? "selected" : ""
                  }`}
                onClick={() => handleClick("passportVerification")}
              >
                <img src="/myaccount/passport.svg" className="icon" />
                Passport Verification
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
                  className={`list-item ${selectedItem === "loginTrafficHistory" ? "selected" : ""
                    }`}
                  onClick={() => handleClick("loginTrafficHistory")}
                >
                  <img src="/myaccount/login_history.svg" className="icon" />
                  Login & Traffic History
                </li>
              )}

            <li
              style={{ listStyleType: "none" }}
              ref={logoutRef}
              className={`list-item ${selectedItem === "logout" ? "selected" : ""
                }`}
              onClick={() => handleClick("logout")}
            >
              <img src="/myaccount/exit.svg" className="icon" />
              Logout
            </li>
          </ul>

          {warningMessage && (
            <>
              <div className={`flex flex-col p-2 mt-4 pl-2 ${isRejected === true ? 'error_box_rejected' : 'error_box'} `}  >



                <div className="flex">
                  {/*  <img src="/myaccount/triangle-exclamation.svg" /> */}
                  <WarningAmberIcon />
                  <p className="pl-2">Warning !</p>
                </div>

                <div className="pl-8 pt-2">{warningMessage}</div>

                <div className="pl-8 pt-4"> <p>You can't vote until your passport is verified.</p></div>
              </div>
            </>
          )}
        </div>

        <div className="w-full">
          {selectedItem === "myAccount" && <EditProfile />}
          {selectedItem === "settings" && <Settings />}
          {selectedItem === "team" && <Team />}

          {selectedItem === "elections" && <Elections />}

          {selectedItem === "news" && <NewsAdmin />}

          {selectedItem === "passportVerification" && <PassportVrfy />}
          {selectedItem === "loginTrafficHistory" && <LgnTraffcHistory />}
        </div>
      </div>

      <div className="h-96"></div>

      <Footer />
    </>
  );
};

export { MyAccount };
