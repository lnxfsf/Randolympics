import { Card, Fade, Container } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { useCreatePaymentIntent } from "../hooks/useCreatePaymentIntent";
import DonationInput from "./DonationInput";
import StripeForm from "./StripeForm";


import {
    Button,
    CardActionArea,
    CardActions,
    CardContent,
    CircularProgress,
    Typography,
  } from "@mui/material";

  import React, { useContext } from 'react'
  import AuthContext from '../context/AuthContext';


export default function DonationFormItemCampaign({amount, setAmount, campaignId, supporterName, supporterEmail, separateDonationThruPage, supporterComment, discountCode}) {
  



  

 //let { campaignId } = useContext(AuthContext);
  // console.log(user)
 console.log("a iz state-a je: "+campaignId)

 // var campaignId = "haha0";


   // const [amount, setAmount] = useState(10);

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [confirmedPayment, setConfirmedPayment] = useState(null);

  const { mutate, isLoading, data, error } = useCreatePaymentIntent();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handleSubmit = () => {mutate({ amount, campaignId, supporterName, supporterEmail, separateDonationThruPage, supporterComment, discountCode })};

  const handleClear = useCallback(() => {
    setPaymentIntent(null);
    //console.log("da poziva se stvarno ");
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


          console.log("imas ovo payment: ")
          console.log(payment)
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

  console.log("paymentIntent");
  console.log(paymentIntent);

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
        <Fade in={confirmedPayment} unmountOnExit>
          <Typography p={4} variant="h6" textAlign={"center"}>
            Your generosity goes a long way!
          </Typography>
        </Fade>
      )}



    </Card>
  );
}
