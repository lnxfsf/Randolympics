import { QRCode } from "react-qr-code";
import { NavbarHome } from "../components/NavbarHome";
import { Button } from "@mui/material";
import { NavbarHomeCollapsed } from "../components/NavbarHomeCollapsed";

import TextField from "@mui/material/TextField";

import React, { useState, useEffect } from "react";

import "../styles/supporters.scoped.scss";

// MUI
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import dayjs from "dayjs";

import ReactFlagsSelect from "react-flags-select";

import supportedCountry from "../context/supportedCountry";

import { useNavigate } from "react-router-dom";
import HorizontalLinearAlternativeLabelStepper from "../components/Supporters/HorizontalLinearAlternativeLabelStepper";

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
import zIndex from "@mui/material/styles/zIndex";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const inputLabelPropsTextField = {
  sx: {
    // Styles when the input is not focused and has no value
    top: "0px", // Adjust this to move the label closer to the input
    left: "0px", // Adjust to control horizontal position
    "&.MuiInputLabel-shrink": {
      top: "0px", // Position when the label shrinks (focus or input has value)
      left: "0px",
    },
  },
};

const sxTextField = {
  m: 1,
  width: "280px",

  "& .MuiInputBase-input": { height: 39, padding: 1 },

  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "black",
    },
  },
};

const Supporters = () => {
  // this is for password <input> field, MUI library we use
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // ? for FilePond

  const [files, setFiles] = useState([]);

  // TODO yes, we upload this as profile directly ! (as we create athlete with this information (so, we need a check, if this is supporter, so we can allow without password))
  const server = {
    /* url: 'http://localhost:5000/profile_photo/upload', */

    process: {
      url: `${BACKEND_SERVER_BASE_URL}/imageUpload/profilePicture`,
      method: "POST",
      headers: {},
      withCredentials: false,

      onload: (response) => {
        // Parse the JSON response to get the filename

        const jsonResponse = JSON.parse(response);
        const filename = jsonResponse;

        console.log("Uploaded filename:", filename);

        setProfileImage(filename);

        // return filename;
      },
      onerror: (response) => {
        console.error("Error uploading file:", response);
        return response;
      },
    },

    revert: (uniqueFileId, load, error) => {
      //  console.log("ovo mu je" + profileImage)

      // Send request to the server to delete the file with the uniqueFileId
      fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertProfilePicture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: profileImage }),
      })
        .then((response) => {
          if (response.ok) {
            load(); // Signal that the file has been reverted successfully
          } else {
            response.json().then((errorData) => error(errorData.message));
          }
        })
        .catch((err) => {
          console.error("Error reverting file:", err);
          error("Error reverting file");
        });
    },
  };

  // ? for FilePond

  const [firstIsVisible, setFirstIsVisible] = useState(true);
  const [secondIsVisible, setSecondIsVisible] = useState(false);
  const [thirdIsVisible, setThirdIsVisible] = useState(false);
  const [fourthIsVisible, setFourthIsVisible] = useState(false);

  const [fifthIsVisible, setFifthIsVisible] = useState(false);

  // friend information
  const [friendName, setFriendName] = useState("");
  const [friendMiddleName, setFriendMiddleName] = useState("");
  const [friendLastName, setFriendLastName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [friendBirthdate, setFriendBirthdate] = useState();
  const [friendNationality, setFriendNationality] = useState();

  // supporter information
  const [supporterName, setSupporterName] = useState("");
  const [supporterPhone, setSupporterPhone] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");
  const [supporterPassword, setSupporterPassword] = useState("");
  const [supporterPasswordConfirmation, setSupporterPasswordConfirmation] =
    useState("");
  const [supporterComment, setSupporterComment] = useState("");

  /* setSelectedDate(dayjs(userJson.data.birthdate)); */

  const navigate = useNavigate();

  return (
    <>
      <NavbarHomeCollapsed />

      <HorizontalLinearAlternativeLabelStepper />

      {firstIsVisible && (
        <>
          <img
            src="supporters/supporter1op.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40rem",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        </>
      )}

      {secondIsVisible && (
        <>
          <img
            src="supporters/supporter2.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "45rem",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        </>
      )}

      {thirdIsVisible && (
        <>
          <img
            src="supporters/supporter3.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "45rem",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        </>
      )}

      {fourthIsVisible && (
        <>
          <img
            src="supporters/supporter4.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "45rem",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        </>
      )}

      {fifthIsVisible && (
        <>
          <img
            src="supporters/supporter5.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "55rem",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
        </>
      )}

      {/* style={{display: `${firstShow}`}} */}

      {/* prva */}
     
     {firstIsVisible && (
      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          firstIsVisible ? "show" : "hide"
        } `}
      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-12">
          Do you want to challenge your friend to experience a thrill of the{" "}
          <br /> Randolympic games?
        </p>

        <p className="text-xl text-center underline decoration-red_first mt-6">
          Well, here is your chance!{" "}
        </p>

        <Button
          onClick={() => {
            setFirstIsVisible(false);
            setSecondIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px" }}
          sx={{
            height: "50px",
            bgcolor: "#AF2626",
            color: "#fff",
            borderRadius: 4,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgb(175, 38, 38)",
              color: "white",
              border: `1px solid rgb(175, 38, 38)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="popins-font">I am interested !</span>
        </Button>

        <p className="text-xl text-center underline decoration-red_first mt-8">
          Randolympics can bring your friend to the olympic games as a
          competitor !{" "}
        </p>
      </div>
)}
      {/* druga */}
     
      {secondIsVisible && (
      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          secondIsVisible ? "show" : "hide"
        } `}
      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-8 mb-12">
          Tell us a little bit more about your friend:
        </p>

        <div className="flex flex-col w-[70%]">
          <div className="flex justify-around ">
            <div className="flex flex-col justify-start">
              <TextField
                value={friendName}
                onChange={(e) => {
                  setFriendName(e.target.value);
                }}
                label="Name"
                placeholder="John"
                id="name"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                value={friendMiddleName}
                onChange={(e) => {
                  setFriendMiddleName(e.target.value);
                }}
                label="Middle name"
                placeholder="John"
                id="name"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                value={friendLastName}
                onChange={(e) => {
                  setFriendLastName(e.target.value);
                }}
                label="Last name"
                placeholder="Doe"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>
          </div>

          <div className="flex justify-around ">
            <div className="flex flex-col justify-start">
              <TextField
                value={friendEmail}
                onChange={(e) => {
                  setFriendEmail(e.target.value);
                }}
                label="Email"
                placeholder="Email Address"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                value={friendPhone}
                onChange={(e) => {
                  setFriendPhone(e.target.value);
                }}
                label="Phone number"
                placeholder="+1 425 555 0123"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>
          </div>

          <div className="flex justify-around ">
            <div className="flex mb-1 justify-center items-center flex-col ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    style={{ backgroundColor: "#fff" }}
                    className="w-[280px]"
                    label="Birthdate"
                    value={friendBirthdate}
                    onChange={(date) => {
                      setFriendBirthdate(date);
                    }}
                    format="MMMM DD, YYYY"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        // backgroundColor: "#fff",
                        // borderRadius: "15px", // or 5px, according to your design
                      },

                      /*  '& .MuiOutlinedInput-input': {
                      backgroundColor: '#fff',
                      borderRadius: 'inherit', // Ensures consistency
                    },
                   */
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="flex  justify-center items-center flex-col h-auto">
              <ReactFlagsSelect
                countries={supportedCountry}
                className="w-[280px] rounded-md p-0 "
                /*  bg-[#fff]  */

                // to fill it with the one, which user's is currently selected...
                selected={friendNationality}
                onSelect={(code) => {
                  setFriendNationality(code);
                }}
                /*  className={classNameFlagsSelect} */
                searchable={true}
                id="nationality"
                name="nationality"
                placeholder="Nationality"
              />
            </div>
          </div>

          <div>
            <FilePond
              className="filepond--root athlete"
              type="file"
              onupdatefiles={setFiles}
              allowMultiple={false}
              maxFiles={1}
              server={server}
              name="image"
              labelIdle={`Drag & Drop your friend's image or <span class="filepond--label-action">Browse</span> <br/>(optional)`}
              accept="image/png, image/jpeg, image/gif"
              dropOnPage
              dropValidation
              allowPaste={true}
              allowReplace={true}
              credits={""}
              allowFileEncode={true}
              allowFileTypeValidation={true}
              allowImagePreview={true}
              allowImageCrop={false}
              allowImageResize={false}
              allowImageTransform={false}
              imagePreviewHeight={150}
              imageCropAspectRatio="1:1"
              imageResizeTargetWidth={100}
              imageResizeTargetHeight={100}
              stylePanelLayout="compact "
              styleLoadIndicatorPosition="center bottom"
              styleProgressIndicatorPosition="center bottom"
              styleButtonRemoveItemPosition="center  bottom"
              styleButtonProcessItemPosition="center bottom"
              imageEditAllowEdit={false}
            />
          </div>
        </div>

        <Button
          onClick={() => {
            setSecondIsVisible(false);
            setThirdIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px" }}
          sx={{
            height: "50px",
            bgcolor: "#AF2626",
            color: "#fff",
            borderRadius: 4,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgb(175, 38, 38)",
              color: "white",
              border: `1px solid rgb(175, 38, 38)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="popins-font">Proceed</span>
        </Button>
      </div>
      )}



      {/* treca */}
      {thirdIsVisible && (
      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          thirdIsVisible ? "show" : "hide"
        } `}
      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-12 mb-6">
          Tell us a little bit more about your yourself:
        </p>

        <div className="flex flex-col w-[70%]">
          <div className="flex justify-around ">
            <div className="flex flex-col justify-start">
              <TextField
                value={supporterName}
                onChange={(e) => {
                  setSupporterName(e.target.value);
                }}
                label="Name"
                placeholder="John"
                id="name"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>

            <div className="flex flex-col justify-start">
              <TextField
                value={supporterPhone}
                onChange={(e) => {
                  setSupporterPhone(e.target.value);
                }}
                label="Phone number"
                placeholder="+1 425 555 0123"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>
          </div>

          <div className="flex justify-around mt-4 ">
            <div className="flex flex-col justify-start">
              <TextField
                value={supporterEmail}
                onChange={(e) => {
                  setSupporterEmail(e.target.value);
                }}
                label="Email"
                placeholder="Email Address"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <TextField
              value={supporterPassword}
              onChange={(event) => {
                setSupporterPassword(event.target.value);
              }}
              label="Password"
              placeholder="password"
              id="pass"
              name="pass"
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

            <TextField
              value={supporterPasswordConfirmation}
              onChange={(event) => {
                setSupporterPasswordConfirmation(event.target.value);
              }}
              label="Confirm password"
              placeholder="password"
              id="pass"
              name="pass"
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


          <div className="flex flex-col justify-start">
              <TextField
                value={supporterComment}
                onChange={(e) => {
                  setSupporterComment(e.target.value);
                }}
                label="Supporter comment"
                placeholder="John"
                id="name"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>


        </div>

        <Button
          onClick={() => {
            setThirdIsVisible(false);
            setFourthIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px" }}
          sx={{
            height: "50px",
            bgcolor: "#AF2626",
            color: "#fff",
            borderRadius: 4,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgb(175, 38, 38)",
              color: "white",
              border: `1px solid rgb(175, 38, 38)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="popins-font">Ultimate challenge !</span>
        </Button>
      </div>
 )}


      {/* cetvrta */}
      {fourthIsVisible && (
      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          fourthIsVisible ? "show" : "hide"
        } `}
      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-12 mb-6">
          Want to keep this campaign running? <br />
          Let’s see how you can support your <br />
          friend!
        </p>

        <div className="flex  w-[70%] justify-center items-center">
         
          <div
           className=" pay-container flex flex-col w-64 border-2 h-32 select-none cursor-pointer  rounded-lg  justify-center items-center"
           
            onClick={() => {window.open('https://donate.stripe.com/test_bIY9BkfAU824dvqcMN', '_blank')}} 

           >



            <img className="w-12"  src="/supporters/pay.svg"/>
            <p>Pay with credit card</p>

            <button></button>
          
          </div>
        </div>

        <Button
          onClick={() => {
            setFourthIsVisible(false);
            setFifthIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px" }}
          sx={{
            height: "50px",
            bgcolor: "#AF2626",
            color: "#fff",
            borderRadius: 4,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgb(175, 38, 38)",
              color: "white",
              border: `1px solid rgb(175, 38, 38)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="popins-font">Proceed</span>
        </Button>
      </div>
)}

      {/*  zavrsna, i ovde dobija url, od ovog posta, koji je.. (ovo prikazivanje (cetvrta), salje ga na novi page za to) */}
      
      {fifthIsVisible && (
      <div
        className={`flex justify-center items-center flex-col pt-28  first-content-container ${
          fifthIsVisible ? "show" : "hide"
        } `}
      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-12 mb-6">
          You have successfully supported your <br />
          friend in this campaign!
        </p>

        <p className="text-xl text-center mt-4 mb-6">
          Do you want to invite someone else to <br /> join our campaign?
        </p>

        <p className="text-4xl text-center  mt-6 mb-2">Invite link:</p>
        <p className="text-xl text-center text-red_first  mb-6">
          <i>https:asjfkaosgjasogsgao.com</i>
        </p>

        <p className="text-xl text-center mt-4 mb-6">
          Share on social networks:
        </p>

        <div className="flex justify-center gap-16 items-center w-[70%]">
          <img className="w-20" src="supporters/fb.svg" />
          <img className="w-20" src="supporters/ig.svg" />
          <img className="w-20" src="supporters/x.svg" />
          <img className="w-20" src="supporters/ln.svg" />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="w-56"
            style={{ marginTop: "80px" }}
            sx={{
              height: "50px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 4,
              border: `1px solid #FFF`,
              "&:hover": {
                background: "rgb(175, 38, 38)",
                color: "white",
                border: `1px solid rgb(175, 38, 38)`,
              },
            }}
            id="join-the-fun-btn"
          >
            <span className="popins-font">Home</span>
          </Button>

          <Button
            onClick={() => {
              navigate("/supporters", { replace: true });
              window.location.reload();
            }}
            className="w-56"
            style={{ marginTop: "80px" }}
            sx={{
              height: "50px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 4,
              border: `1px solid #FFF`,
              "&:hover": {
                background: "rgb(175, 38, 38)",
                color: "white",
                border: `1px solid rgb(175, 38, 38)`,
              },
            }}
            id="join-the-fun-btn"
          >
            <span className="popins-font">Add another friend</span>
          </Button>
        </div>

        <div className="pb-12"></div>
      </div>
)}

      {/* <p>Crypto currency: <b>USDT (ERC 20)</b></p>
            <p>Ethereum blockchain</p><br/>

            <p>Pay to crypto address: <b>0x369244dD6F1EC5d9B7e3Ff0a5c95c11d917d13C0</b></p><br/>
            <QRCode value="0x369244dD6F1EC5d9B7e3Ff0a5c95c11d917d13C0"
            size="150"
            /> */}
    </>
  );
};

export { Supporters };
