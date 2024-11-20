// this is main page, where people can come from google search

// ovo import
/* import "animate.css";
import "@mui/material/styles/styled"; */

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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

import ReactGA from "react-ga";
import { SeventhScreenHome } from "./Home/SeventhScreenHome";
import { NewsNewsBlock } from "../components/News/NewsBlock/NewsNewsBlock";
import { ContactUsForm } from "./Contact/ContactUsForm";

let GTAG_ID = import.meta.env.VITE_GTAG_ID || process.env.VITE_GTAG_ID;

const TRACKING_ID = GTAG_ID;

ReactGA.initialize(TRACKING_ID);

import { Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SearchForUsers } from "./Home/SearchForUsers";
import { FifthScreenHomeOld } from "./Home/FifthScreenHomeOld";
import { SixthScreenHomeAnother } from "./Home/SixthScreenHomeAnother";
import { FifthScreenHomeOld2 } from "./Home/FifthScreenHomeOld2";
import { FifthScreenHomeOld3 } from "./Home/FifthScreenHomeOld3";
import { SecondScreenHome2 } from "./Home/SecondScreenHome2";
import { SecondScreenHome3 } from "./Home/SecondScreenHome3";
import { FifthScreenHomeNewDesign } from "./Home/FifthScreenHomeNewDesign";

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "5px",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more

const Home = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const navigate = useNavigate();

  /* 
  useEffect(() => {
    AOS.init();
  }, []); */


  const sectionRef = useRef(null);


  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Real People. Randomly Selected. Competing in Olympic Sports"
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <Navbar />

      <FirstScreenHome scrollToSection={() => sectionRef.current.scrollIntoView({ behavior: 'smooth' })} />
        
      <SecondScreenHome sectionRef={sectionRef}/> 

      <SecondScreenHome3 />
      
      <SecondScreenHome2 />



      {/* <FifthScreenHome /> */}

      <FifthScreenHomeNewDesign />
{/* 
      <FifthScreenHomeOld /> */}











      <SixthScreenHomeAnother />
      
      <ThirdScreenHome />

      <SeventhScreenHome />


    


    {/*   

    // Read more about our four types of income
    
    
    <div
        className={`flex  items-center w-full bg-black text-white mt-4 ${
          expanded ? "rounded-t-lg" : "rounded-lg"
        }   pl-2 pr-2`}
      >
        <p
        /*   expand={expanded} 
          onClick={() => {
            setExpanded(!expanded);
          }}
          className="cursor-pointer select-none  pl-2 font-semibold text-red_second lexend-font "
        >
          Read more about our four types of income
        </p>

        <ExpandMore
          expand={expanded}
          onClick={() => {
            setExpanded(!expanded);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#D24949" }} />
        </ExpandMore>
      </div> 

      <div className="">
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <FourthScreenHome />
        </Collapse>
      </div>

      <SixthScreenHome />


      <SearchForUsers />*/}

      {/* Our Competitions */}
      <div className="flex justify-center items-center flex-col lexend-font text-black_second">
        <p className="text-2xl md:text-4xl mt-8 font-bold ">
          <b> {t("home.ourCompetitions.title1")}</b>
        </p>

        {/* outer box   */}
        <GridOfSportsHome />
      </div>

      <SixthScreenHomeAnother />


      <div className="flex justify-center mt-16 mb-16 flex-col items-center">
        <p className="text-4xl font-semibold  text-red_second ">News</p>

        <NewsNewsBlock />
      </div>

    <SixthScreenHome />

      <FAQ />

      <ContactUsForm />

      <FooterClean />
    </>
  );
};

export { Home };
