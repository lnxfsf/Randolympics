import "../../styles/home.scoped.scss";
import { useTranslation } from "react-i18next";

const FifthScreenHomeNewDesign = () => {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-2xl md:text-4xl font-bold text-center lexend-font text-black_second mt-16 mb-16">
        {t("home.howItWorks.title1")}
      </p>

      <div className="flex justify-center w-full  m-4 flex-col md:flex-row ">
      
      
      {/*  min-[1536px]:w-[65%] max-[2000px]:w-[65%] */}

        <div className=" flex  w-[95%] lg:w-[80%]  2xl:w-[65%] min-[2001px]:w-[52%] lexend-font text-black_second ">

          <div className=" min-[890px]:basis-1/2 flex justify-start flex-col  p-2  md:p-16 grow ">
            <div className="flex">
              <div className="flex flex-col items-start justify-start mb-4 w-full">
                <p className="text-2xl font-bold">Nominations</p>

                <p className=" font-medium text-red_second">In Progress!</p>
                <p>
                  Nominate a friend, family member, or even a celebrity for the Randolympics
                </p>
                
              </div>
            </div>

            <div className="flex flex-col items-start justify-start  mb-4  ">
              <p className="text-2xl font-bold">Gather Support</p>

              <p className=" font-medium text-red_second">
                Start your campaign early!
              </p>
              <p>
                Spread the word early and take advantage!
                <br />
                Use social media to gather votes, shares, and donations for your
                nominee.
              </p>
              
            </div>

            <div className="flex flex-col items-start justify-start mb-4   ">
              <p className="text-2xl font-bold">National Randomization</p>

              <p className=" font-medium text-red_second">June 25th, 2026</p>
              <p>
                National Selection On June 25, 2026, top 50 men and 50 women are
                randomly chosen from each country to form national teams.
              </p>
              <p></p>
            </div>

            <div className="flex flex-col items-start justify-start mb-4   ">
              <p className="text-2xl font-bold">Randolympics Starts!</p>

              <p className=" font-medium text-red_second">
                July 8th to July 16th, 2028
              </p>
              <p>
                The competition in Stockholm starts! Every athlete will compete
                in 3-6 random sports. Let’s Make history!
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
