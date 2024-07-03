import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import moment from "moment";

const Others = ({
  user,
  user_type,
  index,
  lastIndex,
  setRankUpdated,
  selectedRole,
  votedForUserId,
}) => {
  // set up, (and also depends on user_type, as we won't use all of it)
  const userId = user.userId;

  if (selectedRole == "AH"){
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
  if (rank == 0){
    rank = 1;
  }



  const name = user.name;
  const age = user.age;
  const country = user.country;
  const email = user.email;
  const phone = user.phone;
  const gender = user.gender;

  if(user_type === "AH"){
    var votes = user.votes;
  } else if ( selectedRole === "GP" ){
    var votes = user.votesGP;
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
    setCurrentRank(currentRank + 1);
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
        `${BACKEND_SERVER_BASE_URL}/listsRanking/update_rank_data`,
        {
          userId,

          originalRank: rank,
          goingToRank: currentRank,
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
      console.log("sta je");
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
        {(user_type === "AH" || selectedRole === "GP") && (
          <>
            <td style={{ textAlign: "center" }}>
              {/*  <Checkbox
                sx={{
                  color: "#FF0000",
                  "&.Mui-checked": {
                    color: "#FF0000",
                  },
                }}
                checked={votedForNPuserIdBOOLEAN}
                disabled
              /> */}

              {votedForUserId == userId ? <p>1</p> : <p>-</p>}
            </td>
          </>
        )}

        {(user_type === "NP" && selectedRole !== "GP" ) || user_type === "GP" ? (
          <>
            {/* <div className="flex justify-between items-center gap-2"> */}

            <td className="flex gap-2 justify-start items-center">
              <div>
                {/* only for Athletes, it shows, M, F, category...  */}
                {selectedRole !== "AH" ? (
                  <p>{rank}</p>
                ) : (
                  <p>
                    {gender} {rank}
                  </p>
                )}
              </div>
              <div>
                {/*     <p className="cursor-pointer select-none text-gray_first">
                  Update Rank <img src="myaccount/pencil.svg" style={{width: "10px", height: "10px", display: "inline-block", marginBottom: "5px"}} />
                </p> */}
                <Popup
                  ref={popupRef}
                  trigger={
                    <p className="cursor-pointer select-none text-gray_first">
                      Update Rank{" "}
                      <img
                        src="myaccount/pencil.svg"
                        style={{
                          width: "10px",
                          height: "10px",
                          display: "inline-block",
                          marginBottom: "5px",
                        }}
                      />
                    </p>
                  }
                  position="right center"
                  contentStyle={{ width: "auto" }}
                >
                  <div className="m-4">
                    <div className="flex gap-2 mb-2">
                      <p>Current rank</p>
                      <p>
                        <b>{currentRank}</b>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <p>Update rank</p>

                      <div className="flex justify-center items-center gap-2">
                        <Button
                          onClick={increaseRank}
                          className="w-[15px]"
                          style={{ marginTop: "0px", padding: "0px" }}
                          sx={{
                            height: "15px",
                            bgcolor: "#fff",
                            color: "#232323",
                            borderRadius: 15,
                            border: `1px solid #AF2626`,
                            "&:hover": {
                              background: "rgb(196, 43, 43)",
                              color: "white",
                              border: `1px solid rgb(196, 43, 43)`,
                            },
                          }}
                        >
                          <span className="popins-font">+</span>
                        </Button>
                        <Button
                          onClick={decreaseRank}
                          className="w-[15px]"
                          style={{ marginTop: "0px", padding: "0px" }}
                          sx={{
                            height: "15px",
                            bgcolor: "#fff",
                            color: "#232323",
                            borderRadius: 15,
                            border: `1px solid #AF2626`,
                            "&:hover": {
                              background: "rgb(196, 43, 43)",
                              color: "white",
                              border: `1px solid rgb(196, 43, 43)`,
                            },
                          }}
                        >
                          <span className="popins-font">-</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-2 m-4">
                      <Button
                        onClick={cancel}
                        className="w-[85px]"
                        style={{ marginTop: "0px", padding: "0px" }}
                        sx={{
                          fontSize: "8pt",
                          height: "30px",
                          bgcolor: "#fff",
                          color: "#232323",
                          borderRadius: 15,
                          border: `1px solid #fff`,
                          "&:hover": {
                            background: "rgb(196, 43, 43)",
                            color: "white",
                            border: `1px solid rgb(196, 43, 43)`,
                          },
                        }}
                      >
                        <span className="popins-font">Cancel</span>
                      </Button>

                      <Button
                        onClick={saveChanges}
                        className="w-[120px]"
                        style={{ marginTop: "0px", padding: "0px" }}
                        sx={{
                          fontSize: "8pt",
                          height: "30px",
                          bgcolor: "#AF2626",
                          color: "#fff",
                          borderRadius: 15,
                          border: `1px solid #AF2626`,
                          "&:hover": {
                            background: "rgb(196, 43, 43)",
                            color: "white",
                            border: `1px solid rgb(196, 43, 43)`,
                          },
                        }}
                      >
                        <span className="popins-font">Save changes</span>
                      </Button>
                    </div>
                  </div>
                </Popup>
              </div>
            </td>
            {/* </div> */}
          </>
        ) : (
          <>
            {/* <div className="flex justify-between items-center gap-2"> */}
            {(user_type === "AH" || selectedRole === "GP" ) ? (
              <td className="flex gap-2 justify-start">
                <p>
                  <b>{votes}</b> 
                </p>
              </td>
            ) : (
              <td className="flex gap-2 justify-start">
                <p>{rank}</p>
              </td>
            )}
            {/* </div> */}
          </>
        )}

        <td>{name}</td>
        <td>{age}</td>
        <td>{country}</td>
        <td>{email}</td>
        <td>{phone}</td>

        {(user_type === "AH"  || selectedRole === "GP")  && (
          <td>
            <p>
              {status} <br />
              {status_date}
            </p>
          </td>
        )}
      </tr>

     
    </>
  );
};

export { Others };
