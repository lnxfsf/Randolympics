import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";
import { useNavigate } from 'react-router-dom';


import ReactFlagsSelect from "react-flags-select";

import { Button } from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import RestoreIcon from '@mui/icons-material/Restore';
import { FormControl, InputLabel, Select, MenuItem, Divider  } from "@mui/material";


import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";


let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Campaign = () => {
  const [campaigns, setCampaigns] = useState();

  const [campaignsPage, setCampaignsPage] = useState(1);
  const [hasMoreCampaigns, setHasMoreCampaigns] = useState(true);

  const [limit, setLimit] = useState(10);

  
  const [filterGender, setFilterGender] = useState();
  const [filterNationality_selected, setFilterNationality_selected] = useState();

  const navigate = useNavigate();

  // popup
  const popupRef = useRef(null);


  useEffect(() => {
    updateLatestData();
  }, [filterGender,filterNationality_selected]);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listAllCampaigns`,
        {
          params: {
            limit: limit,
            offset: (campaignsPage - 1) * 10,
          },
        }
      );

      console.log(response.data);
      setCampaigns(response.data);
    } catch (e) {
      console.log(e.stack);
    }
  };




  
  const resetFilterFields = () => {
  
    setFilterGender(null);
    setFilterNationality_selected(null)
    
   
  };

  return (
    <>
      <p className="text-3xl">List of all campaigns</p>



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
                  <b>Gender</b>
                </InputLabel>

                <Select
                  labelId="roleDropdowns"
                  value={filterGender}

                  onChange={(event) => { setFilterGender(event.target.value)}}

                  className="w-[300px]"
                  style={{ color: "#000" }}
                >
                 <MenuItem value="">None</MenuItem>
                 <Divider />
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
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


      {campaigns && (
        <>
          {campaigns.map((item, index) => (
            <>


              <div
                key={index}
                className="flex justify-between border-2 m-4 p-2 select-none cursor-pointer"

                onClick={() => navigate(`/campaign/${item.campaignId}`)}
              >
                <div>
                  <p>
                    <b>First name:</b> {item.friendName}
                  </p>
                  <p>
                    <b>Gender:</b>{" "}
                    {item.friendGender === "M" ? "Male" : "Female"}
                  </p>
                </div>

                <div>
                  <Flag className="w-12 m-4" code={item.friendNationality} />
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export { Campaign };
