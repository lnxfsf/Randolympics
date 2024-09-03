// this is main page, where people can come from google search

// ovo import
import "animate.css";
import "@mui/material/styles/styled";

import { Footer } from "../components/Footer";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { createDirectus, rest, readItems } from "@directus/sdk";

import "../styles/home.scoped.scss";
import { CompetitionsHome } from "../components/Home/CompetitionsHome";
import { EconomiscLoansHome } from "./Home/EconomiscLoansHome";

import { useNavigate } from "react-router-dom";
import { NavbarHome } from "../components/NavbarHome";

import AOS from "aos";
import "aos/dist/aos.css";
import { GridOfSportsHome } from "../components/Home/GridOfSportsHome";
import { FAQ } from "../components/Home/FAQ";
import { NavbarClean } from "../components/NavbarClean";
import { FirstScreenHome } from "./Home/FirstScreenHome";
import { FooterClean } from "../components/FooterClean";
import { SecondScreenHome } from "./Home/SecondScreenHome";
import { Navbar } from "../components/Navbar";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;



// okej, ovo radi (ovo je sigurniji način da fetch-ujes, nego axios API... )

const Home = () => {
 

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <>
      <Navbar />

      {/* first div */}
     

      <FirstScreenHome />


    
      <SecondScreenHome />


    



      {/* Our Competitions */}
      <div
        className="flex justify-center items-center flex-col lexend-font text-black_second"
     
      >
        <p className="text-2xl md:text-4xl mt-8 font-bold ">
          <b>Our Competitions</b>
        </p>

        {/* outer box  
        <GridOfSportsHome /> */}
      </div>



     


      {/* FAQ 
      <FAQ />
      */}

      <div className="h-96"></div>

      <FooterClean />

    </>
  );
};

export { Home };
