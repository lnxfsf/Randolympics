import "../../styles/home.scoped.scss";

import { useTranslation } from "react-i18next";

const FourthScreenHome = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col min-h-screen fourth_screen text-black_second lexend-font  p-8 md:p-16 justify-start">
        <div>
          <p className="text-3xl md:text-4xl font-bold mb-4">
            {t("home.economics.title1")}
          </p>

          <p className="font-medium text-lg md:text-xl mb-4 2xl:w-[44em]">
            {t("home.economics.subtitle1")}
            <br />
            {t("home.economics.subtitle2")}
          </p>
        </div>

        {/* explained incomes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="flex flex-col mt-8 justify-start items-start ">
            <div className="  flex flex-col justify-center items-center  competitionItem select-none mb-4">
              <img width={"30px"} height={"30px"} src="home/charityBox.svg" />
            </div>

            <p className="text-xl md:text-2xl font-semibold text-start mb-4">
              {t("home.economics.title2")}
            </p>

            <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
              {t("home.economics.content1")}
              <br />
              {t("home.economics.content2")}
            </p>

            <div className="flex gap-2 items-center cursor-pointer select-none">
              <img src="/home/right_arrow.svg" />
              <p className="font-bold text-red_second text-sm md:text-base">
                {t("home.economics.text1")}
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-8 justify-start items-start ">
            <div className="  flex flex-col justify-center items-center  competitionItem mb-4 select-none">
              <img width={"30px"} height={"30px"} src="home/radioTower.svg" />
            </div>

            <p className="text-xl md:text-2xl font-semibold text-start mb-4">
              {t("home.economics.title3")}
            </p>

            <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
              {t("home.economics.content3")} <br />
              {t("home.economics.content4")}
              <br />
              {t("home.economics.content5")}
              <br />
              {t("home.economics.content6")}
            </p>

            <div className="flex gap-2 items-center cursor-pointer select-none">
              <img src="/home/right_arrow.svg" />
              <p className="font-bold text-red_second text-sm md:text-base">
                {t("home.economics.text1")}
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-8 justify-start items-start ">
            <div className="  flex flex-col justify-center items-center  competitionItem  mb-4 select-none">
              <img width={"30px"} height={"30px"} src="home/newspaper.svg" />
            </div>

            <p className="text-xl md:text-2xl font-semibold text-center mb-4">
              {t("home.economics.title4")}
            </p>

            <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
              {t("home.economics.content7")}
              <br />
              {t("home.economics.content8")}
              <br />
              {t("home.economics.content9")}
            </p>

            <div className="flex gap-2 items-center cursor-pointer select-none">
              <img src="/home/right_arrow.svg" />
              <p className="font-bold text-red_second text-sm md:text-base">
                {t("home.economics.text1")}
              </p>
            </div>
          </div>

          <div className="flex flex-col mt-8 justify-start items-start ">
            <div className="  flex flex-col justify-center items-center  competitionItem  mb-4 select-none">
              <img width={"30px"} height={"30px"} src="home/loans.svg" />
            </div>

            <p className="text-xl md:text-2xl font-semibold text-center mb-4">
              {t("home.economics.title5")}
            </p>

            <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
              {t("home.economics.content10")}
              <br />
              {t("home.economics.content11")}
            </p>

            <div className="flex gap-2 items-center cursor-pointer select-none">
              <img src="/home/right_arrow.svg" />
              <p className="font-bold text-red_second text-sm md:text-base">
                {t("home.economics.text1")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { FourthScreenHome };
