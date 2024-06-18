import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import React, { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;
import axios from "axios";

const ForgotPassword = () => {
  const [resultText, setResultText] = useState(
    "If an account with this email exists, a password reset email has been sent."
  );

  // ? sent ?
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShow(!show);

    if (show) {
      navigate("/login");
    } else {
      var email = e.target.email.value;

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
      }

      try {
        var response = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/auth/forgot_password`,
          { email }
        );
      } catch (error) {
        //console.log(error);
        setResultText(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex m-16">
        <div className="basis-1/2 flex flex-wrap flex-col m-12 items-center">
          <img src="login/logo.svg" className="mb-16" />

          <form
            action="#"
            className="sign-in-form flex flex-col wrap justify-start items-center"
            onSubmit={handleSubmit}
          >
            {!show && (
              <>
                <TextField
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
                  <span className="popins-font">Reset password</span>
                </Button>
              </>
            )}

            {show && (
              <>
                <p>{resultText}</p>

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
                  <span className="popins-font">Back to sign in</span>
                </Button>
              </>
            )}
          </form>
        </div>

        <div className="basis-1/2 justify-center items-center rounded-md p-8 pl-0">
          <img src="login/1.png" className="image_login" />
        </div>
      </div>
    </>
  );
};

export { ForgotPassword };
