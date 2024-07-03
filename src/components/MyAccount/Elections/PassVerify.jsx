import "../../../styles/passverify.scoped.scss";

import moment from "moment";
import Flag from "react-world-flags";
import React, { useState, useEffect } from "react";

const PassVerify = ({ user, index }) => {
  const name = user.name;
  const nationality = user.nationality;
  const user_type = user.user_type;
  var accountCreatedAt = user.createdAt;
  var passportStatus = user.passportStatus;
  var passportUploadedDate = user.passportUploadedDate;
  var passportLastValidatedRejected = user.passportLastValidatedRejected;

  if (accountCreatedAt) {
    accountCreatedAt = moment(accountCreatedAt, "YYYY-MM-DD  HH:mm:ss");
    accountCreatedAt = accountCreatedAt.format("YYYY-MM-DD  HH:mm:ss");
  }

  if (passportUploadedDate) {
    passportUploadedDate = moment(passportUploadedDate, "YYYY-MM-DD  HH:mm:ss");
    passportUploadedDate = passportUploadedDate.format("YYYY-MM-DD  HH:mm:ss");
  }

  if (passportLastValidatedRejected) {
    passportLastValidatedRejected = moment(
      passportLastValidatedRejected,
      "YYYY-MM-DD  HH:mm:ss"
    );
    passportLastValidatedRejected = passportLastValidatedRejected.format(
      "YYYY-MM-DD  HH:mm:ss"
    );
  }

  const [userTypeText, setUserTypeText] = useState(() => {
    if (user_type == "AH") {
      return "Athlete";
    } else if (user_type == "GP") {
      return "Global President";
    } else if (user_type == "NP") {
      return "National President";
    } else if (user_type == "EM") {
      return "Event Manager";
    } else if (user_type == "ITM") {
      return "IT Manager Page editor";
    } else if (user_type == "MM") {
      return "Marketing Manager";
    } else if (user_type == "SM") {
      return "Sales Manager";
    } else if (user_type == "VM") {
      return "Validation Manager";
    } else if (user_type == "LM") {
      return "Legal Manager";
    } else if (user_type == "RS") {
      return "Referee & Support";
    }
  });

  return (
    <>
      <tr key={index}>
        <td>{name}</td>

        {/* // ! e evo, prikazi sada country flag, taman, nesto da radis ono.. */}
        <td>
          <Flag className="flag-photo-pass-verify" code={nationality} />
        </td>

        {/* i ovo, u imenima ! (samo gore rasporedis.. koje ime ide..) */}
        <td>{userTypeText}</td>

        <td>{passportStatus}</td>

        <td>{accountCreatedAt}</td>

        <td>{passportUploadedDate}</td>

        <td>{passportLastValidatedRejected}</td>
      </tr>
    </>
  );
};

export { PassVerify };
