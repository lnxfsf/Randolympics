

// This shows only to National President user_type...


import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderMyProfile } from "./HeaderMyProfile";
import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

let BACKEND_SERVER_BASE_URL = import.meta.env.VITE_BACKEND_SERVER_BASE_URL || process.env.VITE_BACKEND_SERVER_BASE_URL;

const Elections = () => {
  const [userData, setUserData] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [top50Users, setTop50Users] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [top50Page, setTop50Page] = useState(1);
  const [otherPage, setOtherPage] = useState(1);
  const [showingTop50, setShowingTop50] = useState(true);


  const [rankUpdated, setRankUpdated] = useState(false); //when rank updates.. //we pass function to update, directly in props.. 


  useEffect(() => {
    const storedData = localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
    }
    
    // first it fetches top50 (who are selected to go in.. )
    fetchTop50Users();

    // but if by fetching top50, list is empty, then fetch data from Other users.. (this is for pagination.. ). so we can show Top50 first... 
    if (!showingTop50) {
      fetchOtherUsers();
    }
  }, [top50Page, otherPage, rankUpdated,  showingTop50]);


  const fetchTop50Users = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER_BASE_URL}/auth/rankingTop50`, {
        params: {
          limit: 10,
          offset: (top50Page - 1) * 10,
        },
      });
      setTop50Users(response.data);

      // Check if we should switch to showing other users
      if (response.data.length < 10) {
        setShowingTop50(false);
      }
    } catch (error) {
      console.error('Error fetching top users:', error);
    }
  };

  const fetchOtherUsers = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER_BASE_URL}/auth/otherUsers`, {
        params: {
          limit: 10,
          offset: (otherPage - 1) * 10,
        },
      });
      setOtherUsers(response.data);
    } catch (error) {
      console.error('Error fetching other users:', error);
    }
  };


  // ! with this, we need to determine...
  const handleNextPage = () => {

    if (showingTop50) {
      setTop50Page(prev => prev + 1);  // if top50page, was 1, then add +1 to it. so it's 2 then. to update (increment) it's value.. 
        //znači, to je sledeći page !
    } else {
      setOtherPage(prev => prev + 1);
    }
  };

// ! previous page
const handlePreviousPage = () => {
  if (showingTop50 && top50Page > 1) {
    setTop50Page(prev => prev - 1);
  } else if (!showingTop50 && otherPage > 1) {
    setOtherPage(prev => prev - 1);
  } else if (!showingTop50 && otherPage === 1) {
    setShowingTop50(true);
    setTop50Page(Math.max(1, top50Page - 1)); // If moving back to top50, reduce the page if possible
  }
};




  const [selectedRole, setSelectedRole] = useState("AH");

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

 /*  return (
    <>
      <HeaderMyProfile />

      <div className="flex m-0 flex-col">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="m-4 ml-0 mb-1"
        >
          <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
            <b>Selecting</b>
          </InputLabel>
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
        </FormControl>
      </div>

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[18%]">Rank</th>
              <th className="w-[15%]">Name</th>
              <th className="w-[8%]">Age</th>
              <th className="w-[12%]">Country</th>
              <th className="w-[27%]">Email</th>
              <th className="w-[20%]">Phone</th>
            </tr>
          </thead>
          <tbody>
            {top50Users.map((user, index) => (
              <Top50
                key={user.userId}
                userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
                index={index}
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated}
              />
            ))}
            {!showingTop50 && otherUsers.length > 0 && (
              <tr className="border-b-2 border-red_first ">
                <td colSpan="6"></td>
              </tr>
            )}
            {!showingTop50 && otherUsers.map((user, index) => (
              <Others
                key={user.userId}
                userId={user.userId}
                rank={user.rank}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
                index={index}
                lastIndex={otherUsers.length - 1}
                setRankUpdated={setRankUpdated}
              />
            ))}
          </tbody>
        </table>


        <div className="flex justify-center mt-4">
          <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded">Next Page</button>
        </div>


      </div>
    </>
  ); */


  return (
    <>
      <HeaderMyProfile />

      <div className="flex m-0 flex-col">
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          className="m-4 ml-0 mb-1"
        >
          <InputLabel style={{ color: "#232323" }} id="roleDropdowns">
            <b>Selecting</b>
          </InputLabel>
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
        </FormControl>
      </div>

      {/* //TODO: add filter and search options LATER !!!, once I know what values to filter by, and if it needs to be dropdown etc..
       */}

      {/* this is, for columns, and for it to show all columns  */}
      {/*   <div className="mt-8">
        {/* main column */}
     {/*  <div className="flex justify-evenly items-center font-bold mb-4">
        <p>Rank</p>
        <p>Name</p>
        <p>Age</p>

        <p>Country</p>
        <p>Email</p>
        <p>Phone</p>
      </div>
      <hr /> */}

      {/* we just use these components for printing ! we filter data somewhere else... 

        {/* // ! get some list, so it can show red line here ! that's how it's going to go ! to render by lists.. 
        {top50Users.map((user, index) => (
          <>
            <div
              key={index}
              className="flex justify-between items-center mb-2 mt-2 ml-8 mr-8 "
            >
              <Top50
                rank={user.rank}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
              />
            </div>
            <hr />
          </>
        ))}
        <div className="border-b-2 border-red_first "></div>




        {otherUsers.map((user, index) => (
          <>
            <div
              key={index}
              className="flex justify-evenly items-center mb-2 mt-2 ml-8 mr-8 "
            >
              <Others
                rank={user.rank}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={"ah"}
              />
            </div>
            <hr />
          </>
        ))}
        


      </div> */}

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[18%]">Rank</th>
              <th className="w-[15%]">Name</th>
              <th className="w-[8%]">Age</th>
              <th className="w-[12%]">Country</th>
              <th className="w-[27%]">Email</th>
              <th className="w-[20%]">Phone</th>
            </tr>
          </thead>
          <tbody>

           

            {top50Users.map((user, index) => (
              <Top50
                userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
                index={index}
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated}
              />
            ))}


{!showingTop50 && otherUsers.length > 0 && (
  <>
             {/* this is red separator, below are all others.. */}
             <tr className="border-b-2 border-red_first " style={{padding: "0px", paddingTop: "-5px"}}>
                <td colSpan="100%"></td>
             </tr>
             </>
        )}


        {!showingTop50 && otherUsers.map((user, index) => (
              <Others
              userId={user.userId}
                rank={user.ranking}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
                index={index}
                
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated}
                /* 
YOU NEED TO SET THIS UP... FIRST GOES top50 component, if it have more of pagination, to show .. if it does.. then shows pagination for top50.. but if not, then shows this one... 
                lastIndex={top50Users.length - 1}
                setRankUpdated={setRankUpdated} */
              />
            ))}
          </tbody>
        </table>
      </div>


{/* // TODO, and just make this style better, on right side.. of lists..  */}
     {/*  <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
   */}    {/* <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
 */}

        <div className="flex justify-center mt-4">
          <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded">Next Page</button>
        </div>


      <p className="m-2">
        You are selecting the athletes to compete in the next games. The{" "}
        <span className="text-red_first">top 50</span> athletes in the list will
        be chosen to participate in the games. Use the Update Rank feature to
        increase or decrease the rank of each athlete.
      </p>
    </>
  );
};

export { Elections };
