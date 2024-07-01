import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";

const TeamList = ({
  user,
  index,
}) => {
  // set up, (and also depends on user_type, as we won't use all of it)
  const rank = user.ranking;
  const name = user.name;
  const age = user.age;
  const email = user.email;
  const phone = user.phone;
  const gender = user.gender;
  





  return (
    <>
      <tr key={index}>
        <p>{gender} {rank}</p>
        <td>{name}</td>
        <td>{age}</td>
      
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    </>
  );
};

export { TeamList };
