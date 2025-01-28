import { Card, Fade, Container } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useCreatePaymentIntent } from "../../hooks/useCreatePaymentIntent";
import DonationInput from "./DonationInput";
import StripeForm from "./StripeForm";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";

import { createPaymentIntent } from "../../functions/createPaymentIntent";

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

  const translatedError = (message) => {
    /*  if(message === "") */
  };

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

    if (supporterEmail === "") {
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
  };

  //let { campaignId } = useContext(AuthContext);
  // console.log(user)
  /*  console.log("a iz state-a je: "+campaignId) */

  // var campaignId = "haha0";

  // const [amount, setAmount] = useState(10);

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [confirmedPayment, setConfirmedPayment] = useState(null);

  const { mutate, isLoading, data, error } = useCreatePaymentIntent();

  const handleChange = (e) => {
    const onlyPositiveNums = /^(\d+(\.\d{1,2})?)?$/;
    let value = e.target.value;

    value = value.replace(/[^0-9.]/g, "");

    // only 2 digits
    if (value && !onlyPositiveNums.test(value)) {
      value = value.slice(0, -1);
    }

    if (parseFloat(value) > 999999) {
      value = "999999.99";
    }

    if (parseFloat(value) === 0) {
      value = "1";
    }

    setAmount(value);
  };

  const handleSubmit = async () => {
    const noCharsInAmount = /^\d+(\.\d{0,2})?$/;

    

    if (
      (await checkIfCouponValid()) &&
      checkValidityOfFields() &&
      noCharsInAmount.test(amount)
    ) {
      mutate(
        {
          amount,
          campaignId,
          supporterName,
          supporterEmail,
          separateDonationThruPage,
          supporterComment,
          discountCode,
          countryAthleteIsIn,
        },
        {
          onError: (error) => {
            setSnackbarMessage(error?.response?.data?.error);
            console.log("snackbar: ");
            console.log(translatedError(error?.response?.data?.error));

            //  setSnackbarMessage(translatedError(error?.response?.data?.error));

            setSnackbarStatus("error");
            setOpenSnackbar(true);
          },
        }
      );
    } else if (!noCharsInAmount.test(amount) && amount !== "") {
      setSnackbarMessage(t("popupMessages.text29"));
      setSnackbarStatus("error");
      setOpenSnackbar(true);
    } else if (amount === "") {
      setSnackbarMessage(t("popupMessages.text30"));
      setSnackbarStatus("error");
      setOpenSnackbar(true);
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
        if (!separateDonationThruPage) {
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
              setSnackbarMessage={setSnackbarMessage}
              setSnackbarStatus={setSnackbarStatus}
              setOpenSnackbar={setOpenSnackbar}
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
        </>
      )}
    </Card>
  );
}
