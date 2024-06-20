import "../../styles/editprofile.scoped.scss";
import React, { useState } from "react";

import { Button } from "@mui/material";


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

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";





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



registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);


//TODO, for passport, you only need to set up on server side, route for passports, and then it stores passports in it's separate folder in /uploads as well...

//TODO, you need to set only values that changed. so, when user comes to this screen, there's pre-filled data in <input>, and user can edit those fields. It updates on database only fields that were updated...
const EditProfile = () => {
  //For date.  okay, it saves as date object
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("Sep 17, 2025"); //TODO, you will use this in passport_expiry_date, to show it...  tj. samo ovo promenis default state (to samo da bi prikazivao ono kao...)

  const handleDateChange = (date) => {
    setSelectedDate(date);
    //console.log(date)

    //console.log(selectedDate) //TODO, a sto nece, da sacuva il vani treba
  };

  //TODO, you will use this in passport_expiry_date, to show it... like, when you insert (Validation Manager when he can only inserts it )
  //const FDate = dayjs(selectedDate);
  //setFormattedDate(FDate.format('MMMM DD, YYYY'));
  // console.log(formattedDate);

  const [selectedRole, setSelectedRole] = useState("AH");
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
  let classNameFlagsSelect = `w-[280px] ml-2 ${
    selectedRole !== "AH" ? "mt-8" : ""
  }`;

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


  // ? filepond passport upload
  const [files, setFiles] = useState([]);


  const [uploadedFile, setUploadedFile] = useState(null);


  const server = {
        /* url: 'http://localhost:5000/profile_photo/upload', */

    process: {
        url: 'http://localhost:5000/passport_photo/upload',
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


const [passportUpload, setPassportUpload] = useState(false);
const tooglePassportUpload = () => {
  setPassportUpload(!passportUpload);
}


  // ? filepond passport upload

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

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




       <form  action="#"
            
            onSubmit={handleSubmit} >


        <div className="editProfileFields mt-4 grid grid-cols-3 gap-4">

          <div className="flex items-end col-span-2">
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
            </div>
            <div className="flex mb-1 justify-end items-end flex-col">
              <FormControl
                className="h-5"
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
            </div>
          </div>

          {/*//TODO ths is okay, but also, user need to click and edit this passport picture ie. to update it ! (just put button on bottom, so I can replace this with FilePond one..*/}
          <div className="row-span-3 flex items-start justify-start flex-col">
           
           {!passportUpload && (

<>
            <p className="pb-2">
              <b>Passport photo</b>
            </p>
            <img
              src="editprofile/passport.png"
              alt="Profile"
              className="w-[331px] h-[222px] object-fit passport-photo"
            />
            <p className="pt-2 " style={{ color: "#DEDEDE" }}>
              Passport expires: <b>{formattedDate}</b>
            </p>


            <p className="edit-photo" onClick={tooglePassportUpload}>
                <u>Edit passport photo</u>
              </p>



            </>
           )}


{passportUpload && (

  <>


<FilePond
                type="file"
                
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={server}

                name="image"
                labelIdle='Drag & Drop passport picture or <span class="filepond--label-action">Browse</span> <br/>(mandatory !)'
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
                imagePreviewHeight={222}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={100}
                imageResizeTargetHeight={100}
                stylePanelLayout="compact"
                styleLoadIndicatorPosition="center bottom"
                styleProgressIndicatorPosition="center bottom"
                styleButtonRemoveItemPosition="center  bottom"
                styleButtonProcessItemPosition="center bottom"
                imageEditAllowEdit={false}
/>



<p className="edit-photo" onClick={tooglePassportUpload}>
<u>Save passport photo</u>
</p>



</>
)}

{/* 

              <FilePond
                type="file"
                
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                server={server}

                name="image"
                labelIdle='Drag & Drop passport picture or <span class="filepond--label-action">Browse</span> <br/>(mandatory !)'
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
                imagePreviewHeight={222}
                imageCropAspectRatio="1:1"
                imageResizeTargetWidth={100}
                imageResizeTargetHeight={100}
                stylePanelLayout="compact"
                styleLoadIndicatorPosition="center bottom"
                styleProgressIndicatorPosition="center bottom"
                styleButtonRemoveItemPosition="center  bottom"
                styleButtonProcessItemPosition="center bottom"
                imageEditAllowEdit={false}

              />
              */}

          </div>


          <div className="flex items-end col-span-2">
            <div className="flex flex-col justify-center">
              <TextField
                label="Crypto"
                id="cryptoaddr"
                name="cryptoaddr"
                placeholder="1Lbcfr7sAHTD9CgdQo3HTMTkV8LK4ZnX71"
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
                  maxLength: 150,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle BTC/ETH/XMR"
                        onClick={handleCryptoMenuClick}
                        edge="end"
                      >
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
                  className="h-5"
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
            </div>
          </div>

          <div className="flex items-end col-span-2">
            <div className="flex flex-col justify-center">
              {selectedRole === "AH" && (
                <div className="flex justify-end items-end flex-col">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      className="h-5"
                      name="weight_private"
                      id="weight_private"
                      value={weight_private}
                      onChange={handleWeightPrivacyChange}
                      disableUnderline
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
                    label="Weight"
                    id="weight"
                    name="weight"
                    type="number"
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
            <div className="flex justify-end items-end pb-2">
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

          <div className="flex items-end col-span-2">
            <div className="flex flex-col ml-2 mt-6 w-[280px]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="w-full"
                    label="Birthdate"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="MM/DD/YYYY"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>


        </div>

        <div className="flex justify-end mt-2 gap-2 items-end">
           
           
        <Button
                className="w-[200px]"
                style={{ marginTop: "20px" }}
                sx={{
                  height: "50px",
                  bgcolor: "#fff",
                  color: "#000",
                  borderRadius: 15,
                  border: `1px solid #AF2626`,
                  "&:hover": {
                    background: "rgb(196, 43, 43)",
                    color: "white",
                    border: `1px solid rgb(196, 43, 43)`,
                  },
                }}
             
                variant="text"
                value="Login"
                id="login-btn"
              >
                <span className="popins-font">Cancel</span>
        </Button>

           
              <Button
                className="w-[200px]"
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
                <span className="popins-font">Save</span>
              </Button>

             
         
            </div>
        </form>


      </div>
    </>
  );
};

export { EditProfile };
