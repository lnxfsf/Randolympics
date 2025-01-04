import "../../styles/home.scoped.scss";
import { useTranslation } from "react-i18next";


const FifthScreenHomeNewDesign = () => {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-2xl md:text-4xl font-bold text-center lexend-font text-black_second mt-16 mb-16">
        {t("home.howItWorks.title1")}
      </p>

      <div className="flex justify-center w-full flex-col md:flex-row ">
        {/*  min-[1536px]:w-[65%] max-[2000px]:w-[65%] */}

        <div className=" flex  w-[95%] lg:w-[80%]  2xl:w-[65%] min-[2001px]:w-[52%] lexend-font text-black_second ">
          <div className=" min-[890px]:basis-1/2 flex justify-start flex-col  p-2  md:p-16 grow ">
            <div className="flex">
              <div className="flex flex-col items-start justify-start mb-4 w-full">
                <p className="text-2xl font-bold">{t("home.howItWorks.content6")}</p>

                <p className=" font-medium text-red_second">{t("home.howItWorks.content7")}</p>
                <p>{t("home.howItWorks.content8")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start  mb-4  ">
              <p className="text-2xl font-bold">{t("home.howItWorks.content9")}</p>

              <p className=" font-medium text-red_second">
              {t("home.howItWorks.content10")}
              </p>
              <p>
              {t("home.howItWorks.content11")}
                <br />
                {t("home.howItWorks.content12")}
              </p>
            </div>

            <div className="flex flex-col items-start justify-start mb-4   ">
              <p className="text-2xl font-bold">{t("home.howItWorks.content13")}</p>

              <p className=" font-medium text-red_second">{t("home.howItWorks.content14")}</p>
              <p>{t("home.howItWorks.content15")}
              </p>
              <p></p>
            </div>

            <div className="flex flex-col items-start justify-start mb-4   ">
              <p className="text-2xl font-bold">{t("home.howItWorks.content16")}</p>

              <p className=" font-medium text-red_second">
              {t("home.howItWorks.content17")}
              </p>
              <p> {t("home.howItWorks.content18")}
                
              </p>
              <p></p>
            </div>











          </div>

          <div className="hidden min-[890px]:flex basis-1/2 flex-col justify-start gap-4  m-16 ">
            {/*   className="w-[65%] xl:w-[45%] 2xl:w-[35%] "  */}
            <img
              src="/home/home1.jpg"
              className="w-[65%] xl:w-[45%] 2xl:w-[35%] "
            />

            <img
              src="/home/home2.jpg"
              className=" w-[65%] xl:w-[45%] 2xl:w-[35%]"
            />

            <img
              src="/home/home3.jpg"
              className=" w-[65%] xl:w-[45%] 2xl:w-[35%]"
            />





          </div>





        </div>
      </div>
    </>
  );
};

export { FifthScreenHomeNewDesign };
