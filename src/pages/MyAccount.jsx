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

const MyAccount = () => {
  let { logoutUser } = useContext(AuthContext);

  const [user_type, setUserType] = useState("");

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserType(userJson.data.user_type);
    }
  }, []);

  const [selectedItem, setSelectedItem] = useState("myAccount");

  // Create refs for each list item
  const myAccountRef = useRef(null);
  const settingsRef = useRef(null);
  const teamRef = useRef(null);
  const electionsRef = useRef(null);

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

      <div className="flex pl-8 pt-8 text-[35px] ">My Account</div>

      <div className="flex p-12 pl-2  pt-12 gap-4">
        <div className="basis-1/3 side_nav p-4">
          <ul className="list flex flex-col">
            <li
              ref={myAccountRef}
              className={`list-item ${
                selectedItem === "myAccount" ? "selected" : ""
              }`}
              onClick={() => handleClick("myAccount")}
            >
              <img src="/myaccount/user.svg" className="icon" />
              My Account
            </li>
            <li
              ref={settingsRef}
              className={`list-item ${
                selectedItem === "settings" ? "selected" : ""
              }`}
              onClick={() => handleClick("settings")}
            >
              <img src="/myaccount/settings.svg" className="icon" />
              Settings
            </li>
            <li
              ref={teamRef}
              className={`list-item ${
                selectedItem === "team" ? "selected" : ""
              }`}
              onClick={() => handleClick("team")}
            >
              <img src="/myaccount/team.svg" className="icon" />
              Team
            </li>

            {user_type !== "VM" && (
              <li
                ref={electionsRef}
                className={`list-item ${
                  selectedItem === "elections" ? "selected" : ""
                }`}
                onClick={() => handleClick("elections")}
              >
                <img src="/myaccount/team.svg" className="icon" />
                Elections
              </li>
            )}

            {/* // TODO when you do this, you also need to set up, for each voting system, that they can't vote unless they have verified passport !
             */}
            {/* GP, can only view, but can't approve, or edit passports */}
            {/* //? passport validation (GP and VM) */}
            {(user_type === "VM" || user_type === "GP") && (
              <li
                ref={passportVerificationRef}
                className={`list-item ${
                  selectedItem === "passportVerification" ? "selected" : ""
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
                ref={loginTrafficHisRef}
                className={`list-item ${
                  selectedItem === "loginTrafficHistory" ? "selected" : ""
                }`}
                onClick={() => handleClick("loginTrafficHistory")}
              >
                <img src="/myaccount/login_history.svg" className="icon" />
                Login & Traffic History
              </li>
            )}

            <li
              ref={logoutRef}
              className={`list-item ${
                selectedItem === "logout" ? "selected" : ""
              }`}
              onClick={() => handleClick("logout")}
            >
              <img src="/myaccount/exit.svg" className="icon" />
              Logout
            </li>
          </ul>
        </div>

        <div className="w-full">
          {selectedItem === "myAccount" && <EditProfile />}
          {selectedItem === "settings" && <Settings />}
          {selectedItem === "team" && <Team />}

          {selectedItem === "elections" && <Elections />}

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
