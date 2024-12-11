import "../../styles/home.scoped.scss";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const sxTextField = {
  width: "100%",

  /*  "& .MuiInputBase-input": { height: 39, padding: 1 },
   */
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    fontFamily: "'Lexend', sans-serif",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "red",
  },
  "& .MuiInputLabel-root": {
    fontFamily: "'Lexend', sans-serif",

    "&.Mui-focused": {
      color: "black",
    },
  },
};

const SixthScreenHomeAnother = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className=" bg-red_third w-full m-4 mt-12 md:m-16 lg:w-[80%] 2xl:w-[60%] rounded-2xl flex lexend-font text-black_second">
          <div className="grow lg:basis-1/2 flex flex-col p-8 md:p-16 pl-6 md:pl-10  justify-center">
            <p className="text-2xl md:text-4xl font-bold">
              {t("home.sixthScreen.title3")}
            </p>

            <p className=" font-medium mt-4">{t("home.sixthScreen.text3")}</p>

            <div className="mt-2 mb-2 flex flex-col md:flex-row gap-2">
              {/* <TextField
                className="grow"
                /*  value={signUpEmail} */

                /*     onChange={(event) => {
                      setSupporterName(event.target.value);
                    }} 

                placeholder="example@email.com"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                sx={sxTextField}
              /> */}


{/* md:basis-1/2 */}
              <Button
              onClick={() => {
                navigate("/supporters");
              }}
                className="self-center w-full "
                /* w-full md:w-50% */
                style={{ textTransform: "none" }}
                sx={{
                  height: "50px",

                  bgcolor: "#A3D977",

                  color: "#fff",
                  borderRadius: 3,
                  border: `1px solid #A3D977`,
                  "&:hover": {
                    background: "rgba(163, 217, 119, 1)",
                    color: "white",
                    border: `1px solid rgba(163, 217, 119, 1)`,
                  },
                }}
                
              >
                <img src="supporters/right_arrow_black.svg" className="mr-2" />{" "}
                <span
                  className="lexend-font text-black_second"
                  
                >
                  {t("home.sixthScreen.btn2")}
                </span>
              </Button>
            </div>

          {/*   <p className="font-medium mt-2 text-xs md:text-sm">
            {t("home.sixthScreen.text1")}
              <span
                className="text-red_second cursor-pointer select-none"
                onClick={() => {
                  navigate("/ToS");
                }}
              >
                {t("home.sixthScreen.text2")}
              </span>
              .
            </p> */}
          </div>

          {/*  <div className="hidden md:basis-1/2 md:flex ">
                <img src="/home/join_us.jpg " className="rounded-r-2xl" />
            </div> */}

          <div className="hidden lg:basis-1/2  justify-center items-center lg:flex  container_join_us ">
            <img src="/home/join2.jpg" className="image_join_us rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export { SixthScreenHomeAnother };
