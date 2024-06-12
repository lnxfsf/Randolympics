import "../styles/login.scoped.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";

import ReCAPTCHA from "react-google-recaptcha";

import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Login = () => {

  let { loginUser } = useContext(AuthContext);


  const recaptcha = useRef();


  useEffect(() => {
    // set custom error messages on input fields
   // const tos_field = document.getElementById("tos");

   // if (tos_field) {
   //   tos_field.oninvalid = function (e) {
     //   e.target.setCustomValidity("You have to agree on Terms of Service !");
     // };
    //}


    
    // make captcha required
    window.addEventListener('load', () => {
      const $recaptcha = document.querySelector('#g-recaptcha-response');
      if ($recaptcha) {
        $recaptcha.setAttribute('required', 'required');
      }
    })


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




    // check if captcha okay
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      const res = await fetch("http://localhost:5000/captcha/verify", {
        method: "POST",
        body: JSON.stringify({ captchaValue }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      // response in json we have "success" field, that google send us, if it's verified or not
      if (data.success) {
        // make form submission

        // TODO , ovde pozivas authContext 
         
        // ? this is just to pass to store auth in (local|session) storage
        loginUser(email, password, remember_me);





       // alert("Form submission successful!");
      } else {
        alert("reCAPTCHA validation failed!");
      }

      // make form submission
    }



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
              <label htmlFor="email">Email*</label>
              <input
                placeholder="johndoe@gmail.com"
                className="w-[420px] "
                type="email"
                id="email"
                name="email"
                required
              />
            </div>

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

            <ReCAPTCHA
              ref={recaptcha}
              sitekey={APP_SITE_KEY}
              className="mt-2 g-recaptcha-response"

            />

            {/*  this is for checkbox and forgot password*/}
            <div className="flex w-[420px] flex items-center justify-center mt-4 ">
              <div className="basis-1/2 justify-end">
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

              <div className="flex basis-1/2 justify-end">
                <Link
                  to="/forgotpassword"
                  className="bg-white text-red_first  "
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div className="flex self-start mt-2">
              <label htmlFor="tos">
                <input
                  type="checkbox"
                  id="tos"
                  name="tos"
                  className="mr-2"
                  required
                />
                I have read and understood the{" "}
                <Link
                  to="/tos"
                  className="text-red_first font-bold underline decoration-red_first"
                >
                  Terms of Service
                </Link>
              </label>
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
