import { HeaderMyProfile } from "./HeaderMyProfile";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      setSearchPlaceholderText(t("userTypes.user_type1"));
    } else if (selectedRole === "RS") {
      setSearchPlaceholderText(t("userTypes.user_type11"));
    } else if (selectedRole === "LM") {
      setSearchPlaceholderText(t("userTypes.user_type10"));
    } else if (selectedRole === "ITM") {
      setSearchPlaceholderText(t("userTypes.user_type5"));
    } else if (selectedRole === "MM") {
      setSearchPlaceholderText(t("userTypes.user_type7"));
    } else if (selectedRole === "SM") {
      setSearchPlaceholderText(t("userTypes.user_type8"));
    } else if (selectedRole === "VM") {
      setSearchPlaceholderText(t("userTypes.user_type9"));
    } else if (selectedRole === "EM") {
      setSearchPlaceholderText(t("userTypes.user_type4"));
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

      console.log("team, does it get count");
      console.log(response);


      
      setMaxPages(Math.ceil(response.data.count / 10));
      setOtherUsers(response.data.rows);


    } catch (error) {
      console.error("Error fetching other users:", error);
    }

   
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
            <p>{t("myprofile.team.content1")}</p>
            <p className="text-xl mt-1 font-bold">{currentNP}</p>
          </div>

          <div className="flex flex-col justify-center items-start pl-4 ">
            <p>{t("myprofile.team.content2")}</p>

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
              <p className="ml-2 font-bold text-sm">
                {t("myprofile.team.content3")}
              </p>

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
                      <MenuItem value={"AH"}>
                        {t("userTypes.user_type1")}
                      </MenuItem>
                      <MenuItem value={"RS"}>
                        {t("userTypes.user_type11")}
                      </MenuItem>
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
                      <MenuItem value={"LM"}>
                        {t("userTypes.user_type10")}
                      </MenuItem>
                      <MenuItem value={"ITM"}>
                        {t("userTypes.user_type5")}
                      </MenuItem>

                      <MenuItem value={"MM"}>
                        {t("userTypes.user_type7")}
                      </MenuItem>
                      <MenuItem value={"SM"}>
                        {t("userTypes.user_type8")}
                      </MenuItem>
                      <MenuItem value={"VM"}>
                        {t("userTypes.user_type9")}
                      </MenuItem>
                      <MenuItem value={"EM"}>
                        {t("userTypes.user_type4")}
                      </MenuItem>
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
          placeholder={
            t("myprofile.team.content4") + " " + searchPlaceholderText
          }
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
                <th className="w-[15%] tht">{t("myprofile.team.table4")}</th>

                <th className="w-[25%] tht">{t("myprofile.team.table1")}</th>
                <th className="w-[10%] tht">{t("myprofile.team.table2")}</th>
                <th className="w-[24%] tht">{t("myprofile.team.table3")}</th>
                <th className="w-[15%] tht">{t("myprofile.team.table5")}</th>
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

      {currentUserType === "NP" && selectedRole == "AH" && (
        <>
          <div>
            <div>
              <h2>{t("myprofile.team.table6")}:</h2>
              <div>
                <button
                  className={`gender-button ${
                    genderFilter === "M" ? "male active" : ""
                  }`}
                  onClick={() => handleGenderFilter("M")}
                  disabled={genderFilter === "M"}
                >
                  {t("myprofile.team.table8")}
                </button>
                <button
                  className={`gender-button ${
                    genderFilter === "F" ? "female active" : ""
                  }`}
                  onClick={() => handleGenderFilter("F")}
                  disabled={genderFilter === "F"}
                >
                  {t("myprofile.team.table9")}
                </button>
              </div>
            </div>

            <div className="button-container">
              <h2>{t("myprofile.team.table7")}:</h2>
              <div>
                <button
                  className={`category-button ${
                    categoryFilter === "heavy" ? "heavy active" : ""
                  }`}
                  onClick={() => handleCategoryFilter("heavy")}
                  disabled={categoryFilter === "heavy"}
                >
                  {t("myprofile.team.table10")}
                </button>
                <button
                  className={`category-button ${
                    categoryFilter === "medium" ? "medium active" : ""
                  }`}
                  onClick={() => handleCategoryFilter("medium")}
                  disabled={categoryFilter === "medium"}
                >
                  {t("myprofile.team.table11")}
                </button>
                <button
                  className={`category-button ${
                    categoryFilter === "light" ? "light active" : ""
                  }`}
                  onClick={() => handleCategoryFilter("light")}
                  disabled={categoryFilter === "light"}
                >
                  {t("myprofile.team.table12")}
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
