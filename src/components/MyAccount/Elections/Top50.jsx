import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

import moment from "moment";

import { Top50Popup } from "./Top50Popup";

import formatDate from "../../../utils/formatDate";

import dayjs from "dayjs";
import "dayjs/locale/sr";
import localizedFormat from "dayjs/plugin/localizedFormat";

const Top50 = ({
  user, // we just send one big object, and get properties (as they change depending on user_type)
  currentUserPassportStatus,
  user_type, // yes, this is , the logged in user_type !!!
  index,
  lastIndex,
  setRankUpdated,
  selectedRole,
  whichVotedFor, // we get votedFor (if it's AH (so for NP vote)) | or votedForGP, if it's in selection dropdown menu "GP", and from NP user..
  lastRank,
}) => {
  const { t, i18n } = useTranslation();



  dayjs.extend(localizedFormat);

  // set up, (and also depends on user_type, as we won't use all of it)
  const userId = user.userId; // userId, of user in question (you're changing.. about.. )

  // should be able to get his passportStatus, to check if he can vote (if he have verified passport), every other state is not allowed to vote etc..
  const passportStatus = user.passportStatus;

  if (selectedRole == "AH") {
    var rank = user.ranking;
  } else if (selectedRole == "GP") {
    var rank = user.rankingGP;
    var currentGP_UpToDate = user.currentGP_UpToDate; // this is to show, if we're not yet able to show, until 4yrs have passed..
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

  // you can't have it like 0
  if (rank == 0) {
    rank = 1;
  }

  const name = user.name;
  /* 
  if (user.birthdate_private == 1) {
    var age = "private";
  } else {
    var age = calculateAge(user.birthdate);
  } */

  /*   if (user.email_private == 1) {
    var email = "private";
  } else {
    var email = user.email;
  } */

  // private je 1
  // public je 0
  /*   if (user.phone_private == 1) {
    var phone = "private";
  } else {
    var phone = user.phone;
  } */

  var email = user.email;
  var phone = user.phone;

  const gender = user.gender;
  const nationality = user.nationality;

  if (user_type === "AH" || user_type === "RS") {
    var votes = user.votes;
  } else if (selectedRole === "GP") {
    var votes = user.votesGP;
  }

  // we calculate age on the fly..
  /*   function calculateAge(birthdate) {
    // if birthdate is empty, or invalid..
    if (!birthdate || !moment(birthdate).isValid()) {
      return "-";
    }
    const today = moment();
    const birthDate = moment(birthdate);
    const years = today.diff(birthDate, "years");

    return years;
  } */

  // we use this, only if we're showing "NP", i.e. when current user_type is "AH" or "RS"
  const status = user.status;

  var status_date = user.status_date; // we need to format this.

  if (status_date) {
    status_date = dayjs(status_date, "YYYY-MM-DD HH:mm:ss").locale(i18n.language);
    status_date = status_date.format("(HH:mm LL)");
  
   //status_date = formatDate(status_date, true);

  }

  useEffect(() => {}, [whichVotedFor]);

  return (
    <>
      <tr
        key={index}
        className="bg-[#f2fff3] border-b-[1px] border-t-[1px] border-[#DEE2E6]"
      >
        {(user_type === "AH" || user_type === "RS" || user_type === "NP") &&
          currentUserPassportStatus === "validated" && (
            <>
              <td style={{ textAlign: "center" }}>
                <FormControlLabel
                  checked={true}
                  control={
                    <Radio
                      sx={{
                        color: "#444444",
                        "&.Mui-checked": {
                          color: "#444444",
                        },
                        margin: 0,
                        padding: 0,
                      }}
                    />
                  }
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "'Lexend', sans-serif",
                      fontWeight: 500,
                    },
                    margin: 0,
                    padding: 0,
                  }}
                />
              </td>
            </>
          )}

        <td /* className="flex gap-2 justify-start" */>{votes}</td>

        <td>{name}</td>

        {user.email_private === 1 ? (
          <>
            <td>
              <div className="flex gap-2">
                <img
                  className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                  src="/editprofile/private_lock.svg"
                />
                <p className="text-lg font-medium text-[#616673] break-all">
                  {t("myprofile.elections.status1")}
                </p>
              </div>
            </td>
          </>
        ) : (
          <>
            <td>{email}</td>
          </>
        )}

        {user.phone_private === 1 ? (
          <>
            <td>
              <div className="flex gap-2">
                <img
                  className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                  src="/editprofile/private_lock.svg"
                />
                <p className="text-lg font-medium text-[#616673] break-all">
                  {t("myprofile.elections.status1")}
                </p>
              </div>
            </td>
          </>
        ) : (
          <>
            <td>{phone}</td>
          </>
        )}

        <td>
          <p>
            {status === "Candidate"
              ? t("myprofile.elections.content10")
              : status === "Acting Global President"
              ? t("myprofile.elections.content11")
              : t("myprofile.elections.content12")}

            <br />

            {status_date}
          </p>
        </td>
      </tr>
    </>
  );
};

export { Top50 };
