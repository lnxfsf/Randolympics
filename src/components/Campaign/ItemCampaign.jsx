import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";

import "../../styles/campaign.scoped.scss";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes/theme";
import { QueryProvider } from "../../QueryProvider";
import DonationForm from "../../pages/DonationForm";

import { useParams, useNavigate } from "react-router-dom";
import DonationFormItemCampaign from "../../pages/DonationFormItemCampaign";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

function formatDate(dateString) {
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const ItemCampaign = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const urlForCampaign = `${FRONTEND_SERVER_BASE_URL}/campaign/${campaignId}`;

  const [campaign, setCampaign] = useState();
  const [athlete, setAthlete] = useState();

  const [textAthleteStatus, setTextAthleteStatus] = useState();

  const [amount, setAmount] = useState(10);
  const [supporterName, setSupporterName] = useState();
  const [supporterEmail, setSupporterEmail] = useState();
  const [supporterComment, setSupporterComment] = useState();

  const [howManySupporters, setHowManySupporters] = useState();
  const [lastCommentsSupporters, setLastCommentsSupporters] = useState();
  const [lastTransactionsSupporters, setLastTransactionsSupporters] = useState();

  const [countryAthleteIsIn, setCountryAthleteIsIn ] = useState()
  

  const [discountCode, setDiscountCode] = useState();




  const donateWithCouponOnly = async () => {


    try {
      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/listsData/donateOnlyWithDiscountCode`,
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


  
  }


  useEffect(() => {
    updateLatestData();
  }, []);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/campaignDetails`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log(response.data.oneCampaign);
      console.log(response.data.thatAthlete);

      setCampaign(response.data.oneCampaign);
      setAthlete(response.data.thatAthlete);

      if (response.data.thatAthlete) {
        switch (response.data.thatAthlete.athleteStatus) {
          case "s1":
            setTextAthleteStatus("Has not logged in yet");
          case "s2":
            setTextAthleteStatus("Logged in but no status");
          case "s3":
            setTextAthleteStatus("I'm 99% taking the challenge and going");
          case "s4":
            setTextAthleteStatus("I'm most likely going");
          case "s5":
            setTextAthleteStatus("I'm maybe going");
          case "s6":
            setTextAthleteStatus("I'm definitely not going");
        }
      }

      if(response.data.thatAthlete){
        setCountryAthleteIsIn(response.data.thatAthlete.nationality);
      }
     


    } catch (error) {
      console.error(error);
    }

    // get supporter numbers
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/howManySupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      setHowManySupporters(response.data.count);
    } catch (error) {
      console.error(error);
    }

    // get last 3 comments from supporters
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/lastCommentsSupportersCampaign`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log("saljes ti last coments");
      console.log(response.data);

      setLastCommentsSupporters(response.data);
    } catch (error) {
      console.error(error);
    }
 


    // get last 3 transactions
    

    try {
        const response = await axios.get(
          `${BACKEND_SERVER_BASE_URL}/listsData/lastTransactionsSupportersCampaign`,
          {
            params: {
              campaignId: campaignId,
            },
          }
        );
  
        console.log("saljes ti last coments");
        console.log(response.data);
  
        setLastTransactionsSupporters(response.data);
      } catch (error) {
        console.error(error);
      }




};

  return (
    <>
      {campaign && athlete && (
        <>
          <div className="flex">
            <div className="flex flex-col basis-1/2 p-16 pr-0">
              <img
                className="w-32 mb-8"
                src={
                  BACKEND_SERVER_BASE_URL +
                  "/imageUpload/profile_pics/" +
                  athlete.picture
                }
              />

              <hr className=" mb-8" />

              <p><span className="font-semibold">Gender:</span> {athlete.gender === "M" ? "Male" : "Female"}</p>
              <p className="mb-12">
              <span className="font-semibold">Birthdate:</span> {formatDate(athlete.birthdate)}
              </p>

              <p> <span className="font-semibold"> Weight:</span> {athlete.weight}</p>

              <p><span className="font-semibold">Email:</span> {athlete.email}</p>

              <p><span className="font-semibold">Phone:</span> {athlete.phone}</p>

              <p><span className="font-semibold">Crypto:</span>  {athlete.cryptoaddress ? athlete.cryptoaddress : '0'} {athlete.cryptoaddress_type}</p>
            </div>

            <p class="vertical-text text-lg text-blue-500 underline text-red_first pt-12 font-semibold">
              {textAthleteStatus}
            </p>

            <div className="flex basis-1/2 flex-col ml-8">
              <div className="flex justify-around items-center text-4xl mt-14 pb-6">
                {athlete.name}

                <div className="flex flex-col justify-center ">
                  <Flag className="flag-photo" code={athlete.nationality} />
                </div>
              </div>

              <hr />

              <div className="border-2 m-2">
              <p className="text-2xl font-bold">Athlete statement</p>

              <p>{athlete.athleteStatement}</p>
              </div>



<div className="border-2 m-2">
              <div className="flex justify-around">
                <p className="text-2xl font-bold">Supporters</p>
                <p className="font-semibold text-red_first pt-1">{howManySupporters}</p>
              </div>

        

              {lastCommentsSupporters &&
                lastCommentsSupporters.map((item, index) => (
                  <>
                  <div className="flex border-2 rounded-lg m-1 p-2 ">
                    <p key={index}>{item.supporterComment}</p>
                  </div>
                  </>
                ))}


</div>

              <div className="flex justify-around border-2">
                <p className="text-2xl font-bold">Money raised</p>
                <p className="text-red_first font-semibold mt-1">{athlete.donatedAmount / 100} $</p>
              </div>



<div className="border-2 m-4 p-2">
              <div className="flex justify-around border-2 mt-2 ">
                <p className="text-2xl font-bold">Campaign stats</p>
                <p className="underline decoration-red_first text-red_first">
                  further explanation needed
                </p>


                
               


              </div>

              {lastTransactionsSupporters &&
                lastTransactionsSupporters.map((item, index) => (
                  <>
                  <div className="flex border-2 rounded-lg m-1 p-2 flex-col">
                    <p key={index}><span className="font-semibold">Supporter name:</span> {item.supporterName}</p>
                    <p><span className="font-semibold">Donated amount:</span> {item.amount / 100} $</p>
                  </div>
                  </>
                ))}
</div>



              <p className="underline mt-4 flex justify-center border-2">
                Help {athlete.name} improve{" "}
                {athlete.gender === "M" ? "his" : "her"} stats !
              </p>

              <a
                href={urlForCampaign}
                target="_blank"
                className="underline mt-4 flex justify-center border-2 mb-4"
              >
                Share campaign
              </a>

              <div className="border-2">
                <div className="flex justify-center items-center flex-col">
                  <p>Supporter info</p>

                  <div className="flex">
                    <input
                      className="border-2 rounded-lg"
                      type="text"
                      placeholder="Supporter name"
                      value={supporterName}
                      onChange={(event) => {
                        setSupporterName(event.target.value);
                      }}
                    />

                    <input
                      className="border-2 rounded-lg"
                      type="email"
                      placeholder="Supporter email"
                      value={supporterEmail}
                      onChange={(event) => {
                        setSupporterEmail(event.target.value);
                      }}
                    />
                  </div>

                  <input
                    className="border-2 rounded-lg"
                    type="text"
                    placeholder="Supporter comment"
                    value={supporterComment}
                    onChange={(event) => {
                      setSupporterComment(event.target.value);
                    }}
                  />

                 
 <p className="text-red_first text-sm w-[50%] mt-4">
                    if supporter (others) are donating to here, they don't need
                    account (and they don't get one). these fields are
                    optional.. (for transaction). 
                    <br/>
                    But if supporter have account, transaction he makes will be displayed on his profile (or even if he later decides to make account), he just need to use same email address, he made transaction with
</p>
		
                </div>


                <div className="m-4 flex justify-center flex-col">
                    <p>Discount codes</p>
                    <input className="border-2 rounded-lg" 
                    type="text"
                    placeholder="Code"
                    value={discountCode}
                    onChange={(event) => {setDiscountCode(event.target.value)}}
                     />

                     <button 
                     style={{backgroundColor: "#0000ff", color: "#fff"}} className="m-4 rounded-lg p-2"
                     
                     onClick={donateWithCouponOnly}
                     

                     >
                      
                      Donate with coupon only</button>
</div>  


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

                  <p className="underline font-bold text-red_first">
                    Disable adblocker{" "}
                  </p>
                  <p>
                    (or it will block request to stripe, as this is HTTP
                    (insecure chanel))
                  </p>
                </div>

                <p className="underline mt-4 flex justify-center">Donate</p>

                {/* and this is for those 3 options */}
                <p className="mt-4 font-semibold">Select amount</p>
                <div className="flex justify-around mt-6 mb-6 gap-4">
                  <div
                    className="border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
                    onClick={() => {
                      setAmount(1);
                    }}
                  >
                    <img className=" " src="/supporters/1_dollar.png" />
                    <p>1 $</p>
                  </div>

                  <div
                    className="border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
                    onClick={() => {
                      setAmount(10);
                    }}
                  >
                    <img className=" " src="/supporters/10_dollars.png" />
                    <p>10 $</p>
                  </div>

                  <div
                    className="border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
                    onClick={() => {
                      setAmount(100);
                    }}
                  >
                    <img className=" " src="/supporters/100_dollars.png" />
                    <p>100 $</p>
                  </div>
                </div>

                <div className=" pay-container flex flex-col w-64 border-2 h-auto   rounded-lg  justify-center items-center">
                  <ThemeProvider theme={theme}>
                    <QueryProvider>
                      <DonationFormItemCampaign
                        amount={amount}
                        setAmount={setAmount}
                        campaignId={campaignId}

                        supporterName={supporterName}
                        supporterEmail={supporterEmail}
                        supporterComment={supporterComment}
                        discountCode={discountCode}
                        countryAthleteIsIn={countryAthleteIsIn}

                        
                        separateDonationThruPage={true}
                      />
                    </QueryProvider>
                  </ThemeProvider>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { ItemCampaign };
