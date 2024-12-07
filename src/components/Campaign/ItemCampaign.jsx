import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { QRCode } from "react-qrcode-logo";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Flag from "react-world-flags";

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

import { Avatar, AvatarGroup } from "@mui/material";

import { useTranslation } from "react-i18next";

import { settingUserType } from "../../context/user_types";
import { DonatePart } from "./DonatePart";
import { InformationPart } from "./InformationPart";
import { ActivityPart } from "./ActivityPart";
import { HeaderPart } from "./HeaderPart";
import { SubHeaderPart } from "./SubHeaderPart";
import { ViewFullActivity } from "./ViewFullActivity";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

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

  const [wantToDonate, setWantToDonate] = useState(false);

  const [colorStatusGoing, setColorStatusGoing] = useState(
    "rgba(128, 128, 128, 0.75)"
  );

  const [supporterName, setSupporterName] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");
  const [supporterComment, setSupporterComment] = useState("");

  const [howManySupporters, setHowManySupporters] = useState();
  const [moreDetailsAboutSupporters, setMoreDetailsAboutSupporters] = useState();
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
        setSnackbarMessage("Donated");
        setOpenSnackbar(true);
      } else {
        
        setSnackbarMessage(error.response?.data?.message || error.message);
        setSnackbarStatus("error");
        setOpenSnackbar(true);
      }
    } catch (error) {

      
      setSnackbarMessage(error.response?.data?.message || error.message);
      setSnackbarStatus("error");
      setOpenSnackbar(true);
      console.log(error.stack);
    }
  };

  
  const [allTransactionsPage, setAllTransactionsPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);


  useEffect(() => {


    
    getAllTransactions(); // you call this again, when opening "All transactions" 
    updateLatestData();

    const interval = setInterval(() => {
      updateLatestData();
    }, 1000); 

   
    return () => clearInterval(interval);
  }, [limitAllTransactions, allTransactionsPage]);

  
  const handlePaginationChangeAllTransactions = (event, value) => {
    setAllTransactionsPage(value);
  };

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
      setMoreDetailsAboutSupporters(response.data.rows);

     


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

      
      

      setFirstSupportersCampaign(response.data);
    } catch (error) {
      console.error(error);
    }

   
  };


  const getAllTransactions = async () => {
     /* all transactions , activity */
     try {
      
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/allTransactionsSupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
            limitA: 10,
            offset: (allTransactionsPage-1) * 10,
          },
        }
      );

     /*  
      
 */

      setMaxPages(Math.ceil(response.data.count / 10));
      setAllTransactionsSupporters(response.data.rows);
      
    } catch (error) {
      console.error(error);
    }
  }
  


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

  const [viewFullActivity, setViewFullActivity] = useState(false);

  return (
    <>
      <Navbar />

      {!viewFullActivity ? (
        <HeaderPart
          athlete={athlete}
          statusImage={statusImage}
          setOpenSnackbar={setOpenSnackbar}
          setSnackbarMessage={setSnackbarMessage}
        />
      ) : (
        <></>
      )}

      {athlete && campaign && (
        <>
          {!viewFullActivity ? (
            <>


              <SubHeaderPart
                athlete={athlete}
                howManySupporters={howManySupporters}
                moreDetailsAboutSupporters={moreDetailsAboutSupporters}
              />

              <div className="flex flex-col lg:flex-row w-full p-3 md:p-8 gap-6 ml-0 ">
                <DonatePart
                  wantToDonate={wantToDonate}
                  setWantToDonate={setWantToDonate}
                  campaign={campaign}
                  athlete={athlete}
                  supporterName={supporterName}
                  setSupporterName={setSupporterName}
                  supporterEmail={supporterEmail}
                  setSupporterEmail={setSupporterEmail}
                  supporterComment={supporterComment}
                  setSupporterComment={setSupporterComment}
                  campaignId={campaignId}
                  discountCode={discountCode}
                  countryAthleteIsIn={countryAthleteIsIn}
                  setDiscountCode={setDiscountCode}
                  donateWithCouponOnly={donateWithCouponOnly}
                  viewFullActivity={viewFullActivity}
                  howManySupporters={howManySupporters}
                />

                <InformationPart athlete={athlete} formatDate={formatDate} />
              </div>

              <ActivityPart
                lastTransactionsSupporters={lastTransactionsSupporters}
                setViewFullActivity={setViewFullActivity}
                getAllTransactions={getAllTransactions}
              />
            </>
          ) : (
            <>
              <ViewFullActivity
                wantToDonate={wantToDonate}
                setWantToDonate={setWantToDonate}
                campaign={campaign}
                athlete={athlete}
                supporterName={supporterName}
                setSupporterName={setSupporterName}
                supporterEmail={supporterEmail}
                setSupporterEmail={setSupporterEmail}
                supporterComment={supporterComment}
                setSupporterComment={setSupporterComment}
                campaignId={campaignId}
                discountCode={discountCode}
                countryAthleteIsIn={countryAthleteIsIn}
                setDiscountCode={setDiscountCode}
                donateWithCouponOnly={donateWithCouponOnly}
                setViewFullActivity={setViewFullActivity}
                viewFullActivity={viewFullActivity}
                howManySupporters={howManySupporters}

                allTransactionsSupporters={allTransactionsSupporters}

                handlePaginationChangeAllTransactions={handlePaginationChangeAllTransactions}
                allTransactionsPage={allTransactionsPage}
                maxPages={maxPages}
              />
            </>
          )}
        </>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
