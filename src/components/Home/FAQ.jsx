import React, { useState, useEffect } from "react";

import { Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQComponent } from "./FAQComponent";
import { useTranslation } from "react-i18next";

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "5px",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more

const FAQ = () => {
  const { t } = useTranslation();

  const [expandedFirstText, setExpandedFirstText] = useState(false);
  const [expandedSecondText, setExpandedSecondText] = useState(false);
  const [expandedThirdText, setExpandedThirdText] = useState(false);
  const [expandedFourthText, setExpandedFourthText] = useState(false);

  return (
    <>
      <div
        className="flex justify-center items-center  flex-col lexend-font text-black_second "
        data-aos="fade-up"
        id="FAQ"
      >
        <p className="text-2xl md:text-4xl text-red_second mt-8 mb-4  ">
          <b>{t("home.faq.title1")}</b>
        </p>

        <div className="w-[90%]  md:w-1/2">
          {/* <div className=" flex justify-around items-center w-full bg-black_first">
           */}

          {/* prvi */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedFirstText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-4`}
          >
            <p
            /*   expand={expandedFirstText} */
              onClick={() => {
                setExpandedFirstText(!expandedFirstText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second  "
            >
              {t("home.faq.CFR.title1")}
            </p>

            <ExpandMore
              expand={expandedFirstText}
              onClick={() => {
                setExpandedFirstText(!expandedFirstText);
              }}
              aria-expanded={expandedFirstText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>

          <div className="">
            <Collapse in={expandedFirstText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title={t("home.faq.CFR.title2")}
                  content={t("home.faq.CFR.content1")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title3")}
                  content={t("home.faq.CFR.content2")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title5")}
                  content={t("home.faq.CFR.content3")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title6")}
                  content={t("home.faq.CFR.content4")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title7")}
                  content={t("home.faq.CFR.content5")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title8")}
                  content={t("home.faq.CFR.content6")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title9")}
                  content={t("home.faq.CFR.content7")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title10")}
                  content={t("home.faq.CFR.content8")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title11")}
                  content={t("home.faq.CFR.content9")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title12")}
                  content={t("home.faq.CFR.content10")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title13")}
                  content={t("home.faq.CFR.content11")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title14")}
                  content={t("home.faq.CFR.content12")}
                />

                <FAQComponent
                  title={t("home.faq.CFR.title15")}
                  content={t("home.faq.CFR.content13")}
                />
              </div>
            </Collapse>
          </div>

          {/* drugi  */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedSecondText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-2`}
          >
            <p
              /* expand={expandedSecondText} */
              onClick={() => {
                setExpandedSecondText(!expandedSecondText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second "
            >
              {t("home.faq.EC.title1")}
            </p>

            <ExpandMore
              expand={expandedSecondText}
              onClick={() => {
                setExpandedSecondText(!expandedSecondText);
              }}
              aria-expanded={expandedSecondText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
          <div className="">
            <Collapse in={expandedSecondText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title={t("home.faq.EC.title16")}
                  content={t("home.faq.EC.content14")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title16")}
                  content={t("home.faq.EC.content14")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title18")}
                  content={t("home.faq.EC.content16")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title19")}
                  content={t("home.faq.EC.content17")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title20")}
                  content={t("home.faq.EC.content18")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title21")}
                  content={t("home.faq.EC.content19")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title22")}
                  content={
                    <>
                      {<p>{t("home.faq.EC.content20")}</p>}

                      {<p>{t("home.faq.EC.content21")}</p>}
                      {<p>{t("home.faq.EC.content22")}</p>}
                      {<p>{t("home.faq.EC.content23")}</p>}
                    </>
                  }
                />

                <FAQComponent
                  title={t("home.faq.EC.title23")}
                  content={t("home.faq.EC.content24")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title24")}
                  content={t("home.faq.EC.content25")}
                />

                <FAQComponent
                  title={t("home.faq.EC.title25")}
                  content={t("home.faq.EC.content26")}
                />
              </div>
            </Collapse>
          </div>

          {/* treci  */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedThirdText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-2`}
          >
            <p
             /*  expand={expandedThirdText} */
              onClick={() => {
                setExpandedThirdText(!expandedThirdText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second  "
            >
              {t("home.faq.SPM.title1")}
            </p>

            <ExpandMore
              expand={expandedThirdText}
              onClick={() => {
                setExpandedThirdText(!expandedThirdText);
              }}
              aria-expanded={expandedThirdText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
          <div className="">
            <Collapse in={expandedThirdText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title={t("home.faq.SPM.title26")}
                  content={t("home.faq.SPM.content27")}
                />

                <FAQComponent
                  title={t("home.faq.SPM.title27")}
                  content={t("home.faq.SPM.content28")}
                />

                <FAQComponent
                  title={t("home.faq.SPM.title28")}
                  content={t("home.faq.SPM.content29")}
                />

                <FAQComponent
                  title={t("home.faq.SPM.title29")}
                  content={t("home.faq.SPM.content30")}
                />

                <FAQComponent
                  title={t("home.faq.SPM.title30")}
                  content={t("home.faq.SPM.content31")}
                />

                <FAQComponent
                  title={t("home.faq.SPM.title31")}
                  content={t("home.faq.SPM.content32")}
                />
              </div>
            </Collapse>
          </div>

          {/* cetvrti  */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedFourthText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-2`}
          >
            <p
            /*   expand={expandedFourthText} */
              onClick={() => {
                setExpandedFourthText(!expandedFourthText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second "
            >
              {t("home.faq.LCG.title1")}
            </p>

            <ExpandMore
              expand={expandedFourthText}
              onClick={() => {
                setExpandedFourthText(!expandedFourthText);
              }}
              aria-expanded={expandedFourthText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
          <div className="">
            <Collapse in={expandedFourthText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title={t("home.faq.LCG.title32")}
                  content={t("home.faq.LCG.content33")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title33")}
                  content={t("home.faq.LCG.content34")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title34")}
                  content={t("home.faq.LCG.content35")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title35")}
                  content={t("home.faq.LCG.content36")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title36")}
                  content={t("home.faq.LCG.content37")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title37")}
                  content={t("home.faq.LCG.content38")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title38")}
                  content={t("home.faq.LCG.content39")}
                />

                <FAQComponent
                  title={t("home.faq.LCG.title39")}
                  content={t("home.faq.LCG.content40")}
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export { FAQ };
