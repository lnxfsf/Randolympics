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


// okej, ovo radi (ovo je sigurniji način da fetch-ujes, nego axios API... )

const Home = () => {


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

   
   



    <img src="landing_page/first.png" />


















    
      <Footer />
    </>
  );
};

export { Home };
