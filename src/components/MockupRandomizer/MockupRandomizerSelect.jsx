import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import { useTranslation } from "react-i18next";

const MockupRandomizerSelect = ({
  setSelectedGender,
  selectedGender,
  setSelectedWeightCategory,
  selectedWeightCategory,
  checkBeforeRandomize,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex w-full p-4 md:w-[50%] 2xl:w-[30%]  mt-8 text-black_second lexend-font flex-col ">
          <p className="text-xl md:text-2xl font-medium ">{t("mockupRandomizer.select16")}</p>

          {/* gender */}
          <div className="flex w-full gap-4 mt-4 ">
            <div
              onClick={() => {
                setSelectedGender("M");
              }}
              className={`border-2 ${
                selectedGender === "M"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedGender === "M" ? (
                <>
                  <img
                    src="/randomizer/male_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/male.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedGender === "M"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2 `}
              >
                {t("mockupRandomizer.select1")}
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedGender("F");
              }}
              className={`border-2 ${
                selectedGender === "F"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedGender === "F" ? (
                <>
                  <img
                    src="/randomizer/female_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/female.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedGender === "F"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                {t("mockupRandomizer.select2")}
              </p>
            </div>
          </div>
        </div>

        {/* weight category */}
        <div className="flex w-full p-4  md:w-[50%] 2xl:w-[30%] mt-8 text-black_second lexend-font flex-col ">
          <div className="flex justify-between">
            <p className="text-xl md:text-2xl font-medium ">
              {t("mockupRandomizer.select3")}
            </p>

            
          </div>

          <div className="flex w-full gap-4 mt-4 ">
            <div
              onClick={() => {
                setSelectedWeightCategory("light");
              }}
              className={`border-2 ${
                selectedWeightCategory === "light"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedWeightCategory === "light" ? (
                <>
                  <img
                    src="/randomizer/light_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/light.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedWeightCategory === "light"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                {t("mockupRandomizer.select11")}
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedWeightCategory("medium");
              }}
              className={`border-2 ${
                selectedWeightCategory === "medium"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedWeightCategory === "medium" ? (
                <>
                  <img
                    src="/randomizer/medium_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/medium.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedWeightCategory === "medium"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                {t("mockupRandomizer.select12")}
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedWeightCategory("heavy");
              }}
              className={`border-2 ${
                selectedWeightCategory === "heavy"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedWeightCategory === "heavy" ? (
                <>
                  <img
                    src="/randomizer/heavy_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/heavy.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedWeightCategory === "heavy"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                {t("mockupRandomizer.select13")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  justify-center items-center m-8">
        <div className=" md:w-[50%] w-[100%] 2xl:w-[30%] ">
          <Button
            onClick={checkBeforeRandomize}
            className="w-full "
            style={{ textTransform: "none" }}
            sx={{
              height: "50px",
              bgcolor: "#BDFCC9",

              color: "#fff",
              borderRadius: 3,
              border: `1px solid #BDFCC9`,
              "&:hover": {
                background: "rgba(189, 252, 201, 1)",
                color: "white",
                border: `1px solid rgba(189, 252, 201, 1)`,
              },
            }}
            id="randomize-btn"
          >
            <span className="lexend-font text-black_second">
              {t("mockupRandomizer.select14")}
            </span>
          </Button>

          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="w-full "
            style={{ textTransform: "none" }}
            sx={{
              mt: 1,
              height: "50px",
              bgcolor: "#fff",
              color: "#444444",
              borderRadius: 3,
              border: `1px solid #444444`,
              "&:hover": {
                background: "rgba(210, 73, 73, 1)",
                color: "white",
                border: `1px solid rgba(210, 73, 73, 1)`,
              },
            }}
            
          >
            <img src="supporters/left_arrow.svg" className="mr-2" />{" "}
            <span className="lexend-font ">
              {t("mockupRandomizer.select15")}
            </span>
          </Button>


<div className="w-full flex items-center justify-center mt-4 flex-col lexend-font">
            <p className="  text-center ">{t("mockupRandomizer.content11")}</p>
          <Popup
              trigger={
                  <p className=" text-red_second cursor-pointer text-center">{t("mockupRandomizer.content12")}</p>
               /*  <img
                  src="/randomizer/info.svg"
                  className="cursor-pointer select-none"
                /> */

                
              }
              position="right center"
              className="popup-content "
              modal
              closeOnDocumentClick
            >
              <div className="p-4">
                <div>
                  <p className="text-2xl md:text-3xl  lexend-font text-black_second text-center font-bold">
                    {t("mockupRandomizer.select4")}
                  </p>
                </div>

                <div className="flex flex-col  lexend-font text-black_second text-start font-medium gap-2 mt-4 mb-4">
                  <p className="text-xl md:text-2xl  lexend-font text-black_second text-start font-bold">
                    {t("mockupRandomizer.select1")}
                  </p>

                  <p>{t("mockupRandomizer.select5")}</p>

                  <p>{t("mockupRandomizer.select6")}</p>

                  <p>{t("mockupRandomizer.select7")}</p>
                </div>

                <div className="w-full flex justify-center">
                  <hr className="w-[80%]" />
                </div>

                <div className="flex flex-col  lexend-font text-black_second text-start font-medium gap-2 mt-4">
                  <p className="text-xl md:text-2xl  lexend-font text-black_second text-start font-bold">
                    {t("mockupRandomizer.select2")}
                  </p>

                  <p>{t("mockupRandomizer.select8")}</p>

                  <p>{t("mockupRandomizer.select9")}</p>

                  <p>{t("mockupRandomizer.select10")}</p>
                </div>
              </div>
            </Popup>
            </div>

        </div>

        
      </div>
    </>
  );
};

export { MockupRandomizerSelect };
