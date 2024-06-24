// This shows only to National President user_type...
import { HeaderMyProfile } from "./HeaderMyProfile";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { useState, useEffect } from "react";



const Elections = () => {


    const [selectedRole, setSelectedRole] = useState("AH");

    const handleChangeRole = (event) => {
        setSelectedRole(event.target.value);
      };



  return (
    <>
      <HeaderMyProfile />


    {/* //TODO: add filter and search options LATER !!!, once I know what values to filter by, and if it needs to be dropdown etc..
    */}
      <div className="flex m-0 flex-col">

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} className="m-4 ml-0 mb-1">

          <InputLabel
            
            style={{ color: "#232323" }}
            id="roleDropdowns"
          >
            <b>Selecting</b>
          </InputLabel>
          <Select
            labelId="roleDropdowns"
            
            value={selectedRole}
            onChange={handleChangeRole}
            className="w-[420px]"
            style={{ color: "#000" }}
          >
            <MenuItem value={"AH"}>Athletes</MenuItem>
            <MenuItem value={"GP"}>Global President</MenuItem>
            <MenuItem value={"RS"}>Referee & support</MenuItem>
          </Select>
        </FormControl>
      </div>






    <p className="m-2">You are selecting the athletes to compete in the next games. The <span className="text-red_first">top 50</span> athletes in the list will be chosen to participate in the games. Use the Update Rank feature to increase or decrease the rank of each athlete.</p>

    </>
  );
};

export { Elections };
