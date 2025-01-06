import React, { useState, useEffect, useRef } from "react";

import { Button, OutlinedInput, InputAdornment } from "@mui/material";
import AuthCode from "react-auth-code-input";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import axios from "axios";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

import { WarningTextPopup } from "../../components/Supporters/WarningTextPopup";

import Popup from "reactjs-popup";

import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// date picker
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";

import dayjs from "dayjs";

import ReactFlagsSelect from "react-flags-select";

import "../../styles/supporters.scoped.scss";

import supportedCountry from "../../context/supportedCountry";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes/theme";
import { QueryProvider } from "../../QueryProvider";
import DonationForm from "../../components/Payments/DonationForm";
import DonationFormItemCampaign from "../../components/Payments/DonationFormItemCampaign";

import { Trans, useTranslation } from "react-i18next";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const SupporterFourthPart = ({
  fourthIsVisible,

  amount,
  setAmount,

  campaignId,
  supporterName,
  supporterEmail,
  supporterComment,
  discountCode,
  friendNationality,

  setDiscountCode,

  donateWithCouponOnly,

  setFourthIsVisible,
  setFifthIsVisible,
  isCelebrity,
}) => {
  const donateBeforeStripe = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/payment/tempPaymentBeforeStripe`,
        {
          campaignId,
          supporterName,
          supporterEmail,
          supporterComment,
          discountCode: discountCode,
          friendNationality,
          amountOriginal: amount * 100,
        }
      );

      if (response.status === 200) {
        setSnackbarMessage("Donation succeeded");
        setSnackbarStatus("success");
        setOpenSnackbar(true);
      }
    } catch (e) {
      console.log(e.stack);
    }
  };

  const checkIfCouponValid = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/payment/checkIfCouponValid`,
        { discountCode, friendNationality, amountOriginal: amount * 100 }
      );

      console.log("dobija: ");
      console.log(response);

      if (response.status !== 200) {
        setSnackbarStatus("error");
        setSnackbarMessage(error.response?.data?.message || error.message);
        setOpenSnackbar(true);

        return false;
      }

      return true;
    } catch (error) {
      setSnackbarStatus("error");
      setSnackbarMessage(error.response?.data?.message || error.message);
      setOpenSnackbar(true);

      console.log(error.stack);

      return false;
    }
  };

  const { t } = useTranslation();

  // for snackbar message.
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // error, "success"
  const [snackbarStatus, setSnackbarStatus] = useState("success");

  const handleSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [payWithCreditCard, setPayWithCreditCard] = useState(false);

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col first-content-container ${
          fourthIsVisible ? "show" : "hide"
        } `}
      >
        <div className="flex items-center  justify-start md:justify-center w-full min-h-screen">
          <div className="basis-1/2 justify-center items-center hidden lg:block 2xl:m-32 image-container min-h-screen">
            <img src="supporters/4.jpg" className="image_supporter" />
          </div>

          <div className="basis-1/2 flex  flex-col  justify-start md:justify-center  items-start md:items-center lg:items-start m-8 md:m-16 text-black_second grow">
            {/* navigation rounded buttons */}
            <div className="flex justify-around w-full  lexend-font">
              <div className="flex flex-col items-center">
                <div
                  style={{ backgroundColor: "#F5F5F5", borderRadius: "50%" }}
                  className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                >
                  <p className="text-sm font-bold text-[#82889E]">1</p>
                </div>

                <p className="text-sm font-medium text-center mt-3 text-[#82889E]">
                  {isCelebrity
                    ? t("campaign.content95")
                    : t("campaign.content15")}
                  <br /> {t("campaign.content16")}
                </p>
              </div>

              <div className="flex flex-col items-center w-15">
                <div
                  style={{ backgroundColor: "#F5F5F5", borderRadius: "50%" }}
                  className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                >
                  <p className="text-sm font-bold text-[#82889E]">2</p>
                </div>

                <p className="text-sm font-medium text-center mt-3 text-[#82889E] ">
                  {t("campaign.content17")}
                </p>
              </div>

              <div className="flex flex-col items-center w-15">
                <div
                  style={{ backgroundColor: "#ffeaea", borderRadius: "50%" }}
                  className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                >
                  <p className="text-sm font-bold text-[#D24949]">3</p>
                </div>

                <p className="text-sm font-medium text-center mt-3 text-[#D24949] ">
                  {t("campaign.content18")}
                </p>
              </div>
            </div>

            <p className="text-2xl text-center mt-8 mb-12 font-bold text-black_second lexend-font w-full">
              {t("campaign.content19")}
            </p>

            {!payWithCreditCard && (
              <>
                <div className=" mt-8 flex items-center justify-center flex-col w-full">
                  <div className="flex gap-2">
                    <p className="font-semibold w-full text-center">
                      {t("campaign.content21")}
                    </p>

                    <Popup
                      trigger={
                        <img
                          src="/randomizer/info.svg"
                          className="cursor-pointer select-none "
                        />
                      }
                      position="right center"
                      className="popup-content "
                      modal
                      closeOnDocumentClick
                    >
                      <div
                        className="p-4 lexend-font text-black_second"
                        style={{
                          maxHeight: "300px", // Set maximum height for the scrollable area
                          overflowY: "auto", // Enable vertical scrolling
                        }}
                        dangerouslySetInnerHTML={{__html: t("campaign.infoPopupCouponText")}}
                      >
                        


                        




                      {/*   If you have coupon code, you can make a donation using
                        only coupon code, without needing to pay with real money
                        (credit card, paypal).
                        <br />
                        <br />
                        If you don't have coupon code, you can proceed{" "}
                        <i>Next</i>, to pay with credit card (paypal) only.
                        <br />
                        <br />
                        You can use only national coupon codes to make
                        coupon-only donation to campaign. National coupon codes
                        apply depending in what country athlete of campaign is
                        located in. <br />
                        <br />
                        So, campaign for athlete who is located in Sweden, you
                        can use only Sweden national coupon codes to make
                        coupon-only donation to campaign. <br /> <br />
                        As well, using coupon code, you can have addition to
                        payment you make. <br /> <br />
                        Types of coupon codes: <b>National</b> and <b>Global</b>{" "}
                        <br />
                        All coupon codes are 6 characters (which can be
                        anything, doesn't determine it's value), but they have a
                        type, which determines how much addition will be applied
                        to donation. <br />
                        <br />
                        <b>National coupon code</b> - coupon of fixed price
                        value. E.g. <code>SWED12</code> can be coupon name (6
                        chars), that will add <i>10$</i> to payment. If donation
                        is done coupon-only then donation is done just by
                        inserting donation code, and that's <i>10$</i> donation
                        for that friend campaign. If on other hand, you insert
                        this coupon code, and click <i>Next</i>, and proceed to
                        insert credit card or Paypal amount you want to donate,
                        then 10$ of coupon code value will be added to payment
                        you make. So, if you make 5$ payment donation with
                        credit card (or paypal), then together with national
                        coupon, your donation will be calcualted as <i>15$</i>{" "}
                        <code>(10$ + 5$ = 15$)</code>
                        <br />
                        <br />
                        <b>Global coupon code</b> - coupon of percentage value,
                        depending on your payment (credit card, paypal). E.g. In
                        this case coupon code can be <code>RAND18</code>, and
                        it's value is <i>50%</i>. So that means, <i>50%</i> is
                        added onto payment you make via credit card (paypal).
                        So, if you make <i>5$</i> payment donation via credit
                        card or paypal, then your actual donation will be
                        calculated as <i>7.5$</i> <code>(5$ + 50% = 7.5$)</code>{" "}
                        <code>(50% of 5$ )</code>
 */}
                      

                      </div>
                    </Popup>
                  </div>

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
                    onChange={(res) => {
                      setDiscountCode(res);
                    }}
                    inputClassName=" h-8 w-8 text-center  m-1 border-2 rounded-md  "
                  />

                  <Button
                    onClick={async () => {
                      if (discountCode !== "") {
                        const isCouponValid = await checkIfCouponValid();
                        if (isCouponValid) {
                          setPayWithCreditCard(true);
                        }
                      } else if (discountCode === "") {
                        setPayWithCreditCard(true);
                      }
                    }}
                    className="m-2 p-2 w-full md:w-[40%] xl:w-[45%] 2xl:w-[35%]"
                    style={{ textTransform: "none" }}
                    sx={{
                      mt: 6,
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
                  >
                    <span className="lexend-font">
                      {discountCode ? t("campaign.content96") : t("campaign.content97")}
                    </span>
                  </Button>

                  <Button
                    onClick={donateWithCouponOnly}
                    className="m-2 p-2 w-full md:w-[40%] xl:w-[45%]  2xl:w-[35%]"
                    style={{ textTransform: "none" }}
                    sx={{
                      m: 2,
                      p: 3,
                      height: "50px",
                      bgcolor: "#FFEAEA",

                      color: "#D24949",
                      borderRadius: 3,
                      border: `1px solid #FFEAEA`,
                      "&:hover": {
                        background: "#FFEAEA",
                        color: "#D24949",
                        border: `1px solid #D24949`,
                      },
                    }}
                  >
                    <span className="lexend-font">
                      {t("campaign.content22")}
                    </span>
                  </Button>
                </div>
              </>
            )}

            {payWithCreditCard && (
              <>
                {/* and this is for those 3 options */}

                <div className="flex w-full items-center justify-center">
                  <div className="flex gap-2">
                    <p className=" font-semibold w-full text-center">
                      {t("campaign.content20")}
                    </p>

                    <Popup
                      trigger={
                        <img
                          src="/randomizer/info.svg"
                          className="cursor-pointer select-none "
                        />
                      }
                      position="right center"
                      className="popup-content "
                      modal
                      closeOnDocumentClick
                    >
                      <div
                        className="p-4 lexend-font text-black_second"
                        style={{
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        <p className="font-bold">
                          💡 {t("campaign.infoPopupDonating1")}
                        </p>
                        <p>
                          {t("campaign.infoPopupDonating2")}
                          
                        </p>

                        <br />

                        <p>{t("campaign.infoPopupDonating3")}</p>
                        <ul className="ml-4 donationInfo1">
                          <li>{t("campaign.infoPopupDonating4")}</li>
                          <li>{t("campaign.infoPopupDonating5")}</li>
                          <li>{t("campaign.infoPopupDonating6")}</li>
                        </ul>
                      </div>
                    </Popup>
                  </div>
                </div>

                <div className="flex justify-center mt-6 mb-6 gap-4 w-full flex-wrap">
                  <div
                    className={` p-2 border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-18 border-red_second
            `}
                    style={{
                      backgroundColor: ` ${
                        amount === 1 ? "#FFEAEA" : "transparent"
                      }`,
                    }}
                    onClick={() => {
                      setAmount(1);
                    }}
                  >
                    {/*  <img className="w-10 m-2 " src="supporters/1_dollar.svg" /> */}
                    <p className="text-black_second font-semibold lexend-font">
                      1 $
                    </p>
                  </div>

                  <div
                    className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-18 border-red_second"
                    onClick={() => {
                      setAmount(5);
                    }}
                    style={{
                      backgroundColor: ` ${
                        amount === 5 ? "#FFEAEA" : "transparent"
                      }`,
                    }}
                  >
                    {/*  <img className="w-8 " src="supporters/10_dollars.svg" /> */}
                    <p className="text-black_second font-semibold lexend-font">
                      5 $
                    </p>
                  </div>

                  <div
                    className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-18 border-red_second"
                    onClick={() => {
                      setAmount(10);
                    }}
                    style={{
                      backgroundColor: ` ${
                        amount === 10 ? "#FFEAEA" : "transparent"
                      }`,
                    }}
                  >
                    {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
                    <p className="text-black_second font-semibold lexend-font">
                      10 $
                    </p>
                  </div>

                  <div
                    className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-18 border-red_second"
                    onClick={() => {
                      setAmount(20);
                    }}
                    style={{
                      backgroundColor: ` ${
                        amount === 20 ? "#FFEAEA" : "transparent"
                      }`,
                    }}
                  >
                    {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
                    <p className="text-black_second font-semibold lexend-font">
                      20 $
                    </p>
                  </div>

                  <div
                    className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-18 border-red_second"
                    onClick={() => {
                      setAmount(50);
                    }}
                    style={{
                      backgroundColor: ` ${
                        amount === 50 ? "#FFEAEA" : "transparent"
                      }`,
                    }}
                  >
                    {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
                    <p className="text-black_second font-semibold lexend-font">
                      50 $
                    </p>
                  </div>
                </div>

                {/*    <div className="flex  flex-col justify-center items-center w-full">
                  <div className=" pay-container flex flex-col w-64 h-auto   rounded-lg  justify-center items-center">
                    {/*  <img className="w-12" src="/supporters/pay.svg" />
              <p>Pay with credit card</p> 

                    <ThemeProvider theme={theme}>
                      <QueryProvider>
                        {/*   <DonationForm   
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
                        {/*  /> 
                      </QueryProvider>
                    </ThemeProvider>
                  </div>

                  <div className="p-8 w-full sm:w-1/2 md:w-[60%]">
                    <PayPalButtons
                      key={`${amount}-${discountCode}-${supporterName}-${supporterEmail}-${supporterComment}`}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: amount,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(async (details) => {
                          console.log(
                            `Transaction completed by ${details.payer.name.given_name}`
                          );

                          // Handle successful transaction here (e.g., send details to backend)
                          // now, send details to backend, and confirm transaction, and then you can insert it in database info you need.

                          // TODO, yes, you'll need to send other stuff, you usually create payment with stripe... to first have it in database. and then, you call confirm payment. so you don't change code much at all. and all test remain good.
                          // testing paypal can be done with E2E testing, on UI

                          try {
                            const response = await axios.post(
                              `${BACKEND_SERVER_BASE_URL}/payment/confirmPaypalTransaction`,
                              {
                                /*   discountCode: discountCode,
            campaignId: campaignId,

            supporterEmail: supporterEmail,
            supporterName: supporterName,
            supporterComment: supporterComment, 

                                transactionId: details.id,

                                supporterName,
                                supporterEmail,
                                supporterComment,
                                separateDonationThruPage: false,

                                discountCode: discountCode,
                                campaignId,
                                friendNationality,
                              }
                            );

                            if (response.status === 200) {
                              setSnackbarMessage("Donation succeeded");
                              setSnackbarStatus("success");
                              setOpenSnackbar(true);
                            }
                          } catch (e) {
                            console.log(e.stack);

                            setSnackbarMessage("Donation failed");
                            setSnackbarStatus("error");
                            setOpenSnackbar(true);
                          }
                        });
                      }}
                      /* show only paypal button (not credit card) 
                      fundingSource={FUNDING.PAYPAL}
                    />
                  </div>
                </div>
 */}

                <div className=" self-center w-[50%] mb-2">
                  <OutlinedInput
                    type="number"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);

                      /* no negative numbers allowed for donation */
                      /* allow it to be cleared */
                      if (e.target.value === "") {
                        setAmount(e.target.value);
                      } else {
                        const tempNumber = Number(e.target.value);

                        if (tempNumber < 1) {
                          setAmount(1);
                        } else {
                          setAmount(tempNumber);
                        }
                      }
                    }}
                    startAdornment={
                      <InputAdornment
                        position="start"
                        sx={{ fontFamily: "'Lexend', sans-serif" }}
                      >
                        $
                      </InputAdornment>
                    }
                    fullWidth
                    inputProps={{ min: 1 }}
                    sx={{
                      fontFamily: "'Lexend', sans-serif",
                      // Hide arrows for WebKit browsers (Chrome, Safari, Edge, Opera)
                      "input[type=number]::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                      "input[type=number]::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                      // Hide arrows
                      "input[type=number]": {
                        MozAppearance: "textfield",
                      },
                    }}
                  />
                </div>

                <Button
                  onClick={() => {
                    if (checkIfCouponValid()) {
                      donateBeforeStripe();
                    }
                  }}
                  className="self-center  w-[50%] "
                  /* w-full md:w-50% */
                  style={{ textTransform: "none" }}
                  sx={{
                    mb: 8,
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
                >
                  <span className="lexend-font">Donate</span>
                </Button>

                <Button
                  onClick={() => {
                    setFourthIsVisible(false);
                    setFifthIsVisible(true);
                  }}
                  className="self-center  w-[50%]"
                  /* w-full md:w-50% */
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
                >
                  <img src="supporters/right_arrow.svg" className="mr-2" />{" "}
                  <span className="lexend-font">{t("campaign.content23")}</span>
                </Button>

                <Button
                  onClick={() => {
                    setPayWithCreditCard(false);
                  }}
                  className="self-center  w-[50%]"
                  /* w-full md:w-50% */
                  style={{ textTransform: "none" }}
                  sx={{
                    mt: 1,
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
                >
                  <img src="supporters/left_arrow.svg" className="mr-2" />{" "}
                  <span className="lexend-font">{t("campaign.content94")}</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbar}
          severity={snackbarStatus}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export { SupporterFourthPart };
