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

import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let { user, logoutUser } = useContext(AuthContext);


  let tokens = JSON.parse((localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens")));
  console.log(tokens)

  if (tokens) {
    var username = tokens.data.name;
    var profile_image = tokens.data.picture;
  }

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);

  const handleClick = (event) => {
    // ovo ako kliknes sa strane
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
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
              <img
                src="/randolympics_logo.svg"
                className="w-32 sm:w-44 md:w-52 lg:w-64  ml-4 "
              />
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




          {user ? (<>
          
          {/* // when logged in */}
            
          <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open1 ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                >



                  


                    {profile_image  ? (
                       <Avatar
                       sx={{ width: 32, height: 32 }}
                       src={profile_image}
                     />
                     
                    ) : (
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open1}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem
                   
                    to="/myaccount"
                    component={Link}
                  >
                    {profile_image  ? (
                       <Avatar
                       sx={{ width: 32, height: 32 }}
                       src={profile_image}
                     />
                     
                    ) : (
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {username.charAt(0).toUpperCase()}
                      </Avatar>
                    )}

                    {username}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={handleClose}
                    to="/userprofile"
                    component={Link}
                  >
                    <ListItemIcon>
                      <StarIcon fontSize="small" />
                    </ListItemIcon>
                    Favorites
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    to="/edituserprofile"
                    component={Link}
                  >
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={logoutUser}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Tooltip>
          
          </> ) : (
            <> 
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
                <span className="lexend-font font-semibold text-xs">
                  Log In
                </span>
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
                <span className="lexend-font font-semibold text-xs ">
                  Sign Up Your Friend
                </span>
              </Button>
            </div>
            </>
          )}



          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export { Navbar };
