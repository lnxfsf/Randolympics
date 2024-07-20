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



  const [randomizeFormData, setRandomizeFormData] = useState([{ name: '', email: '', weightCategory: 'light', gender: 'M' }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = randomizeFormData.map((data, idx) => {
      if (index === idx) {
        return { ...data, [name]: value };
      }
      return data;
    });
    setRandomizeFormData(newFormData);
  };


  const addInputSet = () => {
    setRandomizeFormData([...randomizeFormData, { name: '', email: '', weightCategory: 'light', gender: 'M' }]);
  };


  const removeInputSet = (index) => {
    setRandomizeFormData(randomizeFormData.filter((_, idx) => idx !== index));
  };








  // ---------------


  const navigate = useNavigate();







  const handleRedirectRegister = () => {
    navigate("/register");
  };


  const handleRandomize = async (e) => {
    e.preventDefault();

    console.log("sent")



    // nece weight biti ! ovde ! 

    // TODO, moras, da uradis jos jedan time slot , 06-09 , jos jedan. 
    // TODO za table što je... 



    try {
      var response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/landingPageRandomize`,
        {
          params: {
            randomizeFormData
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







      <table className="tablez">
        <thead>
          <tr>
            <th className="thz">Date</th>
            <th className="thz">00-03:00</th>
            <th className="thz">03-06:00</th>
            <th className="thz"> 06-09:00</th>
            <th className="thz">09-12:00</th>
            <th className="thz"> 12-15:00</th>
            <th className="thz">15-18:00</th>
            <th className="thz">18-21:00</th>
            <th className="thz">21-24:00</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <th className="thz">Saturday (June 24th)</th>

            <td className="tdz" className="tdz" colSpan={8} >Opening & Randomization of Athletes and Sports</td>


          </tr>


          <tr>
            <th className="thz">Sunday  June 25th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's 50m Freestyle Swimming"} /></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Monday June 26th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's 50m Freestyle Swimming"} /></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Tuesday June 27th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Wednesday (June 28th)</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>


            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Thursday June 29th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>


            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Friday June 30th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            
             <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

             <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
             <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
             <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
   

            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Saturday July 1st</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>


          <tr >
            <th rowSpan={2} className="thz">Sunday July 2nd</th>



            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>


          </tr>

          <tr>




            <td className="tdz" colSpan={8}>Closing & Randomization of Next Games</td>



          </tr>




        </tbody>
      </table>






      <div>


        <form
          action="#"
          className="sign-in-form flex flex-col wrap justify-start items-center"
          onSubmit={handleRandomize}
        >

          {randomizeFormData.map((data, index) => (


            <div key={index} style={{ marginBottom: '10px' }}>


              <input
                type="text"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={(event) => handleInputChange(index, event)}
              />



              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={(event) => handleInputChange(index, event)}
              />



              <select
                name="weightCategory"
                value={data.weightCategory}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select>


              <select
                name="gender"
                value={data.gender}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="M">Man</option>
                <option value="F">Woman</option>

              </select>



              <button type="button" onClick={() => removeInputSet(index)}>
                Remove
              </button>



            </div>



          ))}



          <button type="button" onClick={addInputSet}>
            Add Another
          </button>



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
