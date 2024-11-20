import "../../styles/home.scoped.scss";
import { useTranslation } from "react-i18next";

const FifthScreenHomeOld = () => {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-2xl md:text-4xl font-bold text-center lexend-font text-black_second mt-16 mb-16">
        {t("home.howItWorks.title1")}
      </p>
      

      <div className="flex w-full lexend-font text-black_second ">
        <div className="min-[890px]:basis-1/2 flex justify-start flex-col  p-2  md:p-16">
          <div className="flex">
            {/*  <div className="ml-[4rem] mr-8 flex items-start">
                     <img src="/home/startProgressContainer.svg" className="h-32" />
                </div> */}

            <div class="custom-border ml-4 md:ml-[4rem] mr-8 mb-5 flex">
              <div class="dot"></div>

              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start end_text_games  ">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title2")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title3")}</p>
            </div>
          </div>

          {/* second */}
          <div className="flex ">
            {/*   <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                    <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
                </div> */}

            <div class="custom-border ml-4 md:ml-[4rem] mr-8 flex mb-5 ">
              <div class="dot"></div>

              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start   text_games   ">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title4")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title5")}</p>
            </div>
          </div>

          {/* third */}
          <div className="flex justify-start items-start ">
            {/*  <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
            </div> */}

            <div class="custom-border ml-4 md:ml-[4rem] mr-8 flex mb-5">
              <div class="dot"></div>
              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start  text_games ">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title6")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title7")}</p>
            </div>
          </div>

          {/* fourth */}
          <div className="flex">
            <div class="custom-border2 ml-4 md:ml-[4rem] mr-8 flex ">
              <div class="dot"></div>
              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start text_games">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title8")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title9")}</p>
            </div>
          </div>

          {/* fifth */}
          <div className="flex">
            <div class="custom-borderEnd ml-4 md:ml-[4rem] mr-8 flex ">
              <div class="dot3"></div>
              {/*  <div class="dash"></div> */}
            </div>
          </div>

          <div className="flex">
            <div class=" ml-4 md:ml-[4rem] mr-8 flex ">
              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start end_text_games">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title10")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title11")}</p>
            </div>
          </div>
        </div>

        <div className="hidden min-[890px]:flex basis-1/2 flex-col justify-start gap-4  m-16 ">
          <img src="/home/home1.png" className="w-[40%] " />

          <img src="/home/home2.png" className=" w-[40%]" />

          <img src="/home/home3.png" className=" w-[40%]" />
        </div>
      </div>
    </>
  );
};

export { FifthScreenHomeOld };
