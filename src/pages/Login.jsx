import "../styles/login.scoped.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useRef, useState } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

import axios from 'axios';


let BACKEND_SERVER_BASE_URL = import.meta.env.VITE_BACKEND_SERVER_BASE_URL || process.env.VITE_BACKEND_SERVER_BASE_URL;



const Login = () => {


  const recaptcha = useRef()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')


  let loginUser = async (e) => {
    e.preventDefault()

    var email = e.target.email.value
    var password = e.target.pass.value

    


    // check again, if email is correctly inserted
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
    }
    

    // check if captcha okay
    const captchaValue = recaptcha.current.getValue()
    if (!captchaValue) {
      alert('Please verify the reCAPTCHA!')
    } else {
      // make form submission


        let response = await axios.post(`${BACKEND_SERVER_BASE_URL}/login`, {email, password} );
        
        if(response){
          alert("Login success ")
        }else{
          alert("Login failed")
        }

        //  alert('Form submission successful!')
    }





  };



  let APP_SITE_KEY = import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;



  return (
    <>
      <div className="flex m-16">
        <div className="basis-1/2 flex flex-wrap flex-col m-12 items-center">
          <img src="login/logo.svg" />

          {/* START FORM SUBMISSION (login), FOR LOGIN */}

          <form action="#" className="sign-in-form" onSubmit={loginUser}>
            <div className="flex flex-col mb-1 justify-center mt-16">
              <label htmlFor="email">Email*</label>
              <input
                className="w-[420px] "
                type="email"
                id="email"
                name="email"
                required
              />
            </div>

            <div className="flex flex-col mb-2.5 justify-center mt-16">
              <label htmlFor="pass">Password*</label>
              <input type="password" id="pass" name="pass" required />
            </div>

            
            <ReCAPTCHA ref={recaptcha} sitekey={APP_SITE_KEY} />


            {/*  this is for checkbox and forgot password*/}
            <div className="flex">


              <div className="basis-1/2">
                <label htmlFor="remember">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="mr-2"
                  />
                  Remember me
                </label>
              </div>

              <div className="flex basis-1/2">
                <Link to="/forgotpassword" className="bg-white text-red_first  ">
                  Forgot Password?
                </Link>
              </div>




            </div>



            <div className="flex">
                <label htmlFor="tos">
                  <input
                    type="checkbox"
                    id="tos"
                    name="tos"
                    className="mr-2"
                  />
                  I have read and understood the <Link to="/tos" className="text-red_first font-bold underline decoration-red_first">terms of service</Link>
                </label>
              </div>


            <div className="flex justify-center mt-8">
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
