import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";


import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import TextField from "@mui/material/TextField";

import "../../styles/campaign.scoped.scss";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes/theme";
import { QueryProvider } from "../../QueryProvider";
import DonationForm from "../Payments/DonationForm";

import { useParams, useNavigate } from "react-router-dom";
import DonationFormItemCampaign from "../Payments/DonationFormItemCampaign";
import { PaymentPage } from "../Supporters/PaymentPage";

import AuthCode from "react-auth-code-input";
import { Button } from "@mui/material";

import { Navbar } from "../Navbar";
import { FooterClean } from "../FooterClean";

import { Avatar } from "@mui/material";

import { useTranslation } from "react-i18next";


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

function getImageUrl(coverImage) {
  return coverImage
    ? `${BACKEND_SERVER_BASE_URL}/blog/news/${coverImage}`
    : "news/news1.png";
}

function formatDate(dateString) {
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function statusImage(athleteStatus) {
  /* statusOfGoing */

  if (athleteStatus === "s1") {
    return "/supporters/not_going_not_logged.svg";
  } else if (athleteStatus === "s2") {
    return "/supporters/not_going_not_logged.svg";
  } else if (athleteStatus === "s3") {
    return "/supporters/going_sure.svg";
  } else if (athleteStatus === "s4") {
    return "/supporters/likely_going.svg";
  } else if (athleteStatus === "s5") {
    return "/supporters/maybe_going.svg";
  } else if (athleteStatus === "s6") {
    return "/supporters/not_going.svg";
  }
}

const ItemCampaign = () => {

  const { t } = useTranslation();

  const { campaignId } = useParams();

  const navigate = useNavigate();

  const urlForCampaign = `${FRONTEND_SERVER_BASE_URL}/campaign/${campaignId}`;

  const [campaign, setCampaign] = useState();
  const [athlete, setAthlete] = useState();

  const [limitAllTransactions, setLimitAllTransactions] = useState(10);
  const [allTransactionsSupporters, setAllTransactionsSupporters] = useState();

  const [textAthleteStatus, setTextAthleteStatus] = useState(
    "Has not logged in yet"
  );

  const [colorStatusGoing, setColorStatusGoing] = useState(
    "rgba(128, 128, 128, 0.75)"
  );

  const [amount, setAmount] = useState(10);
  const [supporterName, setSupporterName] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");
  const [supporterComment, setSupporterComment] = useState("");

  const [howManySupporters, setHowManySupporters] = useState();
  const [lastCommentsSupporters, setLastCommentsSupporters] = useState();
  const [lastTransactionsSupporters, setLastTransactionsSupporters] =
    useState();

  const [firstSupportersCampaign, setFirstSupportersCampaign] = useState();

  const [countryAthleteIsIn, setCountryAthleteIsIn] = useState();

  const [discountCode, setDiscountCode] = useState();

  const [payment, setPayment] = useState(false);

  const [showAllSupporters, setShowAllSupporters] = useState(false);

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
        alert("donated");
      }
    } catch (e) {
      console.log(e.stack);
    }
  };

  useEffect(() => {
    updateLatestData();
  }, [limitAllTransactions]);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/campaignDetails`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log(response.data.oneCampaign);

      console.log(response.data.thatAthlete);

      setCampaign(response.data.oneCampaign);
      setAthlete(response.data.thatAthlete);

      if (response.data.thatAthlete) {
        switch (response.data.thatAthlete.athleteStatus) {
          case "s1":
            setTextAthleteStatus("Has not logged in yet");
            setColorStatusGoing("rgba(128, 128, 128, 0.75)");
            break;
          case "s2":
            setTextAthleteStatus("Logged in but no status");
            setColorStatusGoing("rgba(128, 128, 128, 0.75)");
            break;
          case "s3":
            setTextAthleteStatus("I'm 99% taking the challenge and going");
            setColorStatusGoing("rgba(58, 173, 84, 0.75)");
            break;
          case "s4":
            setTextAthleteStatus("Most likely going");
            setColorStatusGoing("rgba(233, 165, 6, 0.75)");
            break;

          case "s5":
            setTextAthleteStatus("I'm maybe going");
            setColorStatusGoing("rgba(233, 165, 6, 0.75)");
            break;
          case "s6":
            setTextAthleteStatus("I'm definitely not going");
            setColorStatusGoing("rgba(180, 55, 55, 0.75)");
            break;
        }
      }

      if (response.data.thatAthlete) {
        setCountryAthleteIsIn(response.data.thatAthlete.nationality);
      }
    } catch (error) {
      console.error(error);
    }

    // get supporter numbers
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/howManySupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      setHowManySupporters(response.data.count);
    } catch (error) {
      console.error(error);
    }

    // get last 3 comments from supporters
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/lastCommentsSupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log("saljes ti last coments lastCommentsSupportersCampaign");
      console.log(response.data);

      setLastCommentsSupporters(response.data);
    } catch (error) {
      console.error(error);
    }

    // get last 3 transactions

    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/lastTransactionsSupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log("saljes ti last coments");
      console.log(response.data);

      setLastTransactionsSupporters(response.data);
    } catch (error) {
      console.error(error);
    }

    // if available, get who was original supporter, and show him
    // firstSupportersCampaign
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/firstSupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log("firstSupportersCampaign");
      console.log(response.data);

      setFirstSupportersCampaign(response.data);
    } catch (error) {
      console.error(error);
    }

    try {
      console.log(" sto nece: " + limitAllTransactions);
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/allTransactionsSupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
            limitA: limitAllTransactions,
          },
        }
      );

      console.log("saljes ti last coments allTransactionsSupportersCampaign");
      console.log(response.data);

      setAllTransactionsSupporters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const popupRef = useRef(null);



   // for snackbar message. 
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [snackbarMessage, setSnackbarMessage] = useState("");
   
   // error, "success"
   const [snackbarStatus, setSnackbarStatus] = useState("success");

 
   const handleSnackbar = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }
 
     setOpenSnackbar(false);
   };
 

   

  return (
    <>
      <Navbar />

      <div className="relative ">
        {/* <div className="bg-[#F5F5F5] h-32 sm:h-40 md:h-52"></div> */}

        {/* 
        <div className="image_editProfile">

          <img
        
            className="image_editProfile absolute top-10 left-0 right-0 h-40 sm:h-60 md:h-80 object-contain  z-10 rounded-full ml-4 mr-auto  "
            /*  src={getImageUrl(post.cover_image)} 
            style={{ position: "relative", zIndex: "-1" }}

            src="/supporters/profile_placeholder.jpeg"
          />



        </div> */}
        {athlete && (
          <>
            <Avatar
              sx={{
                width: { xs: 80, md: 120 },
                height: { xs: 80, md: 120 },
              }}
              /*  src="/supporters/profile_placeholder.jpeg"
               */

              src={
                BACKEND_SERVER_BASE_URL +
                "/imageUpload/profile_pics/" +
                athlete.picture
              }
              className=" absolute top-10 left-5 right-0 ml-4 md:ml-8 mr-auto  "
            >
              {athlete.name.charAt(0).toUpperCase()}
            </Avatar>

            {/*   {athlete && (<>
          <p>
            {athlete.name}
          </p>
          */}

            <img /* src="/supporters/likely_going.svg"  */
              src={statusImage(athlete.athleteStatus)}
              className=" absolute top-7 min-[900px]:top-6 left-[0.45rem] min-[900px]:left-1 right-0 ml-4 md:ml-8 mr-auto w-[6.5rem] min-[900px]:w-[9.5rem] "
            />
          </>
        )}
       
      </div>


<div className="flex justify-end">
      <Button
                onClick={() => {
                  const copied = navigator.clipboard.writeText(window.location.href);

                  if (copied) {
                    setOpenSnackbar(true);
                    setSnackbarMessage(t("campaign.content9"));
                  }
                }}
                className="w-[110px] "
                style={{ textTransform: "none", marginRight: "10px" }}
                sx={{
                  p: 2,

                  height: "50px",
                  bgcolor: "#D24949",

                  color: "#fff",
                  borderRadius: 3,
                  border: `1px solid #D24949`,
                  "&:hover": {
                    background: "rgba(210, 73, 73, 1)",
                    color: "white",
                    border: `1px solid rgba(210, 73, 73, 1)`,
                  },
                }}
                id="join-the-fun-btn"
              >
                <img src="/supporters/share_white.svg" className="mr-2" />
                <span className="lexend-font">{t("campaign.content10")}</span>
              </Button>
              </div>




              <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbar}
          severity={snackbarStatus}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>


      <FooterClean />
    </>
  );
};

export { ItemCampaign };
