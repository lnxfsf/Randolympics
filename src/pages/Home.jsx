// this is main page, where people can come from google search

// ovo import
/* import "animate.css";
import "@mui/material/styles/styled"; */



import React, { useState, useEffect } from "react";



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


const Home = () => {
 

  const navigate = useNavigate();

/* 
  useEffect(() => {
    AOS.init();
  }, []); */


  return (
    <>
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
    


      {/* FAQ 
      <FAQ /> 
      */}
      

      <div className="h-96"></div>

      <FooterClean />

    </>
  );
};

export { Home };
