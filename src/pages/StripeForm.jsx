import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useSubmitPayment } from "../hooks/useCapturePayment";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import { useState, useEffect } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeFormComponent = ({ paymentIntent, handleCancel }) => {
  const [confirmData, updateConfirmData] = useState(null);

  console.log("handle clear je");
  console.log(handleCancel);

  const stripe = useStripe();

  const elements = useElements();

  const { mutate, isLoading, data, error } = useSubmitPayment(
    elements,
    stripe,
    paymentIntent.client_secret
  );

  const handleSubmit = async (e) => {
    //  elements.submit();
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (data) updateConfirmData(data);
  }, [data]);

  return (
    <CardContent>
        <Typography variant="h6" pb={3} color='primary'>Thanks for your support!</Typography>
        <PaymentElement/>
        <CardActions sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>{isLoading ? <CircularProgress/> :`Donate ${paymentIntent.amount / 100}`}</Button>
        </CardActions>
    </CardContent>
  );
};

/* 
const StripeForm = ({ paymentIntent , handleClear }) => {

    const [confirmData, updateConfirmData] = useState(null);


    const stripe = useStripe();

    const elements = useElements();

    const { mutate, isLoading, data, error } = useSubmitPayment(elements, stripe, paymentIntent.client_secret);

    const handleSubmit = async (e) => {
      //  elements.submit();
        e.preventDefault();
        mutate();
    };

    return (
        <CardContent>
            <Typography variant="h6" pb={3} color='primary'>Thanks for your support!</Typography>
          
		  <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
                <PaymentElement options={{ mode: 'payment' }} />
            </Elements>
			
                <CardActions sx={{mt:3, display:'flex', justifyContent:'space-between'}}>
                    <Button  variant="outlined" >Cancel</Button>
                    <Button variant="contained">Donate ${paymentIntent.amount / 100}</Button>
                </CardActions>
        </CardContent>
    )
} */

const StripeForm = (props) => {
  /*  console.log("sta ima u props sve");
    console.log(props.handleCancel); */
  return (
    <>
      <Elements
        stripe={stripePromise}
        handleClear={props.handleCancel}
        options={{ clientSecret: props.paymentIntent.client_secret }}
      >
        <StripeFormComponent {...props} />
      </Elements>
    </>
  );
};

export default StripeForm;
