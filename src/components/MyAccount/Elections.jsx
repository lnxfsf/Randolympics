// This shows only to National President user_type...

import React, { useState, useEffect } from "react";
import axios from "axios";
import { HeaderMyProfile } from "./HeaderMyProfile";
import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Elections = () => {
  const [userData, setUserData] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);

  // list to fill it up, to send to component.. 
  const [top50Users, setTop50Users] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);


  //what page is it.. 
  const [top50Page, setTop50Page] = useState(1);
  const [otherPage, setOtherPage] = useState(1);

  // we need this, so we know if fetching is empty, to stop, and just disable buttons "next", "previous"...  as well to hide, etc.. 
  const [showingTop50, setShowingTop50] = useState(true);  // znači da prikazuje top50 listu i dalje..  TRUE je, kada ima (>10) elemenata u fetch koji dobije u listi (koji i prikazuje..)

  const [hasMoreTop50, setHasMoreTop50] = useState(true); // isto kao top50, ono da označi ima li jos elemenata u listi (ako je <10, onda nema... )
  const [hasMoreOthers, setHasMoreOthers] = useState(true); // ono da označi ima li jos elemenata u listi (ako je <10, onda nema... )

  const [rankUpdated, setRankUpdated] = useState(false); //when rank updates.. //we pass function to update, directly in props..

  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
    }

    // first it fetches top50 (who are selected to go in.. )
    //if(showingTop50){
      fetchTop50Users();
    //}
   
    
    // but if by fetching top50, list is empty, then fetch data from Other users.. (this is for pagination.. ). so we can show Top50 first...
    if (!showingTop50) {
      fetchOtherUsers();
    }



  }, [top50Page, otherPage, rankUpdated, showingTop50]);

  const fetchTop50Users = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsRanking/rankingTop50`,
        {
          params: {
            limit: 10,
            offset: (top50Page - 1) * 10,
          },
        }
      );
      setTop50Users(response.data);

      // Check if we should switch to showing other users
      if (response.data.length < 10) {
        setShowingTop50(false);

      }

      if (response.data.length < 10) {
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
        `${BACKEND_SERVER_BASE_URL}/listsRanking/otherUsers`,
        {
          params: {
            limit: 10,
            offset: (otherPage - 1) * 10,
          },
        }
      );
      setOtherUsers(response.data);

      if (response.data.length < 10) {
        
        setHasMoreOthers(false);
      } else {
        setHasMoreOthers(true);
      }


    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  // ! with this, we need to determine...
  const handleNextPage = () => {
    if (showingTop50) {
      if (hasMoreTop50) {
        setTop50Page((prev) => prev + 1);
      } else {
        setShowingTop50(false);
        setOtherPage(1);
      }
    } else {
      if (hasMoreOthers) {
        setOtherPage((prev) => prev + 1);
      }
    }
  };

  // ! previous page
  const handlePreviousPage = () => {

    // 
    if (showingTop50 && top50Page > 1) {
    
      setTop50Page((prev) => prev - 1);
    
    
    } else if (!showingTop50 && otherPage > 1) {
    
      setOtherPage((prev) => prev - 1);
    
    } else if (!showingTop50 && otherPage === 1) {
    
      setShowingTop50(true);
      setTop50Page(Math.max(1, top50Page - 1));
    

    
    }
  };

  const [selectedRole, setSelectedRole] = useState("AH");

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };


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
       */}{" "}
      {/* <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
       */}

       {/* ovo ti ne treba:otherPage === 1  (jer, on treba da radi i na druge... )
       
       
        a ovo, nzm, treba obrnuto da bude..:  && !hasMoreOthers 
       
       */}

      <div className="flex justify-center mt-4">
        <button
          disabled={(showingTop50 && top50Page === 1) || (!showingTop50 && hasMoreOthers)}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          disabled={(showingTop50 && !hasMoreTop50) || (!showingTop50 && !hasMoreOthers)}
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
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
