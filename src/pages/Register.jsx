import "../styles/login.scoped.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";

import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";

import axios from "axios";

let APP_SITE_KEY =
  import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Register = () => {
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const recaptcha = useRef();

  useEffect(() => {
    // make captcha required
    window.addEventListener("load", () => {
      const $recaptcha = document.querySelector("#g-recaptcha-response");
      if ($recaptcha) {
        $recaptcha.setAttribute("required", "required");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var email = e.target.email.value;
    var password = e.target.pass.value;

    
    
    

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
        //loginUser(email, password, remember_me);

        // TODO jos ovoga
        try {
          var response = await axios.post(
            `${BACKEND_SERVER_BASE_URL}/auth/register`,
            { email, password }
          );

          

        } catch (error) {
          console.log(error);

          
          if (axios.isAxiosError(error)) {
            // Check for status code 409
            if (error.response && error.response.status === 409) {
              alert('User already exists');
            } else {
              // Handle other errors
              alert('An error occurred: ' + (error.response?.data?.message || error.message));
            }
          } else {
            // Handle non-Axios errors
            alert('An unexpected error occurred: ' + error.message);
          }
      
          

          //if (error.response.status === 401) {
          // alert("Wrong username or password");
          //}else{

          //console.log(error)
          // }
        }

        if (response) {
          alert("Signed up !");
        }

        // alert("Form submission successful!");
      } else {
        alert("reCAPTCHA validation failed!");
      }

      // make form submission
    }
  };

  // Get the current year,
  const currentYear = new Date().getFullYear();
  const startYear = 1950;
  const years = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  years.reverse();

  return (
    <>
      <div className="flex justify-center mt-32">
        <img src="login/logo.svg" />
      </div>

      <div className="flex m-16">
        <div className="basis-1/2 flex flex-wrap flex-col m-12 items-center">
          {/* START FORM SUBMISSION (login), FOR LOGIN */}

          <form
            action="#"
            className="sign-in-form flex flex-col wrap justify-start items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-1 justify-center mt-4">
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

            <div className="flex flex-col mb-1 justify-center mt-4">
              <label htmlFor="name">Name*</label>
              <input
                placeholder="John Doe"
                className="w-[420px] "
                type="text"
                id="name"
                name="name"
              />
            </div>

            <div className="flex flex-col mb-1 justify-center mt-4">
              <label htmlFor="yearOfBirth">Year of birth*</label>
              <select
                placeholder="number"
                className="w-[420px] "
                type="number"
                id="yearOfBirth"
                name="yearOfBirth"
              >
                <option value="" disabled selected>
                  Select year
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2.5 justify-center mt-4">
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

            {/* <!--TODO implement one more password confirmation as well !  --> */}
            <div className="flex flex-col mb-2.5 justify-center mt-4">
              <label htmlFor="pass">Phone number*</label>
              <input
                placeholder="+1 212 456 7890"
                className="w-[420px]"
                type="tel"
                id="phone"
                name="phone"
              />
            </div>

            <ReCAPTCHA
              ref={recaptcha}
              sitekey={APP_SITE_KEY}
              className="mt-2 g-recaptcha-response"
            />

            {/*  this is for checkbox and forgot password
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
                */}

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




      <div className="flex justify-center mb-32">
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
          <span className="popins-font">Create account</span>
        </Button>
      </div>
          </form>


          {/* END FORM SUBMISSION (login), FOR LOGIN */}
        </div>

        <div className="basis-1/2 justify-center items-center rounded-md p-8 pl-0">
          <img src="login/1.png" className="image_login" />
        </div>
      </div>

    </>
  );
};

export { Register };
