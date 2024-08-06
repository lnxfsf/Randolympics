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




const Supporters = () => {

    
const [nationality_selected, setNationality_selected] = useState("");


  const [firstIsVisible, setFirstIsVisible] = useState(true);

  const [secondIsVisible, setSecondIsVisible] = useState(false);

  // friend information
  const [friendName, setFriendName] = useState("");
  const [friendLastName, setFriendLastName] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");
  const [friendBirthdate, setFriendBirthdate] = useState("");
  const [friendNationality, setFriendNationality] = useState("");

  const [selectedDate, setSelectedDate] = useState();

  /* setSelectedDate(dayjs(userJson.data.birthdate)); */

  return (
    <>
      <NavbarHomeCollapsed />

      <img
        src="supporters/supporter1op.png"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50rem",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

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

        <p className="text-xl text-center mt-12 mb-6">
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
                sx={{
                  m: 1,
                  width: "280px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
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
                }}
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
                sx={{
                  m: 1,
                  width: "280px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
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
                }}
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
                sx={{
                  m: 1,
                  width: "280px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
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
                }}
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
                sx={{
                  m: 1,
                  width: "280px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
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
                }}
              />
            </div>
          </div>

       
       
       
          <div className="flex justify-around ">
          <div className="flex mb-1 justify-center items-center flex-col ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  style={{ backgroundColor: "#fff" }}
                  className="w-full"
                  label="Birthdate"
                  value={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                  }}
                  format="MMMM DD, YYYY"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: "15px", // or 5px, according to your design
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



          <div className="flex  justify-center items-center flex-col h-auto"  >

           
          <ReactFlagsSelect
          
                  countries={["US", "DE", "GB", "CN", "FR", "IT", "HU", "RU", "AU", "SE", "JP", "FI", "NO", "KR", "RO", "CA", "NL", "CU", "PL", "CH", "BG", "NZ", "ES", "BR", "BE", "DK", "UA", "KE", "TR", "ZA", "JM", "AR", "CZ", "AT", "IR", "GR", "BY", "UZ", "MX", "ET", "KP", "HR", "IE", "IN", "PK", "TH", "SK", "GE", "AZ", "PT", "UG", "CO", "TT", "NG", "VE", "ID", "MA", "TN", "DO", "EE", "LT", "EG", "TW", "SI", "ZW", "LV", "PH", "RS", "MN", "KZ", "AM", "DZ", "BS", "LU", "VN", "IS", "PE", "SG", "MY", "PR", "KG", "TJ", "HK", "XK", "AE", "SA", "BH", "QA", "LB", "JO", "CI", "GH", "SY", "MD", "MK", "IL"]}

                  
                  className="w-[280px] bg-[#fff] rounded-md "
                  // to fill it with the one, which user's is currently selected...
                  selected={
                    nationality_selected
                  }
                  onSelect={(code) => {
                    setNationality_selected(code);
                    
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
            setFirstIsVisible(false);
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
