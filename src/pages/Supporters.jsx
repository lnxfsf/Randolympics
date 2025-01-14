import { QRCode } from "react-qr-code";


import { Button } from "@mui/material";

import "@mui/material/styles/styled";
import { useLocation } from "react-router-dom";




import {  useTranslation } from "react-i18next";


import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import TextField from "@mui/material/TextField";

import React, { useState, useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import "../styles/supporters.scoped.scss";

// MUI
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";

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

import supportedCountry from "../context/supportedCountry";

import { useNavigate } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";

import axios from "axios";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import Popup from "reactjs-popup";

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

import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import { QueryProvider } from "../QueryProvider";
import DonationForm from "../components/Payments/DonationForm";
import DonationFormItemCampaign from "../components/Payments/DonationFormItemCampaign";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginFilePoster,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageEdit
);

import AuthCode from "react-auth-code-input";
import { WarningTextPopup } from "../components/Supporters/WarningTextPopup";
import { NavbarClean } from "../components/NavbarClean";
import { Footer } from "../components/Footer";
import { SupporterFirstPart } from "./SupportersParts/SupporterFirstPart";
import { SupporterSecondPart } from "./SupportersParts/SupporterSecondPart";
import { SupporterThirdPart } from "./SupportersParts/SupporterThirdPart";
import { SupporterFourthPart } from "./SupportersParts/SupporterFourthPart";
import { SupporterFifthPart } from "./SupportersParts/SupporterFifthPart";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

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
  mb: 1,
  mr: 1,

  width: "100%",

  /*  "& .MuiInputBase-input": { height: 39, padding: 1 },
   */
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    fontFamily: "'Lexend', sans-serif",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Lexend', sans-serif",

    "&.Mui-focused": {
      color: "black",
    },
  },
};

//const campaignId = uuidv4();

const generateRandomEmail = (usernameLength = 8) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const domains = ["eee1", "eee2", "eee3", "eee4", "eee5"];
  const tlds = [".com"];

  let username = "";
  for (let i = 0; i < usernameLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    username += charset[randomIndex];
  }

  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const randomTLD = tlds[Math.floor(Math.random() * tlds.length)];

  return `${username}@${randomDomain}${randomTLD}`;
};

const Supporters = () => {
  const { t, i18n } = useTranslation();


  const [campaignId, setCampaignId] = useState("");

  
  const filePondRef1 = useRef(null);
  const filePondRef2 = useRef(null);


  let { user } = useContext(AuthContext);

  const validateSupporter = async () => {
    // da odma izbaci za email, pre password-a.. da imas posle odma..
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (supporterEmail !== "" && !emailRegex.test(supporterEmail)) {
      setSnackbarMessage("Email is incorrect !");
      setOpenSnackbarFailure(true);
      return;
    }

    var tempDoCreateSupporterAccount = false;

    // if user is logged in, no need to check it. it won't create another supporter account when making campaign
    if (!user) {
      // ako je password PRAZAN ! PRAZAN. onda proverava samo za email, i kaze, da moze da popuni password jer account postoji !
      if (supporterPassword !== "" && supporterEmail !== "") {
        // ALI AKO UNESE ŠIFRU !

        // moras videti da li ima taj email prvo, da li postoji vec

        const responseSupporterUser = await axios.get(
          `${BACKEND_SERVER_BASE_URL}/auth/campaignDoesUserExist`,
          {
            params: {
              email: supporterEmail,
            },
          }
        );

        if (responseSupporterUser.data.found) {
          // pronasao je tog user-a !

          // ! treba SAMO DA PROVERIS, da li je password isti !
          // ako nije, isto i dalje izbacuje, dok ne unese isparavnu

          const responseSupporterUserPasswordCheck = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/auth/campaignIsSupporterPassCorrect`,
            {
              params: {
                email: supporterEmail,
                password: supporterPassword,
              },
            }
          );

          // If the password is incorrect, show an error message
          if (responseSupporterUserPasswordCheck.data.check === false) {
            setSnackbarMessage("Wrong supporter password!");
            setOpenSnackbarFailure(true);
            return;
          }

          // ako je ispravna, nece se nista desiti, samo ce proci dalje..

          // On ovde, dobije taj password, a i email
          /*   setSnackbarMessage("");
        setOpenSnackbarFailure(true);
        return;
 */
        } else {
          // ako nije pronasao tog user-a.
          // E SADA DOZVOLJAVA DA KREIRA OVAJ NOVI, USER. jer sada ima i password i email ! (pa kreira novi account sa ovime (ovde nece biti errors. a onaj gde on dozvoli, samo sa email, on ne vrsi registraciju, pa tamo erroruje.. al uglv ostalo radi sve))

          setDoCreateSupporterAccount(true);
          tempDoCreateSupporterAccount = true;
        }
      } else if (supporterEmail !== "") {
        const responseSupporterUser = await axios.get(
          `${BACKEND_SERVER_BASE_URL}/auth/campaignDoesUserExist`,
          {
            params: {
              email: supporterEmail,
            },
          }
        );

        if (responseSupporterUser.data.found) {
          // If the supporter exists but no password was provided, prompt the user to enter a password
          setSnackbarMessage(
            "Supporter already exists. Type supporter password."
          );
          setOpenSnackbarFailure(true);
          return;
        } else {
          // If no supporter exists, allow account creation. ALI CEKAJ, NE MOZE DA KREIRA, AKO NEMA PASSWORD !
          // okej, da, on NE treba, da unese password. on ce i dalje biti upisan kao donator ! sve ostalo ce raditi isto. kako cuva u bazi !
          // zato ga ovde pustas..
          setDoCreateSupporterAccount(true);
          tempDoCreateSupporterAccount = true;
        }
      } else if (supporterPassword !== "") {
        setSnackbarMessage(
          "Password inserted with empty email. Type supporter email first ! "
        );
        setOpenSnackbarFailure(true);
        return;
      }

      if (supporterName === "") {
        setSnackbarMessage("Insert your name");
        setOpenSnackbarFailure(true);
        return;
      }
    }

    // makes it for them
    makeCampaign(tempDoCreateSupporterAccount);

    informOtherSupporters();

    setThirdIsVisible(false);
    setFourthIsVisible(true);
  };

  // for snackbar message.
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarFailure, setOpenSnackbarFailure] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarSuccess(false);
  };

  const handleSnackbarFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarFailure(false);
  };

  const [additionalSupportersFormData, setAdditionalSupportersFormData] =
    useState([{ name: "", email: "" }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = additionalSupportersFormData.map((data, idx) => {
      if (index === idx) {
        return { ...data, [name]: value };
      }
      return data;
    });
    setAdditionalSupportersFormData(newFormData);
  };

  const addInputSet = () => {
    setAdditionalSupportersFormData([
      ...additionalSupportersFormData,
      { name: "", email: "" },
    ]);
  };

  const removeInputSet = (index) => {
    setAdditionalSupportersFormData(
      additionalSupportersFormData.filter((_, idx) => idx !== index)
    );
  };

  const urlForCampaign = `${FRONTEND_SERVER_BASE_URL}/campaign/${campaignId}`;

  // function to make campaign, once everything is good. it creates campaign, then creates user accounts as user_type AH (athlete), SPT (supporter)
  const makeCampaign = async (tempDoCreateSupporterAccount) => {
    var athleteId = "";
    var supporterId = "";

    // make campaign with these.
    try {
      var responseCampaign = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/listsData/createCampaign`,
        {
          campaignId,
          friendName,
          friendMiddleName,
          friendLastName,

          friendFamilyName,

          friendEmail,
          friendPhone,
          friendBirthdate,
          friendNationality,
          friendImage,
          friendGender,

          supporterName,
          supporterPhone,
          supporterEmail,
          supporterComment,

          isCelebrity,
          fb_link,
          ig_link,
          tw_link,

          tt_link,
          yt_link,


        }
      );

      if (responseCampaign.status === 201) {
        /*  alert("created campaign in database"); */

        try {
          // this is for athlete register
          var response = await axios.post(
            `${BACKEND_SERVER_BASE_URL}/auth/register`,
            {
              user_type: "AH",
              email: friendEmail,
              email_private: true,
              phone_private: true,
              weight_private: true,
              name: friendName,
              middleName: friendMiddleName,
              lastName: friendLastName,
              phone: friendPhone,
              nationality: friendNationality,
              weight: "0",
              cryptoaddress: "",
              picture: friendImage,
              cryptoaddress_type: "BTC",
              bio: "",
              gender: friendGender,

              signedByFriend: true,

              supporterName: supporterName,
              campaignURL: urlForCampaign,

              sendEmailToFriend: sendEmailToFriend,

              isCelebrity: isCelebrity, // we get these easily, from what we already have here.. as we need boolean after all..
              fb_link: fb_link,
              ig_link: ig_link,
              tw_link: tw_link,

              tt_link: tt_link,
              yt_link: yt_link,
            }
          );

          if (response.status === 201) {
            athleteId = response.data.userId;

            /*  alert("athlete user created"); */

            if (doCreateSupporterAccount || tempDoCreateSupporterAccount) {
              // ? creating user for supporter
              // TODO , za supporter, registracija ! mora proveriti ako postoji email, onda nece praviti account (samo preskoci ovo..)
              var responseSupport = await axios.post(
                `${BACKEND_SERVER_BASE_URL}/auth/register`,
                {
                  user_type: "SPT",
                  email: supporterEmail,
                  password: supporterPassword,
                  email_private: true,
                  phone_private: true,
                  weight_private: true,
                  name: supporterName,
                  /*  middleName: friendMiddleName,
                  lastName: friendLastName, */
                  phone: supporterPhone,
                  /*  nationality: friendNationality, */
                  weight: "0",
                  cryptoaddress: "",
                  /*  picture: friendImage, */
                  cryptoaddress_type: "BTC",
                  bio: "",
                  gender: "M", // we don't actually need gender for supporter
                  supporterComment,
                  // signedByFriend: true,
                  campaignURL: urlForCampaign,

                  signingAsSupporter: true,
                }
              );

              if (responseSupport.status === 201) {
                supporterId = response.data.userId;

                setSnackbarMessage("Created campaign");
                setOpenSnackbarSuccess(true);
              }
            } else {
              // if we don't create supporter account, but still we did created campaign.. with what we have
              setSnackbarMessage("Created campaign");
              setOpenSnackbarSuccess(true);
            }

            try {
            } catch (error) {
              console.log(error);

              if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 409) {
                  setSnackbarMessage(error.response.data.message);
                  setOpenSnackbarFailure(true);
                } else {
                  setSnackbarMessage(
                    "An error occurred: " +
                      (error.response?.data?.message || error.message)
                  );
                  setOpenSnackbarFailure(true);
                }
              } else {
                /*    alert("An unexpected error occurred: " + error.message); */
                setSnackbarMessage(
                  "An unexpected error occurred: " + error.message
                );
                setOpenSnackbarFailure(true);
              }
            }
          }
        } catch (error) {
          console.log(error);

          if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 409) {
              setSnackbarMessage(error.response.data.message);
              setOpenSnackbarFailure(true);
            } else {
              setSnackbarMessage(
                "An error occurred: " +
                  (error.response?.data?.message || error.message)
              );
              setOpenSnackbarFailure(true);
            }
          } else {
            /*    alert("An unexpected error occurred: " + error.message); */
            setSnackbarMessage(
              "An unexpected error occurred: " + error.message
            );
            setOpenSnackbarFailure(true);
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          setSnackbarMessage(error.response.data.message);
          setOpenSnackbarFailure(true);

          // we stay at same page.
          setThirdIsVisible(true);
          setFourthIsVisible(false);

          return;
        } else {
          setSnackbarMessage(
            "An error occurred: " +
              (error.response?.data?.message || error.message)
          );
          setOpenSnackbarFailure(true);

          // we stay at same page.
          setThirdIsVisible(true);
          setFourthIsVisible(false);

          return;
        }
      } else {
        /*    alert("An unexpected error occurred: " + error.message); */
        setSnackbarMessage("An unexpected error occurred: " + error.message);
        setOpenSnackbarFailure(true);

        // we stay at same page.
        setThirdIsVisible(true);
        setFourthIsVisible(false);

        return true;
      }
    }
  };

  const informOtherSupporters = async () => {
    console.log(JSON.stringify(additionalSupportersFormData));

    try {
      const responseSupporterUser = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/listsData/informOtherSupporters`,
        {
          additionalSupporterEmailsToSendTo: JSON.stringify(
            additionalSupportersFormData
          ),
          campaignURL: urlForCampaign,
          name: friendName,
        }
      );
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 409) {
          setSnackbarMessage(error.response.data.message);
          setOpenSnackbarFailure(true);
        } else {
          setSnackbarMessage(
            "An error occurred: " +
              (error.response?.data?.message || error.message)
          );
          setOpenSnackbarFailure(true);
        }
      } else {
        setSnackbarMessage("An unexpected error occurred: " + error.message);
        setOpenSnackbarFailure(true);
      }
    }
  };

  // this is for password <input> field, MUI library we use
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // for wizard pages
  const [firstIsVisible, setFirstIsVisible] = useState(true);
  const [secondIsVisible, setSecondIsVisible] = useState(false);
  const [thirdIsVisible, setThirdIsVisible] = useState(false);
  const [fourthIsVisible, setFourthIsVisible] = useState(false);
  const [fifthIsVisible, setFifthIsVisible] = useState(false);

  const [fb_link, setFb_link] = useState("");
  const [ig_link, setIg_link] = useState("");
  const [tw_link, setTw_link] = useState("");
  const [tt_link, setTT_link] = useState("");
  const [yt_link, setYT_link] = useState("");

  // friend information
  const [friendName, setFriendName] = useState("");
  const [friendMiddleName, setFriendMiddleName] = useState("");
  const [friendFamilyName, setFriendFamilyName] = useState("");
  const [friendLastName, setFriendLastName] = useState("");

  const [friendEmail, setFriendEmail] = useState("");
  const [friendPhone, setFriendPhone] = useState("");

  const [friendBirthdate, setFriendBirthdate] = useState();
  const [friendNationality, setFriendNationality] = useState("");
  const [friendImage, setFriendImage] = useState();
  const [friendGender, setFriendGender] = useState("M");

  const [sendEmailToFriend, setSendEmailToFriend] = useState(true);

  // supporter information
  const [supporterName, setSupporterName] = useState("");
  const [supporterPhone, setSupporterPhone] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");
  const [supporterPassword, setSupporterPassword] = useState("");
  const [supporterComment, setSupporterComment] = useState("");

  const [isCelebrity, setIsCelebrity] = useState(false);

  const location = useLocation();
  const hash = location.hash.replace("#", "");

  // do we create Supporter account, depends if we have passwordSupporter filled or not (we also test it, to check if there's a user, and if it is, we check his password if it's correct one)
  const [doCreateSupporterAccount, setDoCreateSupporterAccount] =
    useState(false);

  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState("");

  const donateWithCouponOnly = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/payment/donateOnlyWithDiscountCode`,
        {
          discountCode: discountCode,
          campaignId: campaignId,

          supporterEmail: supporterEmail,
          supporterName: supporterName,
          supporterComment: supporterComment,
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Donated");
        setOpenSnackbarSuccess(true);
      } else {

        
        
        setSnackbarMessage(error.response?.data?.message || error.message);
      setOpenSnackbarFailure(true);
      }
    } catch (error) {

      
      setSnackbarMessage(error.response?.data?.message || error.message);
      setOpenSnackbarFailure(true);

      console.log(error.stack);
    }
  };

  const [popupWarning, setPopupWarning] = useState(false);
  const [howItWorks, setHowItWorks] = useState(false);

  // ? for FilePond
  const [files, setFiles] = useState([]);

  // we upload this as profile picture for athlete. We are creating athlete account, using this as his profile picture.
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

        setFriendImage(filename);

        // return filename;
      },
      onerror: (response) => {
        console.error("Error uploading file:", response);

        const jsonResponse = JSON.parse(response);

        setSnackbarMessage(jsonResponse.message);
        setOpenSnackbarFailure(true);


        
  if (filePondRef1.current) {
    filePondRef1.current.removeFiles();
  }
  
  if (filePondRef2.current) {
    filePondRef2.current.removeFiles();
  }


        return response;
      },
    },

    revert: (uniqueFileId, load, error) => {
      
      // Send request to the server to delete the file with the uniqueFileId
      fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertProfilePicture`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: friendImage }),
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

  const [amount, setAmount] = useState(10);

  useEffect(() => {
    switch (hash) {
      case "friend" :
        if(firstIsVisible){
        setIsCelebrity(false);
        setFriendEmail("");

        setFirstIsVisible(false);
        setSecondIsVisible(true);
      }
        break;

      case "celebrity":
        if(firstIsVisible){
        setFriendEmail(() => {
          return generateRandomEmail();
        });
        setIsCelebrity(true);

        setFirstIsVisible(false);
        setSecondIsVisible(true);
      }

        break;
    }
  }, [amount, additionalSupportersFormData, i18n.language]);

  useEffect(() => {
    // Generate a new unique campaignId each time the component renders. But only once, so user can make multiple campaigns without refresh of page.
    setCampaignId(uuidv4());



  }, [secondIsVisible]);

  return (
    <>
      <NavbarClean />

      <Popup
        open={howItWorks}
        onClose={() => setHowItWorks(false)}
        position="right center"
        className="popup-content"
      >
        <div className="flex justify-center items-center flex-col">
          <p className="text-2xl font-semibold mt-2 mb-2">How it works</p>

          <p className="text-center mb-3  ">
            Randolympics lets you sign up your friend or a celebrity to the
            upcoming competition.
          </p>

          <p className="text-center mb-3  ">
            After you sign someone up and donate - you become a Supporter !
          </p>

          <p className="text-center   ">
            The competitors will be selected randomly, but those who receive
            more money through donations have a higher chance to get an
            invitation !
          </p>

          <Button
            onClick={() => {
              setHowItWorks(false); // then close this popup
            }}
            className="w-36"
            style={{ marginTop: "25px", marginBottom: "25px" }}
            sx={{
              height: "40px",
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
            
          >
            <span className="lexend-font">Back</span>
          </Button>
        </div>
      </Popup>

      {/* first */}
      <SupporterFirstPart
        firstIsVisible={firstIsVisible}
        setIsCelebrity={setIsCelebrity}
        setFriendEmail={setFriendEmail}
        setFirstIsVisible={setFirstIsVisible}
        setSecondIsVisible={setSecondIsVisible}
        generateRandomEmail={generateRandomEmail}
      />

      {/* second */}
      <SupporterSecondPart
        secondIsVisible={secondIsVisible}
        setHowItWorks={setHowItWorks}
        isCelebrity={isCelebrity}
        friendName={friendName}
        setFriendName={setFriendName}
        friendMiddleName={friendMiddleName}
        setFriendMiddleName={setFriendMiddleName}
        inputLabelPropsTextField={inputLabelPropsTextField}
        sxTextField={sxTextField}
        friendLastName={friendLastName}
        setFriendLastName={setFriendLastName}
        friendEmail={friendEmail}
        setFriendEmail={setFriendEmail}
        friendPhone={friendPhone}
        setFriendPhone={setFriendPhone}
        friendBirthdate={friendBirthdate}
        setFriendBirthdate={setFriendBirthdate}
        friendNationality={friendNationality}
        setFriendNationality={setFriendNationality}
        friendGender={friendGender}
        setFriendGender={setFriendGender}
        setSendEmailToFriend={setSendEmailToFriend}
        fb_link={fb_link}
        setFb_link={setFb_link}
        ig_link={ig_link}
        setIg_link={setIg_link}

        tw_link={tw_link}
        setTw_link={setTw_link}

        tt_link={tt_link}
        setTT_link={setTT_link}
        yt_link={yt_link}
        setYT_link={setYT_link}


        setSecondIsVisible={setSecondIsVisible}
        setThirdIsVisible={setThirdIsVisible}
        setFirstIsVisible={setFirstIsVisible}
        files={files}
        setFiles={setFiles}
        server={server}
        setOpenSnackbarFailure={setOpenSnackbarFailure}
        setOpenSnackbarSuccess={setOpenSnackbarSuccess}
        openSnackbarFailure={openSnackbarFailure}
        handleSnackbarFailureClose={handleSnackbarFailureClose}
        openSnackbarSuccess={openSnackbarSuccess}
        handleSnackbarSuccessClose={handleSnackbarSuccessClose}
        snackbarMessage={snackbarMessage}
        setSnackbarMessage={setSnackbarMessage}


        filePondRef1={filePondRef1}
        filePondRef2={filePondRef2}
      />

      {/* treca */}
      <SupporterThirdPart
      isCelebrity={isCelebrity}
        thirdIsVisible={thirdIsVisible}
        friendName={friendName}
        supporterName={supporterName}
        setSupporterName={setSupporterName}
        supporterEmail={supporterEmail}
        setSupporterEmail={setSupporterEmail}
        inputLabelPropsTextField={inputLabelPropsTextField}
        sxTextField={sxTextField}
        supporterPhone={supporterPhone}
        setSupporterPhone={setSupporterPhone}
        supporterPassword={supporterPassword}
        setSupporterPassword={setSupporterPassword}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        supporterComment={supporterComment}
        setSupporterComment={setSupporterComment}
        additionalSupportersFormData={additionalSupportersFormData}
        handleInputChange={handleInputChange}
        removeInputSet={removeInputSet}
        addInputSet={addInputSet}
        setSecondIsVisible={setSecondIsVisible}
        setThirdIsVisible={setThirdIsVisible}
        validateSupporter={validateSupporter}
      />

      {/* cetvrta */}
      <SupporterFourthPart
      isCelebrity={isCelebrity}
        fourthIsVisible={fourthIsVisible}
        amount={amount}
        setAmount={setAmount}
        campaignId={campaignId}
        supporterName={supporterName}
        supporterEmail={supporterEmail}
        supporterComment={supporterComment}
        discountCode={discountCode}
        friendNationality={friendNationality}
        setDiscountCode={setDiscountCode}
        donateWithCouponOnly={donateWithCouponOnly}
        setFourthIsVisible={setFourthIsVisible}
        setFifthIsVisible={setFifthIsVisible}
      />

      {/*  zavrsna, i ovde dobija url, od ovog posta, koji je.. (ovo prikazivanje (cetvrta), salje ga na novi page za to) */}

      <SupporterFifthPart
        fifthIsVisible={fifthIsVisible}
        urlForCampaign={urlForCampaign}
        inputLabelPropsTextField={inputLabelPropsTextField}
        sxTextField={sxTextField}
        setOpenSnackbarSuccess={setOpenSnackbarSuccess}
        setSnackbarMessage={setSnackbarMessage}
        friendName={friendName}
      />

      {/* <p>Crypto currency: <b>USDT (ERC 20)</b></p>
            <p>Ethereum blockchain</p><br/>

            <p>Pay to crypto address: <b>0x369244dD6F1EC5d9B7e3Ff0a5c95c11d917d13C0</b></p><br/>
            <QRCode value="0x369244dD6F1EC5d9B7e3Ff0a5c95c11d917d13C0"
            size="150"
            /> */}

      {/* snackbars */}
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
     
      >
        <Alert
          onClose={handleSnackbarSuccessClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbarFailure}
        autoHideDuration={6000}
        onClose={handleSnackbarFailureClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarFailureClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
};

export { Supporters };
