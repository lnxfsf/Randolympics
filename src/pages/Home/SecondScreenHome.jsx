import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {useTranslation} from "react-i18next";


const SecondScreenHome = ({ sectionRef }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (


    <> 
    
    <div className="flex justify-center  mt-12">  
      

      <p ref={sectionRef}  className="text-3xl md:text-4xl font-bold text-black_second lexend-font text-center">
      {t('home.secondScreen.title3')}
      </p>
    </div>



      {/* min-h-screen */}
      <div className="flex h-auto mt-6 p-8 lg:p-16 text-black_second lexend-font gap-8">
        <div className="lg:basis-1/2 flex items-center justify-end">
       
          <div className=" 2xl:basis-1/2">
            {/* // lg:p-12 */}

            <p className="text-2xl md:text-4xl font-bold mb-4">
            {t('home.secondScreen.title1')} <br />
            {t('home.secondScreen.title2')}
            </p>

            <p className="font-medium mb-1">
            {t('home.secondScreen.content1')}
            </p>

            
              <p className="font-medium text-base mb-1">
              {t('home.secondScreen.content2')}
                
              </p>

              <p className="font-medium text-base mb-1">
              {t('home.secondScreen.content3')}
                
              </p>

              <p className="font-medium text-base mb-1">
              {t('home.secondScreen.content4')}
                
              </p>

              <p className="font-medium text-base mb-1">
              {t('home.secondScreen.content5')}
                
              </p>
           

            {/* buttons */}

            <div className="flex gap-4 mt-8 ">
              <Button
                onClick={() => {
                  navigate("/supporters");
                }}
                className="w-full  "
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
                variant="text"
              >
                <span className="lexend-font font-semibold">
                {t('home.secondScreen.button1')}
                </span>
              </Button>

            {/*   <Button
                onClick={() => {
                  navigate("/login");
                }}
                className="w-full  "
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
                variant="text"
              >
                <span className="lexend-font font-semibold">{t('home.secondScreen.button2')}</span>
              </Button> */}
            </div>
          </div>
        </div>

        <div className="hidden basis-1/2 lg:flex justify-start items-center ">
          <img src="/home/free_flights.jpg" className="w-full 2xl:w-[40%] rounded-2xl" />
        </div>
      </div>
    </>
  );
};

export { SecondScreenHome };
