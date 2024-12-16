
import { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes/theme";
import { QueryProvider } from "../../QueryProvider";
import DonationForm from "../Payments/DonationForm";
import DonationFormItemCampaign from "../Payments/DonationFormItemCampaign";
import AuthCode from 'react-auth-code-input';
import { Button } from "@mui/material";


import axios from "axios";

const PaymentPage = ({campaignId, supporterName, supporterEmail, supporterComment, discountCode, friendNationality}) => {


    const [amount, setAmount] = useState(10);
  /*   const [supporterName, setSupporterName] = useState();
    const [supporterEmail, setSupporterEmail] = useState();
    const [supporterComment, setSupporterComment] = useState(); */
    

    
    const donateWithCouponOnly = async () => {
        try {
          const response = await axios.post(
            `${BACKEND_SERVER_BASE_URL}/payment/donateOnlyWithDiscountCode`,
            {
              discountCode: discountCode,
              campaignId: campaignId,
    
              supporterEmail: supporterEmail,
              supporterName: supporterName,
              supporterComment: supporterComment,
            }
          );
        } catch (e) {
          console.log(e.stack);
        }
      };



return (<>

<div
        className={`flex justify-center items-center flex-col pt-28 first-content-container  `}

        style={{backgroundImage: "url('/supporters/supporter4.png')", 
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
          
         }}

      >
        <img className="h-16" src="randolympics_logo.svg" />

        <p className="text-xl text-center mt-12 mb-6">
          Want to keep this campaign running? <br />
          Let’s see how you can support your <br />
          friend!
        </p>

       

        <div className="border-2 flex flex-col justify-center items-center p-4">
          <p className="underline text-red_first">Note:</p>
          <p>
            You can use{" "}
            <a
              className="underline text-[#0000ff]"
              href="https://docs.stripe.com/testing"
              target="_blank"
            >
              test card
            </a>
            : <b>4242 4242 4242 4242</b>
          </p>
          <p>
            CVC: <b>567</b> (it can be any 3 digits){" "}
          </p>
          <p className="mb-4">
            Date: <b>12/34</b> (it can be any date){" "}
          </p>

         {/*  <p className="underline font-bold text-red_first">
            Disable adblocker{" "}
          </p>
          <p>
            (or it will block request to stripe, as this is HTTP (insecure
            chanel))
          </p> */}
        </div>

        {/* and this is for those 3 options */}
        <p className="mt-4 font-semibold">Select amount</p>
        <div className="flex justify-around mt-6 mb-6 gap-4">
         
         
          <div
            className={` p-2 border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16 
           `}
            
           style={{backgroundColor: ` ${
          amount === 1 ? 'rgba(175, 38, 38, 0.5)' : 'transparent'
        }`
      }}

            onClick={() => {
              setAmount(1);
            }}
          >
           {/*  <img className="w-10 m-2 " src="supporters/1_dollar.svg" /> */}
            <p>1 $</p>
          </div>


          <div
            className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
            onClick={() => {
              setAmount(10);
            }}
            style={{backgroundColor: ` ${
              amount === 10 ? 'rgba(175, 38, 38, 0.5)' : 'transparent'
            }`
          }}

          >
           {/*  <img className="w-8 " src="supporters/10_dollars.svg" /> */}
            <p>10 $</p>
          </div>

          <div
            className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
            onClick={() => {
              setAmount(100);
            }}

            style={{backgroundColor: ` ${
              amount === 100 ? 'rgba(175, 38, 38, 0.5)' : 'transparent'
            }`
          }}

          >
           {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
            <p>100 $</p>
          </div>
        </div>

        <div className="flex  w-[70%] justify-center items-center">
          <div className=" pay-container flex flex-col w-64 h-auto   rounded-lg  justify-center items-center">
            {/*  <img className="w-12" src="/supporters/pay.svg" />
            <p>Pay with credit card</p> */}

            <ThemeProvider theme={theme}>
              <QueryProvider>
                {/*   <DonationForm   */}
                <DonationFormItemCampaign
                  amount={amount}
                  setAmount={setAmount}
                  campaignId={campaignId}
                  supporterName={supporterName}
                  supporterEmail={supporterEmail}
                  supporterComment={supporterComment}
                  discountCode={discountCode}
                  countryAthleteIsIn={friendNationality}
                  separateDonationThruPage={false}
                />
                {/*  /> */}
              </QueryProvider>
            </ThemeProvider>
          </div>
        </div>

        <div className="m-4 mt-8 flex items-center justify-center flex-col">
          <p>Got a discount code ?</p>
          {/* <input
            className="border-2 rounded-lg"
            type="text"
            placeholder="Code"
            value={discountCode}
            onChange={(event) => {
              setDiscountCode(event.target.value);
            }}
          /> */}

        <AuthCode 
        onChange={(res) => {setDiscountCode(res)}} 
        
        
        
        inputClassName=" h-8 w-8 text-center  m-1 border-2 rounded-md"
        
        />



          <button
            style={{ backgroundColor: "#0000ff", color: "#fff" }}
            className="m-4 rounded-lg p-2"
            onClick={donateWithCouponOnly}
          >
            Donate with coupon only
          </button>
        </div>

        <Button
          onClick={() => {
            setFourthIsVisible(false);
            setFifthIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px", marginBottom: "25px" }}
          sx={{
            height: "50px",
            bgcolor: "#AF2626",
            color: "#fff",
            borderRadius: 4,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgb(175, 38, 38)",
              color: "white",
              border: `1px solid rgb(175, 38, 38)`,
            },
          }}
          
        >
          <span className="popins-font">Proceed</span>
        </Button>
      </div>

</>)

}

export {PaymentPage}