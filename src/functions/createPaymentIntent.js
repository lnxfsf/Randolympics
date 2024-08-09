

import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;
  


export const createPaymentIntent = async (amount, campaignId) => {

  console.log("unutra createPaymentIntent")
  console.log(amount) 
  console.log("campaignId je: " + campaignId) 
  

    try{
        const response = await axios.post(`${BACKEND_SERVER_BASE_URL}/listsData/makePayment`, {
            amount: amount,
           campaignId,
           
          }, {

            headers: {
              'Content-Type': 'application/json',
            }
            
          });
         
          // const data = await response.json();
         
          // , jer axios valjda daje u .json il nesto..
        /*   console.log("u createPaymentIntent se nalazi: ")
          console.log(response.data.paymentIntent)

          return data.paymentIntent; */

          return response.data.paymentIntent


        }catch(e) {
            console.log(e)
        }

  
  };


 /*  var response = await axios.post(
    `${BACKEND_SERVER_BASE_URL}/listsData/makePayment`
    
  ); */