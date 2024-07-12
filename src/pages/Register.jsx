import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import "../styles/register.scoped.scss";

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
import FormControl from "@mui/material/FormControl";

import Menu from "@mui/material/Menu";

// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

// FilePond css
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginFileValidateType from "filepond-plugin-image-edit";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import "@pqina/pintura/pintura.css";

//registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

let APP_SITE_KEY =
  import.meta.env.VITE_APP_SITE_KEY || process.env.VITE_APP_SITE_KEY;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;








const Register = () => {
  // ? this for error in the "input" to display
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailErrorHelper, setIsEmailErrorHelper] = useState("");
  const isEmailErrorFocus = useRef(null);

  const [resultText, setResultText] = useState("");
  const [resultTextColor, setResultTextColor] = useState("black");

  // ? FILEPOND for IMAGE
  const [files, setFiles] = useState([]);

  // ? FILEPOND for IMAGE
  let { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ? image upload
  /*   const [image, setImage] = useState({
    preview: "",
    raw: "",
  });

  const handlePhotoChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }; */

  const [uploadedFile, setUploadedFile] = useState(null);



  const server = {
    /* url: 'http://localhost:5000/profile_photo/upload', */

    process: {
      url: `${BACKEND_SERVER_BASE_URL}/imageUpload/profilePicture`,
      method: 'POST',
      headers: {},
      withCredentials: false,

      onload: (response) => {

        // Parse the JSON response to get the filename

        const jsonResponse = JSON.parse(response);
        const filename = jsonResponse;

        console.log("Uploaded filename:", filename);
        setUploadedFile(filename);
        // return filename; 
      },
      onerror: (response) => {
        console.error('Error uploading file:', response);
        return response;
      },
    },
  };




  // ? image upload

  const [email_private, setEmail_private] = useState(true);
  const [phone_private, setPhone_private] = useState(true);
  const [weight_private, setWeight_private] = useState(true);

  const handleEmailPrivacyChange = (event) => {
    setEmail_private(event.target.value);
  };

  const handlePhonePrivacyChange = (event) => {
    setPhone_private(event.target.value);
  };

  const handleWeightPrivacyChange = (event) => {
    setWeight_private(event.target.value);
  };

  {
    /*this is for nationality */
  }
  const [nationality_selected, setNationality_selected] = useState("");
  const [selectedRole, setSelectedRole] = useState("AH");


  const [selectedGender, setSelectedGender] = useState("M");



  // ? captcha



  const recaptcha = useRef();


  // ? captcha


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

  const [weight, setWeight] = useState(null);



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



    if (isEmailError && isEmailErrorFocus.current) {
      isEmailErrorFocus.current.focus();
    }



  }, [isEmailError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ? for image upload. now FilePond
    /* 
    let formData = new FormData();
    await formData.append("image", image.raw);

    var profile_uploaded = await axios.post(
      `http://localhost:5000/profile_photo/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(profile_uploaded); */

    var email = e.target.email.value;
    var password = e.target.pass.value;
    var name = e.target.name.value;
    var phone = e.target.phone.value;
    var bio = ""; // because we don't user bio field right now, or maybe we will use it.

    if (!e.target.weight) {
      var weight = null;
    } else {
      // var weight = e.target.weight.value;

      // if "lb" is selected. we upload in database in "kg". so we do converstion from "lb" -> "kg"
      if (selectedWeight === "Lb") {
        setWeight(weight * 0.45359237);

        //console.log(weight);
      }
    }

    var cryptoaddr = e.target.cryptoaddr.value;

    // check again, if email is correctly inserted
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(email)) {
      setIsEmailError(true);
      setIsEmailErrorHelper("Enter a valid email address");
    }

    // check if captcha okay
    const captchaValue = recaptcha.current.getValue();

    if (!captchaValue) {
      setResultText("Please verify the reCAPTCHA!");
    } else {



      // ! TODO, ne samo taj, nego bilo koji element ! (samo proveri, svi elementi, da nisu prazni, da imaju. i onda ne salje captcha u server uzalud..)
      if (nationality_selected && isEmailError !== false) {


        const res = await fetch(`${BACKEND_SERVER_BASE_URL}/captcha/verify`, {
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





          // ! e ovde ne moze da pusta, ako ova varijable nije na true (tj. string bolje da je.. da bi mogao da ga menjas, i prikazujes errors u polja gde appropriate i takodje, "focus" na to polje !!!)


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
                picture: uploadedFile,

                cryptoaddress_type: selectedCrypto,
                bio,
                gender: selectedGender,
              }
            );
          } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
              if (error.response && error.response.status === 409) {
                //alert("");

                setResultText("User already exists ! ");
                setResultTextColor("red");
              } else {
                setResultText(
                  "An error occurred: " +
                  (error.response?.data?.message || error.message)
                );
              }
            } else {
              setResultText("An unexpected error occurred: " + error.message);
            }
          }







          if (response) {
            setResultText("Signed up ! Email verification sent.");
            setResultTextColor("black");
          }
        } else {
          setResultText("reCAPTCHA validation failed!");
          setResultTextColor("red");
        }
      } else {

        if (nationality_selected === "") {
          setResultText("Insert nationality !");
          setResultTextColor("red");
        } else if (isEmailError === false) {
          setResultText("Email is not valid !");
          setResultTextColor("red");
        }


      }

    }
  };

  const handleChangeRole = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChangeGender = (event) => {
    setSelectedGender(event.target.value);
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
  // ? for dropdown menu

  return (
    <>
      <div className="flex justify-center mt-32">
        <img src="login/logo.svg" />
      </div>

      <form
        action="#"
        className="sign-in-form flex flex-col wrap justify-start items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex m-16">
          <div className="basis-1/2 flex flex-wrap flex-col m-12 items-center">
            {/* START FORM SUBMISSION (login), FOR LOGIN */}

            <div className="flex m-0 flex-col">
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



            <div
              action="#"
              className="sign-in-form flex flex-col wrap justify-start items-center"
            >
              <div className="flex mb-1 justify-center items-center mt-4">
                <TextField
                  error={isEmailError}
                  helperText={isEmailErrorHelper}

                  inputRef={isEmailErrorFocus}

                  label="Email"
                  placeholder="johndoe@gmail.com"
                  id="email"
                  name="email"
                  required
                  type="email"
                  maxLength="80"
                  inputProps={{
                    maxLength: 80,
                  }}
                  sx={{
                    m: 1,
                    width: "280px",
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

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    name="email_private"
                    id="email_private"
                    value={email_private}
                    disableUnderline
                    onChange={handleEmailPrivacyChange}
                    sx={{
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                  >
                    <MenuItem value={true}>Private</MenuItem>
                    <MenuItem value={false}>Public</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="flex flex-col mb-1 justify-center mt-0">
                <TextField
                  label="Name"
                  placeholder="John Doe"
                  id="name"
                  name="name"
                  required
                  type="text"
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
                />
              </div>

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
                    maxLength: 255,

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

              <div className="flex mb-2.5 justify-center items-center mt-0">
                <TextField
                  label="Phone number"
                  placeholder="+1 212 456 7890"
                  id="phone"
                  name="phone"
                  required
                  type="tel"

                  inputProps={{
                    maxLength: 15,



                  }}
                  sx={{
                    m: 1,
                    width: "280px",
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

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    name="phone_private"
                    id="phone_private"
                    value={phone_private}
                    disableUnderline
                    onChange={handlePhonePrivacyChange}
                    sx={{
                      boxShadow: "none",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    }}
                  >
                    <MenuItem value={true}>Private</MenuItem>
                    <MenuItem value={false}>Public</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="flex flex-col mb-2.5 justify-center  mt-2">
                <ReactFlagsSelect

                  selected={nationality_selected}
                  onSelect={(code) => setNationality_selected(code)}
                  className="w-[420px]  "
                  searchable={true}
                  id="nationality"
                  name="nationality"
                  placeholder="Nationality *"
                />
              </div>

              <div className="flex mt-0 mb-2 flex-col">
                <InputLabel id="roleDropdowns">Gender</InputLabel>
                <Select
                  labelId="roleDropdowns"
                  id="roleDropdown"
                  label="gender"
                  value={selectedGender}
                  onChange={handleChangeGender}
                  className="w-[420px] h-10"
                  style={{ color: "#000" }}
                >
                  <MenuItem value={"M"}>Male</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>

                </Select>
              </div>

              {selectedRole === "AH" && (
                <div className="flex mb-2.5 justify-center items-center mt-2">
                  <TextField
                    label="Weight"
                    id="weight"
                    name="weight"
                    required




                    type="number"
                    
                    onChange={(event) =>
                      event.target.value < 0
                          ? (event.target.value = 0)
                          : event.target.value
                  }


                    placeholder="85 kg/185 lb"
                    sx={{
                      m: 1,
                      width: "280px",
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

                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      
                      



                    }}
                  />

                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      name="weight_private"
                      id="weight_private"
                      value={weight_private}
                      onChange={handleWeightPrivacyChange}
                      disableUnderline
                      sx={{
                        boxShadow: "none",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                    >
                      <MenuItem value={true}>Private</MenuItem>
                      <MenuItem value={false}>Public</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}

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
                    maxLength: 150,
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
              </div>

              <ReCAPTCHA
                ref={recaptcha}

                sitekey={APP_SITE_KEY}

                onExpired={() => { recaptcha.reset(); }}

                className="mt-2 g-recaptcha-response"
              />

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
            </div>

            {/* END FORM SUBMISSION (login), FOR LOGIN */}
          </div>

          <div className="flex flex-col justify-start">
            <div className="basis-1/2 justify-center items-center rounded-md p-8 pl-0 w-auto mt-8 h-auto mb-6">



              {/* server="http://localhost:5000/profile_photo/upload" */}


              <FilePond
                type="file"
                className={"profile_pic_upload"}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={server}

                name="image"
                labelIdle='Drag & Drop profile picture or <span class="filepond--label-action">Browse</span> <br/>(not mandatory)'
                accept="image/png, image/jpeg, image/gif"
                dropOnPage
                dropValidation
                allowPaste={true}
                allowReplace={true}
                credits={""}
                allowFileEncode={true}
                allowFileTypeValidation={true}
                allowImagePreview={true}
                allowImageCrop={true}
                allowImageResize={true}
                allowImageTransform={true}
                imagePreviewHeight={360}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={360}
                imageResizeTargetHeight={360}
                /*  rectangle or circle  */
                /*                  stylePanelLayout="compact circle "
                 */
                stylePanelLayout="compact circle"
                styleLoadIndicatorPosition="center bottom"
                styleProgressIndicatorPosition="center bottom"
                styleButtonRemoveItemPosition="center  bottom"
                styleButtonProcessItemPosition="center bottom"
                imageEditAllowEdit={false}

              />
            </div>

            <div className="flex flex-col w-[420px]">
              {/*   <label for="bio">Tell us about yourself:</label> */}

              {/*     <textarea
              type="text"
              id="bio"
              name="bio"
              className="w-full h-32 rounded-md border border-gray-900"
            ></textarea> */}
              {/*     
<TextField
  placeholder="Tell us about yourself:"
  multiline
  rows={2}
  maxRows={4}
/>  */}
              {/* 
               <TextField
                label="Tell us about yourself"
                placeholder="Bio"
                id="bio"
                name="bio"
                multiline
                rows={5}
                maxRows={8}
                className="w-full h-32 rounded-md border border-gray-900"
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
                inputProps={{
                  maxLength: 255,
                }}
              /> */}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mb-32 flex-col">
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

          {/* resultTextColor */}
          <p className="mt-4 " style={{ color: `${resultTextColor}` }}>
            {resultText}
          </p>
        </div>
      </form>
    </>
  );
};

export { Register };
