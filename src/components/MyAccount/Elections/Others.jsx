import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Flag from "react-world-flags";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";

import { Others50Popup } from "./Others50Popup";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

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


  if (user.email_private == 1) {
    var email = "private";
  } else {
    var email = user.email;
  }


  // private je 1 
  // public je 0 
  if (user.phone_private == 1) {
    var phone = "private";
  } else {
    var phone = user.phone;
  }

  const gender = user.gender;

  if (user_type === "AH" || user_type === "RS") {
    var votes = user.votes;
  } else if (selectedRole === "GP") {
    var votes = user.votesGP;
  }




  // we calculate age on the fly..
  function calculateAge(birthdate) {
    // if birthdate is empty, or invalid..
    if (!birthdate || !moment(birthdate).isValid()) {
      return '-';
    }


    const today = moment();
    console.log("danas" + today)

    const birthDate = moment(birthdate);
    console.log("rodjendan" + birthDate)

    const years = today.diff(birthDate, 'years');
    console.log("razlika god" + years)


    return years;
  }


  if (user.birthdate_private == 1) {
    var age = "private";
  } else {
    var age = calculateAge(user.birthdate);
  }




  //const userNPPercentage = user.userNPPercentage;

  // we use this, only if we're showing "NP", i.e. when current user_type is "AH" or "RS"
  const status = user.status;

  var status_date = user.status_date; // we need to format this.

  if (status_date) {
    status_date = moment(status_date, "YYYY-MM-DD HH:mm:ss");
    status_date = status_date.format("(HH:mm MMMM Do YYYY)");
  }

  //console.log("userid je: " + userId);

  const [currentRank, setCurrentRank] = useState(rank);

  // original rank will be "rank", use that ! it won't change

  const popupRef = useRef(null);

  let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;

  // just once, you save in
  const [userData, setUserData] = useState(null);
  const [original_email, setOriginalEmail] = useState(null);

  useEffect(() => {
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);

      setOriginalEmail(userJson.data.email);
    }
  }, []);

  const increaseRank = () => {

    if (currentRank !== lastRank) {
      setCurrentRank(currentRank + 1);
    }
  };

  const decreaseRank = () => {
    setCurrentRank((prevRank) => (prevRank > 1 ? prevRank - 1 : 1));
    // setCurrentRank receives the previous state value (prevRank). and we check if it's safe to go below. as we don't want to go below 1 (unless there's some resign options..)
    // for resigning, he's becoming last in rank
  };

  const cancel = () => {
    setCurrentRank(rank); // just revert it

    // and exit popup
    popupRef.current.close();
  };

  const saveChanges = async () => {
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/update_rank_data`,
        {
          userId,

          originalRank: rank,
          goingToRank: currentRank,

          user_type: selectedRole,  // yes, this is , the logged in user_type !!! 
          nationality: nationality,
        }
      );

      if (response.status === 200) {
        // setRankUpdated((prev) => !prev);  //this is so we can update list now ..
        //console.log("sent (going to rank): " + currentRank)
        //TODO - nesto sa rank, jer on filtira po user-email.. a ti saljes samo id od svoga ! ZATO ON NECE ZA DRUGE USER-S.. nego samo za tvoj ariana grande.. al aj, dovrsi taj drugi feature.. pa onda ces..
        setRankUpdated((prev) => !prev);
        popupRef.current.close();
      }
    } catch (error) {
      
      console.log(error);
    }
  };

  return (
    <>

      {/* if user is NP, then show "edit field". so we can reuse this same component for all that... */}
      <tr key={index}>
        {/* // ? showing checkbox, which one user, selected.. (just display it as disabled, and true.. so user can't check / uncheck there.. ). it's just indicator..
         */}

        {/*  // ! it also, need to check, if currentUser, have this one, as selected.. (just, go on votedFor), by name, or userId, just to be sure...
         */}
        {(user_type === "AH" || user_type === "RS" || user_type === "NP") && (currentUserPassportStatus === "validated") && (
          <>
            <td style={{ textAlign: "center" }}>
               {/* 
               <Checkbox
                sx={{
                  color: "#FF0000",
                  "&.Mui-checked": {
                    color: "#FF0000",
                  },
                }}
                checked={votedForNPuserIdBOOLEAN}
                
              />  */}

<FormControlLabel
             /*  value="s5" */


/*              try, and match, which one userId (NP or GP, doesnt matter), it matches, so that's active radio button now.. */
            
/* 
checked={whichVotedFor === user.votedForNPuserId || whichVotedFor === user.votedForGPuserId }
 */


              value={whichVotedFor === user.userId}
              checked={whichVotedFor === user.userId}

             /* onChange={() => {setSelectRadio((prev) => !prev )}} */

                onChange={() => {setWhichVotedFor(user.userId)}}

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
        
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 500,
                },
              }}
            />



             {/*   {whichVotedFor == userId ? <p>1</p> : <p>-</p>}  */}

             
            </td>
          </>
        )}

  <td className="flex gap-2 justify-start">
                  <p>
                    <b>{votes}</b>
                  </p>
                </td>

        <td>{name}</td>
        <td>{age}</td>
        <td><Flag className="flag-photo-team " code={nationality} /></td>
        <td>{email}</td>
        <td>{phone}</td>

        {(user_type === "AH" || user_type === "RS" || selectedRole === "GP") && (
          <td>
            <p>
              {status} <br />
              {status_date}
            </p>
          </td>
        )}
      </tr>

      <tr>




        {selectedRole == "NP" && (
          <td colSpan="8">
            <hr />
          </td>
        )
        }

        <td colSpan="6">
          <hr />
        </td>


      </tr>

    </>
  );
};

export { Others };
