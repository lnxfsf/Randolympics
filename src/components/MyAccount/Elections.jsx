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
  // const [showingTop50, setShowingTop50] = useState(true);  // znači da prikazuje top50 listu i dalje..  TRUE je, kada ima (>10) elemenata u fetch koji dobije u listi (koji i prikazuje..)

  const [hasMoreTop50, setHasMoreTop50] = useState(true); // isto kao top50, ono da označi ima li jos elemenata u listi (ako je <10, onda nema... )
  const [hasMoreOthers, setHasMoreOthers] = useState(true); // ono da označi ima li jos elemenata u listi (ako je <10, onda nema... )

  const [rankUpdated, setRankUpdated] = useState(false); //when rank updates.. //we pass function to update, directly in props..


  const [showingTop50 , setShowingTop50] = useState(true)  // i need another variable, just so i can hide, and empty top50, by fetching one last time, so it can show Others


  useEffect(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      const userJson = JSON.parse(storedData);
      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
    }




    //this is where we fetch !!! and what we do with it !!!



    // first it fetches top50 (who are selected to go in.. )
    /* if(hasMoreTop50 ){
      fetchTop50Users(); 
    } */
      fetchTop50Users(); 
      // TODO moras da vidis zasto on ne izvlaci podatke koje treba ! zato miksa jako.. on prikaze ispod crte, 
  
  


       fetchOtherUsers();
    // but if by fetching top50, list is empty, then fetch data from Other users.. (this is for pagination.. ). so we can show Top50 first...
    // or just hasOthers, then render it.. as we need to rerender Top50 first..
   
   /* 
     if (!hasMoreTop50 || hasMoreOthers) {
      fetchOtherUsers();
    }  */


  }, [top50Page, otherPage, rankUpdated, hasMoreTop50, hasMoreOthers]);

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
        setHasMoreTop50(false);
      } else {
        setHasMoreTop50(true);
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
      
      

      // ! ovde  ne treba za Others ovo uopste ! jer onda smeta i nece da renderuje.. 
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


    console.log("ma"+ hasMoreTop50);


    if (hasMoreTop50) {
      setTop50Page((prev) => prev + 1);
    } else if (hasMoreOthers) {
      setOtherPage((prev) => prev + 1); // nema 
      
    }
  };

  // ! previous page
  const handlePreviousPage = () => {
    //
    if (top50Page > 1) {
      setTop50Page((prev) => prev - 1); // go to previous page for top50, IF, we're showing top50 only..
    } else if (otherPage > 1) {
      setOtherPage((prev) => prev - 1); // but this is when we're just going back, and we don't have top50 showing in list at all ! it's just, so we can go back one page on Others
    } else if (otherPage === 1) {
      // and this is if Others is first page...
      setHasMoreTop50(true);
      setTop50Page(Math.max(1, top50Page - 1)); // so we can go to latest page from top50 !!! as we need to show by top50, (if for instance, it have 50 entries ...)
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

            {/* //TODO ovo moras da sklonis. znači, kada je samo otherUsers, da nema crvene linije.. */}
            {!hasMoreTop50 && otherUsers.length > 0 && (
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

{/* // ! do ovoga je bilo, nije ni renderovao... !hasMoreTop50 , znači prikazuje ovo, samo kada, top50, nema vise elemenata dodatnih. tako treba... ako je to false, ovaj je true i radi... 
 */}
            {hasMoreTop50 &&
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
                />
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {/* //  it will be disabled, if it's on first page of Top50, and there's some elements in that list ! that should work

// also will be disabled, if there's no more top50 elements, but in same time, there's Others elements.. (so, that's when we're actually showing Others.. )

*/}
        <button
          /*  disabled={(hasMoreTop50 && top50Page === 1) || (!hasMoreTop50 && hasMoreOthers)} */
          disabled={
            (top50Page === 1 && hasMoreTop50) ||
            (otherPage === 1 && hasMoreOthers)
          }
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>

        {/* 
bice disabled, ako nema vise top50 elemenata. 
ili
bice disabled, ako nema top50, I nema Others elemenata */}
        <button
          /* disabled={(!hasMoreTop50) || (!hasMoreTop50 && !hasMoreOthers)} */
          disabled={
            (top50Page > 1 && !hasMoreTop50) ||
            (otherPage > 1 && !hasMoreOthers)
          }
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
