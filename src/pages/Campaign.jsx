import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";

import SearchBar from "@mkyy/mui-search-bar";

import ReactFlagsSelect from "react-flags-select";
import supportedCountry from "../context/supportedCountry";

import { Button } from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import RestoreIcon from "@mui/icons-material/Restore";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";

import { NavbarHomeCollapsed } from "../components/NavbarHomeCollapsed";



import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

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

  const [filterGender, setFilterGender] = useState("");
  const [filterNationality_selected, setFilterNationality_selected] =
    useState("");

  const [searchFirstNameText, setSearchFirstNameText] = useState(""); //search box
  const [searchPlaceholderFirstNameText, setSearchPlaceholderFirstNameText] =
    useState("first name");

    // for celebrity
  const [searchfb_link, setSearchfb_link] = useState(""); 
  const [searchig_link, setSearchig_link] = useState(""); 
  const [searchtw_link, setSearchtw_link] = useState(""); 
  

  const [searchFamilyNameText, setSearchFamilyNameText] = useState(""); //search box
  const [searchPlaceholderFamilyNameText, setSearchPlaceholderFamilyNameText] =
    useState("family name");

  const navigate = useNavigate();

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
  };

  // popup
  const popupRef = useRef(null);


  // do we filter by celebrity
  const [filterIsCelebrity , setFilterIsCelebrity] = useState(0);




  useEffect(() => {
    updateLatestData();
  }, [
    filterGender,
    filterNationality_selected,
    searchFirstNameText,
    searchFamilyNameText,
    filterIsCelebrity,
    searchfb_link,
    searchig_link,
    searchtw_link,
  ]);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listAllCampaigns`,
        {
          params: {
            limit: limit,
            offset: (campaignsPage - 1) * 10,

            filterGender: filterGender,
            filterNationality_selected: filterNationality_selected,
            searchFirstNameText: searchFirstNameText,
            searchFamilyNameText: searchFamilyNameText,


            isCelebrity: filterIsCelebrity,
            fb_link: searchfb_link,
            ig_link: searchig_link,
            tw_link: searchtw_link,

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
    setFilterGender("");
    setFilterNationality_selected("");
    setSearchFirstNameText("");

    setSearchFamilyNameText("");
    setFilterIsCelebrity(0);

  };

  return (
    <>
      <NavbarHomeCollapsed />

      <div className="mb-32"></div>

      <p className="text-3xl flex justify-center mb-4">List of all campaigns</p>

      <div className="m-4 ml-8 mr-8 flex justify-between items-center">
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
          position="bottom left"
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


            <FormControl >
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={()=> {if(filterIsCelebrity===0){
                  return "no"
                }else {
                  return "yes"
                }}}
                name="radio-buttons-group"
                onChange={(event) => {
                  const value = event.target.value;

                  if (value === "yes") {
                    setFilterIsCelebrity(1);
                    
                  } else if (value === "no") {
                    setFilterIsCelebrity(0);
                   
                  }
                }}
              >
                <FormGroup row>
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label={`Yes`}
                  />
                  <FormControlLabel value="no" control={<Radio />} label={`No`} />
                </FormGroup>
              </RadioGroup>
            </FormControl>
           

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
                onChange={(event) => {
                  setFilterGender(event.target.value);
                }}
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
              countries={supportedCountry}
              selected={filterNationality_selected}
              onSelect={(code) => setFilterNationality_selected(code)}
              className="w-[300px] "
              searchable={true}
              id="nationality"
              name="nationality"
              placeholder="Nationality"
            />


      {/* this is for athlete NON celebrity */}
      {filterIsCelebrity === 0 && (
      <div>
            <div className="flex items-start flex-col">
              <p>First name</p>
              <SearchBar
                value={searchFirstNameText}
                onChange={(newValue) => setSearchFirstNameText(newValue)}
                onCancelResearch={(newValue) => setSearchFirstNameText("")}
                placeholder={"Search " + searchPlaceholderFirstNameText}
                onSearch={handleSearch}
                style={{
                  border: "1px solid #C6C6C6", // Border color and thickness
                  borderRadius: "20px", // Border radius
                }}
              />
            </div>

            <div className="flex items-start flex-col">
              <p>Family name</p>
              <SearchBar
                value={searchFamilyNameText}
                onChange={(newValue) => setSearchFamilyNameText(newValue)}
                onCancelResearch={(newValue) => setSearchFamilyNameText("")}
                placeholder={"Search " + searchPlaceholderFamilyNameText}
                onSearch={handleSearch}
                style={{
                  border: "1px solid #C6C6C6", // Border color and thickness
                  borderRadius: "20px", // Border radius
                }}
              />
            </div>
      </div>
)}


  {/* this is for athlete CELEBRITY */}
  {filterIsCelebrity === 1 && (
      <div>

<div className="flex items-start flex-col">
              <p>First name</p>
              <SearchBar
                value={searchFirstNameText}
                onChange={(newValue) => setSearchFirstNameText(newValue)}
                onCancelResearch={(newValue) => setSearchFirstNameText("")}
                placeholder={"Search " + searchPlaceholderFirstNameText}
                onSearch={handleSearch}
                style={{
                  border: "1px solid #C6C6C6", // Border color and thickness
                  borderRadius: "20px", // Border radius
                }}
              />
            </div>


            <div className="flex items-start flex-col">
              <p>Facebook link</p>
              <SearchBar
                value={searchfb_link}
                onChange={(newValue) => setSearchfb_link(newValue)}
                onCancelResearch={(newValue) => setSearchfb_link("")}
             /*  placeholder={""}  */
                onSearch={handleSearch}
                style={{
                  border: "1px solid #C6C6C6", // Border color and thickness
                  borderRadius: "20px", // Border radius
                }}
              />
            </div>


            <div className="flex items-start flex-col">
              <p>Instagram link</p>
              <SearchBar
                value={searchig_link}
                onChange={(newValue) => setSearchig_link(newValue)}
                onCancelResearch={(newValue) => setSearchig_link("")}
                /* placeholder={"Search " + searchPlaceholderFirstNameText} */
                onSearch={handleSearch}
                style={{
                  border: "1px solid #C6C6C6", // Border color and thickness
                  borderRadius: "20px", // Border radius
                }}
              />
            </div>


            <div className="flex items-start flex-col">
              <p>Twitter (X) link</p>
              <SearchBar
                value={searchtw_link}
                onChange={(newValue) => setSearchtw_link(newValue)}
                onCancelResearch={(newValue) => setSearchtw_link("")}
               /*  placeholder={"Search " + searchPlaceholderFamilyNameText} */
                onSearch={handleSearch}
                style={{
                  border: "1px solid #C6C6C6", // Border color and thickness
                  borderRadius: "20px", // Border radius
                }}
              />
            </div>
      </div>
)}


          </div>
        </Popup>

        <SearchBar
          className="ml-2"
          value={searchFirstNameText}
          onChange={(newValue) => setSearchFirstNameText(newValue)}
          onCancelResearch={(newValue) => setSearchFirstNameText("")}
          placeholder={"Search " + searchPlaceholderFirstNameText}
          onSearch={handleSearch}
          style={{
            border: "1px solid #C6C6C6", // Border color and thickness
            borderRadius: "20px", // Border radius
          }}
        />
      </div>

      {campaigns && (
        <>
          {campaigns.map((item, index) => (
            <>
              <div className="flex justify-center items-center ">
                <div
                  key={index}
                  /*   className="flex justify-between border-2 m-4 p-2 select-none cursor-pointer" */
                  onClick={() => navigate(`/campaign/${item.campaignId}`)}
                  className="p-4 w-[95%] h-20 bg-body_news  cursor-pointer flex justify-between items-center mt-1 mb-1 campaign-container-list rounded-lg"
                >
                  <div>
                    <p>
                      <b>Name:</b> {item.friendName} {item.friendMiddleName}{" "}
                      {item.friendLastName}
                    </p>
                    <p>
                      <b>Gender:</b>{" "}
                      {item.friendGender === "M" ? "Male" : "Female"}
                    </p>
                  </div>

                  {item.isCelebrity ? (
                    <img
                      className=" ml-auto w-6 m-4"
                      src="/supporters/celebrity_icon.svg"
                    />
                  ) : (
                    <></>
                  )}

                  <div>
                    <Flag className="w-12 " code={item.friendNationality} />
                  </div>
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
