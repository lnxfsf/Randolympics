
import React, { useState, useEffect, useRef } from "react";


import { Button } from "@mui/material";


import axios from "axios";

import { WarningTextPopup } from "../../components/Supporters/WarningTextPopup";


import Popup from "reactjs-popup";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";



// date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import dayjs from "dayjs";

import ReactFlagsSelect from "react-flags-select";

import supportedCountry from "../../context/supportedCountry";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";


import MenuItem from "@mui/material/MenuItem";

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





let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;


const SupporterSecondPart = ({secondIsVisible,setHowItWorks,
    isCelebrity, friendName, setFriendName, friendMiddleName,
    setFriendMiddleName, inputLabelPropsTextField, sxTextField,
    friendLastName, setFriendLastName,
    friendEmail, setFriendEmail,
    friendPhone, setFriendPhone,
    friendBirthdate, setFriendBirthdate,
    friendNationality, setFriendNationality,
    friendGender, setFriendGender,
    setSendEmailToFriend,
    fb_link, setFb_link,
    ig_link, setIg_link,
    tw_link, setTw_link,
    setSecondIsVisible, setThirdIsVisible, setFirstIsVisible,
    files,
    setFiles,
    server,


 }) => {


    
    const [popupWarning, setPopupWarning] = useState(false);




    
  const validateAthlete = async () => {
    // with this, we check if such athlete exists (so, we show that different screen, and immediatelly stop execution other stuff..)
    const responseAthleteUser = await axios.get(
      `${BACKEND_SERVER_BASE_URL}/auth/campaignDoesUserExist`,
      {
        params: {
          email: friendEmail,
        },
      }
    );

    // if it did, found already existing Athlete user, then it shows something else
    if (responseAthleteUser.data.found) {
      setSnackbarMessage("User already exists");
      setOpenSnackbarFailure(true);
      return;
    }

    if (friendName === "") {
      setSnackbarMessage("Insert athlete first name");
      setOpenSnackbarFailure(true);

      return;
    }

    if (friendLastName === "") {
      setSnackbarMessage("Insert athlete last name");
      setOpenSnackbarFailure(true);
      return;
    }

    if (friendEmail === "" && !isCelebrity) {
      setSnackbarMessage("Insert email");
      setOpenSnackbarFailure(true);
      return;
    }

    if (!isCelebrity) {
      console.log("on DA pokrece email konfirmaciju za friend mail");
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!emailRegex.test(friendEmail)) {
        setSnackbarMessage("Email is incorrect !");
        setOpenSnackbarFailure(true);
        return;
      }
    }

    if (friendNationality === "") {
      setSnackbarMessage("Choose country");
      setOpenSnackbarFailure(true);
      return;
    }

    setPopupWarning(true);

    // ako je sve proslo onda ide okej ovde (nema return ..)
    // ! setSecondIsVisible(false);
    // ! setThirdIsVisible(true);
  };


    return (<>
    <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          secondIsVisible ? "show" : "hide"
        } `}
       /*  style={{
          backgroundImage: "url('/supporters/supporter2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }} */
      >
        <div
          className="how_it_works cursor-pointer select-none "
          onClick={() => {
            setHowItWorks(true);
          }}
        >
          <p className="underline ">How it works</p>
        </div>
        <img className="h-16" src="randolympics_logo.svg" />

        {!isCelebrity && (
          <>
            {/* signing up for a friend */}
            <div>
              <p className="text-xl text-center mt-8 mb-12">
                Tell us a little bit more about your friend:
              </p>

              <div className="flex ">
                <div className="flex flex-col w-full">
                  <div className="flex justify-start gap-2 items-baseline ">
                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
                        value={friendName}
                        onChange={(e) => {
                          setFriendName(e.target.value);
                        }}
                        label="First Name *"
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
                        variant="standard"
                        helperText="(optional)"
                        value={friendMiddleName}
                        onChange={(e) => {
                          setFriendMiddleName(e.target.value);
                        }}
                        label="Middle Name"
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

                    {/*    <div className="flex flex-col justify-start">
                <TextField
                  value={friendFamilyName}
                  onChange={(e) => {
                    setFriendFamilyName(e.target.value);
                  }}
                  label="Family name"
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
 */}
                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
                        value={friendLastName}
                        onChange={(e) => {
                          setFriendLastName(e.target.value);
                        }}
                        label="Last Name *"
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

                  <div className="flex justify-start items-baseline gap-2">
                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
                        value={friendEmail}
                        onChange={(e) => {
                          setFriendEmail(e.target.value);
                        }}
                        label="Email *"
                        placeholder="Email Address"
                        type="email"
                        inputProps={{
                          maxLength: 255,
                        }}
                        InputLabelProps={inputLabelPropsTextField}
                        sx={sxTextField}
                      />
                    </div>

                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
                        helperText="(optional)"
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

                  <div className="flex justify-start items-baseline gap-2 mt-2">
                    <div className="flex mb-1 justify-center items-center flex-col ">
                      <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                              style={{ backgroundColor: "#fff" }}
                              className="w-[260px]"
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

                        <FormHelperText>(optional)</FormHelperText>
                      </FormControl>
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
                        placeholder="Nationality *"
                      />
                    </div>
                  </div>

                  <div className="flex mt-2 flex-col">
                    <InputLabel id="roleDropdowns">Gender</InputLabel>
                    <Select
                      variant="standard"
                      labelId="roleDropdowns"
                      id="roleDropdown"
                      label="gender"
                      value={friendGender}
                      onChange={(event) => {
                        setFriendGender(event.target.value);
                      }}
                      className="w-[280px] "
                      style={{ color: "#000" }}
                    >
                      <MenuItem value={"M"}>Male</MenuItem>
                      <MenuItem value={"F"}>Female</MenuItem>
                    </Select>
                  </div>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="send"
                      name="radio-buttons-group"
                      className="mt-4"
                      onChange={(event) => {
                        const value = event.target.value;

                        if (value === "send") {
                          setSendEmailToFriend(true);
                        } else if (value === "dontsend") {
                          setSendEmailToFriend(false);
                        }
                      }}
                    >
                      <FormControlLabel
                        value="send"
                        control={<Radio />}
                        label={`Send email to ${friendName}`}
                        sx={{ marginBottom: "0px" }}
                      />
                      <FormControlLabel
                        value="dontsend"
                        control={<Radio />}
                        label={`Let's keep campaign secret: Do NOT send an email to ${friendName}`}
                        sx={{ marginTop: "0px" }}
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="ml-2 flex mt-20">
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
            </div>
          </>
        )}



        {/* for case of celebrity !  */}
        {isCelebrity && (
          <>
            <div className="flex w-full flex-col justify-center items-center">
              <p className="text-xl text-center mt-8 mb-12">
                Tell us more about that celebrity:
              </p>

              <div className="flex">
                <div className="flex flex-col w-[70%]">
                  <div className="flex justify-start gap-2">
                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
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
                        variant="standard"
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

                    {/*  <div className="flex flex-col justify-start">
      <TextField
        value={friendFamilyName}
        onChange={(e) => {
          setFriendFamilyName(e.target.value);
        }}
        label="Family name"
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
    </div> */}

                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
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

                  <div className="flex items-center justify-start w-full ml-2 mt-2 gap-5">
                    <div className="flex mt-0 mb-2 flex-col">
                      <InputLabel id="roleDropdowns">Gender</InputLabel>
                      <Select
                        variant="standard"
                        labelId="roleDropdowns"
                        id="roleDropdown"
                        label="gender"
                        value={friendGender}
                        onChange={(event) => {
                          setFriendGender(event.target.value);
                        }}
                        className="w-[240px] "
                        style={{ color: "#000" }}
                      >
                        <MenuItem value={"M"}>Male</MenuItem>
                        <MenuItem value={"F"}>Female</MenuItem>
                      </Select>
                    </div>

                    <div className="flex  justify-center items-center flex-col h-auto mt-4 ">
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

                  <div className="flex justify-start gap-2">
                    <div className="flex flex-col justify-start">
                      <TextField
                        variant="standard"
                        value={fb_link}
                        onChange={(e) => {
                          setFb_link(e.target.value);
                        }}
                        label="Facebook link"
                        placeholder="Facebook Link"
                        id="fbl"
                        name="fbl"
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
                        variant="standard"
                        value={ig_link}
                        onChange={(e) => {
                          setIg_link(e.target.value);
                        }}
                        label="Instagram Link"
                        placeholder="Instagram Link"
                        id="igl"
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
                        variant="standard"
                        value={tw_link}
                        onChange={(e) => {
                          setTw_link(e.target.value);
                        }}
                        label="Twitter Link"
                        placeholder="Twitter Link"
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
              
                <div className="ml-24 flex mt-0">
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
            </div>
          </>
        )}

        <Popup
          open={popupWarning}
          onClose={() => setPopupWarning(false)}
          position="right center"
          className="popup-content"
        >
          <WarningTextPopup
            setSecondIsVisible={setSecondIsVisible}
            setThirdIsVisible={setThirdIsVisible}
            setPopupWarning={setPopupWarning}
            popupWarning={popupWarning}
          />
        </Popup>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              setFirstIsVisible(true);
              setSecondIsVisible(false);
            }}
            className="w-56"
            style={{ marginTop: "80px", marginBottom: "25px" }}
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
            <span className="popins-font">Previous step</span>
          </Button>

          <Button
            onClick={validateAthlete}
            className="w-56"
            style={{ marginTop: "80px", marginBottom: "25px" }}
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
      </div>

    
    </>)
}


export {SupporterSecondPart}