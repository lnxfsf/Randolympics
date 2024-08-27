import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import React, { useState, useEffect, useRef } from "react";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { FooterClean } from "../FooterClean";
import { NavbarClean } from "../NavbarClean";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const UpdateAthleteStatus = () => {
  const navigate = useNavigate();

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

  const [name, setName] = useState();
  const [profilePicture, setProfilePicture] = useState();

  const [userData, setUserData] = useState(null);

  const [loaded, setLoaded] = useState(true); // just first time, as logged in..

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);
      setAthleteEmail(userJson.data.email);
      setName(userJson.data.name);

      setProfilePicture(userJson.data.picture);

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

          navigate("/myaccount");
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
    <NavbarClean />

    <div className="flex flex-col items-start sm:items-center justify-start sm:justify-center min-h-screen p-4 lexend-font text-black_second w-full">
    
    
    
    <div className="flex gap-2 items-center mb-4 sm:mb-8">
      <img
      /*  mr-8 */
        className="w-[45px] h-[45px] sm:w-[80px] sm:h-[80px] object-cover rounded-full"
        src="/ariana_profile.jpg"


       /*  src={
          BACKEND_SERVER_BASE_URL +
          "/imageUpload/profile_pics/" +
          profilePicture
        } */

      />

    


{/* mt-4 */}
      <p className="text-2xl font-bold  sm:m-8 text-start sm:text-center break-words">
          Hello {name} 👋
        </p>
        </div>


      <p className="text-start sm:text-start  text-xl font-semibold break-words mt-4 sm:mt-0 mb-8">
        How probable are you to attend the <br/>Randolympics Games
      </p>
    

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={athleteStatus}
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
            control={
              <Radio
                sx={{
                  color: "#444444", 
                  "&.Mui-checked": {
                    color: "#444444", 
                  },
                }}
              />
            }
            label={`I'm 99% taking the challenge and going 💪`}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 500,
              },
            }}
          />
          <FormControlLabel
            value="s4"
            control={
              <Radio
                sx={{
                  color: "#444444", 
                  "&.Mui-checked": {
                    color: "#444444", 
                  },
                }}
              />
            }
            label={`Most likely going 😄`}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 500,
              },
            }}
          />
          <FormControlLabel
            value="s5"
            control={
              <Radio
                sx={{
                  color: "#444444", 
                  "&.Mui-checked": {
                    color: "#444444", 
                  },
                }}
              />
            }
            label={`I'm maybe going 🤔`}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 500,
              },
            }}
          />
          <FormControlLabel
            value="s6"
            control={
              <Radio
                sx={{
                  color: "#444444", 
                  "&.Mui-checked": {
                    color: "#444444", 
                  },
                }}
              />
            }
            label={`I'm definitely not going 👎`}
            sx={{
              "& .MuiTypography-root": {
                fontFamily: "'Lexend', sans-serif",
                fontWeight: 500,
              },
            }}
          />
        </RadioGroup>
      </FormControl>

      <Button
        onClick={submitChangeStatus}
        className="w-full sm:w-56"
        style={{
          marginTop: "45px",
          marginBottom: "25px",
          textTransform: "none",
        }}
        sx={{
          height: "50px",
          bgcolor: "#D24949",
          color: "#fff",
          borderRadius: 3,
          border: `1px solid #D24949`,
          "&:hover": {
            background: "rgba(210, 73, 73, 1)",
            color: "white",
            border: `1px solid rgba(210, 73, 73, 1)`,
          },
        }}
        id="join-the-fun-btn"
      >
        <img src="/myaccount/continue.svg" className="mr-2 w-4" />
        <span className="lexend-font font-semibold">Continue</span>
      </Button>
    </div>

    <FooterClean />
  </>
  );
};

export { UpdateAthleteStatus };
