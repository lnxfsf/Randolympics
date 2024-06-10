import "../styles/navbar.scoped.scss";
import { Link } from "react-router-dom";

import { AppBar, Toolbar } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: "#AF2626" }}>
          <Link className="first_h2 nav_btns" to="/">
            <img src="logo_randolymics_nav.png" />
          </Link>

          <nav className="flex flex-wrap gap-8 justify-end items-center hidden sm:flex bg-red_first">
            <Link to="/" className="nav_btns ">
              Home
            </Link>

            <Link to="/schedule" className="nav_btns">
              Schedule
            </Link>
            <Link to="/myaccount" className="nav_btns mr-16">
              My account
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </>
  );
};

export { Navbar };
