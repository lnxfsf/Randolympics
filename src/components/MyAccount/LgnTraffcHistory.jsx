import { HeaderMyProfile } from "./HeaderMyProfile";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LoginAndTraffic } from "./Elections/LoginAndTraffic";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


import { Button } from "@mui/material";



import TuneIcon from "@mui/icons-material/Tune";
import RestoreIcon from '@mui/icons-material/Restore';

import ReactFlagsSelect from "react-flags-select";
import supportedCountry from "../../context/supportedCountry";

import { FormControl, InputLabel, Select, MenuItem, Divider  } from "@mui/material";


let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const LgnTraffcHistory = () => {
  const [listOfLogins, setListOfUsers] = useState([]);

  const [listOfLoginsPage, setListOfUsersPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  

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
        `${BACKEND_SERVER_BASE_URL}/listsData/listLoginTrafficHistory`,
        {
          params: {
            limit: 10,
            offset: (listOfLoginsPage - 1) * 10,

            user_type: filterRole,  // to also filter by user_type

            nationality: filterNationality_selected,
          },
        }
      );

      setMaxPages(Math.ceil(response.data.count / 10));
      setListOfUsers(response.data.rows);

    
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };


  
  const handlePaginationChange = (event, value) => {
    setListOfUsersPage(value);
  };

  

  return (
    <>
    
    

      <div className="flex justify-between items-center lexend-font text-black_second p-2">
        <p className="text-lg md:text-xl font-medium">Login & Traffic History</p>
        <div className="m-4 flex justify-center items-center">
       
          <Popup
            ref={popupRef}
            trigger={
              <Button
                startIcon={<TuneIcon />}
                className="w-full md:w-[90px] "
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
            position="bottom right"
            contentStyle={{ width: "auto" }}
            closeOnDocumentClick={false}
          >
            <div className="flex flex-col justify-center items-center w-full">
              <Button
                onClick={resetFilterFields}
                startIcon={<RestoreIcon />}
                className="w-full md:w-[150px] "
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
                  className="w-full md:w-[300px]"
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
              
              countries={supportedCountry}
                selected={filterNationality_selected}
                onSelect={(code) => setFilterNationality_selected(code)}
                className="w-full md:w-[300px]  "
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
        <table className="w-full lexend-font text-black_second">
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




      
      <div className="flex justify-center items-start mt-4    w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={listOfLoginsPage}
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

export { LgnTraffcHistory };
