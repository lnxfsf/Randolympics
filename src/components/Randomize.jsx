import "../styles/randomize.scoped.scss";

import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { RandomizeItem } from "../components/Randomize/RandomizeItem";






const Randomize = () => {

    const navigate = useNavigate();


  const handleRedirectRegister = () => {
    navigate("/register");
  };

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



    <div >
        

    </div>

    <div className="main_grid_schedule m-8 mt-16">

            <p></p>

            {/* this, time, as well, can be updated dynamically, by data from backend */}
            <p><b>09-12:00</b></p>
            <p><b>12-15:00</b></p>
            <p><b>15-18:00</b></p>
            <p><b>18-21:00</b></p>
            <p><b>21-00:00</b></p>


            <p className="days_grid_schedule" >Monday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>


            
            <p className="days_grid_schedule">Tuesday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>



            <p className="days_grid_schedule">Wednesday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>



            <p className="days_grid_schedule">Thursday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>



            <p className="days_grid_schedule">Friday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>





            <p className="days_grid_schedule">Saturday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>



            <p className="days_grid_schedule">Sunday</p>
            <RandomizeItem  icon={"swim"} name={"Butterfly Swimming"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>
            <RandomizeItem icon={"gun"} name={"Double Trap "}/>
            <RandomizeItem icon={"hockey"} name={"Field Hockey"}/>
            <RandomizeItem icon={"hourglass"} name={"Break"}/>

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
