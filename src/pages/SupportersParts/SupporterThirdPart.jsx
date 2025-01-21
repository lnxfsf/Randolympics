import React, { useState, useEffect, useRef, useContext } from "react";

import { Button } from "@mui/material";

import axios from "axios";

import AuthContext from "../../context/AuthContext";

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

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InformAdditionalSupporter } from "./InformAdditionalSupporter";

import { useTranslation } from "react-i18next";
import { createdCampaignSuccess } from "../../utils/facebookPixelEvent";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

const SupporterThirdPart = ({
  thirdIsVisible,
  friendName,
  supporterName,
  setSupporterName,
  supporterEmail,
  setSupporterEmail,
  inputLabelPropsTextField,
  sxTextField,
  supporterPhone,
  setSupporterPhone,
  supporterPassword,
  setSupporterPassword,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  supporterComment,
  setSupporterComment,
  additionalSupportersFormData,
  handleInputChange,
  removeInputSet,
  addInputSet,
  setSecondIsVisible,
  setThirdIsVisible,
  validateSupporter,
  isCelebrity,
}) => {
  const { t } = useTranslation();

  let { user } = useContext(AuthContext);

  // if there's signed up user, then use his Name, Email, and Phone (if exists), in account he's currently logged in
  if (user) {
    let tokens = JSON.parse(
      localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens")
    );

    setSupporterName(tokens.data.name);
    setSupporterEmail(tokens.data.email);
    setSupporterPhone(tokens.data.phone);
  }

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col first-content-container ${
          thirdIsVisible ? "show" : "hide"
        } `}
      >
        <div className="flex items-start  justify-start md:justify-center w-full min-h-screen">
          <div className="basis-1/2  justify-start items-start hidden lg:block 2xl:m-32 image-container min-h-screen">
            <img
              src={isCelebrity ? "/supporters/3.jpg" : "supporters/2.jpg"}
              className="image_supporter"
            />
          </div>

          <div className="basis-1/2 flex flex-wrap flex-col  justify-start md:justify-center  items-start md:items-center lg:items-start m-8 md:m-16 text-black_second grow">
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
                  style={{ backgroundColor: "#ffeaea", borderRadius: "50%" }}
                  className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                >
                  <p className="text-sm font-bold text-[#D24949]">2</p>
                </div>

                <p className="text-sm font-medium text-center mt-3 text-[#D24949] ">
                  {t("campaign.content17")}
                </p>
              </div>

              <div className="flex flex-col items-center w-15">
                <div
                  style={{ backgroundColor: "#F5F5F5", borderRadius: "50%" }}
                  className=" w-10 h-10 flex justify-center items-center select-none cursor-pointer"
                >
                  <p className="text-sm font-bold text-[#82889E]">3</p>
                </div>

                <p className="text-sm font-medium text-center mt-3 text-[#82889E] ">
                  {t("campaign.content18")}
                </p>
              </div>
            </div>

            <p className="text-2xl text-center mt-8 mb-12 font-bold text-black_second lexend-font">
              {t("campaign.content46")} {friendName}
            </p>

            {/* main fields */}
            <div className="flex flex-col w-full">
              {!user && (
                <>
                  <label
                    htmlFor="name"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content47")} *
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={supporterName}
                      onChange={(e) => {
                        setSupporterName(e.target.value);
                      }}
                      placeholder="John"
                      id="name"
                      name="name"
                      type="text"
                      inputProps={{
                        maxLength: 30,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />
                  </div>

                  <label
                    htmlFor="supporterEmail"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content48")}
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={supporterEmail}
                      onChange={(e) => {
                        setSupporterEmail(e.target.value);
                      }}
                      id="supporterEmail"
                      placeholder="johndoe@gmail.com"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />
                  </div>

                  <label
                    htmlFor="supporterPhone"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content49")}
                  </label>
                  <div className="flex flex-col justify-start">
                    <TextField
                      value={supporterPhone}
                      onChange={(e) => {
                        setSupporterPhone(e.target.value);
                      }}
                      placeholder="+1 425 555 0123"
                      type="text"
                      id="supporterPhone"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />
                  </div>

                  <label
                    htmlFor="pass"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    {t("campaign.content50")}
                  </label>
                  <TextField
                    value={supporterPassword}
                    onChange={(event) => {
                      setSupporterPassword(event.target.value);
                    }}
                    placeholder="********"
                    id="pass"
                    name="pass"
                    type={showPassword ? "text" : "password"}
                    sx={sxTextField}
                    InputProps={{
                      maxLength: 255,

                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={t("campaign.content51")}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}

              <label
                htmlFor="supporterComment"
                className="lexend-font mb-1 mt-1 font-medium text-sm"
              >
                {t("campaign.content52")}
              </label>
              <TextField
                value={supporterComment}
                onChange={(e) => {
                  setSupporterComment(e.target.value);
                }}
                placeholder={t("campaign.content126")}
                id="supporterComment"
                name="name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />

              <p className="text-xl text-start mt-6 mb-1 text-black_second font-semibold lexend-font">
                {t("campaign.content53")}
              </p>

              {additionalSupportersFormData &&
                additionalSupportersFormData.length > 0 && (
                  <>
                    <p className="lexend-font text-sm mb-6">
                      {t("campaign.content124")}{" "}
                      {/*   {additionalSupportersFormData.some(
                        (supporter) => supporter.name?.trim() === ""
                      ) === ""
                        ? "0"
                        : additionalSupportersFormData.filter(
                            (supporter) => supporter.name?.trim() !== ""
                          ).length }{"/50"}{" "}  */}
                      {(() => {
                        const validSupportersCount =
                          additionalSupportersFormData?.filter(
                            (supporter) => supporter.name?.trim() !== ""
                          ).length || 0;

                        if (validSupportersCount > 0) {
                          return `${validSupportersCount}/50`;
                        } else {
                          return "0";
                        }
                      })()}{" "}
                      {t("campaign.content125")}{" "}
                    </p>
                  </>
                )}

              {/* inform additional supporters */}

              <InformAdditionalSupporter
                additionalSupportersFormData={additionalSupportersFormData}
                handleInputChange={handleInputChange}
                removeInputSet={removeInputSet}
                addInputSet={addInputSet}
                inputLabelPropsTextField={inputLabelPropsTextField}
                sxTextField={sxTextField}
              />
            </div>

            <div className="flex flex-col gap-2 w-full mt-8">
              <Button
                onClick={validateSupporter}
                className="w-full md:w-50%"
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
                  window.scrollTo(0, 0);
                  
                  createdCampaignSuccess();

                  
                  setSecondIsVisible(true);
                  setThirdIsVisible(false);

                

                

                }}
                className="w-full md:w-50%"
                style={{ textTransform: "none" }}
                sx={{
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
                <span className="lexend-font">{t("campaign.content37")}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { SupporterThirdPart };
