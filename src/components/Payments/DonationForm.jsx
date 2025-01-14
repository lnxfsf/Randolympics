import { Card, Fade, Container } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useCreatePaymentIntent } from "../../hooks/useCreatePaymentIntent";
import DonationInput from "./DonationInput";
import StripeForm from "./StripeForm";
import { useTranslation } from "react-i18next";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

export default function DonationForm({ amount, setAmount, campaignId }) {

  const { t } = useTranslation();


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



  const [paymentIntent, setPaymentIntent] = useState(null);
  const [confirmedPayment, setConfirmedPayment] = useState(null);

  const { mutate, isLoading, data, error } = useCreatePaymentIntent();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = () => {
    mutate({ amount, campaignId });
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
    <Card>
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
        </>
      )}
    </Card>
  );
}
