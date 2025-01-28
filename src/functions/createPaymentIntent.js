import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

export const createPaymentIntent = async (
  amount,
  campaignId,
  supporterName,
  supporterEmail,
  separateDonationThruPage,
  supporterComment,
  discountCode,
  countryAthleteIsIn
) => {
  try {
    const response = await axios.post(
      `${BACKEND_SERVER_BASE_URL}/payment/makePayment`,
      {
        amount: amount,
        campaignId,
        supporterName,
        supporterEmail,
        separateDonationThruPage,
        supporterComment,
        discountCode,
        countryAthleteIsIn,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.paymentIntent;
  } catch (error) {
    if (error.response) {
      throw error;
    } else {
      throw new Error("An unknown error occurred. Please try again.");
    }
  }
};


