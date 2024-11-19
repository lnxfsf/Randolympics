import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderMyProfile } from "./HeaderMyProfile";
import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import moment from "moment";

import "../../styles/elections.scoped.scss";

import { useTranslation } from "react-i18next";
import SearchBar from "@mkyy/mui-search-bar";
import { WarningPassportMessage } from "./WarningPassportMessage";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Elections = () => {
  const { t } = useTranslation();

  const [passportStatus, setPassportStatus] = useState();

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

  const [gvotedForId, setGVotedForId] = useState(null);
  const [gname, setGName] = useState("");
  const [glastName, setGLastName] = useState("");

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

  const getUserVotedFor = () => {
    if (userData) {
      return userData.data.votedForNPuserId || userData.data.votedForGPuserId;
    }

  };

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
    
  };

  const handlePaginationChange = (event, value) => {
    setOtherPage(value);
  };

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
      <WarningPassportMessage />

      <div className="w-full flex justify-center flex-col gap-4 lexend-font text-black_second">
       
       {top50Users[0] && (<>
        <div className="bg-gray_second p-4 flex gap-2 w-[97%] justify-start  ">
          <img src="/myaccount/ballot.svg" />

          <p>
            {t('myprofile.elections.votedfor1')}
            <a
              className="text-red_second font-medium"
              href={`profile/${getUserVotedFor()}`}
            >
             {top50Users[0] && (<>{top50Users[0].name} {top50Users[0].lastName}</>)}
            </a>
            . {t('myprofile.elections.votedfor2')}
          </p>

          <p></p>
        </div>
        </>)}

        <div className="elections_header  w-[97%] rounded-xl  p-4">
          <p className="font-semibold text-lg md:text-xl mb-2">{currentUserType === "AH" ? t('myprofile.elections.votenp1') : t('myprofile.elections.votegp1')  }</p>

          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full flex items-start gap-2">
              <img src="/myaccount/info.svg" className="mt-2" />

              <div className="grow mt-1">
                <p className="font-bold">{t('myprofile.elections.vote1')}</p>
                <p>{currentUserType === "AH" ? t('myprofile.elections.votenp') : t('myprofile.elections.votegp')  }</p>
              </div>
            </div>

            <div className="w-full flex items-start gap-2">
              <img src="/myaccount/vote.svg" className="mt-2" />

              <div className="grow mt-1">
                <p className="font-bold">{t('myprofile.elections.vote2')}</p>
                <p>{t('myprofile.elections.vote3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* div's, for Search bar and Filter */}
      <div className="flex flex-col w-full sm:flex-row justify-end mt-8 pl-4 pr-4 lexend-font text-black_second">
        <SearchBar
          value={searchText}
          onChange={(newValue) => setSearchText(newValue)}
          onCancelResearch={(newValue) => setSearchText("")}
          onSearch={handleSearch}
          style={{
            border: "1px solid #C6C6C6", // Border color and thickness
            borderRadius: "10px", // Border radius
          }}
          width="100%"
        />
      </div>

      {/* table */}
      <div className="container-table-mobile">
        <div className="mt-8 p-4 lexend-font text-black_second  table-mobile ">
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
      </div>

      {/* pagination */}
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
