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
      <NavbarClean />

      {/* first div */}
     

      <FirstScreenHome />


    
      <SecondScreenHome />


      <Button
            onClick={() => {
              navigate("/supporters");
            }}
            className="w-44 "
            style={{ marginTop: "0px" }}
            sx={{
              height: "45px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 3,
              border: `1px solid #AF2626`,
              "&:hover": {
                background: "rgb(202, 67, 67)",
                color: "white",
                border: `1px solid rgb(202, 67, 67)`,
              },
            }}
            id="randomize-btn"
            type="submit"
          >
            <span className="popins-font" style={{ textTransform: "none" }}>
              Sign up a friend
            </span>
          </Button>





      {/* Our Competitions */}
      <div
        className="flex justify-center items-center flex-col"
        data-aos="fade-up"
        data-aos-offset="300"
      >
        <p className="text-[30px] text-red_first mt-8 ">
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
