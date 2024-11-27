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

import { useTranslation } from "react-i18next";

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.scoped.scss";

import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;
/* 
const settingUserType = (user_type) => {
  switch (user_type) {
    case "AH":
      return "Athlete";

    case "GP":
      return "Global President";

    case "NP":
      return "National President";

    case "EM":
      return "Event Manager";

    case "ITM":
      return "IT Manager";

    case "IME":
      return "IT Manager Page Editor"; // Note: Corrected from "ITM"

    case "MM":
      return "Marketing Manager";

    case "SM":
      return "Sales Manager";

    case "VM":
      return "Validation Manager";

    case "LM":
      return "Legal Manager";

    case "RS":
      return "Referee & support";

    default:
      return "Guest";
  }
}; */

import {settingUserType} from "../context/user_types";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let { user, logoutUser } = useContext(AuthContext);

  const { t } = useTranslation();

  let tokens = JSON.parse(
    localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens")
  );

  if (tokens) {
    var username = tokens.data.name;

    var profile_image = tokens.data.picture;

    var user_type = tokens.data.user_type;
  }

  const [userData, setUserData] = useState(() => {
    const storedOriginalData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    let parsed = JSON.parse(storedOriginalData);

    return parsed;
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

            <Link className="hidden  min-[900px]:flex" to="/" href="/">
              <img
                src="/randolympics_logo.svg"
                className="w-32 sm:w-44 md:w-52 lg:w-64  ml-4 "
              />
            </Link>

            <nav className="hidden lg:flex  gap-8 justify-center items-center lexend-font pl-16">
              <Link to="/about" href="/about" className="nav_btns">
                {t("navbar.btn1")}
              </Link>
              <Link to="/campaign" href="/campaign" className="nav_btns">
                {t("navbar.btn2")}
              </Link>

              <Link to="/competitions" href="/competitions" className="nav_btns">
                {t("navbar.btn6")}
              </Link>

              <Link to="/news"  href="/news" className="nav_btns">
                {t("navbar.btn3")}
              </Link>

              <Link to="/faq" href="/faq"  className="nav_btns">
                {t("navbar.btn4")}
              </Link>

              <Link to="/contact" href="/contact" className="nav_btns">
                {t("navbar.btn5")}
              </Link>
            </nav>

            {user ? (
              <>
                {/* // when logged in */}

                <Tooltip title="Account settings">
                  <>
                  <div className="flex gap-2 items-center justify-center select-none cursor-pointer"  onClick={handleClick}>
                    <IconButton
                     /*  onClick={handleClick} */
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
                    <p
                     /*  onClick={handleClick} */
                      className="hidden md:block text-black_second text-medium lexend-font select-none cursor-pointer"
                    >
                      {settingUserType(user_type)}
                    </p>
                  </div>

                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open1}
                    onClose={handleClose}
                    onClick={handleClose}
                     className="max-w-[26rem]"  
                    PaperProps={{

                      elevation: 0,
                      sx: {
                      
                        overflowY: "auto",
                        overflowX: "hidden",
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

                      <p className="lexend-font text-black_second break-all"
                      
                      style={{
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                     
                      }}

                      >
                        {username}
                      </p>
                    </MenuItem>
                    <Divider />

                    <MenuItem to="/myaccount#settings" component={Link}>
                      <ListItemIcon>
                        <img
                          src="/myaccount/settings_dark.svg"
                          className="icon"
                        />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second break-all">
                        {t("navbar.profile1")}
                      </span>
                    </MenuItem>



                    <MenuItem to="/myaccount#createdCampaigns" component={Link}>
                      <ListItemIcon>
                        <img
                          src="/myaccount/team_dark.svg"
                          className="icon"
                        />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second break-all">
                        {t("navbar.profile10")}
                      </span>
                    </MenuItem>

{(userData.data.user_type !== "SPT") && (<>
                    <MenuItem to="/myaccount#team" component={Link}>
                      <ListItemIcon>
                        <img src="/myaccount/team_dark.svg" className="icon" />
                      </ListItemIcon>
                      <span className="lexend-font text-black_second break-all">
                        {t("navbar.profile2")}
                      </span>
                    </MenuItem>
                    </>)}

                    {(userData.data.user_type === "AH" && userData.data.user_type === "NP" ) && (<>
                      <MenuItem to="/myaccount#elections" component={Link}>
                        <ListItemIcon>
                          <img
                            src="/myaccount/ballot_dark.png"
                            className="icon"
                          />
                        </ListItemIcon>
                        <span className="lexend-font text-black_second break-all">
                          {t("navbar.profile3")}
                        </span>
                      </MenuItem>
                      </>
                    )}

                    {(userData.data.user_type === "EM" ||
                      userData.data.user_type === "ITM" ||
                      userData.data.user_type === "GP" ||
                      userData.data.user_type === "ITM" ||
                      userData.data.user_type === "SM" ||
                      userData.data.user_type === "MM") &&
                      userData.data.passportStatus === "validated" && (
                        <MenuItem to="/myaccount#news" component={Link}>
                          <ListItemIcon>
                            <img
                              src="/myaccount/news_dark.svg"
                              className="icon"
                            />
                          </ListItemIcon>
                          <span className="lexend-font text-black_second break-all">
                            {t("navbar.profile4")}
                          </span>
                        </MenuItem>
                      )}

                    {(userData.data.user_type === "VM" ||
                      userData.data.user_type === "GP") && (
                      <MenuItem
                        to="/myaccount#passportVerification"
                        component={Link}
                      >
                        <ListItemIcon>
                          <img
                            src="/myaccount/passport_dark.svg"
                            className="icon"
                          />
                        </ListItemIcon>
                        <span className="lexend-font text-black_second break-all">
                          {t("navbar.profile5")}
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
                      <MenuItem
                        to="/myaccount#loginTrafficHistory"
                        component={Link}
                      >
                        <ListItemIcon>
                          <img
                            src="/myaccount/login_history_dark.svg"
                            className="icon"
                          />
                        </ListItemIcon>
                        <span className="lexend-font text-black_second break-all">
                          {t("navbar.profile6")}
                        </span>
                      </MenuItem>
                    )}

                    <MenuItem onClick={logoutUser}>
                      <ListItemIcon>
                        <Logout fontSize="small" style={{ color: "#D24949" }} />
                      </ListItemIcon>
                      <span className="lexend-font text-red_second break-all">
                        {t("navbar.profile7")}
                      </span>
                    </MenuItem>
                  </Menu>
                  </>
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
                      {t("navbar.profile8")}
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
                      {t("navbar.profile9")}
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
          <Link to="/about" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              {t("navbar.btn1")}
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/campaign"  href="/campaign" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              {t("navbar.btn2")}
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/competitions" href="/competitions" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              {t("navbar.btn6")}
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/news" href="/news" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              {t("navbar.btn3")}
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/faq" href="/faq" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              {t("navbar.btn4")}
            </span>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/contact" href="/contact" className="nav_btns">
            <span className="font-bold text-red_second lexend-font">
              {t("navbar.btn5")}
            </span>
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
              {t("navbar.profile9")}
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
            <span className="lexend-font font-semibold text-xs">
              {t("navbar.profile8")}
            </span>
          </Button>
        </ListItem>
      </Drawer>
    </>
  );
};

export { Navbar };
