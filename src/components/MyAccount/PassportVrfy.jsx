import { HeaderMyProfile } from "./HeaderMyProfile";
import { PassVerify } from "./Elections/PassVerify";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import { useTranslation } from "react-i18next";

import SearchBar from "@mkyy/mui-search-bar";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import TuneIcon from "@mui/icons-material/Tune";
import RestoreIcon from "@mui/icons-material/Restore";

import ReactFlagsSelect from "react-flags-select";
import supportedCountry, { getTranslatedCountries  } from "../../context/supportedCountry";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import { WarningPassportMessage } from "./WarningPassportMessage";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const PassportVrfy = () => {
  const { t } = useTranslation();

  // so, this is all users !
  const [listOfUsers, setListOfUsers] = useState([]);
  const [maxPages, setMaxPages] = useState(0);

  const [hasMoreListAllUsers, setHasMoreListAllUsers] = useState(true);

  const [listOfUsersPage, setlistOfUsersPage] = useState(1);

  const [updatedPassport, setUpdatedPassport] = useState(false); //just a toogle, so we trigger refresh, from <PassVerify /> which displays <data value="" styleName={}></data>
  // TODO, you will need to filter by user_type, obviously ! if it's "AH", "GP", so it's easier to verify their passports !
  // TODO , as well to put dropdown for what are you selecting "unverified" passports... possibly, there will be "verified", and stuff (for now, there put "All", so that means no filter for that one !). yea, makes sense
  // TODO, and maybe, you add gender filter.. but that later, only if he says we needs

  const popupRef = useRef(null);

  const [searchText, setSearchText] = useState(""); //search box

  const [filterRole, setFilterRole] = useState();
  const [filterNationality_selected, setFilterNationality_selected] =
    useState();
  const [filterPassportStatus, setFilterPassportStatus] = useState();

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleFilterPassportStatus = (event) => {
    setFilterPassportStatus(event.target.value);
  };

  const handlePaginationChange = (event, value) => {
    setlistOfUsersPage(value);
  };

  const resetFilterFields = () => {
    setFilterRole();
    setFilterNationality_selected();
    setFilterPassportStatus();
  };

  useEffect(() => {
    fetchlistOfUsers();
  }, [
    listOfUsersPage,
    updatedPassport,
    searchText,
    filterRole,
    filterNationality_selected,
    filterPassportStatus,
  ]);

  const fetchlistOfUsers = async () => {
    // yes, fetch all if there's no filter... ofc, it will fetch 10 by 10 (pages..)
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/user/listAllUsers`,
        {
          params: {
            limit: 10,
            offset: (listOfUsersPage - 1) * 10,

            user_type: filterRole, // to also filter by user_type

            searchText: searchText,

            nationality: filterNationality_selected, // ! also by nationality as well (to easy filter out stuff... )

            passportStatus: filterPassportStatus,

            // genderFilter: genderFilter, // ! i ovo kasnije..
            /*     categoryFilter: categoryFilter,  // */
          },
        }
      );

      setMaxPages(Math.ceil(response.data.count / 10));
      setListOfUsers(response.data.rows);
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
  };

  const handleNextPage = () => {
    if (hasMoreListAllUsers) {
      setlistOfUsersPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (listOfUsersPage > 1) {
      setlistOfUsersPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <WarningPassportMessage />

      {/* div's, for Search bar and Filter */}
      <div className="flex justify-between">
        <div className="m-4 w-full">
          <SearchBar
            value={searchText}
            onChange={(newValue) => setSearchText(newValue)}
            onCancelResearch={(newValue) => setSearchText("")}
            onSearch={handleSearch}
            style={{
              border: "1px solid #C6C6C6",
              borderRadius: "10px",
            }}
            placeholder={t("myprofile.validationPassport.content1")}
            width="100%"
          />
        </div>

        <div className="m-4 flex justify-center items-center">
          <Popup
            ref={popupRef}
            trigger={
              <Button
                startIcon={<img src="supporters/filter.svg" className="w-5" />}
                className="w-[150px] md:w-[120px]"
                style={{
                  margin: "0px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  textTransform: "none",
                }}
                sx={{
                  /*  fontSize: "8pt", */
                  height: "40px",
                  bgcolor: "#fff",
                  color: "#232323",
                  borderRadius: 2,
                  border: `1px solid #CACAD0`,
                }}
              >
                <span className="lexend-font text-black_second font-bold">
                  {t("login.content18")}
                </span>
              </Button>
            }
            position="bottom right"
            contentStyle={{ width: "auto" }}
            closeOnDocumentClick={false}
          >
            <div className="flex flex-col justify-center items-center">
              <Button
                onClick={resetFilterFields}
                startIcon={<RestoreIcon />}
                className="w-[150px] "
                style={{
                  marginTop: "10px",
                }}
                sx={{
                  fontSize: "8pt",
                  height: "30px",
                  bgcolor: "#fff",
                  color: "#232323",
                  borderRadius: 15,
                  border: `1px solid #000`,
                  "&:hover": {
                    background: "rgb(00, 00, 00)",
                    color: "white",
                    border: `1px solid rgb(00, 00, 00)`,
                  },
                }}
              >
                <span className="lexend-font">{t("login.content19")}</span>
              </Button>

              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className="m-4 ml-0 mb-1"
              >
                <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                  <b>{t("login.content20")}</b>
                </InputLabel>

                <Select
                  labelId="roleDropdowns"
                  value={filterRole}
                  onChange={handleFilterRole}
                  className="w-[300px]"
                  style={{ color: "#000" }}
                >
                  <MenuItem value="">{t("login.content21")}</MenuItem>
                  <Divider />
                  <MenuItem value="AH">{t("login.content22")}</MenuItem>
                  <MenuItem value="GP">{t("login.content23")}</MenuItem>

                  <MenuItem value="NP">{t("login.content24")}</MenuItem>
                  <MenuItem value="EM">{t("login.content25")}</MenuItem>
                  <MenuItem value="ITM">{t("login.content26")}</MenuItem>
                  <MenuItem value="MM">{t("login.content27")}</MenuItem>
                  <MenuItem value="SM">{t("login.content28")}</MenuItem>

                  <MenuItem value="VM">{t("login.content29")}</MenuItem>
                  <MenuItem value="LM">{t("login.content30")}</MenuItem>
                  <MenuItem value="RS">{t("login.content31")}</MenuItem>
                </Select>
              </FormControl>

              <ReactFlagsSelect
                countries={supportedCountry}
                selected={filterNationality_selected}
                onSelect={(code) => setFilterNationality_selected(code)}
                className="w-[300px]  "
                searchable={true}
                id="nationality"
                name="nationality"
                placeholder={t("login.content32")}
                selectButtonClassName="h-14"
                searchPlaceholder={t("flagsDropdown.search_placeholder")}
                customLabels={getTranslatedCountries()}
              />

              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
                className="m-4 ml-0 mb-1"
              >
                <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                  <b>{t("myprofile.validationManager.content23")}</b>
                </InputLabel>

                <Select
                  labelId="roleDropdowns"
                  value={filterPassportStatus}
                  onChange={handleFilterPassportStatus}
                  className="w-[300px]"
                  style={{ color: "#000" }}
                >
                  <MenuItem value="">
                    {t("myprofile.validationManager.role1")}
                  </MenuItem>
                  <Divider />
                  <MenuItem value="unvalidated">
                    {t("myprofile.validationManager.userUnvalidated")}
                  </MenuItem>
                  <MenuItem value="rejected">
                    {t("myprofile.validationManager.userRejected")}
                  </MenuItem>
                  <MenuItem value="validated">
                    {t("myprofile.validationManager.userValidated")}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </Popup>
        </div>
      </div>

      <div className="container-table-mobile">
        <div className="mt-8 p-4 lexend-font text-black_second  table-mobile ">
          <table className="w-full">
            <thead>
              <tr>
                <th className="w-[20%]">
                  {t("myprofile.validationManager.content24")}
                </th>
                <th className="w-[7%]">
                  {t("myprofile.validationManager.content25")}
                </th>{" "}
                {/* ovo napravi kao flag !! lakse je !  (ionako moraš, da dodjes do toga, i dadneš mu  country_code, i prikazuje sa imenom, al sa slikom je bolje ionako...) */}
                <th className="w-[20%]">
                  {t("myprofile.validationManager.content26")}
                </th>{" "}
                {/* user_type */}
                <th className="w-[20%] text-center">
                  {t("myprofile.validationManager.content22")}
                </th>{" "}
                {/* Passport status verification, polje u database */}
                <th className="w-[20%]">
                  {t("myprofile.validationManager.content27")}
                </th>{" "}
                {/* imaš onaj "createdAt", to je od sequelize dolazi (kad je kreirao taj row..) */}
                {/*  <th className="w-[12%]">Passport uploaded</th>{" "} */}
                {/* znači, moraces da upises datum, kada uspesno sačuvas passport image ! (kad se upload-uje !) */}
                {/*  <th className="w-[12%]">Last Validated / rejected date</th> */}
              </tr>
            </thead>
            <tbody>
              {listOfUsers.map((user, index) => (
                <PassVerify
                  user={user}
                  index={index}
                  setUpdatedPassport={setUpdatedPassport}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center items-start mt-4 w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={listOfUsersPage}
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

export { PassportVrfy };
