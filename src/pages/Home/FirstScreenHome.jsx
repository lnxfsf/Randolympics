
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { CountDownTimerHome } from "../../components/Home/CountDownTimerHome";

import {useTranslation, Trans} from "react-i18next";


// for countdown
const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
  
    return timeLeft;
  };

  

// we need in format: 1 Jan 2024
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};



const FirstScreenHome = () => {
  const { t } = useTranslation();

  const targetDate = new Date("2028-06-25T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);



    return (<>

    <div className="firstHhomeImage flex justify-start max-md:pt-16 md:justify-center items-center flex-col lexend-font">



   
        <p className="text-2xl md:text-4xl p-2 font-bold  text-center" style={{ color: "white" }}>
          Real People. 
           {t('welcomeMessage')} 
          <br />Randomly Selected.
          <br />
          Competing in Olympic Sports
        </p>
       
       
       



           {/* // TODO, treba da izvadis u component ovo.. */} 
        

        <CountDownTimerHome />

        <div className="flex items-center justify-center  flex-col pt-8">
          <p className="text-xl pb-4 text-center" style={{ color: "white" }}>
            Curious about possible schedules?
          </p>

          <Button
            onClick={() => {
              navigate("/randomize");
            }}
            className="w-36 "
            style={{ textTransform: "none" }}
            sx={{
              height: "45px",
              bgcolor: "#D24949",
            

              color: "#fff",
              borderRadius: 2,
              border: `1px solid #D24949`,
              "&:hover": {
                background: "rgba(210, 73, 73, 1)",
                color: "white",
                border: `1px solid rgba(210, 73, 73, 1)`,
              },
            }}
            id="randomize-btn"
            type="submit"
          >
            <span className="popins-font" style={{ textTransform: "none" }}>
              Randomize
            </span>
          </Button>
        </div>

       
       
      </div>

        </>
    )

}

export {FirstScreenHome}