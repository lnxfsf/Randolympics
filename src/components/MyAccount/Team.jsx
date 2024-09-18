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

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Team = () => {
  // more simple pagination

  const [otherUsers, setOtherUsers] = useState([]);
  const [otherPage, setOtherPage] = useState(1);

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

  const [genderFilter, setGenderFilter] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);
      return userJson.data.gender;
    }
  });

  const [categoryFilter, setCategoryFilter] = useState("medium");

  const [maxPages, setMaxPages] = useState(0);

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
    } else if (currentUserType === "AH") {
      return "AH"; // ali, samo koji su više od 50 !! to su ti u team jedini !
    } else if (currentUserType === "GP") {
      // ! GP also sees, globally ! from all countries !  fix that !
      return "LM";
    } else if (currentUserType === "LM") {
      //!  so for managers, they see other managers, globally !
      return "LM";
    } else if (currentUserType === "ITM") {
      return "ITM";
    } else if (currentUserType === "MM") {
      return "MM";
    } else if (currentUserType === "SM") {
      return "SM";
    } else if (currentUserType === "VM") {
      return "VM";
    } else if (currentUserType === "EM") {
      return "EM";
    } else if (currentUserType === "RS") {
      return "RS";
    }
  });

  const [needGender, setNeedGender] = useState("false");

  const changedNeedGender = () => {
    if (selectedRole === "AH") {
      setNeedGender("true");
    } else {
      setNeedGender("false");
    }
  };

  const [searchPlaceholderText, setSearchPlaceholderText] = useState("");

  const changedSearchPlaceholderText = () => {
    if (selectedRole === "AH" || currentUserType === "AH") {
      setSearchPlaceholderText("Athlete");
    } else if (selectedRole === "RS") {
      setSearchPlaceholderText("Referee & Support");
    } else if (selectedRole === "LM") {
      setSearchPlaceholderText("Legal Manager");
    } else if (selectedRole === "ITM") {
      setSearchPlaceholderText("IT Manager");
    } else if (selectedRole === "MM") {
      setSearchPlaceholderText("Marketing Manager");
    } else if (selectedRole === "SM") {
      setSearchPlaceholderText("Sales Manager");
    } else if (selectedRole === "VM") {
      setSearchPlaceholderText("Validation Manager");
    } else if (selectedRole === "EM") {
      setSearchPlaceholderText("Event Manager");
    }
  };

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

    changedSearchPlaceholderText();
    changedNeedGender();

    if (maxPages === 0) {
      getMaxPages();
    }

    if (userId) {
      fetchTeamMates();
    }
  }, [
    userId,
    otherPage,
    searchText,
    selectedRole,
    genderFilter,
    categoryFilter,
    needGender,
  ]);

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  const getMaxPages = async () => {
    try {
      // TODO, you find out what's max num of pages available, in Backend. So you don't have to fetch whole list , in order not to slow down website !
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/team`,
        {
          params: {
            limit: 100000,

            // offset: (page - 1) * 10,

            searchText: searchText,

            userId: userId,
            user_type: selectedRole, // and that's by dropdown, what's selected to show
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
            currentUserType: currentUserType, // if we need to filter by nationality, or see it as globally

            needGender: needGender,

            nationality: code, // we show only from this user country
          },
        }
      );

      setMaxPages(Math.ceil(response.data.length / 10));
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  const fetchTeamMates = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/team`,
        {
          params: {
            limit: 10,
            offset: (otherPage - 1) * 10,

            searchText: searchText,

            userId: userId,
            user_type: selectedRole, // and that's by dropdown, what's selected to show
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
            currentUserType: currentUserType, // if we need to filter by nationality, or see it as globally

            needGender: needGender,

            nationality: code, // we show only from this user country
          },
        }
      );

      setOtherUsers(response.data);
    } catch (error) {
      console.error("Error fetching other users:", error);
    }

    // ----------------

    /*   try {

      let hasMorePages = true;


      for(let page = 0; hasMorePages; page++){
        

      
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/team`,
        {
          params: {
            limit: 10,
            offset: (page - 1) * 10,

            searchText: searchText,

            userId: userId,
            user_type: selectedRole, // and that's by dropdown, what's selected to show
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
            currentUserType: currentUserType, // if we need to filter by nationality, or see it as globally

            needGender: needGender,

            nationality: code, // we show only from this user country
          },
        }
      );



      setMaxPages((prev) => prev + 1 )
      //page = page + 1;

      
      if(response.data.length === 0){

       
        hasMorePages = false;

      } else { 
        setMaxPages((prev) => prev + 1 )
       // page = page + 1;
      }



      console.log("maxpages je")
      console.log(maxPages)

    }
     

    } catch (error) {
      console.error("Error fetching other users:", error);
    }
 */
  };

  const getCurrentNP = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/currentNP`,
        {
          params: {
            nationality: code, // this is, if NP is from DZ "algeria", then, he will be NP for these athletes...
          },
        }
      );

      setCurrentNP(response.data.name);
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
  };

  const handlePaginationChange = (event, value) => {
    setOtherPage(value);
  };

  return (
    <>
      {currentUserType === "AH" && (
        <div className="flex gap-16 lexend-font text-black_second">
          <div className="p-4 ml-0 grow ">
            <p>Your National President</p>
            <p className="text-xl mt-1 font-bold">{currentNP}</p>
          </div>

          <div className="flex flex-col justify-center items-start pl-4 ">
            <p>Country</p>

            <div className="flex justify-center items-center gap-3 mr-4">
              <p className="text-xl font-bold">
                {countryList().getLabel(code)}
              </p>
              <Flag className="flag-photo-team " code={code} />
            </div>
          </div>
        </div>
      )}

      {/* div's, for Search bar and Filter */}
      <div className="flex flex-col w-full sm:flex-row justify-end mt-8 pl-4 pr-4 lexend-font text-black_second">
        <div style={{ marginTop: "-27px", marginRight: "20px" }}>
          {(currentUserType === "NP" || currentUserType === "GP") && (
            <>
              <p className="ml-2 font-bold text-sm">Display</p>

              <FormControl
                className="max-sm:w-full "
                sx={{ m: 1, minWidth: 120 }}
              >
                {currentUserType === "NP" && (
                  <>
                    <Select
                      labelId="roleDropdowns"
                      value={selectedRole}
                      onChange={handleChangeRole}
                      className="w-full sm:w-[200px] h-10"
                      style={{ color: "#000" }}
                    >
                      <MenuItem value={"AH"}>Athletes</MenuItem>
                      <MenuItem value={"RS"}>Referee & Support</MenuItem>
                    </Select>
                  </>
                )}

                {currentUserType === "GP" && (
                  <>
                    <Select
                      labelId="roleDropdowns"
                      value={selectedRole}
                      onChange={handleChangeRole}
                      className="w-full sm:w-[200px]"
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
                )}
              </FormControl>
            </>
          )}
        </div>

        <SearchBar
          value={searchText}
          onChange={(newValue) => setSearchText(newValue)}
          onCancelResearch={(newValue) => setSearchText("")}
          placeholder={"Find " + searchPlaceholderText}
          width="100%"
          onSearch={handleSearch}
          style={{
            border: "1px solid #C6C6C6",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* table */}

      <div className="container-table-mobile">
        <div className="mt-8 p-4 lexend-font text-black_second  table-mobile ">
          <table className="w-full ">
            <thead>
              <tr>
                <th className="w-[15%] tht">Rank</th>

                <th className="w-[25%] tht">Name</th>
                <th className="w-[10%] tht">Age</th>
                <th className="w-[24%] tht">Email</th>
                <th className="w-[15%] tht">Phone</th>
              </tr>
            </thead>
            <tbody>
              {otherUsers.map((user, index) => (
                <TeamList
                  user={user}
                  index={index}
                  selectedRole={selectedRole}
                  currentUserType={currentUserType}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination */}

      <div className="flex justify-center mt-4 w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={otherPage}
            onChange={handlePaginationChange}
            color="primary"
            sx={{
              color: "#000000",
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

      {currentUserType === "NP" && selectedRole == "AH" && (
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
