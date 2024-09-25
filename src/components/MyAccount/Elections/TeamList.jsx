import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { useTranslation } from "react-i18next";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import "../../../styles/editprofile.scoped.scss";

import moment from "moment";

const TeamList = ({ user, index, selectedRole, currentUserType }) => {
  const { t } = useTranslation();

  // set up, (and also depends on user_type, as we won't use all of it)

  function calculateAge(birthdate) {
    // if birthdate is empty, or invalid..
    if (!birthdate || !moment(birthdate).isValid()) {
      return "-";
    }

    const today = moment();

    const birthDate = moment(birthdate);

    const years = today.diff(birthDate, "years");

    return years;
  }

  // ranking, also depends on user type..
  if (selectedRole == "AH") {
    var rank = user.ranking;
  } else if (selectedRole == "GP") {
    var rank = user.rankingGP;
  } else if (selectedRole == "NP") {
    var rank = user.rankingNP;
  } else if (selectedRole == "EM") {
    var rank = user.rankingEM;
  } else if (selectedRole == "ITM") {
    var rank = user.rankingITM;
  } else if (selectedRole == "MM") {
    var rank = user.rankingMM;
  } else if (selectedRole == "SM") {
    var rank = user.rankingSM;
  } else if (selectedRole == "VM") {
    var rank = user.rankingVM;
  } else if (selectedRole == "LM") {
    var rank = user.rankingLM;
  } else if (selectedRole == "RS") {
    var rank = user.rankingRS;
  }

  const name = user.name;

  if (user.birthdate_private == 1) {
    var age = t("myprofile.team.private");
  } else {
    var age = calculateAge(user.birthdate);
  }

  if (user.email_private == 1) {
    var email = t("myprofile.team.private");
  } else {
    var email = user.email;
  }

  // private je 1
  // public je 0
  if (user.phone_private == 1) {
    var phone = t("myprofile.team.private");
  } else {
    var phone = user.phone;
  }

  const gender = user.gender;

  return (
    <>
      <tr key={index}>
        {selectedRole === "AH" ? (
          <p className="tdt">
            {gender} {rank}
          </p>
        ) : (
          <p className="tdt">{rank}</p>
        )}

        <td className="tdt">{name}</td>

        {/* <td className="tdt" >{age}</td> */}

        {/* if it's private */}
        <td className="tdt">
          <div className="flex gap-2">
            {age === "private" && (
              <img
                className=" bg-[#EAEAEA] p-1 "
                src="/editprofile/private_lock.svg"
              />
            )}
            {age}
          </div>
        </td>

        <td className="tdt">
          <div className="flex gap-2">
            {email === "private" && (
              <img
                className=" bg-[#EAEAEA] p-1 "
                src="/editprofile/private_lock.svg"
              />
            )}
            {email}
          </div>
        </td>
        <td className="tdt">
          <div className="flex gap-2">
            {phone === "private" && (
              <img
                className=" bg-[#EAEAEA] p-1"
                src="/editprofile/private_lock.svg"
              />
            )}
            {phone}
          </div>
        </td>
      </tr>
    </>
  );
};

export { TeamList };
