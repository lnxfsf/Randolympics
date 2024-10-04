import { ThemeProvider } from "@mui/material/styles";
import theme from "../../themes/theme";
import { QueryProvider } from "../../QueryProvider";
import DonationForm from "../Payments/DonationForm";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import DonationFormItemCampaign from "../Payments/DonationFormItemCampaign";
import { PaymentPage } from "../Supporters/PaymentPage";
import AuthCode from "react-auth-code-input";

import { useTranslation } from "react-i18next";

import { useEffect, useState, useRef } from "react";

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
  const [amount, setAmount] = useState(10);
  const { t } = useTranslation();


  return (
    <>
      <div
        className="lexend-font text-black_second  flex  flex-col justify-start  rounded-2xl p-6 md:p-8 w-full "
        style={{ boxShadow: "4px 4px 10px 0px #0000001A" }}
      >
        <p className="font-bold text-xl md:text-2xl">{t("campaign.content70")}</p>

        <div className="flex justify-between mt-4">
          <div>
            <p className="text-[#616673]">{t("campaign.content71")}</p>
            <p className="text-xl font-medium">
              ${athlete.donatedAmount / 100}
            </p>
          </div>


           {viewFullActivity && (
            <>
              <div>
              <p className="text-[#616673]">{t("campaign.content72")}</p>
            <p className="text-xl font-medium">
              {howManySupporters}
            </p>

              </div>
            </>
          )} 


          <div>
            <p className="text-[#616673]">{t("campaign.content73")}</p>
            <p className="text-xl font-medium">{campaign.supporterName}</p>
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
            id="join-the-fun-btn"
          >
            <span className="lexend-font">
              {wantToDonate ? "Cancel" : "Donate"}
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

              <div className=" mt-4 flex flex-col w-full h-auto   rounded-lg  justify-center items-center">
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

              <div className="m-4 flex justify-center  items-center flex-col">
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
          </>
        )}
      </div>
    </>
  );
};

export { DonatePart };
