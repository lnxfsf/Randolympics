import { QRCode } from "react-qr-code";
import { NavbarHome } from "../components/NavbarHome";
import { Button } from "@mui/material";
import { NavbarHomeCollapsed } from "../components/NavbarHomeCollapsed";

import TextField from "@mui/material/TextField";

import React, { useState, useEffect } from "react";

import "../styles/supporters.scoped.scss";

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


const inputLabelPropsTextField = {
    sx: {
      // Styles when the input is not focused and has no value
      top: '0px', // Adjust this to move the label closer to the input
      left: '0px', // Adjust to control horizontal position
      "&.MuiInputLabel-shrink": {
        top: "0px", // Position when the label shrinks (focus or input has value)
        left: '0px',
      },
    },
  }

const sxTextField = {
    m: 1,
    width: "280px",
   
    "& .MuiInputBase-input": { height: 39, padding: 1 },

    "& .MuiOutlinedInput-root": {
      borderRadius: 3,
      backgroundColor: "white",
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
  }

const Supporters = () => {
  const [firstIsVisible, setFirstIsVisible] = useState(true);
  const [secondIsVisible, setSecondIsVisible] = useState(false);
  const [thirdIsVisible, setThirdIsVisible] = useState(false);
  const [fourthIsVisible, setFourthIsVisible] = useState(false);

  const [fifthIsVisible, setFifthIsVisible] = useState(false);

  // friend information
  const [friendName, setFriendName] = useState("");
  const [friendLastName, setFriendLastName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [friendBirthdate, setFriendBirthdate] = useState();
  const [friendNationality, setFriendNationality] = useState();

  // supporter information
  const [supporterName, setSupporterName] = useState("");
  const [supporterLastName, setSupporterLastName] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");

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

      {/* druga */}
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
                        backgroundColor: "#fff",
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
                className="w-[280px] bg-[#fff] rounded-md p-0 "
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

      {/* treca */}
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
                value={supporterLastName}
                onChange={(e) => {
                  setSupporterLastName(e.target.value);
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

      {/* cetvrta */}
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

        <div className="flex  w-[70%]">
          <div></div>
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

      {/*  zavrsna, i ovde dobija url, od ovog posta, koji je.. (ovo prikazivanje (cetvrta), salje ga na novi page za to) */}

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
        Do you want to invite someone else to <br/> join our campaign? 
        </p>

        <p className="text-4xl text-center  mt-6 mb-2">
        Invite link:
        </p>
        <p className="text-xl text-center text-red_first  mb-6">
        <i>https:asjfkaosgjasogsgao.com</i>
        </p>

        <p className="text-xl text-center mt-4 mb-6">
        Share on social networks:
        </p>

        

        <div className="flex justify-center gap-16 items-center w-[70%]">
            <img className="w-20" src="supporters/fb.svg" />
            <img  className="w-20" src="supporters/ig.svg" />
            <img className="w-20" src="supporters/x.svg" />
            <img  className="w-20" src="supporters/ln.svg" />

        </div>


<div className="flex gap-4">
<Button
          onClick={() => {
          navigate("/")
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
