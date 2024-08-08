import { Button, CardActionArea, CardActions, CardContent, Typography } from "@mui/material";
import { Elements, PaymentElement, } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeForm = ({ paymentIntent }) => {
    return (
        <CardContent>
            <Typography variant="h6" pb={3} color='primary'>Thanks for your support!</Typography>
            <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
                <PaymentElement options={{ mode: 'payment' }} />
            </Elements>
                <CardActions sx={{mt:3, display:'flex', justifyContent:'space-between'}}>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained">Donate ${paymentIntent.amount / 100}</Button>
                </CardActions>
        </CardContent>
    )
}
export default StripeForm
