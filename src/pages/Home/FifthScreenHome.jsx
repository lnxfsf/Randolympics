import "../../styles/home.scoped.scss";
import { useTranslation } from "react-i18next";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const FifthScreenHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>

    <div className="bg-black_second w-full mb-16">

      <p className="text-2xl md:text-4xl font-bold text-center pt-8 pb-8 lexend-font text-[#fff] ">
        {t("home.howItWorks.title1")}
      </p>

      <div className="flex w-full lexend-font text-[#fff] ">
       
      <div className="hidden  lg:basis-1/3 xl:basis-1/3 m-12 justify-center items-center lg:block 2xl:m-16  container_first_screen min-h-screen">
          <img src="/home/golf.png" className="image_first_screen rounded-xl" />
        </div>
       
       
        <div className="grow min-[890px]:basis-1/2 flex justify-start flex-col  p-2  md:p-16">
         

         {/* first */}
          <div className="flex">
            {/*  <div className="ml-[4rem] mr-8 flex items-start">
                     <img src="/home/startProgressContainer.svg" className="h-32" />
                </div> */}

{/*    */}
            <div class="custom-border1 ml-4 md:ml-16 lg:ml-[4rem] mr-8 mb-5 flex">
              <div class="dot"></div>

              {/*  <div class="dash"></div> */}
            </div>



            <div className="flex flex-col items-start justify-start end_text_games  ">
              <p className="text-2xl font-bold text-red_second">
                {t("home.howItWorks.title2")}
              </p>

              <p className="text-xl font-bold">{t("home.howItWorks.title3")}</p>
              <p className="font-normal">{t("home.howItWorks.content1")}</p>
            

              <Button
              onClick={()=>{navigate("/supporters")}}
                className="w-full "
                style={{marginTop: "20px", textTransform: "none" }}
                sx={{
                  height: "45px",
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
                type="submit"
                variant="text"
               
              >
              
                <span className="lexend-font font-semibold">
                {t("home.howItWorks.content4")}
                </span>
              </Button>
              


            </div>

          </div>

          {/* second */}
          <div className="flex ">
            {/*   <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                    <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
                </div> */}

            <div class="custom-border3 ml-4 md:ml-[4rem] mr-8 flex mb-5 ">
              <div class="dot"></div>

              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start   text_games   ">
              <p className="text-2xl font-bold text-red_second">
                {t("home.howItWorks.title4")}
              </p>

              <p className="text-xl font-bold">{t("home.howItWorks.title5")}</p>
              <p>{t("home.howItWorks.content2")}</p>
            </div>
          </div>

          {/* third */}
        {/*   <div className="flex justify-start items-start ">
            {/*  <div className="ml-[3.72rem] mr-8 flex items-start h-32">
                <img src="/home/centreProgressContainer.svg" className="h-[100%]" />
            </div> 

            <div class="custom-border ml-4 md:ml-[4rem] mr-8 flex mb-5">
              <div class="dot"></div>
              {/*  <div class="dash"></div> 
            </div>

            <div className="flex flex-col items-start justify-start  text_games ">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title6")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title7")}</p>
            </div>
          </div> */}

          {/* fourth */}
          <div className="flex">
            <div class="custom-border4 ml-4 md:ml-[4rem] mr-8 flex ">
              <div class="dot"></div>
              {/*  <div class="dash"></div> */}
            </div>

            <div className="flex flex-col items-start justify-start text_games">
              <p className="text-2xl font-bold text-red_second">
                {t("home.howItWorks.title8")}
              </p>

              <p className="text-xl font-bold">{t("home.howItWorks.title9")}</p>

              <p>{t("home.howItWorks.content3")}</p>
            
            

              <Button
              onClick={()=>{navigate("/randomize")}}
                className="w-full "
                style={{marginTop: "20px", textTransform: "none" }}
                sx={{
                  height: "45px",
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
                type="submit"
                variant="text"
               
              >
              
                <span className="lexend-font font-semibold">
                {t("home.howItWorks.content5")}
                </span>
              </Button>
            
            </div>
          </div>

          {/* fifth */}
       {/*    <div className="flex">
            <div class="custom-borderEnd ml-4 md:ml-[4rem] mr-8 flex ">
              <div class="dot3"></div>
            
            </div>
          </div>

          <div className="flex">
            <div class=" ml-4 md:ml-[4rem] mr-8 flex ">
              {/*  <div class="dash"></div> 
            </div>

            <div className="flex flex-col items-start justify-start end_text_games">
              <p className="text-2xl font-bold">
                {t("home.howItWorks.title10")}
              </p>

              <p className=" font-bold">{t("home.howItWorks.title11")}</p>
            </div>
          </div>
 */}



        </div>

      {/*   <div className="hidden min-[890px]:flex basis-1/2 flex-col justify-start gap-4  m-16 ">
          <img src="/home/home1.png" className="w-[40%] " />

          <img src="/home/home2.png" className=" w-[40%]" />

          <img src="/home/home3.png" className=" w-[40%]" />
        </div> */}



      </div>

      </div>
    </>
  );
};

export { FifthScreenHome };
