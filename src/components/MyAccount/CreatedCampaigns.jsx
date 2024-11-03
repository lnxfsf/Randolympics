import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SearchBar from "@mkyy/mui-search-bar";
import Flag from "react-world-flags";

import { Button, Avatar } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useTranslation } from "react-i18next";
import { EditCreatedCampaigns } from "./EditCreatedCampaigns";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const CreatedCampaigns = () => {
  const { t } = useTranslation();

  const [maxPages, setMaxPages] = useState(0);
  const [resultsAmount, setResultsAmount] = useState();

  const [campaigns, setCampaigns] = useState();
  const [campaignsPage, setCampaignsPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [searchFirstNameText, setSearchFirstNameText] = useState(""); //search box

  const [currentUserId, setCurrentUserId] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.userId;
    }
  });

  const [editingCampaign, setEditingCampaign] = useState(false);
  const [editingCampaignID, setEditingCampaignID] = useState();

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
  };

  useEffect(() => {
    updateLatestData();
  }, [searchFirstNameText]);

  const handlePaginationChange = (event, value) => {
    setCampaignsPage(value);
  };

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listCreatedCampaignsByUser`,
        {
          params: {
            limit: limit,
            offset: (campaignsPage - 1) * 10,

            currentUserId,

            searchFirstNameText: searchFirstNameText,
          },
        }
      );

      setMaxPages(Math.ceil(response.data.count / 10));
      setResultsAmount(response.data.count);

      setCampaigns(response.data.rows);

      console.log("campaigns for this user");
      console.log(response.data.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  return (
    <>

    {!editingCampaign ? (<> 
      <div className="min-h-screen">
        <div className="p-4   flex justify-center items-center flex-col gap-4">
          {/* md:w-[50%] */}
          <div className="w-full  ">
            <SearchBar
              width="100%"
              value={searchFirstNameText}
              onChange={(newValue) => setSearchFirstNameText(newValue)}
              onCancelResearch={(newValue) => setSearchFirstNameText("")}
              placeholder={"Enter first name"}
              onSearch={handleSearch}
              style={{
                border: "1px solid #C6C6C6",
                borderRadius: "10px",
              }}
              sx={{ fontFamily: "'Lexend', sans-serif" }}
            />
          </div>
        </div>

        {campaigns && (
          <>
            {campaigns.map((item, index) => (
              <>
                <div className="flex justify-center items-center  ">
                  <div
                    key={index}
                    /*   className="flex justify-between border-2 m-4 p-2 select-none cursor-pointer" */
                    onClick={() => {
                        
                        setEditingCampaignID(item.campaignId);
                        setEditingCampaign(true);

                     //   navigate(`/campaign/${item.campaignId}`)
                    }}
                    className="p-4 w-[95%] h-20   cursor-pointer flex justify-between items-center mt-1 mb-1 campaign-container-list rounded-lg"
                  >
                    {/* //TODO, there should be profile image, of current athlete. If there's none, then you need to use avatar based on name initials
                  
                  // TODO, as it seems, even names or similar, should be connected to athlete, so if he updates profile, campaign also updates as well...
                  */}

                    <div className="flex gap-4 items-center">
                      <Avatar sx={{ width: 55, height: 55 }}>
                        {item.friendName.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="lexend-font text-black_second">
                        <p className="font-bold">
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

                    {/*   {item.isCelebrity ? (
                    <img
                      className=" ml-auto w-6 m-4"
                      src="/supporters/celebrity_icon.svg"
                    />
                  ) : (
                    <></>
                  )} */}

                    <div>
                      <Flag className="w-12 " code={item.friendNationality} />
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

      </>) : (<>
      
        <EditCreatedCampaigns campaignId={editingCampaignID}/>

      </>)}



    </>
  );
};

export { CreatedCampaigns };
