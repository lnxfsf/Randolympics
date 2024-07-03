import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/myaccount.scoped.scss";
import React, { useState, useEffect } from "react";

import { EditProfile } from "../components/MyAccount/EditProfile";
import { Settings } from "../components/MyAccount/Settings";
import { Team } from "../components/MyAccount/Team";
import { Elections } from "../components/MyAccount/Elections";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const MyAccount = () => {
  let { logoutUser } = useContext(AuthContext);

  const [user_type, setUserType] = useState("");

  useEffect(() => {
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserType(userJson.data.user_type);
    }
  }, []);

  // by this, you also know which component to display ! in this another one components !
  const [selectedItem, setSelectedItem] = useState(0);



  const items = ["My Account", "Settings", "Team", "Elections", "Logout"];
  const itemsIcon = [
    "/myaccount/user.svg",
    "/myaccount/settings.svg",
    "/myaccount/team.svg",
    "/myaccount/team.svg",
    "/myaccount/exit.svg",
  ];

  const handleClick = (index) => {
    setSelectedItem(index);

    if (index === 4) {
      logoutUser();
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex pl-8 pt-8 text-[35px] ">My Account</div>

      {/* main part */}
      <div className="flex p-12 pl-2  pt-12 gap-4">
        {/* side nav bar */}
        <div className="basis-1/3 side_nav p-4">
         
         
          <ul className="list  flex flex-col">
              
                  <li
                    /* key={index} */
                    className={`list-item ${
                      selectedItem === index ? "selected" : ""
                    }`}
                    onClick={() => handleClick(index)}
                  >
                  
                    <img src={itemsIcon[index]} className="icon" />
                    {item}
                  </li>
               
          </ul>



          {/* ovo moras napraviti prostora za ona dva ,dodatna sto samo "VM" -u se prikazuje... */}




        </div>

        {/* content for editing, etc */}
        <div className="w-full">
          {selectedItem === 0 && <EditProfile />}

          {selectedItem === 1 && <Settings />}

          {selectedItem === 2 && <Team />}

          {/* so, only national president will see this. in fact, there should be all other users, to be able to elect something.. it's just you determine what to render..   */}
          {/* user_type === "NP" && */ selectedItem === 3 && <Elections />}
        </div>
      </div>

      {/* just temporary, so I can see content */}
      <div className="h-96"></div>

      <Footer />
    </>
  );
};

export { MyAccount };
