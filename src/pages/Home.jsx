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
import { GridOfSportsHome } from '../components/Home/GridOfSportsHome';





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


  const [expandedFirstText, setExpandedFirstText] = useState(false);

  const [expandedSecondText, setExpandedSecondText] = useState(false);
  const [expandedThirdText, setExpandedThirdText] = useState(false);
  const [expandedFourthText, setExpandedFourthText] = useState(false);
  const [expandedFifthText, setExpandedFifthText] = useState(false);
  const [expandedSixthText, setExpandedSixthText] = useState(false);
  const [expandedSeventhText, setExpandedSeventhText] = useState(false);
  const [expandedEighthText, setExpandedEighthText] = useState(false);
  const [expandedNinethText, setExpandedNinethText] = useState(false);
  const [expandedTenthText, setExpandedTenthText] = useState(false);

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






      {/* first div */}
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




      {/* Our Competitions */}
      <div className="flex justify-center items-center flex-col"  data-aos="fade-up" data-aos-offset="300">

        <p className="text-[30px] text-red_first mt-8 "><b>Our Competitions</b></p>


        {/* outer box  */}
        <GridOfSportsHome />
      </div>



      {/* Our Beliefs */}
      <div className="flex justify-center items-start">



        <div data-aos="fade-right" data-aos-offset="200" className="basis-1/3 secondHhomeImage flex justify-center items-start">

          <p className="text-4xl mt-8 mr-6" style={{ color: "white" }} >Our Beliefs</p>

        </div>


        <div data-aos="fade-left" data-aos-offset="200" className="w-full h-[350px] p-4 pt-8 pr-24 bg-[#F7FAFA]">

          <p className="text-justify">We welcome everyone to participate and compete, regardless of nationality, race, values, religion, political views, gender, sexual orientation, or age.</p>
          <br />
          <p className="text-justify">In times of tension, the world needs us more than ever. Our host cities will ensure everyone can join, arranging necessary visas for all participants. We stand against any political pressure to exclude athletes based on their identity or beliefs. Transparency is our commitment, using open-source technology for payments and communication. Our democratic approach guarantees equal rights and voting power for every nation and citizen. We may not always have luxury, sometimes staying in tents or using old equipment, but we will never compromise on our core values.</p>
        </div>

      </div>



      {/* Economics */}
      <div className="flex justify-center items-start bg-[#F7FAFA] mt-8" data-aos="fade-up" data-aos-offset="200">

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

              {/* <img src="home/ellipse.svg" alt="Ellipse" className="ellipse-image"></img> */}


              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="ellipse-image">
                <circle class="fillme"></circle>
              </svg>
            </div>




            <div className=" flex justify-center items-center flex-col economicsItem cursor-pointer select-none"

              data-aos="zoom-in-right"
              data-aos-delay="300"
              data-aos-offset="100"
            >
              <p className="font-semibold" >2</p>
              <p className="text-lg font-semibold text-red_first text-center">Broadcasting rights</p>
              {/* <img src="home/ellipse.svg" alt="Ellipse" class="ellipse-image"></img> */}

              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="ellipse-image">
                <circle class="fillme"></circle>
              </svg>

            </div>


            <div className="  flex justify-center items-center flex-col  economicsItem cursor-pointer select-none"

              data-aos="zoom-in-right"
              data-aos-delay="600"
              data-aos-offset="100"

            >
              <p className="font-semibold">3</p>
              <p className="text-lg font-semibold text-red_first text-center">Sponsorship</p>
              {/* <img src="home/ellipse.svg" alt="Ellipse" class="ellipse-image"></img> */}

              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="ellipse-image">
                <circle class="fillme"></circle>
              </svg>

            </div>


          </div>

        </div>
      </div>




      {/* FAQ */}
      <div className="flex justify-center items-center mt-8 flex-col" data-aos="fade-up">

        <p className="text-[30px] text-red_first mt-8  "><b>FAQ</b></p>


        <div className='w-1/2'>


          {/* <div className=" flex justify-around items-center w-full bg-black_first">
 */}

          {/* prvi */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedFirstText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-4`}>


            <p className="text-red_first font-semibold pl-2 select-none">1.</p>
            <p expand={expandedFirstText}
              onClick={() => { setExpandedFirstText(!expandedFirstText) }} className="cursor-pointer select-none flex-grow pl-4  ">What is Randolympics ?</p>





            <ExpandMore

              expand={expandedFirstText}
              onClick={() => { setExpandedFirstText(!expandedFirstText) }}
              aria-expanded={expandedFirstText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedFirstText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>



          {/* drugi  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedSecondText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">2.</p>
            <p expand={expandedSecondText}
              onClick={() => { setExpandedSecondText(!expandedSecondText) }} className="cursor-pointer select-none flex-grow pl-4  ">How does Randolympics work ?</p>





            <ExpandMore

              expand={expandedSecondText}
              onClick={() => { setExpandedSecondText(!expandedSecondText) }}
              aria-expanded={expandedSecondText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedSecondText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>



          {/* treci  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedThirdText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">3.</p>
            <p expand={expandedThirdText}
              onClick={() => { setExpandedThirdText(!expandedThirdText) }} className="cursor-pointer select-none flex-grow pl-4  ">Who can participate ?</p>





            <ExpandMore

              expand={expandedThirdText}
              onClick={() => { setExpandedThirdText(!expandedThirdText) }}
              aria-expanded={expandedThirdText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedThirdText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>



          {/* cetvrti  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedFourthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">4.</p>
            <p expand={expandedFourthText}
              onClick={() => { setExpandedFourthText(!expandedFourthText) }} className="cursor-pointer select-none flex-grow pl-4  ">How are athletes selected ?</p>





            <ExpandMore

              expand={expandedFourthText}
              onClick={() => { setExpandedFourthText(!expandedFourthText) }}
              aria-expanded={expandedFourthText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedFourthText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>



          {/* peti  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedFifthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">5.</p>
            <p expand={expandedFifthText}
              onClick={() => { setExpandedFifthText(!expandedFifthText) }} className="cursor-pointer select-none flex-grow pl-4  ">How are weight categories organized ?</p>





            <ExpandMore

              expand={expandedFifthText}
              onClick={() => { setExpandedFifthText(!expandedFifthText) }}
              aria-expanded={expandedFifthText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedFifthText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>



          {/* sesti  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedSixthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">6.</p>
            <p expand={expandedSixthText}
              onClick={() => { setExpandedSixthText(!expandedSixthText) }} className="cursor-pointer select-none flex-grow pl-4  ">What sports are included in Randolympics ?</p>





            <ExpandMore

              expand={expandedSixthText}
              onClick={() => { setExpandedSixthText(!expandedSixthText) }}
              aria-expanded={expandedSixthText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedSixthText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>


          {/* sedmi  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedSeventhText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">7.</p>
            <p expand={expandedSeventhText}
              onClick={() => { setExpandedSeventhText(!expandedSeventhText) }} className="cursor-pointer select-none flex-grow pl-4  ">How are travel costs covered ?</p>





            <ExpandMore

              expand={expandedSeventhText}
              onClick={() => { setExpandedSeventhText(!expandedSeventhText) }}
              aria-expanded={expandedSeventhText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedSeventhText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>


          {/* osmi  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedEighthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">8.</p>
            <p expand={expandedEighthText}
              onClick={() => { setExpandedEighthText(!expandedEighthText) }} className="cursor-pointer select-none flex-grow pl-4  ">How can I sign up to participate ?</p>





            <ExpandMore

              expand={expandedEighthText}
              onClick={() => { setExpandedEighthText(!expandedEighthText) }}
              aria-expanded={expandedEighthText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedEighthText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>



          {/* deveti  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedNinethText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">9.</p>
            <p expand={expandedNinethText}
              onClick={() => { setExpandedNinethText(!expandedNinethText) }} className="cursor-pointer select-none flex-grow pl-4  ">How can my company become a sponsor ?</p>





            <ExpandMore

              expand={expandedNinethText}
              onClick={() => { setExpandedNinethText(!expandedNinethText) }}
              aria-expanded={expandedNinethText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedNinethText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>


          {/* deseti  */}
          <div className={`flex justify-between items-center w-full bg-black text-white ${expandedTenthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


            <p className="text-red_first font-semibold pl-2 select-none">10.</p>
            <p expand={expandedTenthText}
              onClick={() => { setExpandedTenthText(!expandedTenthText) }} className="cursor-pointer select-none flex-grow pl-4  ">Where can I find more information about Randolympics ?</p>





            <ExpandMore

              expand={expandedTenthText}
              onClick={() => { setExpandedTenthText(!expandedTenthText) }}
              aria-expanded={expandedTenthText}
              aria-label="show more"
            >

              <ExpandMoreIcon />

            </ExpandMore>


          </div>
          <div className="">
            <Collapse in={expandedTenthText} timeout="auto" unmountOnExit>

              <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                <p>familijo</p>
              </div>

            </Collapse>
          </div>




        </div>
      </div>


      <div className="h-96"></div>














      <Footer />
    </>
  );
};

export { Home };
