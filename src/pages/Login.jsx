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
              <TextField
                onChange={(event) => {setEmailFriend(event.target.value)}}
                label="Email"
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                required
                type="email"
                inputProps={{
                  maxLength: 80,
                }}
                sx={{
                  m: 1,
                  width: "420px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red",
                    },

                  "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                      color: "black",
                    },
                  },
                }}
              />
            </div>

            <div className="flex flex-col mb-2.5 justify-center mt-2">
              <TextField
                label="Password"
                placeholder="password"
                id="pass"
                name="pass"
                required
                type={showPassword ? "text" : "password"}
                inputProps={{
                  maxLength: 255,
                }}
                sx={{
                  m: 1,
                  width: "420px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
                  },

                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "red",
                    },

                  "& .MuiInputLabel-root": {
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
            <div className="flex w-[420px] flex items-center justify-center mt-4 ">
              <div className="basis-1/2 justify-end">
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
                      onChange={handleCheckboxRemember}
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

         
            <p>{emailFriend}</p>

            <div className="flex basis-1/2 justify-end mt-4">
                <Link
                  to="/passresetbyfriend"

                    state={{ email: emailFriend }}

                
                  

                  className="bg-white  "
                  
                >
                  <u>I got registered by a friend,I don’t have a password yet!</u>
                </Link>
              </div>
                 


            <div className="flex justify-center mt-2 flex-col items-center">
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

              {/*   */}
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
