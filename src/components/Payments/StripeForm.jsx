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
import { useTranslation } from "react-i18next";
import { useSubmitPayment } from "../../hooks/useCapturePayment";
import { useElements, useStripe } from "@stripe/react-stripe-js";

import { useState, useEffect } from "react";



let STRIPE_PUBLIC_KEY =
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
  process.env.VITE_STRIPE_PUBLIC_KEY;


const stripePromise = loadStripe(`${STRIPE_PUBLIC_KEY}`);


const StripeFormComponent = ({ client_secret, amount, paymentIntent, handleCancel, handleConfirmPayment }) => {
  const [confirmData, updateConfirmData] = useState(null);

  const { t } = useTranslation();

  const stripe = useStripe(`${STRIPE_PUBLIC_KEY}`);

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
    if (data) handleConfirmPayment(data);
  }, [data]);

  return (
    <CardContent>
        <p className="text-lg text-red_second font-semibold mb-4">{t("payments.content2")}</p>
        <PaymentElement/>
        <CardActions sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCancel} 
              style={{ textTransform: "none" }}

            sx={{
              height: "50px",
              bgcolor: "#fff",
              color: "#444444",
              borderRadius: 3,
              border: `1px solid #D24949`,
              "&:hover": {
                background: "rgba(210, 73, 73, 1)",
                color: "white",
                border: `1px solid rgba(210, 73, 73, 1)`,
              },
            }}


            ><span className="lexend-font ">{t("payments.content3")}</span></Button>
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}
            
            style={{ textTransform: "none" }}

            sx={{
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
            
            ><span className="lexend-font ">{isLoading ? <CircularProgress/> :`Donate ${paymentIntent.amount / 100}`} $</span></Button>
        </CardActions>
    </CardContent>
  );
};


const StripeForm = (props) => {
   
    console.log("dobija client_secret");
  console.log(props)
    console.log(props.client_secret)



  return (
    <>
      <Elements
        stripe={stripePromise}
        
        options={{ clientSecret: props.paymentIntent.client_secret }}
      >
        <StripeFormComponent {...props} handleClear={props.handleCancel} />
      </Elements>
    </>
  );
};

export default StripeForm;
