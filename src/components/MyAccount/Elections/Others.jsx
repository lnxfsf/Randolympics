import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Flag from "react-world-flags";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import formatDate from "../../../utils/formatDate";

import { Others50Popup } from "./Others50Popup";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import { useTranslation } from "react-i18next";

const Others = ({
  user,

  currentUserPassportStatus,
  user_type,
  index,
  lastIndex,
  setRankUpdated,
  selectedRole,
  whichVotedFor,
  lastRank,
  setWhichVotedFor,
}) => {
  const { t } = useTranslation();

  dayjs.extend(localizedFormat);

  // set up, (and also depends on user_type, as we won't use all of it)
  const userId = user.userId;

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

  // you can't have it like 0
  if (rank == 0) {
    rank = 1;
  }

  const name = user.name;

  const nationality = user.nationality;

  /*   if (user.email_private == 1) {
    var email = "private";
  } else {
    var email = user.email;
  } */

  var email = user.email;
  var phone = user.phone;

  // private je 1
  // public je 0
  /*   if (user.phone_private == 1) {
    var phone = "private";
  } else {
    var phone = user.phone;
  } */

  const gender = user.gender;

  if (user_type === "AH" || user_type === "RS") {
    var votes = user.votes;
  } else if (selectedRole === "GP") {
    var votes = user.votesGP;
  }

  // we calculate age on the fly..
  /*  function calculateAge(birthdate) {
    // if birthdate is empty, or invalid..
    if (!birthdate || !moment(birthdate).isValid()) {
      return "-";
    }

    const today = moment();
    

    const birthDate = moment(birthdate);
    

    const years = today.diff(birthDate, "years");
    

    return years;
  }

  if (user.birthdate_private == 1) {
    var age = "private";
  } else {
    var age = calculateAge(user.birthdate);
  } */

  //const userNPPercentage = user.userNPPercentage;

  // we use this, only if we're showing "NP", i.e. when current user_type is "AH" or "RS"
  const status = user.status;

  var status_date = user.status_date; // we need to format this.

  if (status_date) {
    status_date = moment(status_date, "YYYY-MM-DD HH:mm:ss");

    status_date = formatDate(status_date, true);
  }

  // za toast
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [snackbarText, setSnackbarText] = useState("");

  return (
    <>
      <tr
        key={index}
        className="border-b-[1px] border-t-[1px] border-[#DEE2E6]"
      >
        {(user_type === "AH" || user_type === "RS" || user_type === "NP") &&
          currentUserPassportStatus === "validated" && (
            <>
              <td style={{ textAlign: "center" }}>
                <FormControlLabel
                  value={whichVotedFor === user.userId}
                  checked={whichVotedFor === user.userId}
                  onChange={() => {
                    setWhichVotedFor(user.userId);

                    setOpenSnackbar(true);
                    setSnackbarText(t("popupMessages.text23"));
                  }}
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

        <td>{votes}</td>

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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </>
  );
};

export { Others };
