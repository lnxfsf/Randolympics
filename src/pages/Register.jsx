import "../styles/login.scoped.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import React, { useContext } from "react";

import AuthContext from "../context/AuthContext";

import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import ReactFlagsSelect from "react-flags-select";

// MUI
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

import Menu from "@mui/material/Menu";

let APP_SITE_KEY =
  import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Register = () => {
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email_private, setEmail_private] = useState(true);
  const [phone_private, setPhone_private] = useState(true);
  const [weight_private, setWeight_private] = useState(true);

  {
    /*this is for nationality */
  }
  const [nationality_selected, setNationality_selected] = useState("");
  const [selectedRole, setSelectedRole] = useState("AH");

  const recaptcha = useRef();

  // this is for password <input> field, MUI library we use
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ? HERE, for crypto..

  const cryptoOptions = ["BTC", "ETH", "USDT", "BNB", "SOL", "DOGE", "ADA"]; // supported cryptos

  const [cryptoMenuAnchorEl, setCryptoMenuAnchorEl] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState("BTC");

  const handleCryptoMenuClick = (event) => {
    setCryptoMenuAnchorEl(event.currentTarget);
  };

  const handleCryptoMenuClose = () => {
    setCryptoMenuAnchorEl(null);
  };

  const handleCryptoOptionSelect = (option) => {
    setSelectedCrypto(option);
    setCryptoMenuAnchorEl(null); // Close the menu after selection (optional)
  };

  // ? HERE

  // ? HERE, for weight..

  const weightOptions = ["Kg", "Lb"]; // supported cryptos

  const [weightMenuAnchorEl, setWeightMenuAnchorEl] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState("Kg");

  const handleWeightMenuClick = (event) => {
    setWeightMenuAnchorEl(event.currentTarget);
  };

  const handleWeightMenuClose = () => {
    setWeightMenuAnchorEl(null);
  };

  const handleWeightOptionSelect = (option) => {
    setSelectedWeight(option);
    setWeightMenuAnchorEl(null); // Close the menu after selection (optional)
  };

  // ? HERE, for weight..

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
    var name = e.target.name.value;
    var phone = e.target.phone.value;

    if (!e.target.weight) {
      var weight = null;
    } else {
      var weight = e.target.weight.value;
    }

    var cryptoaddr = e.target.cryptoaddr.value;

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
            {
              user_type: selectedRole,
              email,
              password,
              email_private,
              phone_private,
              weight_private,
              name,
              phone,
              nationality: nationality_selected,
              weight,
              cryptoaddress: cryptoaddr,

              cryptoaddress_type: selectedCrypto,
            }
          );
        } catch (error) {
          console.log(error);

          if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 409) {
              alert("User already exists");
            } else {
              alert(
                "An error occurred: " +
                  (error.response?.data?.message || error.message)
              );
            }
          } else {
            alert("An unexpected error occurred: " + error.message);
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
    }
  };

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  // ? for dropdown menu
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

          {/* different users roles */}
          {/* TODO, put this in separate component (others as well, check which ones as well) */}
          <div>
            {/* <label htmlFor="roleDropdown">Register as: </label>
            <br /> */}

            {/*  <select
              id="roleDropdown"
              value={selectedRole}
              onChange={handleChangeRole}
              className="w-[420px]"
            >
              <option value="AH">AH - Athlete</option>
              <option value="GP">GP - Global President</option>
              <option value="NP">NP - National President</option>
              <option value="EM">EM - Event Manager</option>
              <option value="ITM">
                ITM - IT Manager Page Editor (for adding news articles)
              </option>
              <option value="MM">MM - Marketing Manager</option>
              <option value="SM">SM - Sales Manager</option>
              <option value="VM">VM - Validation Manager</option>
              <option value="LM">LM - Legal Manager</option>
              <option value="RS">RS - Referee & support</option>
            </select> */}

            <InputLabel id="roleDropdowns">Register as:</InputLabel>
            <Select
              labelId="roleDropdowns"
              id="roleDropdown"
              label="Sign up as:"
              value={selectedRole}
              onChange={handleChangeRole}
              className="w-[420px]"
              style={{ color: "#000" }}
            >
              <MenuItem value={"AH"}>AH - Athlete</MenuItem>
              <MenuItem value={"GP"}>GP - Global President</MenuItem>
              <MenuItem value={"NP"}>NP - National President</MenuItem>
              <MenuItem value={"EM"}>EM - Event Manager</MenuItem>
              <MenuItem value={"ITM"}>
                ITM - IT Manager Page Editor (for adding news articles)
              </MenuItem>
              <MenuItem value={"MM"}>MM - Marketing Manager</MenuItem>
              <MenuItem value={"SM"}>SM - Sales Manager</MenuItem>
              <MenuItem value={"VM"}>VM - Validation Manager</MenuItem>
              <MenuItem value={"LM"}>LM - Legal Manager</MenuItem>
              <MenuItem value={"RS"}>RS - Referee & support</MenuItem>
            </Select>
          </div>

          <form
            action="#"
            className="sign-in-form flex flex-col wrap justify-start items-center"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mb-1 justify-center mt-4">
              <TextField
                label="Email"
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                required
                type="email"
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

            <div className="flex flex-col mb-1 justify-center mt-0">
              <TextField
                label="Name"
                placeholder="John Doe"
                id="name"
                name="name"
                required
                type="text"
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

            {/*
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
            </div> */}

            <div className="flex flex-col mb-2.5 justify-center mt-0">
              <TextField
                label="Password"
                placeholder="password"
                id="pass"
                name="pass"
                required
                type={showPassword ? "text" : "password"}
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

            {/* <!--TODO implement one more password confirmation as well !  --> */}
            <div className="flex flex-col mb-2.5 justify-center mt-0">
              <TextField
                label="Phone number"
                placeholder="+1 212 456 7890"
                id="phone"
                name="phone"
                required
                type="tel"
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

            <div className="flex flex-col mb-2.5 justify-center mt-0">
              <label htmlFor="nationality">Nationality*</label>
              <ReactFlagsSelect
                selected={nationality_selected}
                onSelect={(code) => setNationality_selected(code)}
                className="w-[420px]  "
                searchable={true}
                id="nationality"
                name="nationality"
              />
            </div>

            {selectedRole === "AH" && (
              <div className="flex flex-col mb-2.5 justify-center mt-4">
                <TextField
                  label="Weight"
                  id="weight"
                  name="weight"
                  required
                  type="number"
                  placeholder="85 kg/185 lb"
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
                          aria-label="toggle kg / lb"
                          onClick={handleWeightMenuClick}
                          edge="end"
                        >
                          {/* Icon for dropdown, e.g., a downward arrow */}
                          {selectedWeight}
                        </IconButton>
                        <Menu
                          id="weight-menu"
                          anchorEl={weightMenuAnchorEl}
                          open={Boolean(weightMenuAnchorEl)}
                          onClose={handleWeightMenuClose}
                        >
                          {weightOptions.map((option) => (
                            <MenuItem
                              key={option}
                              onClick={() => handleWeightOptionSelect(option)}
                              selected={option === selectedWeight}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* 

<TextField
                label="Cryptoaddress"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
                id="cryptoaddr"
                name="cryptoaddr"
               
                type="text"
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

 */}
              </div>
            )}

            {/* this, part with dropdown menu, you should separate it in resuable component. for weight and crypto...
             */}
            <div className="flex flex-col mb-2.5 justify-center mt-4">
              <TextField
                label="Crypto"
                id="cryptoaddr"
                name="cryptoaddr"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
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
                        aria-label="toggle BTC/ETH/XMR"
                        onClick={handleCryptoMenuClick}
                        edge="end"
                      >
                        {/* Icon for dropdown, e.g., a downward arrow */}
                        {selectedCrypto}
                      </IconButton>
                      <Menu
                        id="crypto-menu"
                        anchorEl={cryptoMenuAnchorEl}
                        open={Boolean(cryptoMenuAnchorEl)}
                        onClose={handleCryptoMenuClose}
                      >
                        {cryptoOptions.map((option) => (
                          <MenuItem
                            key={option}
                            onClick={() => handleCryptoOptionSelect(option)}
                            selected={option === selectedCrypto}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </InputAdornment>
                  ),
                }}
              />

              {/* 

<TextField
                label="Cryptoaddress"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
                id="cryptoaddr"
                name="cryptoaddr"
               
                type="text"
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

 */}
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
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#FF0000",
                      "&.Mui-checked": {
                        color: "#FF0000",
                      },
                    }}
                    id="tos"
                    name="tos"
                    className="mr-2"
                  />
                }
                label={
                  <span>
                    I have read and understood the{" "}
                    <Link
                      to="/tos"
                      className="text-red_first font-bold underline decoration-red_first"
                    >
                      Terms of Service
                    </Link>
                  </span>
                }
              />
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

        <div className="flex flex-col justify-start">
          <div className="basis-1/2 justify-center items-center rounded-md p-8 pl-0 w-96 h-96">
            <img src="login/1.png" className="image_login" />
          </div>

          <div className="flex flex-col">
            <label for="bio">Tell us about yourself:</label>

            <textarea
              type="text"
              id="bio"
              name="bio"
              className="w-full h-32 rounded-md border border-gray-900"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
};

export { Register };
