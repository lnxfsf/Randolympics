import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/myaccount.scoped.scss";
import React, { useState, useEffect } from "react";

import { EditProfile } from "../components/MyAccount/EditProfile";
import { Settings } from "../components/MyAccount/Settings";
import { Team } from "../components/MyAccount/Team";


const MyAccount = () => {
  // by this, you also know which component to display ! in this another one components !
  const [selectedItem, setSelectedItem] = useState(0);

  const items = ["My Account", "Settings", "Team", "Logout"];
  const itemsIcon = [
    "/myaccount/user.svg",
    "/myaccount/settings.svg",
    "/myaccount/team.svg",
    "/myaccount/exit.svg",
  ];

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <Navbar />

      <div className="flex pl-32 pt-8 text-[35px] ">My Account</div>

      {/* main part */}
      <div className="flex p-28 pt-12 gap-4">
        {/* side nav bar */}
        <div className="basis-1/3 side_nav p-4">
          <ul className="list  flex flex-col">
            {items.map((item, index) => (
              <li
                key={index}
                className={`list-item ${
                  selectedItem === index ? "selected" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                <img src={itemsIcon[index]} className="icon" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* content for editing, etc */}
        <div className="w-full">
          



        {selectedItem === 0 && (
            <EditProfile />

          )}


            {selectedItem === 1 && (
            <Settings />

          )}


{selectedItem === 2 && (
            <Team />

          )}



      {/* //TODO and when Logout is clicked on, to logout user (go in AuthContext), and go in /login route.. */}

        </div>
      </div>

      {/* just temporary, so I can see content */}
      <div className="h-96"></div>

      <Footer />
    </>
  );
};

export { MyAccount };
