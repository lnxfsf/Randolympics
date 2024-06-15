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

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // this is for password <input> field, MUI library we use
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // set custom error messages on input fields
    // const tos_field = document.getElementById("tos");
    // if (tos_field) {
    //   tos_field.oninvalid = function (e) {
    //   e.target.setCustomValidity("You have to agree on Terms of Service !");
    // };
    //}
    // make captcha required
    /*    window.addEventListener('load', () => {
      const $recaptcha = document.querySelector('#g-recaptcha-response');
      if ($recaptcha) {
        $recaptcha.setAttribute('required', 'required');
      }
    }) */
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var email = e.target.email.value;
    var password = e.target.pass.value;

    // TODO set up remember me (false) on session storage, and (true) on localstorage
    var remember_me = e.target.remember.value;

    // check again, if email is correctly inserted
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
    }

    // ? ovde pozivas authContext
    // ? this is just to pass to store auth in (local|session) storage
    loginUser(email, password, remember_me);
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  //
  //  let loginUser = async (e) => {
  //    e.preventDefault();
  //
  //    var email = e.target.email.value;
  //    var password = e.target.pass.value;
  //
  //
  //    // TODO set up remember me (false) on session storage, and (true) on localstorage
  //    var remember_me = e.target.remember.value;
  //
  //
  //
  //
  //
  //
  //    // check again, if email is correctly inserted
  //    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //
  //    if (!emailRegex.test(email)) {
  //      alert("Please enter a valid email address");
  //    }
  //
  //    // check if captcha okay
  //    const captchaValue = recaptcha.current.getValue();
  //
  //    if (!captchaValue) {
  //      alert("Please verify the reCAPTCHA!");
  //    } else {
  //      const res = await fetch("http://localhost:5000/captcha/verify", {
  //        method: "POST",
  //        body: JSON.stringify({ captchaValue }),
  //        headers: {
  //          "content-type": "application/json",
  //        },
  //      });
  //
  //      const data = await res.json();
  //      // response in json we have "success" field, that google send us, if it's verified or not
  //      if (data.success) {
  //        // make form submission
  //
  //
  //
  //        // TODO, e ovde ides, za login kako treba, u context...
  //        let response = await axios.post(
  //          `${BACKEND_SERVER_BASE_URL}/auth/login`,
  //          { email, password }
  //        );
  //
  //
  //
  //        if (response) {
  //          alert("Login success ");
  //        } else {
  //          alert("Login failed");
  //        }
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //       // alert("Form submission successful!");
  //      } else {
  //        alert("reCAPTCHA validation failed!");
  //      }
  //
  //      // make form submission
  //    }
  //
  //    //  alert('Form submission successful!')
  //  };

  let APP_SITE_KEY =
    import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;

  return (
    <>
      <div className="flex m-16">
        <div className="basis-1/2 flex flex-wrap flex-col m-12 items-center">
          <img src="login/logo.svg" />

          {/* START FORM SUBMISSION (login), FOR LOGIN */}

          <form
            action="#"
            className="sign-in-form flex flex-col wrap justify-start items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-1 justify-center mt-8">
              {/* 
              <label htmlFor="email">Email*</label>
              <input
                placeholder="johndoe@gmail.com"
                className="w-[420px] "
                type="email"
                id="email"
                name="email"
              /> */}

              <TextField
                label="Email"
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                required
                type="email"

                
                inputProps={{
                  maxLength: 80
                }}

                sx={{
                  m: 1,
                  width: "420px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5, // Rounded corners
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red", // Red border on focus
                    },

                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "black", // Set label color to black when focused
                    },
                  },
                }}
              />
            </div>

            {/* ---------------- 

            <div className="flex flex-col mb-2.5 justify-center mt-2">
              <label htmlFor="pass">Password*</label>
              <input
                placeholder="password"
                className="w-[420px]"
                type="password"
                id="pass"
                name="pass"
                required
              />
            </div>
*/}
            {/* ---------------- */}

            <div className="flex flex-col mb-2.5 justify-center mt-2">


              <TextField
                label="Password"
                placeholder="password"
                id="pass"
                name="pass"
                required
                type={showPassword ? "text" : "password"}
                
                inputProps={{
                  maxLength: 255
                }}

                sx={{
                  m: 1,
                  width: "420px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5, // Rounded corners
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red", // Red border on focus
                    },

                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "black", // Set label color to black when focused
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
            <div className="flex w-[420px] flex items-center justify-center mt-4 ">
              <div className="basis-1/2 justify-end">
                
                
            {/*     <label htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="mr-2"
                  />
                  Remember me
                </label> */}

                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#FF0000",
                        "&.Mui-checked": {
                          color: "#FF0000",
                        },
                      }}
                      id="remember"
                      name="remember"
                      className="mr-2"
                    />
                  }
                  label="Remember me"
                />
              </div>

              <div className="flex basis-1/2 justify-end">
                <Link
                  to="/forgotpassword"
                  className="bg-white text-red_first  "
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="flex justify-center mt-2">
              <Button
                className="w-[420px]"
                style={{ marginTop: "20px" }}
                sx={{
                  height: "50px",
                  bgcolor: "#AF2626",
                  color: "#fff",
                  borderRadius: 15,
                  border: `1px solid #AF2626`,
                  "&:hover": {
                    background: "rgb(196, 43, 43)",
                    color: "white",
                    border: `1px solid rgb(196, 43, 43)`,
                  },
                }}
                type="submit"
                variant="text"
                value="Login"
                id="login-btn"
              >
                <span className="popins-font">Login</span>
              </Button>
            </div>
          </form>
          {/* END FORM SUBMISSION (login), FOR LOGIN */}

          <div className="flex justify-center mt-2">
            <Button
              onClick={handleSignUp}
              className="w-[420px]"
              style={{ marginTop: "20px" }}
              sx={{
                height: "50px",
                bgcolor: "#fff",
                color: "#AF2626",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}
              id="signup-btn"
            >
              <span className="popins-font">Sign Up</span>
            </Button>
          </div>

          <div className="flex justify-center mt-12">
            <img src="login/other_sign_in.svg" />
          </div>
        </div>

        <div className="basis-1/2 justify-center items-center rounded-md p-8 pl-0">
          <img src="login/1.png" className="image_login" />
        </div>
      </div>
    </>
  );
};

export { Login };
