// This shows only to National President user_type...
import { HeaderMyProfile } from "./HeaderMyProfile";

import "../../styles/elections.scoped.scss";

import { Others } from "./Elections/Others";
import { Top50 } from "./Elections/Top50";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

import { useState, useEffect } from "react";



let BACKEND_SERVER_BASE_URL =
import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
process.env.VITE_BACKEND_SERVER_BASE_URL;



const Elections = () => {
  const [userData, setUserData] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null); // so it can show different fields , and reuse components

  
  const [top50Users, setTop50Users] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  //and pagination as well... at most 10 items per page you can have anyways... so, you finish that now !

  const [rankUpdated, setRankUpdated] = useState(false); //when rank updates.. //we pass function to update, directly in props.. 



  useEffect(() => {
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);
      setCurrentUserType(userJson.data.user_type);
    }


    
    // calling function to fill up top50Users (that holds list of objects, for component here below.. ) (so, later on, we can pass to this function, arguments that would be filter...)
    fetchTop50Users();
  }, [currentPage, rankUpdated]); 

  // [currentPage]  Refresh list when currentPage changes. as, we need to delete older contents, and replace it with new ones.. 




  const fetchTop50Users = async () => {

    //TODO now, it needs to fetch from database, only those that have rank, higher than 50 !

    // TODO , and set up pagination as well (10 items per list.. )
    // TODO, or maybe, you just, fetch, now, with LIMIT property, like LIMIT 10, if there's too much... and make pagination...
    // TODO etc. check it out later on... 


    try {
      //TODO, make a route, where you can get rank data.. but server side, needs to be only for that ! for last 50 ! and send only those.. 
      const response = await axios.get(`${BACKEND_SERVER_BASE_URL}/auth/rankingTop50`, {
          params: {
              limit: 10, //how much elements we need, for one list, if it doesn't have that much, fine.. 
              offset: (currentPage - 1) * 10 // Calculate offset based on currentPage. from what row to start in database ! 
          }
      });
      setTop50Users(response.data);
  } catch (error) {
      console.error('Error fetching top users:', error);
  }





  }




  // the ones that are in 50
  // TODO, this one, you fill up, by filter, and by database (that all goes in filter)
 /*  const top50Users = [
    {
      rank: 1,
      name: "John Doe",
      age: 30,
      country: "USA",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },  
    {
      rank: 2,
      name: "Jane Smith",
      age: 25,
      country: "Canada",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
    },
  ]; */

  const otherUsers = [
    {
      rank: 3,
      name: "John Doe",
      age: 30,
      country: "USA",
      email: "john.doe@example.com",
      phone: "123-456-4324",
    },
    {
      rank: 4,
      name: "Jane Smith",
      age: 25,
      country: "Canada",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
    },
  ];

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

             {/* this is red separator, below are all others.. */}
             <tr className="border-b-2 border-red_first " style={{padding: "0px", paddingTop: "-5px"}}>
                <td colSpan="100%"></td>
             </tr>
       

            {otherUsers.map((user, index) => (
              <Others
                rank={user.rank}
                name={user.name}
                age={user.age}
                country={user.country}
                email={user.email}
                phone={user.phone}
                user_type={currentUserType}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>


{/* // TODO, and just make this style better, on right side.. of lists..  */}
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>

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
