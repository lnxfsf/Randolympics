import { Card, Fade, Container } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useCreatePaymentIntent } from "../../hooks/useCreatePaymentIntent";
import DonationInput from "./DonationInput";
import StripeForm from "./StripeForm";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

export default function DonationFormItemCampaign({
  amount,
  setAmount,
  campaignId,
  supporterName,
  supporterEmail,

  separateDonationThruPage,
  setFourthIsVisible,
  setFifthIsVisible,


  supporterComment,
  discountCode = "",
  countryAthleteIsIn,

  setSnackbarMessage,
  setSnackbarStatus,
  setOpenSnackbar,
}) {
  const { t, i18n } = useTranslation();

  /*   // for snackbar message.
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // error, "success"
  const [snackbarStatus, setSnackbarStatus] = useState("success");

  const handleSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  }; */

  const checkIfCouponValid = async () => {
    try {
      // do not check if the coupon has not been entered at all
      if (discountCode !== "") {
        const response = await axios.post(
          `${BACKEND_SERVER_BASE_URL}/payment/checkIfCouponValid`,
          { discountCode, countryAthleteIsIn, amountOriginal: amount * 100 },
          {
            headers: {
              "Accept-Language": i18n.language || "en",
            },
          }
        );

        console.log("koji kupon on dobija ?");
        console.log(discountCode);

        if (response.status !== 200) {
          setSnackbarStatus("error");
          setSnackbarMessage(
            response?.data?.message || "An unexpected error occurred."
          );
          setOpenSnackbar(true);

          return false;
        }

        return true;
      }

      return true;
    } catch (error) {
      console.log("koji kupon on dobija error je ?");
      console.log(discountCode);

      console.log(error.response?.data?.message || error.message);

      setSnackbarStatus("error");
      setSnackbarMessage(error.response?.data?.message || error.message);
      setOpenSnackbar(true);

      console.log(error.stack);
      return false;
    }
  };


  const checkValidityOfFields = () => {

    
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


  /*   if(supporterEmail) */


    if(supporterEmail === ""){
      setSnackbarMessage(t("popupMessages.text27")); 
      setSnackbarStatus("error");
      setOpenSnackbar(true);

      return false;
    } else if (!emailRegex.test(supporterEmail)) {
       setSnackbarMessage(t("register.content8")); 
       setSnackbarStatus("error");
       setOpenSnackbar(true);

       return false;
       
      }

      return true;



  }

  //let { campaignId } = useContext(AuthContext);
  // console.log(user)
  /*  console.log("a iz state-a je: "+campaignId) */

  // var campaignId = "haha0";

  // const [amount, setAmount] = useState(10);

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [confirmedPayment, setConfirmedPayment] = useState(null);

  const { mutate, isLoading, data, error } = useCreatePaymentIntent();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
 

    if (await checkIfCouponValid() && checkValidityOfFields()) {
      mutate({
        amount,
        campaignId,
        supporterName,
        supporterEmail,
        separateDonationThruPage,
        supporterComment,
        discountCode,
        countryAthleteIsIn,
      });
    }
  };

  const handleClear = useCallback(() => {
    setPaymentIntent(null);
    //
  }, [paymentIntent]);

  const confirmPayment = (payment) => {
    setConfirmedPayment(payment);
    handleClear();
  };

  /*  const handleConfirmPayment = async (payment) => {
    setConfirmedPayment(payment);
    handleClear();
    await setTimeout(() => {
        setConfirmedPayment(null);
    }, 5000); */

  const handleConfirmPayment = useCallback(
    async (payment) => {
      setConfirmedPayment(payment);

      if (payment) {
        setSnackbarMessage(t("popupMessages.text7"));
        setSnackbarStatus("success");
        setOpenSnackbar(true);


        // and go on next page, if this is first time donating
        if(!separateDonationThruPage){
          setFourthIsVisible(false);
          setFifthIsVisible(true);


        }
      }




      handleClear(); // Clear the payment intent

      // Using a Promise-based delay to clear confirmedPayment after 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));

      setConfirmedPayment(null);
    },

    [handleClear, setConfirmedPayment] // Dependencies that will cause the function to update if they change
  );

  useEffect(() => {
    if (data) setPaymentIntent(data);
  }, [data]);

  return (
    <Card elevation={0} className="drop-shadow-none ">
      {!paymentIntent && (
        <Fade in={!paymentIntent} unmountOnExit>
          <Container>
            <DonationInput
              amount={amount}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              data={data}
              error={error}
            />
          </Container>
        </Fade>
      )}

      {paymentIntent && (
        <Fade in={paymentIntent} unmountOnExit>
          <Container>
            <StripeForm
              client_secret={paymentIntent?.client_secret}
              amount={paymentIntent?.amount}
              paymentIntent={paymentIntent}
              handleCancel={handleClear}
              handleConfirmPayment={handleConfirmPayment}
            />
          </Container>
        </Fade>
      )}

      {confirmedPayment && (
        <>
          <Fade in={confirmedPayment} unmountOnExit>
            <Typography p={4} variant="h6" textAlign={"center"}>
              {t("payments.content1")}
            </Typography>
          </Fade>

          {/*    <Snackbar
            open={openSnackbar}
            autoHideDuration={15000}
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
          </Snackbar> */}
        </>
      )}
    </Card>
  );
}
