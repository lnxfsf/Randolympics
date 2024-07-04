import { HeaderMyProfile } from "./HeaderMyProfile";
import { PassVerify } from "./Elections/PassVerify";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@mui/material";

import SearchBar from "@mkyy/mui-search-bar";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import TuneIcon from "@mui/icons-material/Tune";
import RestoreIcon from '@mui/icons-material/Restore';

import ReactFlagsSelect from "react-flags-select";

import { FormControl, InputLabel, Select, MenuItem, Divider  } from "@mui/material";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const PassportVrfy = () => {
  // so, this is all users !
  const [listOfUsers, setListOfUsers] = useState([]);

  const [hasMoreListAllUsers, setHasMoreListAllUsers] = useState(true);

  const [listOfUsersPage, setlistOfUsersPage] = useState(1);

  const [updatedPassport, setUpdatedPassport] = useState(false); //just a toogle, so we trigger refresh, from <PassVerify /> which displays <data value="" styleName={}></data>
  // TODO, you will need to filter by user_type, obviously ! if it's "AH", "GP", so it's easier to verify their passports !
  // TODO , as well to put dropdown for what are you selecting "unverified" passports... possibly, there will be "verified", and stuff (for now, there put "All", so that means no filter for that one !). yea, makes sense
  // TODO, and maybe, you add gender filter.. but that later, only if he says we needs

  const popupRef = useRef(null);

  const [searchText, setSearchText] = useState(""); //search box

  const [filterRole, setFilterRole] = useState();
  const [filterNationality_selected, setFilterNationality_selected] = useState();
  const [filterPassportStatus, setFilterPassportStatus] = useState();

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value)
  }


  const handleFilterPassportStatus = (event) => {
    setFilterPassportStatus(event.target.value);
  }

  const resetFilterFields = () => {
    setFilterRole();
    setFilterNationality_selected();
    setFilterPassportStatus();
  }



  useEffect(() => {
    fetchlistOfUsers();
  }, [listOfUsersPage, updatedPassport, searchText, filterRole, filterNationality_selected, filterPassportStatus ]);

  const fetchlistOfUsers = async () => {
    // yes, fetch all if there's no filter... ofc, it will fetch 10 by 10 (pages..)
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth/listAllUsers`,
        {
          params: {
            limit: 10,
            offset: (listOfUsersPage - 1) * 10,

            user_type: filterRole,  // to also filter by user_type

            searchText: searchText,

    
            

            nationality: filterNationality_selected,  // ! also by nationality as well (to easy filter out stuff... )

            passportStatus: filterPassportStatus,

            // genderFilter: genderFilter, // ! i ovo kasnije..
            /*     categoryFilter: categoryFilter,  // */
          },
        }
      );
      setListOfUsers(response.data);

      console.log(response.data);

      // Check if we should switch to showing other users
      if (response.data.length < 10) {
        setHasMoreListAllUsers(false);
      } else {
        setHasMoreListAllUsers(true);
      }
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
      <HeaderMyProfile />

      {/* div's, for Search bar and Filter */}
      <div className="flex justify-between">
        <div className="m-4 flex justify-center items-center">
          <Popup
            ref={popupRef}
            trigger={
              <Button
                startIcon={<TuneIcon />}
                className="w-[90px] "
                style={{
                  margin: "0px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
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
                <span className="popins-font">Filter</span>
              </Button>
            }
            position="bottom center"
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
                <span className="popins-font">Reset fields</span>
              </Button>
           
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="m-4 ml-0 mb-1"
            >
              <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                <b>Role</b>
              </InputLabel>

              <Select
                labelId="roleDropdowns"
                value={filterRole}
                onChange={handleFilterRole} 
                className="w-[300px]"
                style={{ color: "#000" }}
              >
               

               <MenuItem value="">None</MenuItem>
               <Divider />
                <MenuItem value="AH">Athlete</MenuItem>
                <MenuItem value="GP">Global President</MenuItem>
       



                <MenuItem value="NP">National President</MenuItem>
                <MenuItem value="EM">Event Manager</MenuItem>
                <MenuItem value="ITM">IT Manager Page editor</MenuItem>
                <MenuItem value="MM">Marketing Manager</MenuItem>
                <MenuItem value="SM">Sales Manager</MenuItem>


                <MenuItem value="VM">Validation Manager</MenuItem>
                <MenuItem value="LM">Legal Manager</MenuItem>
                <MenuItem value="RS">Referee & Support</MenuItem>
            

              </Select>
            </FormControl>


            <ReactFlagsSelect
                  selected={filterNationality_selected}
                  onSelect={(code) => setFilterNationality_selected(code)}
                  className="w-[300px]  "
                  searchable={true}
                  id="nationality"
                  name="nationality"
                  placeholder="Nationality"
                />


<FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="m-4 ml-0 mb-1"
            >
              <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                <b>Passport status</b>
              </InputLabel>

              <Select
                labelId="roleDropdowns"
                value={filterPassportStatus}
                onChange={handleFilterPassportStatus} 
                className="w-[300px]"
                style={{ color: "#000" }}
              >
               

               <MenuItem value="">None</MenuItem>
               <Divider />
                <MenuItem value="unvalidated">Unvalidated</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
                <MenuItem value="validated">Validated</MenuItem>
       




              </Select>
            </FormControl>


            </div>
          </Popup>
        </div>

        <div className="m-4">
          <SearchBar
            value={searchText}
            onChange={(newValue) => setSearchText(newValue)}
            onCancelResearch={(newValue) => setSearchText("")}
            onSearch={handleSearch}
            style={{
              border: "1px solid #C6C6C6", // Border color and thickness
              borderRadius: "20px", // Border radius
            }}
            placeholder="Search by name"
          />
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[15%]">Name</th>
              <th className="w-[13%]">Country</th>{" "}
              {/* ovo napravi kao flag !! lakse je !  (ionako moraš, da dodjes do toga, i dadneš mu  country_code, i prikazuje sa imenom, al sa slikom je bolje ionako...) */}
              <th className="w-[13%]">Role</th> {/* user_type */}
              <th className="w-[12%]">Passport status</th>{" "}
              {/* Passport status verification, polje u database */}
              <th className="w-[12%]">Account created</th>{" "}
              {/* imaš onaj "createdAt", to je od sequelize dolazi (kad je kreirao taj row..) */}
              <th className="w-[12%]">Passport uploaded</th>{" "}
              {/* znači, moraces da upises datum, kada uspesno sačuvas passport image ! (kad se upload-uje !) */}
              <th className="w-[12%]">Last Validated / rejected date</th>
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

      <div className="flex justify-center mt-4">
        <button
          disabled={listOfUsersPage === 1}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          disabled={!hasMoreListAllUsers}
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export { PassportVrfy };
