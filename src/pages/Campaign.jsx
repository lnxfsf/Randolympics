import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";

import SearchBar from "@mkyy/mui-search-bar";

import ReactFlagsSelect from "react-flags-select";
import supportedCountry from "../context/supportedCountry";

import { Button, Avatar } from "@mui/material";

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
import { useTranslation } from "react-i18next";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Navbar } from "../components/Navbar";
import { FooterClean } from "../components/FooterClean";

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Campaign = () => {

 

  function formatNumber(value) {
    const number = Number(value);

    if (number >= 1000000) {
      return (number / 1000000).toFixed(0) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(0) + "k";
    } else {
      return number.toString(); // Less than 1000
    }
  }

  const [maxPages, setMaxPages] = useState(0);

  const [resultsAmount, setResultsAmount] = useState();

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
  const [filterIsCelebrity, setFilterIsCelebrity] = useState(0);

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
    campaignsPage,
    filterIsCelebrity,
  ]);

  const { t } = useTranslation();

  const handlePaginationChange = (event, value) => {
    setCampaignsPage(value);
  };

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

      setMaxPages(Math.ceil(response.data.count / 10));
      setResultsAmount(response.data.count);

      setCampaigns(response.data.rows);
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
      <Navbar />

      <div className="min-h-screen">
        <div className="flex justify-center items-center mt-4 ">
          <div className="w-full md:w-[50%] flex justify-between  items-center gap-6 p-2">
            <p className="text-xl md:text-3xl flex justify-center  lexend-font text-black_second font-bold">
              {t("campaign.content54")}
            </p>

            <Popup
              ref={popupRef}
              trigger={
                <Button
                  startIcon={
                    <img src="supporters/filter.svg" className="w-5" />
                  }
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
                    {t("campaign.content55")}
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
                    marginBottom: "10px",
                  }}
                  sx={{
                    fontSize: "8pt",
                    height: "30px",
                    bgcolor: "#fff",
                    color: "#232323",
                    borderRadius: 2,
                    border: `1px solid #000`,
                  }}
                >
                  <span className="popins-font">{t("campaign.content56")}</span>
                </Button>

                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={() => {
                      if (filterIsCelebrity === 0) {
                        return "no";
                      } else {
                        return "yes";
                      }
                    }}
                    name="radio-buttons-group"
                    onChange={(event) => {
                      const value = event.target.value;

                      if (value === "yes") {
                        setFilterIsCelebrity(1);
                        setCampaignsPage(1);
                      } else if (value === "no") {
                        setFilterIsCelebrity(0);
                        setCampaignsPage(1);
                      }
                    }}
                  >
                    <FormGroup row>
                      <FormControlLabel
                        value="yes"
                        control={
                          <Radio
                            sx={{
                              color: "#444444",
                              "&.Mui-checked": {
                                color: "#444444",
                              },
                            }}
                          />
                        }
                        label={`Celebrity`}
                      />
                      <FormControlLabel
                        value="no"
                        control={
                          <Radio
                            sx={{
                              color: "#444444",
                              "&.Mui-checked": {
                                color: "#444444",
                              },
                            }}
                          />
                        }
                        label={`Athlete`}
                      />
                    </FormGroup>
                  </RadioGroup>
                </FormControl>

                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  className="m-4 ml-0 mb-1"
                >
                  <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                    <b>{t("campaign.content28")}</b>
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
                    <MenuItem value="">{t("campaign.content57")}</MenuItem>
                    <Divider />
                    <MenuItem value="M">{t("campaign.content29")}</MenuItem>
                    <MenuItem value="F">{t("campaign.content30")}</MenuItem>
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
                      <p>{t("campaign.content25")}</p>
                      <SearchBar
                        value={searchFirstNameText}
                        onChange={(newValue) =>
                          setSearchFirstNameText(newValue)
                        }
                        onCancelResearch={(newValue) =>
                          setSearchFirstNameText("")
                        }
                        placeholder={t("campaign.content99") + searchPlaceholderFirstNameText}
                        onSearch={handleSearch}
                        style={{
                          border: "1px solid #C6C6C6", // Border color and thickness
                          borderRadius: "10px", // Border radius
                        }}
                      />
                    </div>

                    <div className="flex items-start flex-col">
                      <p>{t("campaign.content58")}</p>
                      <SearchBar
                        value={searchFamilyNameText}
                        onChange={(newValue) =>
                          setSearchFamilyNameText(newValue)
                        }
                        onCancelResearch={(newValue) =>
                          setSearchFamilyNameText("")
                        }
                        placeholder={
                          t("campaign.content99") + searchPlaceholderFamilyNameText
                        }
                        onSearch={handleSearch}
                        style={{
                          border: "1px solid #C6C6C6", // Border color and thickness
                          borderRadius: "10px", // Border radius
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* this is for athlete CELEBRITY */}
                {filterIsCelebrity === 1 && (
                  <div>
                    <div className="flex items-start flex-col">
                      <p>{t("campaign.content25")}</p>
                      <SearchBar
                        value={searchFirstNameText}
                        onChange={(newValue) =>
                          setSearchFirstNameText(newValue)
                        }
                        onCancelResearch={(newValue) =>
                          setSearchFirstNameText("")
                        }
                        placeholder={t("campaign.content99") + searchPlaceholderFirstNameText}
                        onSearch={handleSearch}
                        style={{
                          border: "1px solid #C6C6C6", // Border color and thickness
                          borderRadius: "10px", // Border radius
                        }}
                      />
                    </div>

                    <div className="flex items-start flex-col">
                      <p>{t("campaign.content59")}</p>
                      <SearchBar
                        value={searchfb_link}
                        onChange={(newValue) => setSearchfb_link(newValue)}
                        onCancelResearch={(newValue) => setSearchfb_link("")}
                        /*  placeholder={""}  */
                        onSearch={handleSearch}
                        style={{
                          border: "1px solid #C6C6C6", // Border color and thickness
                          borderRadius: "10px", // Border radius
                        }}
                      />
                    </div>

                    <div className="flex items-start flex-col">
                      <p>{t("campaign.content60")}</p>
                      <SearchBar
                        value={searchig_link}
                        onChange={(newValue) => setSearchig_link(newValue)}
                        onCancelResearch={(newValue) => setSearchig_link("")}
                        /* placeholder={"Search " + searchPlaceholderFirstNameText} */
                        onSearch={handleSearch}
                        style={{
                          border: "1px solid #C6C6C6", // Border color and thickness
                          borderRadius: "10px", // Border radius
                        }}
                      />
                    </div>

                    <div className="flex items-start flex-col">
                      <p>{t("campaign.content61")}</p>
                      <SearchBar
                        value={searchtw_link}
                        onChange={(newValue) => setSearchtw_link(newValue)}
                        onCancelResearch={(newValue) => setSearchtw_link("")}
                        /*  placeholder={"Search " + searchPlaceholderFamilyNameText} */
                        onSearch={handleSearch}
                        style={{
                          border: "1px solid #C6C6C6", // Border color and thickness
                          borderRadius: "10px", // Border radius
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Popup>
          </div>
        </div>

        <div className="p-4   flex justify-center items-center flex-col gap-4">
          <div className="w-full md:w-[50%] ">
            <SearchBar
              width="100%"
              value={searchFirstNameText}
              onChange={(newValue) => setSearchFirstNameText(newValue)}
              onCancelResearch={(newValue) => setSearchFirstNameText("")}
              placeholder={t("campaign.content100") + searchPlaceholderFirstNameText}
              onSearch={handleSearch}
              style={{
                border: "1px solid #C6C6C6",
                borderRadius: "10px",
              }}
              sx={{ fontFamily: "'Lexend', sans-serif" }}
            />
          </div>

          <div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={() => {
                  if (filterIsCelebrity === 0) {
                    return "no";
                  } else {
                    return "yes";
                  }
                }}
                name="radio-buttons-group"
                onChange={(event) => {
                  const value = event.target.value;

                  if (value === "yes") {
                    setFilterIsCelebrity(1);
                    setCampaignsPage(1);
                  } else if (value === "no") {
                    setFilterIsCelebrity(0);
                    setCampaignsPage(1);
                  }
                }}
              >
                <FormGroup row>
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio
                        sx={{
                          color: "#444444",
                          "&.Mui-checked": {
                            color: "#444444",
                          },
                        }}
                      />
                    }
                    sx={{
                      marginTop: "0px",
                      "& .MuiTypography-root": {
                        fontFamily: "'Lexend', sans-serif",
                        fontWeight: 500,
                      },
                    }}
                    label={`Celebrity`}
                  />
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio
                        sx={{
                          color: "#444444",
                          "&.Mui-checked": {
                            color: "#444444",
                          },
                        }}
                      />
                    }
                    sx={{
                      marginTop: "0px",
                      "& .MuiTypography-root": {
                        fontFamily: "'Lexend', sans-serif",
                        fontWeight: 500,
                      },
                    }}
                    label={`Athlete`}
                  />
                </FormGroup>
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {resultsAmount > 0 && (
          <>
            <p className="lexend-font text-black_second font-medium ml-4 sm:ml-6 md:ml-8 xl:ml-12 2xl:ml-16 m-4">
              {resultsAmount} results
            </p>
          </>
        )}

        {campaigns && (
          <>
            {campaigns.map((item, index) => (
              <>
                <div className="flex justify-center items-center  ">
                  <div
                    key={index}
                    /*   className="flex justify-between border-2 m-4 p-2 select-none cursor-pointer" */
                    onClick={() => navigate(`/campaign/${item.campaignId}`)}
                    className="p-4 w-[95%] min-h-20    cursor-pointer flex justify-between items-center mt-1 mb-1 campaign-container-list rounded-lg"
                  >
                    {/* //TODO, there should be profile image, of current athlete. If there's none, then you need to use avatar based on name initials
                  
                  // TODO, as it seems, even names or similar, should be connected to athlete, so if he updates profile, campaign also updates as well...
                  */}

                    <div className="flex gap-4 items-center ">
                      <Avatar sx={{ width: 55, height: 55 }}>
                        {item.friendName.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="lexend-font text-black_second">
                        <p className="font-bold break-all  pr-4">
                          {item.friendName}{" "}
                          {item.friendMiddleName && (
                            <>({item.friendMiddleName})</>
                          )}{" "}
                          {item.friendLastName}
                        </p>

                        {/*   <p>
                      <b>{t("campaign.content28")}:</b>{" "}
                      {item.friendGender === "M" ? "Male" : "Female"}
                    </p> */}
                        <p className="text-red_second font-medium">
                          See Profile
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 lexend-font text-black_second justify-center items-center">

                      <div className="hidden lg:flex flex-row justify-center items-center gap-1"> 
                        <img src="supporters/team_black.png" />
                        {item.supporterCount}
                      </div>


                      <p className="hidden lg:inline ">
                        <span className="font-semibold">$</span>
                        <span className="text-[#44BC49] font-bold">
                          {formatNumber(item.donatedAmount)}
                        </span>{" "}
                      </p>

                      <div>
                        <div className="flex  lg:hidden  gap-2 self-baseline md:self-center lexend-font text-black_second ">
                       
                         {/*  <p>
                            <span className="font-semibold">#</span>
                            {item.supporterCount}
                          </p> */}
                          <div className="flex flex-row justify-center items-center gap-1"> 
                        <img src="supporters/team_black.png" />
                        {item.supporterCount}
                      </div>

                          <p>
                            <span className="font-semibold">$</span>
                            <span className="text-[#44BC49] font-bold">
                              {formatNumber(item.donatedAmount)}
                            </span>{" "}
                          </p>
                        </div>

                        <Flag
                          className="w-12 justify-self-end "
                          code={item.friendNationality}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        )}

        <div className="flex justify-center items-start mt-4    w-full ">
          <Stack>
            <Pagination
              count={maxPages}
              page={campaignsPage}
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
      </div>
      <FooterClean />
    </>
  );
};

export { Campaign };
