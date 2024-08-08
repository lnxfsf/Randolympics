import { CardContent } from "@mui/material";
import { Elements, PaymentElement, } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


const StripeForm = ({ paymentIntent }) => {
    return (
        <CardContent>
            <Elements stripe={stripePromise} options={{ clientSecret: paymentIntent.client_secret }}>
                <PaymentElement options={{ mode: 'payment' }} />
            </Elements>
        </CardContent>
    )
}
export default StripeForm

