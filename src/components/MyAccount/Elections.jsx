import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderMyProfile } from "./HeaderMyProfile";
import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import "../../styles/elections.scoped.scss";

import SearchBar from "@mkyy/mui-search-bar";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Elections = () => {
  // with this, we also need to send to backend, so we can filter, based on gender, and later on category..
  // we listen on changes, send to backend, and filter by it..
  const [genderFilter, setGenderFilter] = useState("M");
  const [categoryFilter, setCategoryFilter] = useState("medium");

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender);
    setCategoryFilter(null); // Reset category filter when gender is selected
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const [userData, setUserData] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.user_type;
    }
  }); // TODO , it must initialize here first !

  const [top50Users, setTop50Users] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  const [top50Page, setTop50Page] = useState(1);
  const [otherPage, setOtherPage] = useState(1);

  const [showingTop50, setShowingTop50] = useState(true);

  const [hasMoreTop50, setHasMoreTop50] = useState(true);
  const [hasMoreOthers, setHasMoreOthers] = useState(true);

  const [rankUpdated, setRankUpdated] = useState(false);

  const [selectedRole, setSelectedRole] = useState(() => {
    if (currentUserType === "NP") {
      return "AH";
    } else if (currentUserType === "AH") {
      return "NP";
    } else if (currentUserType === "GP") {
      return "LM";
    }
  });

  const [searchText, setSearchText] = useState(""); //search box

  const [votedFor, setVotedFor] = useState();
  const [votedForHisNPUserID, setVotedForHisNPUserID] = useState(); // UserID of NP, we voted for...

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
    }

    fetchTop50Users();

    if (!showingTop50) {
      fetchOtherUsers();
    }
  }, [
    top50Page,
    otherPage,
    rankUpdated,
    showingTop50,
    selectedRole,
    searchText,
    genderFilter,
    categoryFilter,
    votedFor,
    votedForHisNPUserID,
  ]);

  const votedForCheckbox = (votedForNPuserId) => {
    // votedForNPuserId, is from iteration, to check each one, if it's same as one locally...
    // votedForHisNPUserID, it's directly from user's column (of same name..)
    if (votedForHisNPUserID == votedForNPuserId) {
      return true;
    } else {
      return false;
    }
  };

  const handleSearch = (he) => {
    // Fired when enter button is pressed.

    console.log("ovo ne radi");
  };

  const fetchTop50Users = async () => {
    // this params: , is actually a variables to send to server !
    // user_type, is for the selection dropdown...
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth/rankingTop50`,
        {
          params: {
            limit: 10,
            offset: (top50Page - 1) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
          },
        }
      );
      setTop50Users(response.data);




      // Check if we should switch to showing other users
      if (response.data.length < 10) {
        setHasMoreTop50(false);
        setShowingTop50(false);

       

      
      } else {
        setHasMoreTop50(true);
        setShowingTop50(true);
      }


    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  const fetchOtherUsers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth/otherUsers`,
        {
          params: {
            limit: 10,
            offset: (otherPage - 1) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
          },
        }
      );
      setOtherUsers(response.data);



      if (response.data.length < 10) {
        setHasMoreOthers(false);
      } else {
        setHasMoreOthers(true);
      }
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  // ! with this, we need to determine...
  const handleNextPage = () => {


    // TODO, e to je problem, sto, on ne ide na sledecu..  znaci ON PODESI OVO NA false ! kako i treba ono < , ali ne isprazni listu.. a da isprazni listu, mora fetch-ovati, da bi vratio prazno.., a samo ga ide unazad, za Others.. u suprotnom. eto, tako jedino mozes resiti ovo
    if (showingTop50) {
      
      if (hasMoreTop50) {
        setTop50Page((prev) => prev + 1);
      } else {
        setShowingTop50(false);
        setOtherPage(1);
      }
    } else if (hasMoreOthers) {
        // ! jedino, ovako da ga ispraznis ovde ! I ONDA NA PREVIOUS, SAMO MORAS... uz Others.. to je jedino kako mozes isprazniti ga.. (jer on podesi ono... )
        setTop50Page((prev) => prev + 1);

        setOtherPage((prev) => prev + 1);
      }



    
  };


  
      
  console.log("otherPage je: "+otherPage)
  console.log("top50Page je: "+top50Page)
  console.log("showingTop50 je: "+ showingTop50)

  console.log("hasMoreTop50 je: "+ hasMoreTop50)
  console.log("hasMoreOthers je: "+ hasMoreOthers)



  // ! previous page
  const handlePreviousPage = () => {


    if (showingTop50 && top50Page > 1) {

      setTop50Page((prev) => prev - 1);


    } else if (!showingTop50 && otherPage > 1) {
      // ! e ovde, vracas ga samo.. za top50, ono, da bi prikazao jos.. 
      setTop50Page((prev) => prev - 1);

      setOtherPage((prev) => prev - 1);
      
    } else if (!showingTop50 && otherPage === 1) {

      setShowingTop50(true); // was "true"
      setTop50Page(Math.max(1, top50Page - 1));
    }


  };



  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  // ! to saljes u backend... i on, sada to koristi...
  const handleVotedFor = async (event) => {
    setVotedFor(event.target.value.name); // we get object "user", and get .name

    // treba da imas POST route, samo za ovo ipak (eto, imas .get, ali .post treba imas... )
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/auth/votingForNP`,
        {
          votedFor: event.target.value.name,
          NPuserId: event.target.value.userId, // and userId of that NP in question

          current_user_userId: userData.data.userId,
        }
      );

      if (response.status === 200) {
        console.log("sta e");
      }
    } catch (error) {
      //console.log(error);
      setResultText(error.response.data.message);
    }
  };
  return (
    <>
      <HeaderMyProfile />
      <div className="flex m-0 flex justify-start items-center gap-4">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="m-4 ml-0 mb-1"
        >
          <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
            <b>Selecting</b>
          </InputLabel>
          {/* this is what NP can select  */}
          {currentUserType === "NP" && (
            <>
              <Select
                labelId="roleDropdowns"
                value={selectedRole}
                onChange={handleChangeRole}
                className="w-[200px]"
                style={{ color: "#000" }}
              >
                <MenuItem value={"AH"}>Athletes</MenuItem>
                <MenuItem value={"GP"}>Global President</MenuItem>
                <MenuItem value={"RS"}>Referee & support</MenuItem>
              </Select>
            </>
          )}

          {/* this is what athlete and "referee & support" can select  */}
          {(currentUserType === "AH" || currentUserType == "RS") && (
            <>
              <>
                <Select
                  labelId="roleDropdowns"
                  value={selectedRole}
                  onChange={handleChangeRole}
                  className="w-[200px]"
                  style={{ color: "#000" }}
                >
                  <MenuItem value={"NP"}>National President</MenuItem>
                </Select>
              </>
            </>
          )}

          {/* this is what Global President can select  */}
          {currentUserType === "GP" && (
            <>
              <>
                <Select
                  labelId="roleDropdowns"
                  value={selectedRole}
                  onChange={handleChangeRole}
                  className="w-[200px]"
                  style={{ color: "#000" }}
                >
                  <MenuItem value={"LM"}>Legal Manager</MenuItem>
                  <MenuItem value={"ITM"}>IT Manager</MenuItem>

                  <MenuItem value={"MM"}>Marketing Manager</MenuItem>
                  <MenuItem value={"SM"}>Sales Manager</MenuItem>
                  <MenuItem value={"VM"}>Validation Manager</MenuItem>
                  <MenuItem value={"EM"}>Event Manager</MenuItem>
                </Select>
              </>
            </>
          )}
        </FormControl>

        {(currentUserType === "AH" || currentUserType === "RS" ) && (
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="m-4 ml-0 mb-1"
            >
              <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                <b>Vote for</b>
              </InputLabel>

              <Select
                labelId="roleDropdowns"
                value={votedFor}
                onChange={handleVotedFor}
                className="w-[200px]"
                style={{ color: "#000" }}
              >
                {top50Users.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    {user.name}
                  </MenuItem>
                ))}

                {otherUsers.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <></>
      </div>
      {/* div's, for Search bar and Filter */}
      <div className="flex justify-end">
        <SearchBar
          value={searchText}
          onChange={(newValue) => setSearchText(newValue)}
          onCancelResearch={(newValue) => setSearchText("")}
          onSearch={handleSearch}
          style={{
            border: "1px solid #C6C6C6", // Border color and thickness
            borderRadius: "20px", // Border radius
          }}
        />
      </div>
      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              {currentUserType === "AH" && (
                <>
                  <th className="w-[8%]">My vote</th>
                </>
              )}

              {currentUserType === "AH" ? (
                <>
                  <th className="w-[10%]">All votes</th>
                </>
              ) : (
                <>
                  <th className="w-[18%]">Rank</th>
                </>
              )}

              <th className="w-[15%]">Name</th>
              <th className="w-[8%]">Age</th>
              <th className="w-[12%]">Country</th>
              <th className="w-[27%]">Email</th>
              <th className="w-[20%]">Phone</th>
            </tr>
          </thead>
          <tbody>
            {top50Users.map((user, index) => (
              <Top50
                userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
                index={index}
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated}
                gender={user.gender}
                selectedRole={selectedRole}
                votes={user.votes}
                userNPPercentage={user.userNPPercentage}
                votedForNPuserIdBOOLEAN={votedForCheckbox(
                  user.votedForNPuserId
                )}
              />
            ))}

            {!showingTop50 && top50Users.length !== 0 && otherUsers.length > 0 && (
              <>
                <tr
                  className="border-b-2 border-red_first "
                  style={{ padding: "0px", paddingTop: "-5px" }}
                >
                  <td colSpan="100%"></td>
                </tr>
              </>
            )}

            {!showingTop50 &&
              otherUsers.map((user, index) => (
                <Others
                  userId={user.userId}
                  rank={user.ranking}
                  name={user.name}
                  age={user.age}
                  country={user.country}
                  email={user.email}
                  phone={user.phone}
                  user_type={currentUserType}
                  index={index}
                  lastIndex={otherUsers.length - 1}
                  setRankUpdated={setRankUpdated}
                  gender={user.gender}
                  selectedRole={selectedRole}
                  votes={user.votes}
                  userNPPercentage={user.userNPPercentage}
                  votedForNPuserIdBOOLEAN={votedForCheckbox(
                    user.votedForNPuserId
                  )}
                />
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button



/* only when on first page
and if it's actually first page, (it won't actually reflect new state in useState, so I think it's useless to mess with this anyways.. )

|| (!showingTop50 && hasMoreOthers)

*/
            disabled={
            (showingTop50 && top50Page === 1) 
          }  


          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
       /*  showingTop ce biti false (jer nema vise). hasmoretop isto false ! */
        /*  showingTop ce biti false , ali hasMore others, IMA (true) */
          disabled={
            (showingTop50 && !hasMoreTop50) || (!showingTop50 && !hasMoreOthers)
          }
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>

      {currentUserType === "NP" && (
        <>
          <div>
            <div>
              <h2>Gender:</h2>
              <div>
                <button
                  className={`gender-button ${
                    genderFilter === "M" ? "male active" : ""
                  }`}
                  onClick={() => handleGenderFilter("M")}
                  disabled={genderFilter === "M"}
                >
                  M
                </button>
                <button
                  className={`gender-button ${
                    genderFilter === "F" ? "female active" : ""
                  }`}
                  onClick={() => handleGenderFilter("F")}
                  disabled={genderFilter === "F"}
                >
                  F
                </button>
              </div>
            </div>

            <div className="button-container">
              <h2>Category:</h2>
              <div>
                <button
                  className={`category-button ${
                    categoryFilter === "heavy" ? "heavy active" : ""
                  }`}
                  onClick={() => handleCategoryFilter("heavy")}
                  disabled={categoryFilter === "heavy"}
                >
                  Heavy
                </button>
                <button
                  className={`category-button ${
                    categoryFilter === "medium" ? "medium active" : ""
                  }`}
                  onClick={() => handleCategoryFilter("medium")}
                  disabled={categoryFilter === "medium"}
                >
                  Medium
                </button>
                <button
                  className={`category-button ${
                    categoryFilter === "light" ? "light active" : ""
                  }`}
                  onClick={() => handleCategoryFilter("light")}
                  disabled={categoryFilter === "light"}
                >
                  Light
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentUserType === "AH" ? (
        <>
          <p className="m-2">
            You are selecting the National President. <br />
            Current National President will be replaced if there's 130% more
            votes than for current one. <br />
            Above red line, is current National President. <br />
            Your vote is in "Vote for" dropdown menu. <br />
          </p>
        </>
      ) : (
        <>
          <p className="m-2">
            You are selecting the athletes to compete in the next games. The{" "}
            <span className="text-red_first">top 50</span> athletes in the list
            will be chosen to participate in the games. Use the Update Rank
            feature to increase or decrease the rank of each athlete.
          </p>
        </>
      )}
    </>
  );
};

export { Elections };
