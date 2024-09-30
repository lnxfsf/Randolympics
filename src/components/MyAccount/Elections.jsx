import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderMyProfile } from "./HeaderMyProfile";
import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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

  const [maxPages, setMaxPages] = useState(0);

  const [otherPage, setOtherPage] = useState(1);
  const [top50Page, setTop50Page] = useState(1);

  const [showingTop50, setShowingTop50] = useState(true);

  const [rankUpdated, setRankUpdated] = useState(false);

  const [selectedRole, setSelectedRole] = useState(() => {
    if (currentUserType === "NP") {
      return "GP";
      // if it's NP, they can vote on Global president
    } else if (currentUserType === "AH") {
      return "NP";
      // if it's Athlete, they can vote on National president
    } else if (currentUserType === "RS") {
      return "NP";
      // if it's Referee & Support, they can also vote on National president
    }
  });

  const [searchText, setSearchText] = useState(""); //search box

  const [votedFor, setVotedFor] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.votedForNPuserId;
    }
  }); // UserID of NP, we voted for...

  // this is for GP selection (only NP's can vote on this !)
  const [votedForGP, setVotedForGP] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.votedForGPuserId; //GP !
    }
  }); // UserID of GP , we voted for...

  const [passportStatus, setPassportStatus] = useState();

  //this is used, for filtering, for .get operations..
  const [countryOfcurrentUserOnFrontend, setCountryOfcurrentUserOnFrontend] =
    useState(() => {
      const storedData =
        localStorage.getItem("authTokens") ||
        sessionStorage.getItem("authTokens");

      if (storedData) {
        const userJson = JSON.parse(storedData);
        return userJson.data.nationality;
      }
    });

  const [lastRank, setLastRank] = useState();

  // TODO sada, to kada se azurira, drugaciji je, nego original, treba to da odes i azuriras ! za tog user-a !
  const [whichVotedFor, setWhichVotedFor] = useState(() => {
    if (currentUserType === "AH") {
      return votedFor;
    } else if (selectedRole === "GP") {
      return votedForGP;
    }
  });

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
      setPassportStatus(userJson.data.passportStatus);
    }

    fetchTop50Users(); 
  
    

    fetchOtherUsers();

    if (whichVotedFor !== votedFor && currentUserType === "AH") {
      handleVotedFor();
    } else if (whichVotedFor !== votedForGP && currentUserType === "NP") {
      handleVotedForGP();
    }
  }, [
    otherPage,

    rankUpdated,

    showingTop50,
    selectedRole,
    searchText,
    genderFilter,
    categoryFilter,
    votedFor,
    votedForGP,

    whichVotedFor,
  ]);

  const handleSearch = (he) => {
    // Fired when enter button is pressed.

    console.log("ovo ne radi");
  };

  const handlePaginationChange = (event, value) => {
    setOtherPage(value);
  };

  /* 
  const lastInRank = async () => { 

    try {

      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/lastInRank`,
        {
          params: {
            user_type: selectedRole,
            nationality: countryOfcurrentUserOnFrontend,
            gender: genderFilter,
            
          },
        }
      );

      
     console.log(response.data)
      setLastRank(response.data)

    } catch (error) {
      console.error("Error fetching top users:", error);
    }



  }
 */

  const fetchTop50Users = async () => {
    // this params: , is actually a variables to send to server !
    // user_type, is for the selection dropdown...
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/rankingTop50`,
        {
          params: {
            limit: 10,
            offset: (top50Page - 1) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,

            votedFor: votedFor, // sends selected NP for our user. this is showing then. so we display above red line selected by user...
            votedForGP: votedForGP, // this same as for votedFor, just for GP.. so we can discern..

            countryOfcurrentUserOnFrontend: countryOfcurrentUserOnFrontend,
          },
        }
      );

      console.log("top selected ");
      console.log(response.data);

      setTop50Users(response.data);
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  const fetchOtherUsers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/otherUsers`,
        {
          params: {
            limit: 10,
            offset: (otherPage - 1) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,

            votedFor: votedFor, // send this, so to know which one to AVOID
            votedForGP: votedForGP, // so he can avoid this one just..

            countryOfcurrentUserOnFrontend: countryOfcurrentUserOnFrontend,
          },
        }
      );

      console.log("elections");
      console.log(response);

      setMaxPages(Math.ceil(response.data.count / 10));
      setOtherUsers(response.data.rows);
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  //  for NP's selection (by Athletes ! )
  const handleVotedFor = async (event) => {
    /* setVotedFor(event.target.value); */

    // treba da imas POST route, samo za ovo ipak (eto, imas .get, ali .post treba imas... )
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/votingForNP`,
        {
          NPuserId: whichVotedFor, // NP userId we're voting for
          current_user_userId: userData.data.userId, // current User, userId
        }
      );

      if (response.status === 200) {
        // this will apply on next re-render. so we need to use one locally, for now, just to insert it in localstorage
        setUserData((prevUserData) => ({
          ...prevUserData,
          data: {
            ...prevUserData.data,
            votedForNPuserId: whichVotedFor,
          },
        }));

        // this is new object, so we can insert it directly (faster, we don't wait for next re-render..)
        var updatedUserData = {
          ...userData,
          data: { ...userData.data, votedForNPuserId: whichVotedFor },
        };

        // ada, nije sačuvao alo !
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        }
      }
    } catch (error) {
      console.log(error.response);

      //console.log(error.response.data.message);
    }
  };

  // for GP's selection (by NP's )
  const handleVotedForGP = async (event) => {
    //setVotedForGP(event.target.value);

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/votingForGP`,
        {
          GPuserId: whichVotedFor,
          current_user_userId: userData.data.userId,
        }
      );

      if (response.status === 200) {
        // this will apply on next re-render. so we need to use one locally, for now, just to insert it in localstorage
        setUserData((prevUserData) => ({
          ...prevUserData,
          data: {
            ...prevUserData.data,
            votedForNPuserId: whichVotedFor,
          },
        }));

        // this is new object, so we can insert it directly (faster, we don't wait for next re-render..)
        var updatedUserData = {
          ...userData,
          data: { ...userData.data, votedForGPuserId: whichVotedFor },
        };

        // ada, nije sačuvao alo !
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        }
      }
    } catch (error) {
      //console.log(error);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      {/* selection, you put logic for if to show.., in <Radio Button ! */}
      {/*    <div className="flex m-0 justify-start items-center gap-4">
    
        {/* AH and RS selecting NP 
        {((currentUserType === "AH" || currentUserType === "RS" ) && passportStatus === "validated") && (
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
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}

                {otherUsers.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/*  NP's selecting GP.  we have same selection for GP (for GP, it's if one tops another 120% more). 
        {(
          selectedRole === "GP" && passportStatus === "validated" ) && (
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
                value={votedForGP}
                onChange={handleVotedForGP}
                className="w-[200px]"
                style={{ color: "#000" }}
              >
                {top50Users.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}

                {otherUsers.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}


      </div> */}

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

      <div className="mt-8 lexend-font text-black_second">
        <table className="w-full">
          <thead>
            <tr>
             
              <th className="w-[5%]"></th>
              

              <th className="w-[8%]">Votes</th>

              <th className="w-[20%]">Name</th>

              <th className="w-[27%]">Email</th>

              <th className="w-[20%]">Phone</th>

              <th className="w-[20%]">Status</th>

            </tr>
          </thead>
          <tbody>
            {/*  here, it will go currently selected, and it will be green color.. */}
            {top50Users.map((user, index) => (
              <Top50
                /* 
                userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                gender={user.gender}
                votes={user.votes}
                userNPPercentage={user.userNPPercentage} 
*/
                user={user}
                currentUserPassportStatus={passportStatus}
                user_type={currentUserType}
                index={index}
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated}
                selectedRole={selectedRole}
                whichVotedFor={whichVotedFor}
                lastRank={lastRank}
              />
            ))}

            {otherUsers.map((user, index) => (
              <Others
                user={user}
                currentUserPassportStatus={passportStatus}
                user_type={currentUserType}
                index={index}
                lastIndex={otherUsers.length - 1}
                setRankUpdated={setRankUpdated}
                selectedRole={selectedRole}
                whichVotedFor={whichVotedFor}
                setWhichVotedFor={setWhichVotedFor}
                lastRank={lastRank}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-start mt-4    w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={otherPage}
            onChange={handlePaginationChange}
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#FFEAEA",
                  color: "#D24949",
                },
              },
            }}
          />
        </Stack>
      </div>
    </>
  );
};

export { Elections };
