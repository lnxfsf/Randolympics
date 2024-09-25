import SearchBar from "@mkyy/mui-search-bar";
import { Button , Avatar} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";

import { useTranslation } from "react-i18next";
import axios from "axios";

import { settingUserType } from "../../context/user_types"


import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";



let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;



const SearchForUsers = () => {

    const [searchFirstNameText, setSearchFirstNameText] = useState("");
    const [resultsAmount, setResultsAmount] = useState();

    const [results, setResults] = useState();

    const [maxPages, setMaxPages] = useState(0);

    const [usersPage, setUsersPage] = useState(1);
    
    const [limit, setLimit] = useState(3);

    const { t } = useTranslation();


    
  const handleSearch = (he) => {
    // Fired when enter button is pressed.

    setUsersPage(1);
    updateLatestData();

  };



  useEffect(()=> {
    

    /* if (maxPages === 0) {
        getMaxPages();
      } */

      getMaxPages();

  },[results])
  

  
  


 const getMaxPages = async () => {
    try {
     
	  const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listAllUsers`,
        {
          params: {
            limit: 100000,
			
           // offset: (usersPage - 1) * 10,
            searchFirstNameText: searchFirstNameText,

          },
        }
      );

      setMaxPages(Math.ceil(response.data.length / limit));
      setResultsAmount(response.data.length);
	  
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };
  

 const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listAllUsers`,
        {
          params: {
		  
            limit: 3,
			
            offset: (usersPage - 1) * limit,

            searchFirstNameText: searchFirstNameText,
			
           

          },
        }
      );

      console.log(response.data);
	  
      setResults(response.data);
	  
	  
	  
    } catch (e) {
      console.log(e.stack);
    }
  };

  
  const handlePaginationChange = (event, value) => {
    setUsersPage(value);
    updateLatestData();
  };


  return (
    <>
      <div className="min-h-screen">
       
        <div className="p-6 md:pl-24 md:pr-24 pt-6 pb-6   flex justify-center items-center flex-col gap-4">

        <p className="text-xl md:text-3xl self-start  lexend-font text-black_second font-bold">
            {t("campaign.content64")}
          </p>

          <div className="w-full  ">
            <SearchBar
              width="100%"
              value={searchFirstNameText}
              onChange={(newValue) => setSearchFirstNameText(newValue)}
              onCancelResearch={(newValue) => setSearchFirstNameText("")}
              placeholder={"Enter a name"}
              onSearch={handleSearch}
              style={{
                border: "1px solid #C6C6C6",
                borderRadius: "10px",
              }}
              sx={{ fontFamily: "'Lexend', sans-serif" }}
            />


          </div>


          
      <div className="flex w-full ">
        <Button
        onClick={()=> {setUsersPage(1); updateLatestData(); }}
          className="w-full "
          style={{ textTransform: "none" }}
          sx={{
            p: 2,

            height: "50px",
            bgcolor: "#D24949",

            color: "#fff",
            borderRadius: 3,
            border: `1px solid #D24949`,
            "&:hover": {
              background: "rgba(210, 73, 73, 1)",
              color: "white",
              border: `1px solid rgba(210, 73, 73, 1)`,
            },
          }}
          id="join-the-fun-btn"
        >
          
          <span className="lexend-font">Search</span>
        </Button>
      </div>



        </div>

        {resultsAmount > 0 && results && (
        <>
          <p className="lexend-font text-black_second font-medium ml-4 sm:ml-6 md:ml-8 xl:ml-12 2xl:ml-16 m-4">
            {resultsAmount} results
          </p>
        </>
      )}



{results && (
        <>
  {results.map((item, index) => (<>
    <div className="flex justify-center items-center ">
                <div
                  key={index}
                  /*   className="flex justify-between border-2 m-4 p-2 select-none cursor-pointer" */
                 
                  onClick={() => navigate(`/campaign/${item.campaignId}`)}
                 
                  className="p-4 w-[95%] h-20   cursor-pointer flex justify-between items-center mt-1 mb-1 campaign-container-list rounded-lg"
                >
                  {/* //TODO, there should be profile image, of current athlete. If there's none, then you need to use avatar based on name initials
                  
                  // TODO, as it seems, even names or similar, should be connected to athlete, so if he updates profile, campaign also updates as well...
                  */}

                  <div className="flex gap-4 items-center">
                    <Avatar sx={{ width: 55, height: 55 }}
                    
                    src={
                        BACKEND_SERVER_BASE_URL +
                        "/imageUpload/profile_pics/" +
                        item.picture
                      }

                      >

                      {item.name.charAt(0).toUpperCase()}
                    </Avatar>

                    <div className="lexend-font text-black_second">
                      <p className="font-bold">
                        {item.name}{" "}
                        {item.middleName && (
                          <>({item.middleName})</>
                        )}{" "}
                        {item.lastName}
                      </p>

                      {/*   <p>
                      <b>{t("campaign.content28")}:</b>{" "}
                      {item.friendGender === "M" ? "Male" : "Female"}
                    </p> */}
                      <p className="text-[#616673] font-medium">{settingUserType(item.user_type)}</p>
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
                    <Flag className="w-12 " code={item.nationality} />
                  </div>
                </div>
              </div>

             
 </>
))}

<div className="flex justify-center items-start mt-4    w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={usersPage}
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
)}



      </div>
    </>
  );
};

export { SearchForUsers };
