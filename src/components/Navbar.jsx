



import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItem,
  Hidden,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Tooltip,
  SwipeableDrawer,
  Box,
} from "@mui/material";

import {
  Settings,
  Logout,
  Star as StarIcon,
  Home as HomeIcon,
  Explore as ExploreIcon,
  LiveTv as LiveTvIcon,
  MenuBook as MenuBookIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";


import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scoped.scss";

import { useNavigate } from "react-router-dom";




const Navbar = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#000000', boxShadow: 'none'  }} >
        
         
          <Toolbar sx={{ justifyContent: 'space-between' }}>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}

             sx={{ display: { md: "none" } }} 
        


         
            

          >
            <MenuIcon />
          </IconButton>


            <Link className="hidden  min-[900px]:flex" to="/">
              <img src="/randolympics_logo.svg" className="w-32 sm:w-44 md:w-52 lg:w-64  ml-4 " />
            </Link>
          


            <nav className="hidden lg:flex  gap-8 justify-center items-center   lexend-font pl-16">
            <Link to="/#sports" className="nav_btns">
            Sports
            </Link>
            <Link to="/#beliefs" className="nav_btns">
            Our beliefs
            </Link>
            <Link to="/#economics" className="nav_btns">
            Economics
            </Link>
            <Link to="/#how_it_works" className="nav_btns">
            How it works
            </Link>
            <Link to="/#faq" className="nav_btns">
            FAQ
            </Link>
            {/* Conditional user elements */}
          </nav>



      


    <div className="flex gap-2">
            <Button
                onClick={() => {
                  navigate("/login");
                }}
                className="w-12 md:w-24 "
                style={{ textTransform: "none" }}
                sx={{
                  height: "45px",
                  bgcolor: "#fff",
                  color: "#444444",
                  borderRadius: 3,
                  border: `1px solid #D24949`,
                  "&:hover": {
                    background: "rgba(210, 73, 73, 1)",
                    color: "white",
                    border: `1px solid rgba(210, 73, 73, 1)`,
                  },
                }}
                variant="text"
              >
                <span className="lexend-font font-semibold text-xs">Log In</span>
              </Button>
            

            
              <Button  
          onClick={() => {
            navigate("/supporters");
          }}
          className="w-24 md:w-36  "

          style={{ textTransform: "none" }}
                sx={{
                 

                  height: "45px",
                  bgcolor: "#D24949",

                  color: "#fff",
                  borderRadius: 3,
                  border: `1px solid #D24949`,
                  "&:hover": {
                    background: "rgba(210, 73, 73, 1)",
                    color: "white",
                    border: `1px solid rgba(210, 73, 73, 1)`,
                  },
                }}
                variant="text"
          
          >
              <span className="lexend-font font-semibold text-xs ">Sign Up Your Friend</span>
            </Button>
            </div>
          
          

            
          </Toolbar>


        </AppBar>
      </Box>
    </>
  );
};

export { Navbar };
