import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes/theme";
import { QueryProvider } from "../../QueryProvider";
import DonationForm from "../Payments/DonationForm";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { OutlinedInput, InputAdornment } from "@mui/material";

import DonationFormItemCampaign from "../Payments/DonationFormItemCampaign";
import { PaymentPage } from "../Supporters/PaymentPage";
import AuthCode from "react-auth-code-input";

import { useTranslation } from "react-i18next";

import { useEffect, useState, useRef } from "react";

import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

import axios from "axios";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const inputLabelPropsTextField = {
  sx: {
    // Styles when the input is not focused and has no value
    top: "0px", // Adjust this to move the label closer to the input
    left: "0px", // Adjust to control horizontal position
    "&.MuiInputLabel-shrink": {
      top: "0px", // Position when the label shrinks (focus or input has value)
      left: "0px",
    },
  },
};

const sxTextField = {
  width: "w-full",

  /*  "& .MuiInputBase-input": { height: 39, padding: 1 },
   */
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "white",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "black",
    },
  },
};

const DonatePart = ({
  wantToDonate,
  setWantToDonate,
  campaign,
  supporterName,
  setSupporterName,
  supporterEmail,
  setSupporterEmail,
  supporterComment,
  setSupporterComment,
  campaignId,
  discountCode,
  countryAthleteIsIn,
  athlete,
  setDiscountCode,
  donateWithCouponOnly,

  viewFullActivity,
  howManySupporters,
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
          countryAthleteIsIn,
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
        { discountCode, countryAthleteIsIn, amountOriginal: amount * 100 }
      );

      if (response.status !== 200) {
        setSnackbarStatus("error");
        setSnackbarMessage(error.response?.data?.message || error.message);
        setOpenSnackbar(true);

        return false;
      }

      return true;
    } catch (e) {
      setSnackbarStatus("error");
      setSnackbarMessage(error.response?.data?.message || error.message);
      setOpenSnackbar(true);

      console.log(e.stack);
      return false;
    }
  };

  const [amount, setAmount] = useState(10);
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

  useEffect(() => {}, [amount, discountCode]);

  return (
    <>
      <div
        className="lexend-font text-black_second  flex  flex-col justify-start  rounded-2xl p-6 md:p-8 w-full "
        style={{ boxShadow: "4px 4px 10px 0px #0000001A" }}
      >
        <p className="font-bold text-xl md:text-2xl">
          {t("campaign.content70")}
        </p>

        <div className="flex justify-between mt-4 mb-4 gap-4">
          <div className={`${viewFullActivity ? "basis-1/3" : "basis-1/2"}`}>
            <p className="text-[#616673]">{t("campaign.content71")}</p>
            <p className="text-xl font-medium break-all ">
              ${athlete.donatedAmount / 100}
            </p>
          </div>

          {viewFullActivity && (
            <>
              <div className="basis-1/3">
                <p className="text-[#616673]">{t("campaign.content72")}</p>
                <p className="text-xl font-medium break-all">
                  {howManySupporters}
                </p>
              </div>
            </>
          )}

          <div className={`${viewFullActivity ? "basis-1/3" : "basis-1/2"}`}>
            <p className="text-[#616673]">{t("campaign.content73")}</p>
            <p className="text-xl font-medium break-all">
              {campaign.supporterName}
            </p>
          </div>
        </div>

        <div className="flex mt-4">
          <Button
            onClick={() => {
              setWantToDonate((prev) => !prev);
            }}
            className="w-full "
            style={{ textTransform: "none", marginRight: "10px" }}
            sx={{
              p: 2,

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
              {wantToDonate ?  t("campaign.content129") : t("campaign.content17")}
            </span>
          </Button>
        </div>

        {wantToDonate && (
          <>
            <div className="flex flex-col ">
              <p className="lexend-font text-black_second text-sm mb-1 mt-2">
                {t("campaign.content74")}
              </p>
              <TextField
                value={supporterName}
                onChange={(event) => {
                  setSupporterName(event.target.value);
                }}
                placeholder="John"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />

              <p className="lexend-font text-black_second text-sm mb-1 mt-2">
                {t("campaign.content75")}
              </p>
              <TextField
                value={supporterEmail}
                onChange={(event) => {
                  setSupporterEmail(event.target.value);
                }}
                placeholder="example@gmail.com"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />

              <p className="lexend-font text-black_second text-sm mb-1 mt-2">
                {t("campaign.content76")}
              </p>
              <TextField
                value={supporterComment}
                onChange={(event) => {
                  setSupporterComment(event.target.value);
                }}
                placeholder={t("campaign.content77")}
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />

              {/*  <div className=" mt-4 flex flex-col w-full h-auto   rounded-lg  justify-center items-center">
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



              <div className=" w-full flex justify-center items-center">
                <div className="p-8 w-full sm:w-1/2 md:w-[60%]  ">
                  <PayPalButtons
                    /* key={`${amount}-${discountCode}`} 
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
                        /*   console.log(
                        `Transaction completed by ${details.payer.name.given_name}`
                      );
                       /
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
          supporterComment: supporterComment, /

                              transactionId: details.id,

                              supporterName,
                              supporterEmail,
                              supporterComment,
                              separateDonationThruPage: true,

                              discountCode: discountCode,
                              campaignId,
                              countryAthleteIsIn,
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
                    /* show only paypal button (not credit card) /
                    fundingSource={FUNDING.PAYPAL}
                  />
                </div>
              </div> */}

              <div className=" self-center w-[50%] mb-2 mt-8">
                <OutlinedInput
                  type="number"
                  value={amount}
                  onChange={(e) => {
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
                <span className="lexend-font">{t("campaign.content17")}</span>
              </Button>

              <div className="m-4  flex justify-center  items-center flex-col">
                <p>{t("campaign.content78")}</p>

                {/*   <input
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
                  inputClassName=" h-8 w-8 text-center  m-1 border-2 rounded-md"
                />

                <Button
                  className="m-2 p-2 "
                  onClick={donateWithCouponOnly}
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
                  <span className="lexend-font">{t("campaign.content79")}</span>
                </Button>
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
        )}
      </div>
    </>
  );
};

export { DonatePart };
