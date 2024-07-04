import { HeaderMyProfile } from "./HeaderMyProfile";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LoginAndTraffic } from "./Elections/LoginAndTraffic";


import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


import { Button } from "@mui/material";



import TuneIcon from "@mui/icons-material/Tune";
import RestoreIcon from '@mui/icons-material/Restore';

import ReactFlagsSelect from "react-flags-select";

import { FormControl, InputLabel, Select, MenuItem, Divider  } from "@mui/material";


let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const LgnTraffcHistory = () => {
  const [listOfLogins, setListOfUsers] = useState([]);

  const [listOfLoginsPage, setListOfUsersPage] = useState(1);

  const [hasMoreListOfLogins, setHasMoreListOfLogins] = useState(true);


  const [filterRole, setFilterRole] = useState();
  const [filterNationality_selected, setFilterNationality_selected] = useState(() => {
    // it uses currently user's country, just so it displays less, when first loaded. and just can filter later on by country.. 

    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

      if (storedData) {
        const userJson = JSON.parse(storedData);
        return userJson.data.nationality; // 
      }

  });




  // popup
  const popupRef = useRef(null);





  useEffect(() => {
    fetchlistOfLogins();
  }, [listOfLoginsPage, filterRole, filterNationality_selected]);

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const resetFilterFields = () => {
    setFilterRole();
    setFilterNationality_selected();
   
  };

  const fetchlistOfLogins = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth/listLoginTrafficHistory`,
        {
          params: {
            limit: 10,
            offset: (listOfLoginsPage - 1) * 10,

            user_type: filterRole,  // to also filter by user_type

            nationality: filterNationality_selected,
          },
        }
      );
      setListOfUsers(response.data);

      console.log(response.data);

      // Check if we should switch to showing other users
      if (response.data.length < 10) {
        setHasMoreListOfLogins(false);
      } else {
        setHasMoreListOfLogins(true);
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };




  const handleNextPage = () => {
    if (hasMoreListOfLogins) {
        setListOfUsersPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (listOfLoginsPage > 1) {
        setListOfUsersPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <HeaderMyProfile />

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

             
            </div>
          </Popup>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[15%]">Role</th>
              <th className="w-[13%]">Country</th>
              <th className="w-[13%]">Number of logins</th> {/* user_type */}
            </tr>
          </thead>
          <tbody>
            {listOfLogins.map((row, index) => (
              <LoginAndTraffic row={row} index={index} />
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-center mt-4">
        <button
          disabled={listOfLoginsPage === 1}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          disabled={!hasMoreListOfLogins}
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>


    </>
  );
};

export { LgnTraffcHistory };
