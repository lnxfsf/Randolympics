import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

const NavbarClean = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', color: '#000000', boxShadow: 'none'  }} >
          <Toolbar>
            
              <Link  to="/" >
                <img src="/randolympics_logo.svg" className="w-32 sm:w-44 md:w-52 lg:w-64  ml-4 " />
              </Link>
           



          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export { NavbarClean };
