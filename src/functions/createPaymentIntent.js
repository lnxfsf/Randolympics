

import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;
  

export const createPaymentIntent = async (amount) => {

   /*  const response = await fetch('/listsData/makePayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        amount: amount,
      }),

    }); */

    try{
        const response = await axios.post(`${BACKEND_SERVER_BASE_URL}/listsData/makePayment`, {
            amount: amount,
          }, {

            headers: {
              'Content-Type': 'application/json',
            }
            
          });
          const data = await response.json();
          return data.paymentIntent;


        }catch(e) {
            console.log(e)
        }

  
  };


 /*  var response = await axios.post(
    `${BACKEND_SERVER_BASE_URL}/listsData/makePayment`
    
  ); */