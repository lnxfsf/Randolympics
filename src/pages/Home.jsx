// this is main page, where people can come from google search

// ovo import
import 'animate.css';


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

import AOS from 'aos';
import 'aos/dist/aos.css';





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




  const navigate = useNavigate();

  useEffect(() => {

    AOS.init();
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);




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




      <div className="flex justify-center items-center flex-col">

        <p className="text-[30px] text-red_first mt-8 mb-32"><b>Our Competitions</b></p>



      </div>




      <div className="flex justify-center items-start">



        <div data-aos="fade-right" className="basis-1/3 secondHhomeImage flex justify-center items-start">

          <p className="text-4xl mt-8 mr-6" style={{ color: "white" }} >Our Beliefs</p>

        </div>


        <div data-aos="fade-left" className="w-full h-[350px] p-4 pt-8 pr-24 bg-[#F7FAFA]">

          <p className="text-justify">We welcome everyone to participate and compete, regardless of nationality, race, values, religion, political views, gender, sexual orientation, or age.</p>
          <br />
          <p className="text-justify">In times of tension, the world needs us more than ever. Our host cities will ensure everyone can join, arranging necessary visas for all participants. We stand against any political pressure to exclude athletes based on their identity or beliefs. Transparency is our commitment, using open-source technology for payments and communication. Our democratic approach guarantees equal rights and voting power for every nation and citizen. We may not always have luxury, sometimes staying in tents or using old equipment, but we will never compromise on our core values.</p>
        </div>

      </div>





      <div className="flex justify-center items-start bg-[#F7FAFA] mt-8" data-aos="fade-up">

        <div className=" flex flex-col w-full h-[350px]  justify-center ml-24 mr-24 p-4 mb-16 " >


          <p className="text-[30px] text-red_first mt-8 self-center"><b>Economics: Three types of income:</b></p>
          <p className=" self-center mt-4 text-center">Our organization has three types of income sources: Loans, Broadcasting Rights, and Sponsorships. All payments are published on the blockchain. Below is a detailed description of each income type:</p>


          <div className="flex justify-around mt-8 ml-16 mr-16">

            <div className=" flex justify-center items-center flex-col economicsItem cursor-pointer select-none "

              data-aos="zoom-in-right"
              data-aos-delay="100"

              data-aos-offset="100"


            >
              <p className="font-semibold">1</p>
              <p className="text-lg font-semibold text-red_first" >Loans</p>
              <img src="home/ellipse.svg" alt="Ellipse" className="ellipse-image"></img>

            </div>




            <div className=" flex justify-center items-center flex-col economicsItem cursor-pointer select-none"

              data-aos="zoom-in-right"
              data-aos-delay="300"
              data-aos-offset="100"
            >
              <p className="font-semibold" >2</p>
              <p className="text-lg font-semibold text-red_first text-center">Broadcasting rights</p>
              <img src="home/ellipse.svg" alt="Ellipse" class="ellipse-image"></img>

            </div>


            <div className="  flex justify-center items-center flex-col  economicsItem cursor-pointer select-none"

              data-aos="zoom-in-right"
              data-aos-delay="600"
              data-aos-offset="100"

            >
              <p className="font-semibold">3</p>
              <p className="text-lg font-semibold text-red_first text-center">Sponsorship</p>
              <img src="home/ellipse.svg" alt="Ellipse" class="ellipse-image"></img>

            </div>


          </div>

        </div>



      </div>

      <div className="h-96"></div>














      <Footer />
    </>
  );
};

export { Home };
