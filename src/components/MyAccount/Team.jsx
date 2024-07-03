import { HeaderMyProfile } from "./HeaderMyProfile";
import React, { useState, useEffect } from "react";

import Flag from "react-world-flags";

import axios from "axios";
import { Others } from "./Elections/Others";
import SearchBar from "@mkyy/mui-search-bar";

import { TeamList } from "./Elections/TeamList";

import countryList from "react-select-country-list";

import "../../styles/editprofile.scoped.scss";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";



let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Team = () => {
  // more simple pagination

  const [otherUsers, setOtherUsers] = useState([]);
  const [otherPage, setOtherPage] = useState(1);

  const [hasMoreOthers, setHasMoreOthers] = useState(true);

  const [searchText, setSearchText] = useState(""); //search box

  const [userData, setUserData] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.user_type;
    }
  });
  const [userId, setUserId] = useState("");

  const [code, setCode] = useState("");

  const [currentNP, setCurrentNP] = useState("");

  const [genderFilter, setGenderFilter] = useState("M");
  const [categoryFilter, setCategoryFilter] = useState("medium");

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender);
    setCategoryFilter(null); // Reset category filter when gender is selected
  };


  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };
  
  const [selectedRole, setSelectedRole] = useState(() => {
    if (currentUserType === "NP") {
      return "AH";
    }
  });  



  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);
      setUserData(userJson);

      setUserId(userJson.data.userId);
      setCurrentUserType(userJson.data.user_type);

      setCode(userJson.data.nationality);
    }

    getCurrentNP();

    if (userId) {
      

      
      fetchTeamMates();
    }
  }, [userId, otherPage, searchText, selectedRole,genderFilter,categoryFilter ]);




  
  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };


  const fetchTeamMates = async () => {
    try {

      const response = await axios.get(`${BACKEND_SERVER_BASE_URL}/auth/team`, {
        params: {
          limit: 10,
          offset: (otherPage - 1) * 10,

          searchText: searchText,

          userId: userId,
          user_type: selectedRole,
          genderFilter: genderFilter, 
          categoryFilter: categoryFilter,
        },
      });


      console.log("salje userid:" + userId);

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

  const getCurrentNP = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth/currentNP`,
        {}
      );

      setCurrentNP(response.data.name);
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
  };

  const handleNextPage = () => {
    if (hasMoreOthers) {
      setOtherPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (otherPage > 1) {
      setOtherPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <HeaderMyProfile />

      <div className="flex gap-16">
        <div className="m-4 ml-0">
          <p>Your National President</p>
          <p className="text-xl mt-1">{currentNP}</p>
        </div>

        <div className="flex flex-col justify-center items-start pl-4 ">
          <p>Country</p>


          <div className="flex justify-center items-center gap-3">
            <p className="text-xl">{countryList().getLabel(code)}</p>
            <Flag className="flag-photo-team " code={code} />
          </div>
        </div>
      </div>

      {/* // ! add this , search bar to be lower.. */}

      {/* div's, for Search bar and Filter */}
      <div className="flex justify-end mt-8">
     
     
     <div style={{marginTop: "-17px", marginRight: "20px"}}>
       <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              
            >
              <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                <b>Display</b>
              </InputLabel>

             
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
						<MenuItem value={"RS"}>Referee & Support</MenuItem>
						
					  </Select>
					</>
				  )}
            
            </FormControl>

     </div>
     
        <SearchBar
          value={searchText}
          onChange={(newValue) => setSearchText(newValue)}
          onCancelResearch={(newValue) => setSearchText("")}
          placeholder="Find athlete"
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
              <th className="w-[15%]">Rank</th>
              <th className="w-[25%]">Name</th>
              <th className="w-[8%]">Age</th>
              <th className="w-[26%]">Email</th>
              <th className="w-[15%]">Phone</th>
            </tr>
          </thead>
          <tbody>
            {otherUsers.map((user, index) => (
              <TeamList user={user} index={index} />
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
          disabled={otherPage === 1}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          disabled={!hasMoreOthers}
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>


      {(currentUserType === "NP" && selectedRole == "AH" ) && (
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



    </>

  );
};

export { Team };
