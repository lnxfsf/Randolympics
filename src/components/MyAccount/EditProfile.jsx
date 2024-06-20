import "../../styles/editprofile.scoped.scss";
import React, { useState } from "react";

import ReactFlagsSelect from "react-flags-select";



// MUI
import Flag from "react-world-flags";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";

//we display it as fragment, inside MyProfile...


//TODO, you need to set only values that changed. so, when user comes to this screen, there's pre-filled data in <input>, and user can edit those fields. It updates on database only fields that were updated...
const EditProfile = () => {








    const [selectedRole, setSelectedRole] = useState("A");
  const [nationality_selected, setNationality_selected] = useState("");


  // for country flags...
  const [code, setCode] = useState("us");

  const [email_private, setEmail_private] = useState(true);
  const [phone_private, setPhone_private] = useState(true);
  const [weight_private, setWeight_private] = useState(true); //show this, but only if it's "athlete" user, and it's not null (as for athlete, it can't be set null anyway...)

  const handleEmailPrivacyChange = (event) => {
    setEmail_private(event.target.value);
  };

  const handlePhonePrivacyChange = (event) => {
    setPhone_private(event.target.value);
  };

  const handleWeightPrivacyChange = (event) => {
    setWeight_private(event.target.value);
  };



  // if it's NOT "athlete" user type, then , it removes "weight" input !
  let classNameFlagsSelect = `w-[330px] ${selectedRole !== "AH" ? 'mt-8 ml-2' : ''}`;


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

  return (
    <>
      <div>
        <div className="flex justify-start">
          <div className="flex justify-center items-center">
            <img
              src="landing_page/about_us.png"
              className="image_editProfile"
            />
          </div>

          <div className="flex flex-grow">
            <div className="flex flex-col justify-center pl-4">
              <h1 className="text-[25px]">Name Lastname</h1>
              <p className="edit-photo">
                <u>Edit photo</u>
              </p>
            </div>
          </div>

          <div className="flex justify-self-end">
            <div className="flex flex-col justify-center pl-4">
              <p className="text-base text-right">User Type</p>
              <h1 className="text-[25px] text-right">National President</h1>
            </div>
            <div className="flex flex-col justify-center pl-4">
              <Flag className="flag-photo" code={code} />
            </div>
          </div>
        </div>

        <hr className="mt-4" />

        <div className="mt-4 mb-4">
          <p className="text-lg ">
            <b>About Me</b>
          </p>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum
          </p>
        </div>

        <div className="editProfileFields mt-4">
          <div className="flex items-end">
            <div className="flex flex-col mb-1 justify-center mt-0">
              <TextField
                label="Name"
                placeholder="John Doe"
                id="name"
                name="name"
                
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                sx={{
                  m: 1,
                  width: "330px",
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

            <div className="flex mb-1 justify-end items-end     flex-col">
              <FormControl
                className="h-5 "
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <Select
                  name="email_private"
                  id="email_private"
                  value={email_private}
                  disableUnderline
                  onChange={handleEmailPrivacyChange}
                  sx={{
                    boxShadow: "none",
                    height: 32,
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                >
                  <MenuItem value={true}>Private</MenuItem>
                  <MenuItem value={false}>Public</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Email"
                placeholder="johndoe@gmail.com"
                id="email"
                name="email"
                
                type="email"
                maxLength="80"
                inputProps={{
                  maxLength: 80,
                }}
                sx={{
                  m: 1,
                  width: "330px",
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
          </div>

          <div className="flex items-end">
            <div className="flex flex-col     justify-center ">
              <TextField
                label="Crypto"
                id="cryptoaddr"
                name="cryptoaddr"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
                sx={{
                  m: 1,
                  width: "330px",
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

            <div className="flex justify-end items-end flex-col">
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  className="h-5 "
                  name="phone_private"
                  id="phone_private"
                  value={phone_private}
                  disableUnderline
                  onChange={handlePhonePrivacyChange}
                  sx={{
                    boxShadow: "none",
                    height: 15,
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  }}
                >
                  <MenuItem value={true}>Private</MenuItem>
                  <MenuItem value={false}>Public</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Phone number"
                placeholder="+1 212 456 7890"
                id="phone"
                name="phone"
                
                type="tel"
                inputProps={{
                  maxLength: 15,
                }}
                sx={{
                  m: 1,
                  width: "330px",
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
          </div>

          <div className="flex items-end">
            <div className="flex flex-col justify-center ">
          

              {selectedRole === "AH" && (
                <div className="flex justify-end items-end flex-col">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                    className="h-5 "
                      name="weight_private"
                      id="weight_private"
                      value={weight_private}
                      onChange={handleWeightPrivacyChange}
                      disableUnderline
                      sx={{
                        boxShadow: "none",
                        height: 15  ,
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      }}
                    >
                      <MenuItem value={true}>Private</MenuItem>
                      <MenuItem value={false}>Public</MenuItem>
                    </Select>
                  </FormControl>

                  {/*//TODO also dont forget converstion to kg , if lb is inserted... */}
                  <TextField
                    label="Weight"
                    id="weight"
                    name="weight"
                    
                    type="number"
                    placeholder="85 kg/185 lb"
                    sx={{
                      m: 1,
                      width: "330px",
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
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end items-end pb-2 ">
            
            <ReactFlagsSelect
                  selected={nationality_selected}
                  onSelect={(code) => setNationality_selected(code)}
                  className={classNameFlagsSelect}
                  searchable={true}
                  id="nationality"
                  name="nationality"
                  placeholder="Nationality *"
                />



            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { EditProfile };
