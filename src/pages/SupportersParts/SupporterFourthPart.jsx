import React, { useState, useEffect, useRef } from "react";

import { Button } from "@mui/material";
import AuthCode from "react-auth-code-input";

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

import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation();

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
                  {t("campaign.content15")}
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

            {/* and this is for those 3 options */}
            <p className="mt-4 font-semibold w-full text-center">
              {t("campaign.content20")}
            </p>

            <div className="flex justify-center mt-6 mb-6 gap-4 w-full">
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
                  setAmount(10);
                }}
                style={{
                  backgroundColor: ` ${
                    amount === 10 ? "#FFEAEA" : "transparent"
                  }`,
                }}
              >
                {/*  <img className="w-8 " src="supporters/10_dollars.svg" /> */}
                <p className="text-black_second font-semibold lexend-font">
                  10 $
                </p>
              </div>

              <div
                className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-18 border-red_second"
                onClick={() => {
                  setAmount(100);
                }}
                style={{
                  backgroundColor: ` ${
                    amount === 100 ? "#FFEAEA" : "transparent"
                  }`,
                }}
              >
                {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
                <p className="text-black_second font-semibold lexend-font">
                  100 $
                </p>
              </div>
            </div>

            <div className="flex  flex-col justify-center items-center w-full">
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

            <div className=" mt-8 flex items-center justify-center flex-col w-full">
              <p className="font-semibold w-full text-center">
                {t("campaign.content21")}
              </p>
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
                onClick={donateWithCouponOnly}
                className="m-2 p-2 "
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
                id="join-the-fun-btn"
              >
                <span className="lexend-font">{t("campaign.content22")}</span>
              </Button>
            </div>

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
              id="join-the-fun-btn"
            >
              <img src="supporters/right_arrow.svg" className="mr-2" />{" "}
              <span className="lexend-font">{t("campaign.content23")}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export { SupporterFourthPart };
