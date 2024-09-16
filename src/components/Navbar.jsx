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
  Drawer,
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

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scoped.scss";

import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;



  

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let { user, logoutUser } = useContext(AuthContext);

  let tokens = JSON.parse(
    localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens")
  );

  if (tokens) {
    var username = tokens.data.name;
    var profile_image = tokens.data.picture;
  }

  const [userData, setUserData] = useState(()=> {

    
    const storedOriginalData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    let parsed = JSON.parse(storedOriginalData);

    return parsed
  });



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);

  const handleClick = (event) => {
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

            {user ? (
              <>
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
                    {profile_image ? (
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={
                          BACKEND_SERVER_BASE_URL +
                          "/imageUpload/profile_pics/" +
                          profile_image
                        }
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
                    <MenuItem to="/myaccount#myAccount" component={Link}>
                      {profile_image ? (
                        <Avatar
                          sx={{ width: 32, height: 32 }}
                          src={
                            BACKEND_SERVER_BASE_URL +
                            "/imageUpload/profile_pics/" +
                            profile_image
                          }
                        />
                      ) : (
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {username.charAt(0).toUpperCase()}
                        </Avatar>
                      )}

                      <span className="lexend-font text-black_second ">
                        {username}
                      </span>
                    </MenuItem>
                    <Divider />

                    <MenuItem  to="/myaccount#settings" component={Link}>
                      <ListItemIcon>
                       

                        <img src="/myaccount/settings_dark.svg" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second ">
                        Settings
                      </span>
                    </MenuItem>

                    

                    <MenuItem  to="/myaccount#team" component={Link}>
                      <ListItemIcon>
                      <img src="/myaccount/team_dark.svg" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second ">
                        Team
                      </span>
                    </MenuItem>



                    {userData.data.user_type !== "VM" && (
                    <MenuItem  
                    to="/myaccount#elections"
                    component={Link}
                    >

                      <ListItemIcon>

                        <img src="/myaccount/ballot_dark.png" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second ">
                        Elections
                      </span>     
                    </MenuItem>

                    )}


{(userData.data.user_type === "EM" ||
              userData.data.user_type === "ITM" ||
              userData.data.user_type === "GP" ||
              userData.data.user_type === "ITM" ||
              userData.data.user_type === "SM" ||
              userData.data.user_type === "MM") &&
              userData.data.passportStatus === "validated" && (
                    <MenuItem  to="/myaccount#news" component={Link}>
                      <ListItemIcon>
                      <img src="/myaccount/news_dark.svg" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second ">
                        News
                      </span>
                    </MenuItem>
              )}



{(userData.data.user_type === "VM" || userData.data.user_type === "GP") && (
                    <MenuItem  to="/myaccount#passportVerification" component={Link}>
                      <ListItemIcon>
                      <img src="/myaccount/passport_dark.svg" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second ">
                      Passport Verification
                      </span>
                    </MenuItem>
)}


{(userData.data.user_type === "VM" ||
              userData.data.user_type === "EM" ||
              userData.data.user_type === "ITM" ||
              userData.data.user_type === "MM" ||
              userData.data.user_type === "SM" ||
              userData.data.user_type === "LM" ||
              userData.data.user_type === "GP") && (
                    <MenuItem  to="/myaccount#loginTrafficHistory" component={Link}>
                      <ListItemIcon>
                      <img src="/myaccount/login_history_dark.svg" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second ">
                      Login & Traffic History
                      </span>
                    </MenuItem>
              )}

                    


                    <MenuItem onClick={logoutUser}>
                      <ListItemIcon>
                        <Logout fontSize="small" style={{ color: "#D24949" }} />
                      </ListItemIcon>
                      <span className="lexend-font text-red_second ">
                        Logout
                      </span>
                    </MenuItem>


                  </Menu>
                </Tooltip>
              </>
            ) : (
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

      <Drawer
        open={open}
        anchor="top"
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "black",
          },
        }}
      >
       

        <ListItem sx={{ mt: 1 }}>
        
          <Link to="/#sports" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              Our competitions
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/#beliefs" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              Our beliefs
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/#economics" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              Economics
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/#how_it_works" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              How It Works
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/#faq" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">FAQ</span>
          </Link>
        </ListItem>

        <ListItem>
          <Button
            onClick={() => {
              navigate("/supporters");
            }}
            className="w-full  "
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
            <img src="supporters/right_arrow.svg" className="mr-2" />
            <span className="lexend-font font-semibold text-xs ">
              Sign Up Your Friend
            </span>
          </Button>
        </ListItem>

        <ListItem>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="w-full "
            style={{ textTransform: "none" }}
            sx={{
              height: "45px",
              bgcolor: "#fff",
              color: "#444444",
              borderRadius: 3,
              border: `1px solid #444444`,
              "&:hover": {
                background: "rgba(210, 73, 73, 1)",
                color: "white",
                border: `1px solid rgba(210, 73, 73, 1)`,
              },
            }}
            variant="text"
          >
            <img src="supporters/right_arrow_black.svg" className="mr-2" />
            <span className="lexend-font font-semibold text-xs">Log In</span>
          </Button>
        </ListItem>
      </Drawer>
    </>
  );
};

export { Navbar };
