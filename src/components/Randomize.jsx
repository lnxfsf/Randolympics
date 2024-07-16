import "../styles/randomize.scoped.scss";

import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";

import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { useRef, useState, useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Menu from "@mui/material/Menu";


import { useNavigate } from "react-router-dom";

import { RandomizeItem } from "../components/Randomize/RandomizeItem";
import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;


const Randomize = () => {
  const navigate = useNavigate();



  // ? HERE, for weight..





  const weightOptions = ["Kg", "Lb"]; // supported cryptos

  const [weightMenuAnchorEl, setWeightMenuAnchorEl] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("Kg");

  const handleWeightMenuClick = (event) => {
    setWeightMenuAnchorEl(event.currentTarget);
  };

  const handleWeightMenuClose = () => {
    setWeightMenuAnchorEl(null);
  };

  const handleWeightOptionSelect = (option) => {
    setSelectedWeight(option);
    setWeightMenuAnchorEl(null); // Close the menu after selection (optional)
  };



  // ? HERE, for weight..



  const handleRedirectRegister = () => {
    navigate("/register");
  };


  const handleRandomize = async (e) => {
    e.preventDefault();


    var name1 = e.target.name1.value;
    var email1 = e.target.email1.value;
    



    if (!e.target.weight1) {
      var weight1 = null;
    } else {
      //var weight = e.target.weight.value;

      // if "lb" is selected. we upload in database in "kg". so we do converstion from "lb" -> "kg"
      if (selectedWeight === "Lb") {
        var weight1 = (e.target.weight1 * 0.45359237);

        //console.log(weight);
      }
    }



    // TODO, moras, da uradis jos jedan time slot , 06-09 , jos jedan. 
    // TODO za table što je... 



    try {
      var response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/landingPageRandomize`,
        {
         params: {
          name1,
          email1,
          weight1,
         },

        }
      );
    } catch (error) {
      console.log(error);



    }

  }

  return (
    <>
      <Navbar />

      <div className="">

        <h1 className="flex text-[40px] mt-8 justify-center ">
          Let’s see <span className=" text-red_first pl-3 pr-3">your</span>{" "}
          schedule for{" "}
          <span className="underline decoration-red_first pl-4">June 2028</span>
        </h1>
      </div>

      <div></div>

      <div className="main_grid_schedule m-8 mt-16">
        <p></p>

        {/* this, time, as well, can be updated dynamically, by data from backend */}
        <p>
          <b>09-12:00</b>
        </p>
        <p>
          <b>12-15:00</b>
        </p>
        <p>
          <b>15-18:00</b>
        </p>
        <p>
          <b>18-21:00</b>
        </p>
        <p>
          <b>21-00:00</b>
        </p>

        <p className="days_grid_schedule">Monday</p>
        <RandomizeItem icon={"swim"} name={"Butterfly Swimming"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        <RandomizeItem icon={"gun"} name={"Double Trap "} />
        <RandomizeItem icon={"hockey"} name={"Field Hockey"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        

        <p className="days_grid_schedule">Tuesday</p>
        <RandomizeItem icon={"swim"} name={"Butterfly Swimming"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        <RandomizeItem icon={"gun"} name={"Double Trap "} />
        <RandomizeItem icon={"hockey"} name={"Field Hockey"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />

        <p className="days_grid_schedule">Wednesday</p>
        <RandomizeItem icon={"swim"} name={"Butterfly Swimming"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        <RandomizeItem icon={"gun"} name={"Double Trap "} />
        <RandomizeItem icon={"hockey"} name={"Field Hockey"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />

        <p className="days_grid_schedule">Thursday</p>
        <RandomizeItem icon={"swim"} name={"Butterfly Swimming"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        <RandomizeItem icon={"gun"} name={"Double Trap "} />
        <RandomizeItem icon={"hockey"} name={"Field Hockey"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />

        <p className="days_grid_schedule">Friday</p>
        <RandomizeItem icon={"swim"} name={"Butterfly Swimming"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        <RandomizeItem icon={"gun"} name={"Double Trap "} />
        <RandomizeItem icon={"hockey"} name={"Field Hockey"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />

        <p className="days_grid_schedule">Saturday</p>
        <RandomizeItem icon={"swim"} name={"Butterfly Swimming"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />
        <RandomizeItem icon={"gun"} name={"Double Trap "} />
        <RandomizeItem icon={"hockey"} name={"Field Hockey"} />
        <RandomizeItem icon={"hourglass"} name={"Break"} />

        <p className="days_grid_schedule">Sunday</p>
        <RandomizeItem icon={""} name={"Awards and closing event"} />

      </div>


      <div>


        <form
          action="#"
          className="sign-in-form flex flex-col wrap justify-start items-center"
          onSubmit={handleRandomize}
        >

          <div className="flex flex-col mb-1 justify-center mt-8">
            <TextField
              label="User"
              placeholder="Name"

              name="name1"
              id="name1"

              type="text"
              inputProps={{
                maxLength: 80,
              }}
              sx={{
                m: 1,
                width: "420px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "red",
                },

                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            />


            <TextField
              label="Email"
              placeholder="Email"

              name="email1"
              id="email1"

              type="email"
              inputProps={{
                maxLength: 80,
              }}
              sx={{
                m: 1,
                width: "420px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "red",
                },

                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
            />






          </div>


          <div className="flex mb-2.5 justify-center items-center mt-2">
            <TextField
              label="Weight"
              
              name="weight1"
              id="weight1"

              required




              type="number"

              onChange={(event) =>
                event.target.value < 0
                  ? (event.target.value = 0)
                  : event.target.value
              }


              placeholder="85 kg/185 lb"
              sx={{
                m: 1,
                width: "280px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "red",
                },

                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black",
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle kg / lb"
                      onClick={handleWeightMenuClick}
                      edge="end"
                    >
                      {/* Icon for dropdown, e.g., a downward arrow */}
                      {selectedWeight}
                    </IconButton>
                    <Menu
                      id="weight-menu"
                      anchorEl={weightMenuAnchorEl}
                      open={Boolean(weightMenuAnchorEl)}
                      onClose={handleWeightMenuClose}
                    >
                      {weightOptions.map((option) => (
                        <MenuItem
                          key={option}
                          onClick={() => handleWeightOptionSelect(option)}
                          selected={option === selectedWeight}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </InputAdornment>
                ),

                inputMode: 'numeric',
                pattern: '[0-9]*',






              }}
            />


          </div>



          <Button

            className="w-44 "
            style={{ marginTop: "20px" }}
            sx={{
              height: "60px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 25,
              border: `1px solid #AF2626`,
              "&:hover": {
                background: "rgb(196, 43, 43)",
                color: "white",
                border: `1px solid rgb(196, 43, 43)`,
              },
            }}
            id="randomize-btn"

            type="submit"




          >
            <span className="popins-font">Randomize</span>
          </Button>


        </form>

      </div>





      <div className="flex mb-12 mt-32">
        <div className="basis-1/2 flex flex-col items-end justify-center">
          <h1 className="flex text-[40px] justify-center ">Sounds fun !</h1>
          <p>Sign up for the challenge now</p>
        </div>

        <div className="basis-1/2 ml-8 mr-[550px]">
          <Button
            onClick={handleRedirectRegister}
            className="w-44 "
            style={{ marginTop: "20px" }}
            sx={{
              height: "60px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 25,
              border: `1px solid #AF2626`,
              "&:hover": {
                background: "rgb(196, 43, 43)",
                color: "white",
                border: `1px solid rgb(196, 43, 43)`,
              },
            }}
            id="register-btn"
          >
            <span className="popins-font">Register here</span>
          </Button>
        </div>
      </div>





      <Footer />
    </>
  );
};

export { Randomize };
