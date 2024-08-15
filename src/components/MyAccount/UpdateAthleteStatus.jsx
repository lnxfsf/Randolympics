import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import React, { useState, useEffect, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const UpdateAthleteStatus = () => {
  const [athleteStatus, setAthleteStatus] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    if (storedData) {
      var userJson = JSON.parse(storedData);

      return userJson.data.athleteStatus;
    }
  });

  const [athleteEmail, setAthleteEmail] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      return userJson.data.email;
    }
  });

  const [userData, setUserData] = useState(null);

  const [loaded, setLoaded] = useState(true); // just first time, as logged in..

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);
      setAthleteEmail(userJson.data.email);

      setUserData(userJson);
    }

   
    
  }, [athleteStatus]);




  const handleAthleteStatusChange = (event) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        athleteStatus: event.target.value,
      },
    }));
  };

  const submitChangeStatus = async (athleteStatusS2, autoUpdate) => {
    console.log("in submitChangeStatus");
    console.log(athleteEmail);
    console.log(athleteStatus);

    if (!autoUpdate) {
      try {
        var response = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
          {
            original_email: athleteEmail,
            //email,

            athleteStatus,
          }
        );

        if (response.status === 200) {
          if (localStorage.getItem("authTokens")) {
            localStorage.setItem("authTokens", JSON.stringify(userData));
          } else if (sessionStorage.getItem("authTokens")) {
            sessionStorage.setItem("authTokens", JSON.stringify(userData));
          }
        }
      } catch (error) {
        console.log("ne radi nista");
        console.log(error);
      }
    } else if (loaded) {
      const newUserData = {
        ...userData,
        data: {
          ...userData.data,
          athleteStatus: "s2",
        },
      };

      try {
        var response = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/user/update_user_data`,
          {
            original_email: athleteEmail,
            //email,

            athleteStatus: athleteStatusS2,
          }
        );

        if (response.status === 200) {
          if (localStorage.getItem("authTokens")) {
            localStorage.setItem("authTokens", JSON.stringify(newUserData));
          } else if (sessionStorage.getItem("authTokens")) {
            sessionStorage.setItem("authTokens", JSON.stringify(newUserData));
          }

          setAthleteStatus("s2");
          setLoaded(false); // we do it only once, so we don't call this again..
        }
      } catch (error) {
        console.log("ne radi nista");
        console.log(error);
      }
    }
  };


  
  if (loaded) {
    // if he logged in, but hasn't set this up, it goes in "s2", state..
    if (athleteStatus === "s1") {
      submitChangeStatus("s2", true);
    }
  }
  
  return (
    <>
      {athleteStatus}

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="friend"
          name="radio-buttons-group"
          onChange={(event) => {
            const value = event.target.value;

            if (value === "s3") {
              setAthleteStatus("s3");
            } else if (value === "s4") {
              setAthleteStatus("s4");
            } else if (value === "s5") {
              setAthleteStatus("s5");
            } else if (value === "s6") {
              setAthleteStatus("s6");
            }

            handleAthleteStatusChange(event);
          }}
        >
          <FormControlLabel
            value="s3"
            control={<Radio />}
            label={`I'm 99% taking the challenge and going`}
          />
          <FormControlLabel
            value="s4"
            control={<Radio />}
            label={`Most likely going`}
          />
          <FormControlLabel
            value="s5"
            control={<Radio />}
            label={`I'm maybe going`}
          />

          <FormControlLabel
            value="s6"
            control={<Radio />}
            label={`I'm definitely not going`}
          />
        </RadioGroup>
      </FormControl>

      <button onClick={submitChangeStatus}> update </button>
    </>
  );
};

export { UpdateAthleteStatus };
