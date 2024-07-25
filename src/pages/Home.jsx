// this is main page, where people can come from google search


import { Footer } from "../components/Footer";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { createDirectus, rest, readItems } from "@directus/sdk";

import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FirstCollapsibleHome } from "../components/Home/FirstCollapsibleHome";

import "../styles/home.scoped.scss"
import { CompetitionsHome } from "../components/Home/CompetitionsHome";
import { EconomiscLoansHome } from "./Home/EconomiscLoansHome";


import { useNavigate } from "react-router-dom";
import { NavbarHome } from "../components/NavbarHome";







let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: '5px',

  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more



// for countdown
const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  return timeLeft;
};

// okej, ovo radi (ovo je sigurniji način da fetch-ujes, nego axios API... )

const Home = () => {


  const targetDate = new Date('2028-06-25T00:00:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));






  // ? expand more
  const [expandedFirstText, setExpandedFirstText] = useState(false);
  const [expandedSecondText, setExpandedSecondText] = useState(false);
  const [expandedThirdText, setExpandedThirdText] = useState(false);



  const [expandedLoans, setExpandedLoans] = useState(false);
  const [expandedBroadcast, setExpandedBroadcast] = useState(false);
  const [expandedSponsorship, setExpandedSponsorship] = useState(false);











  const [games, setGames] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    fetchNewsGames();
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const fetchNewsGames = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/items/stockholm_games`
      );

      /* 
this is from official:
    const client = createDirectus('http://localhost:8055').with(rest());
    const response = await client.request(readItems('stockholm_games')); 
    */

      // set variable.
      setGames(response.data.data);

      //console.log(games);  // this on first will not reflect updated state ! so it will be null, but access it outside, and it will show...
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  // so once you accessed it outside of useEffect, then it worked fine..
  console.log(games);



  // we need in format: 1 Jan 2024
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <>
      <NavbarHome />







      <div className="firstHhomeImage flex justify-center items-center flex-col">




        <div className="countdown-timer  flex items-center justify-center ">

          <p className="basis-1/2 p-8  ">Stockholm, Sweden <br /> June 25th - July 2nd 2028</p>


          <div className="flex space-x-8 p-4">
            <div className="flex flex-col items-center">
              <p className="text-4xl"><b>{timeLeft.days ?? 0}</b></p>
              <p>Days</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-4xl">{timeLeft.hours ?? 0}</p>
              <p>Hours</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-4xl">{timeLeft.minutes ?? 0}</p>
              <p>Minutes</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-4xl">{timeLeft.seconds ?? 0}</p>
              <p>Sec</p>
            </div>
          </div>
        </div>



        <div className="flex items-center justify-center pt-64 gap-8">
          <p className="text-4xl" style={{ color: "white" }}>Stockholm 2028 Games</p>

          <Button


            onClick={() => { navigate("/login") }}
            className="w-44 "
            style={{ marginTop: "0px" }}
            sx={{
              height: "45px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 3,
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
            <span className="popins-font" style={{ textTransform: "none" }} >Apply for now</span>
          </Button>


        </div>

        <div className="flex items-center justify-center pt-8 pl-24  pr-24  ">
        <p style={{ color: "white" }}>The Randomolympics is an innovative and exciting event that reimagines traditional sports competitions by randomly assigning athletes to various events. This new format addresses several critical issues often associated with major sports events today, promoting a fairer, more inclusive, and sustainable sporting experience.</p>

        </div>


      </div>



      <div className="h-96"></div>

















      <Footer />
    </>
  );
};

export { Home };
