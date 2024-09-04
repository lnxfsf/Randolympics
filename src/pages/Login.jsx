import "../styles/login.scoped.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";

import axios from "axios";

import { useNavigate } from "react-router-dom";

// MUI
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavbarClean } from "../components/NavbarClean";
import { FooterClean } from "../components/FooterClean";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [emailFriend, setEmailFriend] = useState();

  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const [resultText, setResultText] = useState("");
  const [resultTextColor, setResultTextColor] = useState("black");

  // remember me checkbox
  const [rememberChecked, setRememberChecked] = useState(false);

  const handleCheckboxRemember = () => {
    setRememberChecked(!rememberChecked); //toogle "remember me" checkbox
  };

  const [email_resend, setEmail_resend] = useState("");

  // this is for password <input> field, MUI library we use
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleResendEmailVerify = async () => {
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/auth/email_resend`,
        { email: email_resend }
      );

      if (response.status === 200) {
        setResultText(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsEmailVerified(false);

    var email = e.target.email.value;
    var password = e.target.pass.value;
    setEmail_resend(email);

    // check again, if email is correctly inserted
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      setResultText("Please enter a valid email address");
      setResultTextColor("red");
    }

    // ? here you call authContext
    // ? this is just to pass to store auth in (local|session) storage
    loginUser(email, password, rememberChecked);
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  let APP_SITE_KEY =
    import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;

  return (
    <>

    <NavbarClean />

      <div className="flex items-center  justify-start md:justify-center w-full">
       
       
        <div className="basis-1/2 justify-center items-center hidden lg:block 2xl:m-32 ">
          <img src="login/1.jpg" className="image_login" />

        </div>

        <div className="basis-1/2 flex flex-wrap flex-col  justify-start md:justify-center  items-start md:items-center lg:items-start m-8 md:m-16 text-black_second grow" >
         {/*  <img src="login/logo.svg" /> */}

          {/* START FORM SUBMISSION (login), FOR LOGIN */}

       
            <p className="text-2xl lexend-font font-bold text-start">Log In</p>
         
          

          <form
            action="#"
            className="sign-in-form flex flex-col wrap justify-start items-start max-md:w-full"
            onSubmit={handleSubmit}
          >

            <div className="flex flex-col mb-1 justify-start mt-8 w-full ">

              <label for="email" className="lexend-font">Email</label>
              <TextField
                onChange={(event) => {setEmailFriend(event.target.value)}}
               /*  label="Email" */
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                required
                type="email"
                inputProps={{
                  maxLength: 80,
                }}
                sx={{
                  mt: 0.5,
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "'Lexend', sans-serif",
                    borderRadius: 2,
                   
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red",
                    },

                  "& .MuiInputLabel-root": {
                    fontFamily: "'Lexend', sans-serif",

                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />
            </div>

            <div className="flex flex-col mb-2.5 justify-start mt-2 w-full">
            <label for="pass" className=" lexend-font">Password</label>
              <TextField
              
               /*  label="Password" */
                placeholder="****"
                id="pass"
                name="pass"
                required
                type={showPassword ? "text" : "password"}
                inputProps={{
                  maxLength: 255,
                }}
                sx={{
                  mt: 0.5,
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    fontFamily: "'Lexend', sans-serif",
                    borderRadius: 2,
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red",
                    },

                  "& .MuiInputLabel-root": {
                    fontFamily: "'Lexend', sans-serif",
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* ---------------- */}

            {/*  this is for checkbox and forgot password*/}


           
            <div className="flex w-full md:w-[420px] items-center justify-center mt-4 ">
              <div className="basis-1/2 justify-end">
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#D24949",
                        "&.Mui-checked": {
                          color: "#D24949",
                        },
                      }}
                      id="remember"
                      name="remember"
                      className="mr-2"
                      onChange={handleCheckboxRemember}
                    />
                  }
                  label="Remember me"
                />
              </div>

              <div className="flex basis-1/2 justify-end">
                <Link
                  to="/forgotpassword"
                  className="bg-white text-red_second "
                >
                  Forgot Password?
                </Link>
              </div>
            </div> 

         
           




            <div className="flex justify-center mt-2 flex-col items-center max-md:w-full">
              <Button
                className="w-full  md:w-[420px] "
                style={{ marginTop: "20px", textTransform: 'none' }}
                sx={{
                  height: "50px",
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
                type="submit"
                variant="text"
                value="Login"
                id="login-btn"
              >
                <img src="/login/login.svg" className="mr-2" /> <span className="lexend-font font-semibold" >Login</span>
              </Button>

                 
              <p className="mt-4 " style={{ color: `${resultTextColor}` }}>
                {resultText}
              </p>

              {!isEmailVerified && (
                <p
                  onClick={handleResendEmailVerify}
                  className=""
                  style={{
                    color: `${resultTextColor}`,
                    textDecoration: "underline",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  Resend verification email ?
                </p>
              )}
                


            </div> 


          </form>
          {/* END FORM SUBMISSION (login), FOR LOGIN */}


          <div className="flex justify-center mt-0 max-md:w-full ">
            <Button
              onClick={handleSignUp}
              className="w-full md:w-[420px]"
              style={{ marginTop: "10px", textTransform: 'none' }}
              sx={{
                height: "50px",
                bgcolor: "#fff",
                color: "#D24949",
                borderRadius: 3,
                border: `1px solid #D24949`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
              id="signup-btn"
            >
              <span className="lexend-font font-semibold" > Sign Up</span>
            </Button>
          </div> 



         
          
        </div>

      </div>

      <FooterClean />
    </>

  );
};

export { Login };
