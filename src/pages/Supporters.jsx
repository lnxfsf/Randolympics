import { QRCode } from "react-qr-code";
import { NavbarHome } from "../components/NavbarHome";
import { Button } from "@mui/material";
import { NavbarHomeCollapsed } from "../components/NavbarHomeCollapsed";
import "@mui/material/styles/styled";

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
import HorizontalLinearAlternativeLabelStepper from "../components/Supporters/HorizontalLinearAlternativeLabelStepper";

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
  m: 1,
  width: "240px",

  /*  "& .MuiInputBase-input": { height: 39, padding: 1 },
   */
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

const campaignId = uuidv4();

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

  const validateSupporter = async () => {
    // da odma izbaci za email, pre password-a.. da imas posle odma..
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (supporterEmail !== "" && !emailRegex.test(supporterEmail)) {
      setSnackbarMessage("Email is incorrect !");
      setOpenSnackbarFailure(true);
      return;
    }

    var tempDoCreateSupporterAccount = false;

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
      setSnackbarMessage(" Type supporter email first !");
      setOpenSnackbarFailure(true);
      return;
    }

    if (supporterName === "") {
      setSnackbarMessage("Insert your name");
      setOpenSnackbarFailure(true);
      return;
    }

    // makes it for them
    makeCampaign(tempDoCreateSupporterAccount);

    informOtherSupporters();

    setThirdIsVisible(false);
    setFourthIsVisible(true);
  };

  // za toast , bilo sta treba. prvi je success, drugi je error ! (da mozes oba koristiti, ovako osnovno, (jer, necu da dodajem zakljucne izmene u sami TextField, da on ima errors na sebi, jer to zahteva puno posla da se napravi sto meni treba..))
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

  console.log("sadaje");
  console.log(additionalSupportersFormData);

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
          tw_link
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
            }
          );

          if (response.status === 201) {
            console.log("athleteId" + response.data.userId);
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

    // and then makes those two accounts. athlete and supporter !
    // signs up friend first !

    // update supporterStats ! polja..
  };

  const informOtherSupporters = async () => {
    console.log("on izvrsava ovaj informOtherSupporters");

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
        /*    alert("An unexpected error occurred: " + error.message); */
        setSnackbarMessage("An unexpected error occurred: " + error.message);
        setOpenSnackbarFailure(true);
      }
    }
  };

  console.log("urlForCampaign ------------>  " + urlForCampaign);

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

  // apply for celebrities (that's what we use.. (and we store in database, can use this as well...))
  const [isCelebrity, setIsCelebrity] = useState(false); // but this one you pass, and you don't change.. unless you go through friend page..


  console.log("mora biti celebrity false na pocetak:"+isCelebrity)

  /* setSelectedDate(dayjs(userJson.data.birthdate)); */

  // do we create Supporter account, depends if we have passwordSupporter filled or not (we also test it, to check if there's a user, and if it is, we check his password if it's correct one)
  const [doCreateSupporterAccount, setDoCreateSupporterAccount] =
    useState(false);

  const navigate = useNavigate();

  const [discountCode, setDiscountCode] = useState();

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
    } catch (e) {
      console.log(e.stack);
    }
  };

  const [popupWarning, setPopupWarning] = useState(false);
  const [howItWorks, setHowItWorks] = useState(false);

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

        setFriendImage(filename);

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

  const [amount, setAmount] = useState(10);

  useEffect(() => {
    

  console.log("isCelebrity je sada:" + isCelebrity);
  console.log("email je sada" + friendEmail);
  
  }, [amount, additionalSupportersFormData]);

  // ? for FilePond

  return (
    <>
      <NavbarHomeCollapsed />

      <HorizontalLinearAlternativeLabelStepper />

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
            id="join-the-fun-btn"
          >
            <span className="popins-font">Back</span>
          </Button>
        </div>
      </Popup>

      {firstIsVisible && (
        <>
          {/*  <img
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
          /> */}
        </>
      )}

      {secondIsVisible && (
        <>
          {/*  <img
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

          /> */}
        </>
      )}

      {thirdIsVisible && (
        <>
          {/*   <img
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
          /> */}
        </>
      )}

      {fourthIsVisible && (
        <>
          {/*  <img
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
          /> */}
        </>
      )}

      {fifthIsVisible && (
        <>
          {/*  <img
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
          /> */}
        </>
      )}

      {/* style={{display: `${firstShow}`}} */}

      {/* prva */}

      <div
        className={`flex justify-center w-full items-center flex-col pt-28 first-content-container ${
          firstIsVisible ? "show" : "hide"
        } `}
        style={{
          backgroundImage: "url('/supporters/supporter1op.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }}
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

        <p className="text-xl text-center mt-12">
          Do you want someone to get into <br />
          the Randolympic games?
        </p>

        <p className="text-lg text-center mt-6">I want to sign up </p>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="friend"
            name="radio-buttons-group"
            onChange={(event) => {
              const value = event.target.value;

              if (value === "friend") {
                setIsCelebrity(false); // his is for that passing,you don't change this when going through pages
                setFriendEmail(""); // here we just bring back normal value
              } else if (value === "celebrity") {
                setFriendEmail(() => {return generateRandomEmail()})
                setIsCelebrity(true);
              }
            }}
          >
            <FormControlLabel
              value="friend"
              control={<Radio />}
              label={`Friend`}
            />
            <FormControlLabel
              value="celebrity"
              control={<Radio />}
              label={`Celebrity`}
            />
          </RadioGroup>
        </FormControl>

        <Button
          onClick={() => {
            setFirstIsVisible(false);
            setSecondIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px", marginBottom: "35px" }}
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
          <span className="popins-font">Create a campaign</span>
        </Button>

        {/*   <p className="text-xl text-center underline decoration-red_first mt-8">
          Randolympics can bring your friend to the olympic games as a
          competitor !{" "}
        </p> */}
      </div>

      {/* druga */}

      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          secondIsVisible ? "show" : "hide"
        } `}
        style={{
          backgroundImage: "url('/supporters/supporter2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }}
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

      {/* treca */}

      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          thirdIsVisible ? "show" : "hide"
        } `}
        style={{
          backgroundImage: "url('/supporters/supporter3.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }}
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

        <p className="text-xl text-center mt-12 mb-6">
          You are camapaign creator for {friendName} !
        </p>

        <div className="flex flex-col w-[70%]">
          <div className="flex justify-between ">
            <div className="flex flex-col justify-start">
              <TextField
                variant="standard"
                value={supporterName}
                onChange={(e) => {
                  setSupporterName(e.target.value);
                }}
                label="Your Name *"
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
                value={supporterEmail}
                onChange={(e) => {
                  setSupporterEmail(e.target.value);
                }}
                label="Your Email"
                placeholder="johndoe@gmail.com"
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
                value={supporterPhone}
                helperText="(optional)"
                onChange={(e) => {
                  setSupporterPhone(e.target.value);
                }}
                label="Your Phone "
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

          <div className="flex justify-center gap-4">
            <TextField
              variant="standard"
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
                width: "240px",
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
            {/* 
            <TextField
              variant="standard"
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
            /> */}

            <TextField
              variant="standard"
              value={supporterComment}
              onChange={(e) => {
                setSupporterComment(e.target.value);
              }}
              label="Your (supporter) comment"
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

          <p className="text-xl text-center mt-12 mb-6">
            Inform additional supporters ?
          </p>

          <div className="flex flex-col justify-start w-">
            {additionalSupportersFormData.map((data, index) => (
              <div
                className="flex items-start justify-center"
                key={index}
                style={{ marginBottom: "10px" }}
              >
                {/*  <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={data.name}
                  onChange={(event) => handleInputChange(index, event)}
                /> */}

                <TextField
                  variant="standard"
                  value={data.name}
                  onChange={(event) => handleInputChange(index, event)}
                  label="Their Name *"
                  placeholder="John"
                  name="name"
                  type="text"
                  inputProps={{
                    maxLength: 255,
                  }}
                  InputLabelProps={inputLabelPropsTextField}
                  sx={sxTextField}
                />

                <TextField
                  variant="standard"
                  helperText="(optional)"
                  value={data.email}
                  onChange={(event) => handleInputChange(index, event)}
                  label="Your Email"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  name="email"
                  inputProps={{
                    maxLength: 255,
                  }}
                  InputLabelProps={inputLabelPropsTextField}
                  sx={sxTextField}
                />

                {/* 
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(event) => handleInputChange(index, event)}
                /> */}

                {/* 
<select
name="weightCategory"
value={data.weightCategory}
onChange={(event) => handleInputChange(index, event)}
>
<option value="light">Light</option>
<option value="medium">Medium</option>
<option value="heavy">Heavy</option>
</select> */}

                {/* 
<select
name="gender"
value={data.gender}
onChange={(event) => handleInputChange(index, event)}
>
<option value="M">Man</option>
<option value="F">Woman</option>

</select>
*/}

                <button
                  className="self-center"
                  type="button"
                  onClick={() => removeInputSet(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button type="button" onClick={addInputSet}>
              Add Another Supporter
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              setSecondIsVisible(true);
              setThirdIsVisible(false);
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
            onClick={validateSupporter}
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
            <span className="popins-font">Ultimate challenge !</span>
          </Button>
        </div>
      </div>

      {/* cetvrta */}

      <div
        className={`flex justify-center items-center flex-col pt-28 first-content-container ${
          fourthIsVisible ? "show" : "hide"
        } `}
        style={{
          backgroundImage: "url('/supporters/supporter4.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }}
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

        <p className="text-xl text-center mt-12 mb-6">
          Want to keep this campaign running? <br />
          Let’s see how you can support your <br />
          friend!
        </p>

        <div className="border-2 flex flex-col justify-center items-center p-4">
          <p className="underline text-red_first">Note:</p>
          <p>
            You can use{" "}
            <a
              className="underline text-[#0000ff]"
              href="https://docs.stripe.com/testing"
              target="_blank"
            >
              test card
            </a>
            : <b>4242 4242 4242 4242</b>
          </p>
          <p>
            CVC: <b>567</b> (it can be any 3 digits){" "}
          </p>
          <p className="mb-4">
            Date: <b>12/34</b> (it can be any date){" "}
          </p>

      {/*     <p className="underline font-bold text-red_first">
            Disable adblocker{" "}
          </p>
          <p>
            (or it will block request to stripe, as this is HTTP (insecure
            chanel))
          </p> */}
        </div>

        {/* and this is for those 3 options */}
        <p className="mt-4 font-semibold">Select amount</p>
        <div className="flex justify-around mt-6 mb-6 gap-4">
          <div
            className={` p-2 border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16 
           `}
            style={{
              backgroundColor: ` ${
                amount === 1 ? "rgba(175, 38, 38, 0.5)" : "transparent"
              }`,
            }}
            onClick={() => {
              setAmount(1);
            }}
          >
            {/*  <img className="w-10 m-2 " src="supporters/1_dollar.svg" /> */}
            <p>1 $</p>
          </div>

          <div
            className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
            onClick={() => {
              setAmount(10);
            }}
            style={{
              backgroundColor: ` ${
                amount === 10 ? "rgba(175, 38, 38, 0.5)" : "transparent"
              }`,
            }}
          >
            {/*  <img className="w-8 " src="supporters/10_dollars.svg" /> */}
            <p>10 $</p>
          </div>

          <div
            className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
            onClick={() => {
              setAmount(100);
            }}
            style={{
              backgroundColor: ` ${
                amount === 100 ? "rgba(175, 38, 38, 0.5)" : "transparent"
              }`,
            }}
          >
            {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
            <p>100 $</p>
          </div>
        </div>

        <div className="flex  w-[70%] justify-center items-center">
          <div className=" pay-container flex flex-col w-64 h-auto   rounded-lg  justify-center items-center">
            {/*  <img className="w-12" src="/supporters/pay.svg" />
            <p>Pay with credit card</p> */}

            <ThemeProvider theme={theme}>
              <QueryProvider>
                {/*   <DonationForm   */}
                <DonationFormItemCampaign
                  amount={amount}
                  setAmount={setAmount}
                  campaignId={campaignId}
                  supporterName={supporterName}
                  supporterEmail={supporterEmail}
                  supporterComment={supporterComment}
                  discountCode={discountCode}
                  countryAthleteIsIn={friendNationality}
                  separateDonationThruPage={false}
                />
                {/*  /> */}
              </QueryProvider>
            </ThemeProvider>
          </div>
        </div>

        <div className="m-4 mt-8 flex items-center justify-center flex-col">
          <p>Got a discount code ?</p>
          {/* <input
            className="border-2 rounded-lg"
            type="text"
            placeholder="Code"
            value={discountCode}
            onChange={(event) => {
              setDiscountCode(event.target.value);
            }}
          /> */}

          <AuthCode
            onChange={(res) => {
              setDiscountCode(res);
            }}
            inputClassName=" h-8 w-8 text-center  m-1 border-2 rounded-md"
          />

          <button
            style={{ backgroundColor: "#0000ff", color: "#fff" }}
            className="m-4 rounded-lg p-2"
            onClick={donateWithCouponOnly}
          >
            Donate with coupon only
          </button>
        </div>

        <Button
          onClick={() => {
            setFourthIsVisible(false);
            setFifthIsVisible(true);
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
          <span className="popins-font">Proceed</span>
        </Button>
      </div>

      {/*  zavrsna, i ovde dobija url, od ovog posta, koji je.. (ovo prikazivanje (cetvrta), salje ga na novi page za to) */}

      <div
        className={`flex justify-center items-center flex-col pt-28  first-content-container ${
          fifthIsVisible ? "show" : "hide"
        } `}
        style={{
          backgroundImage: "url('/supporters/supporter5.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }}
      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-12 mb-6">
          You have successfully supported your <br />
          friend in this campaign!
        </p>

        <p className="text-xl text-center mt-4 mb-6">
          Do you want to invite someone else to <br /> join our campaign?
        </p>

        <p className="text-4xl text-center  mt-6 mb-2">Invite:</p>

        <a href={urlForCampaign} className="underline mb-2">
          Check it out
        </a>

        <TextField
          variant="standard"
          value={urlForCampaign}
          InputLabelProps={inputLabelPropsTextField}
          sx={sxTextField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Copy to clipboard">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(urlForCampaign);
                    }}
                    edge="end"
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <QRCode value={urlForCampaign} size="150" className="mt-2" />

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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
    </>
  );
};

export { Supporters };
