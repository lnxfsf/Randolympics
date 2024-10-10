import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderMyProfile } from "./HeaderMyProfile";
import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import "../../styles/elections.scoped.scss";

import SearchBar from "@mkyy/mui-search-bar";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Elections = () => {
  // with this, we also need to send to backend, so we can filter, based on gender, and later on category..
  // we listen on changes, send to backend, and filter by it..
  const [genderFilter, setGenderFilter] = useState("M");
  const [categoryFilter, setCategoryFilter] = useState("medium");

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender);
    setCategoryFilter(null); // Reset category filter when gender is selected
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const [userData, setUserData] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.user_type;
    }
  }); // TODO , it must initialize here first !

  const [top50Users, setTop50Users] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);

  const [top50Page, setTop50Page] = useState(1);
  const [otherPage, setOtherPage] = useState(1);

  const [showingTop50, setShowingTop50] = useState(true);

  const [hasMoreTop50, setHasMoreTop50] = useState(true);
  const [hasMoreOthers, setHasMoreOthers] = useState(true);

  const [rankUpdated, setRankUpdated] = useState(false);

  const [selectedRole, setSelectedRole] = useState(() => {
    if (currentUserType === "NP") {
      return "AH";
    } else if (currentUserType === "AH") {
      return "NP";
    } else if (currentUserType === "GP") {
      return "LM";
    } else if (currentUserType === "RS") {
      return "NP";
    } 
  });

  const [searchText, setSearchText] = useState(""); //search box


  const [votedFor, setVotedFor] = useState(() => {

    const storedData = localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.votedForNPuserId;
    }

  }); // UserID of NP, we voted for...
  


  // this is for GP selection (only NP's can vote on this !)
  const [votedForGP,  setVotedForGP] = useState(() => {

    const storedData = localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.votedForGPuserId;  //GP !
    }

  }); // UserID of GP , we voted for...
  


  const [passportStatus, setPassportStatus] = useState()



  //this is used, for filtering, for .get operations.. 
  const [ countryOfcurrentUserOnFrontend , setCountryOfcurrentUserOnFrontend] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");


      if (storedData) {
        const userJson = JSON.parse(storedData);
        return userJson.data.nationality;
      }

  });


  

  const [lastRank, setLastRank] = useState();

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
      
      setPassportStatus(userJson.data.passportStatus);

     

    }


    lastInRank() // this is for both Others, and Top. for that one (doesn't cut ranking by some number.. )
    
    fetchTop50Users();



   /*  if (!showingTop50) { */

    if (!showingTop50) {
      fetchOtherUsers();
    }
  }, [
    top50Page,
    otherPage,

    rankUpdated,
    
    showingTop50,
    selectedRole,
    searchText,
    genderFilter,
    categoryFilter,
    votedFor,
    votedForGP,
  ]);

 

  const handleSearch = (he) => {
    // Fired when enter button is pressed.

    console.log("ovo ne radi");
  };


  const lastInRank = async () => { 

    try {

      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/lastInRank`,
        {
          params: {
            user_type: selectedRole,
            nationality: countryOfcurrentUserOnFrontend,
            gender: genderFilter,
            
          },
        }
      );

      
     console.log(response.data)
      setLastRank(response.data)

    } catch (error) {
      console.error("Error fetching top users:", error);
    }



  }





  const fetchTop50Users = async () => {
    // this params: , is actually a variables to send to server !
    // user_type, is for the selection dropdown...
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/rankingTop50`,
        {
          params: {
            limit: 10,
            offset: (top50Page - 1) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
            
            votedFor: votedFor, // sends selected NP for our user. this is showing then. so we display above red line selected by user... 
            votedForGP: votedForGP, // this same as for votedFor, just for GP.. so we can discern..
         

            countryOfcurrentUserOnFrontend: countryOfcurrentUserOnFrontend,
          },
        }
      );
      setTop50Users(response.data);




      const isThereNextPage = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/rankingTop50`,
        {
          params: {
            limit: 10,
            offset: (top50Page) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,
            
            votedFor: votedFor, // sends selected NP for our user. this is showing then. so we display above red line selected by user... 
            votedForGP: votedForGP, // this same as for votedFor, just for GP.. so we can discern..
         

            countryOfcurrentUserOnFrontend: countryOfcurrentUserOnFrontend,
          },
        }
      );




      // Check if we should switch to showing other users
      if (isThereNextPage.data.length == 0) {
        setHasMoreTop50(false);
        setShowingTop50(false);

       

      
      } else {
        setHasMoreTop50(true);
        setShowingTop50(true);
      }


    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  const fetchOtherUsers = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/otherUsers`,
        {
          params: {
            limit: 10,
            offset: (otherPage - 1) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,

            votedFor: votedFor, // send this, so to know which one to AVOID 
            votedForGP: votedForGP, // so he can avoid this one just..

            countryOfcurrentUserOnFrontend: countryOfcurrentUserOnFrontend,
          },
        }
      );

      setOtherUsers(response.data);





      const isThereNextPage = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/otherUsers`,
        {
          params: {
            limit: 10,
            offset: (otherPage) * 10,
            user_type: selectedRole,
            searchText: searchText,
            genderFilter: genderFilter,
            categoryFilter: categoryFilter,

            votedFor: votedFor, // send this, so to know which one to AVOID 
            votedForGP: votedForGP, // so he can avoid this one just..

            countryOfcurrentUserOnFrontend: countryOfcurrentUserOnFrontend,
          },
        }
      );

      if (isThereNextPage.data.length == 0) {
        setHasMoreOthers(false);
      } else {
        setHasMoreOthers(true);
      }
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  
  const handleNextPage = () => {







    if (showingTop50) {
      
      if (hasMoreTop50) {
        setTop50Page((prev) => prev + 1);
      } else {
        setShowingTop50(false);
        setOtherPage(1);
      }
    } else if (hasMoreOthers) {
        setTop50Page((prev) => prev + 1);

        setOtherPage((prev) => prev + 1);
      }



    
  };




  // previous page
  const handlePreviousPage = () => {


    if (showingTop50 && top50Page > 1) {

      setTop50Page((prev) => prev - 1);


    } else if (!showingTop50 && otherPage > 1) {
      //  e ovde, vracas ga samo.. za top50, ono, da bi prikazao jos.. 
      setTop50Page((prev) => prev - 1);

      setOtherPage((prev) => prev - 1);
      
    } else if (!showingTop50 && otherPage === 1) {

      setShowingTop50(true); // was "true"
      setTop50Page(Math.max(1, top50Page - 1));
    }


  };



  const [whichVotedFor, setWhichVotedFor] = useState (() => {
    if (currentUserType === "AH"){
      return votedFor;
    } else if (selectedRole === "GP"){
      return votedForGP;
    }
  })




  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  //  for NP's selection (by Athletes ! )
  const handleVotedFor = async (event) => {
    setVotedFor(event.target.value);

    // treba da imas POST route, samo za ovo ipak (eto, imas .get, ali .post treba imas... )
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/votingForNP`,
        {
        
          NPuserId: event.target.value,  // NP userId we're voting for
          current_user_userId: userData.data.userId,  // current User, userId

        }
      );

      if (response.status === 200) {


        


        // this will apply on next re-render. so we need to use one locally, for now, just to insert it in localstorage
        setUserData((prevUserData) => ({

          ...prevUserData,
          data: {
            ...prevUserData.data,
            votedForNPuserId: event.target.value,
          },
        
        }));


        // this is new object, so we can insert it directly (faster, we don't wait for next re-render..)
        var updatedUserData = { ...userData, data: { ...userData.data , votedForNPuserId: event.target.value, } 
        }
       

        // ada, nije sačuvao alo ! 
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        }


      }







    } catch (error) {
      //console.log(error);
      setResultText(error.response.data.message);
    }
  };





  // for GP's selection (by NP's )
  const handleVotedForGP = async (event) => {
    setVotedForGP(event.target.value);

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/votingForGP`,
        {
        
          GPuserId: event.target.value,
          current_user_userId: userData.data.userId,
        }
      );

      if (response.status === 200) {


        


        // this will apply on next re-render. so we need to use one locally, for now, just to insert it in localstorage
        setUserData((prevUserData) => ({

          ...prevUserData,
          data: {
            ...prevUserData.data,
            votedForNPuserId: event.target.value,
          },
        
        }));


        // this is new object, so we can insert it directly (faster, we don't wait for next re-render..)
        var updatedUserData = { ...userData, data: { ...userData.data , votedForGPuserId: event.target.value, } 
        }
       

        // ada, nije sačuvao alo ! 
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(updatedUserData));
        }


      }







    } catch (error) {
      //console.log(error);
      setResultText(error.response.data.message);
    }



  }

  return (
    <>

      <div className="flex m-0 justify-start items-center gap-4">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="m-4 ml-0 mb-1"
        >
          <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
            <b>Selecting</b>
          </InputLabel>
          {/* this is what NP can select  */}
          {currentUserType === "NP" && (
            <>
              <Select
                labelId="roleDropdowns"
                value={selectedRole}
                onChange={handleChangeRole}
                className="w-[200px]"
                style={{ color: "#000" }}
              >
                <MenuItem value={"AH"}>Athletes</MenuItem>
                <MenuItem value={"GP"}>Global President</MenuItem>
                <MenuItem value={"RS"}>Referee & support</MenuItem>
              </Select>
            </>
          )}

          {/* this is what athlete and "referee & support" can select  */}
          {(currentUserType === "AH" || currentUserType == "RS") && (
            <>
              <>
                <Select
                  labelId="roleDropdowns"
                  value={selectedRole}
                  onChange={handleChangeRole}
                  className="w-[200px]"
                  style={{ color: "#000" }}
                >
                  <MenuItem value={"NP"}>National President</MenuItem>
                </Select>
              </>
            </>
          )}

          {/* this is what Global President can select  */}
          {currentUserType === "GP" && (
            <>
              <>
                <Select
                  labelId="roleDropdowns"
                  value={selectedRole}
                  onChange={handleChangeRole}
                  className="w-[200px]"
                  style={{ color: "#000" }}
                >
                  <MenuItem value={"LM"}>Legal Manager</MenuItem>
                  <MenuItem value={"ITM"}>IT Manager</MenuItem>

                  <MenuItem value={"MM"}>Marketing Manager</MenuItem>
                  <MenuItem value={"SM"}>Sales Manager</MenuItem>
                  <MenuItem value={"VM"}>Validation Manager</MenuItem>
                  <MenuItem value={"EM"}>Event Manager</MenuItem>
                </Select>
              </>
            </>
          )}
        </FormControl>

        {((currentUserType === "AH" || currentUserType === "RS" ) && passportStatus === "validated") && (
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="m-4 ml-0 mb-1"
            >
              <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                <b>Vote for</b>
              </InputLabel>

              <Select
                labelId="roleDropdowns"
                value={votedFor}
                onChange={handleVotedFor}
                className="w-[200px]"
                style={{ color: "#000" }}
              >
                {top50Users.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}

                {otherUsers.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* we have same selection for GP (for GP, it's if one tops another 120% more) */}
        {(
          selectedRole === "GP" && passportStatus === "validated" ) && (
          <>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="m-4 ml-0 mb-1"
            >
              <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
                <b>Vote for</b>
              </InputLabel>

              <Select
                labelId="roleDropdowns"
                value={votedForGP}
                onChange={handleVotedForGP}
                className="w-[200px]"
                style={{ color: "#000" }}
              >
                {top50Users.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}

                {otherUsers.map((user) => (
                  <MenuItem key={user.userId} value={user.userId}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}


        <></>
      </div>

      {/* div's, for Search bar and Filter */}
      <div className="flex justify-end">
        <SearchBar
          value={searchText}
          onChange={(newValue) => setSearchText(newValue)}
          onCancelResearch={(newValue) => setSearchText("")}
          onSearch={handleSearch}
         
          style={{
            border: "1px solid #C6C6C6", // Border color and thickness
            borderRadius: "20px", // Border radius
          }}
        />
      </div>


      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              {((currentUserType === "AH" || currentUserType === "RS" ) || selectedRole == "GP") && (
                <>
                  <th className="w-[8%]">My vote</th>
                </>
              )}

              {((currentUserType === "AH" || currentUserType === "RS" ) || selectedRole == "GP" ) ? (
                <>
                  <th className="w-[10%]">All votes</th>
                </>
              ) : (
                <>
                  <th className="w-[18%]">Rank</th>
                </>
              )}

              <th className="w-[15%]">Name</th>
              <th className="w-[8%]">Age</th>
              <th className="w-[12%]">Country</th>
              <th className="w-[27%]">Email</th>



              {/* this is, just for "AH" and "RS", to have place for all columns */}
              {(currentUserType === "AH" || currentUserType == "RS" || selectedRole == "GP" )? (
                <>
                  <th className="w-[10%]">Phone</th>
                </>
              ) : (
                <>
                  <th className="w-[20%]">Phone</th>
                </>
              )}

              

              { ((currentUserType === "AH" || currentUserType === "RS" ) || selectedRole == "GP") && (
                <>
                  <th className="w-[10%]">Status</th>
                </>
              )}



            </tr>
          </thead>
          <tbody>
            {top50Users.map((user, index) => (
              <Top50
/* 
                userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                gender={user.gender}
                votes={user.votes}
                userNPPercentage={user.userNPPercentage} */

                user={user}

                currentUserPassportStatus={passportStatus}

                user_type={currentUserType}  

                index={index}
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated}
                selectedRole={selectedRole}


                votedForUserId={whichVotedFor}

                lastRank={lastRank}


              />
            ))}

            { ( (!showingTop50 && top50Users.length !== 0 && otherUsers.length > 0) || (top50Users.length === 10 && top50Page === 5)  ) && (
              <>
                <tr
                  className="border-b-2 border-red_first "
                  style={{ padding: "0px", paddingTop: "-5px" }}
                >
                  <td colSpan="100%"></td>
                </tr>
              </>
            )}

            {!showingTop50 &&
              otherUsers.map((user, index) => (
                <Others


                

                /* 
                userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}


                gender={user.gender}
                votes={user.votes}
                userNPPercentage={user.userNPPercentage} */

                
                user={user}

                currentUserPassportStatus={passportStatus}
                  user_type={currentUserType}
                  index={index}
                  lastIndex={otherUsers.length - 1}
                  setRankUpdated={setRankUpdated}
                 
                  selectedRole={selectedRole}
                  
                 
                  votedForUserId={whichVotedFor}

                  lastRank={lastRank}


                />
              ))}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-center mt-4">
        <button



/* only when on first page
and if it's actually first page, (it won't actually reflect new state in useState, so I think it's useless to mess with this anyways.. )

|| (!showingTop50 && hasMoreOthers)

*/
            disabled={
            (showingTop50 && top50Page === 1) 
          }  


          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
       /*  showingTop ce biti false (jer nema vise). hasmoretop isto false ! */
        /*  showingTop ce biti false , ali hasMore others, IMA (true) */
          disabled={
            (showingTop50 && !hasMoreTop50) || (!showingTop50 && !hasMoreOthers)
          }
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>

    

      
    </>
  );
};

export { Elections };
