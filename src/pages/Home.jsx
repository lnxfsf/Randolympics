// this is main page, where people can come from google search

// ovo import
/* import "animate.css";
import "@mui/material/styles/styled"; */



import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';



import "../styles/home.scoped.scss";


import { useNavigate } from "react-router-dom";

/* 
import AOS from "aos";
import "aos/dist/aos.css"; */



import { GridOfSportsHome } from "../components/Home/GridOfSportsHome";
import { FAQ } from "../components/Home/FAQ";

import { FirstScreenHome } from "./Home/FirstScreenHome";
import { FooterClean } from "../components/FooterClean";
import { SecondScreenHome } from "./Home/SecondScreenHome";
import { Navbar } from "../components/Navbar";
import { ThirdScreenHome } from "./Home/ThirdScreenHome";
import { FourthScreenHome } from "./Home/FourthScreenHome";
import { FifthScreenHome } from "./Home/FifthScreenHome";
import { SixthScreenHome } from "./Home/SixthScreenHome";
import { Helmet } from "react-helmet-async";





import ReactGA from 'react-ga';

let GTAG_ID =
  import.meta.env.VITE_GTAG_ID ||
  process.env.VITE_GTAG_ID;


const TRACKING_ID = GTAG_ID;


ReactGA.initialize(TRACKING_ID);




const Home = () => {
 
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  
  const navigate = useNavigate();

/* 
  useEffect(() => {
    AOS.init();
  }, []); */


  return (
    <>


    <Helmet>
      <title>Home</title>
      <meta name="description" content="Real People. Randomly Selected. Competing in Olympic Sports" />
      <link rel="canonical" href="/" />
    </Helmet>




      <Navbar />

    
     

      <FirstScreenHome />


    
      <SecondScreenHome />






      {/* Our Competitions */}
      <div
        className="flex justify-center items-center flex-col lexend-font text-black_second"
       
      >
        <p className="text-2xl md:text-4xl mt-8 font-bold "  >
          <b>Our Competitions</b>
        </p>

        {/* outer box   */}
        <GridOfSportsHome />
      </div>


      <ThirdScreenHome />

     
      <FourthScreenHome />
    
      <FifthScreenHome />


      {/* FAQ   */}
      <FAQ /> 
    


      <SixthScreenHome />
      


      <FooterClean />

    </>
  );
};

export { Home };
