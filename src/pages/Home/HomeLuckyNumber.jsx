import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import {useState} from "react";

const HomeLuckyNumber = () => {
  const { t } = useTranslation();


  const [luckyNumber, setLuckyNumber] = useState();
  const [score, setScore] = useState(2);


  

  const finalResult = (luckyNum) => {

    const amount = 100;
    const supporters = 10;

    setScore((amount*supporters*luckyNum).toFixed(2)); 

  }

  const generateLuckyNumber = () => {

    // between 1 and 4
    const newRandomNumber = Math.random() * (4-1) + 1;

    setLuckyNumber(newRandomNumber.toFixed(8));

    finalResult(newRandomNumber);
  }




  return (
    <>
      <div className="flex items-center lexend-font text-black_second flex-col mt-8 p-8">
        <p className="text-3xl md:text-4xl font-bold  text-center">
          {t("home.howItWorks.content19")}
        </p>

        <p className="mt-4">{t("home.howItWorks.content20")}</p>

        <Button
          onClick={generateLuckyNumber}
          className="self-center   w-[50%] "
          /* w-full md:w-50% */
          style={{ textTransform: "none" }}
          sx={{
            mt: 5,
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
          <span className="lexend-font">{t("home.howItWorks.content21")}</span>
        </Button>



          <div className={`mt-8 ${luckyNumber ? "flex" : "hidden"} flex-col items-center gap-4 `}>
            <p className="text-3xl md:text-4xl text-red_second ">{t("home.howItWorks.content22")}{" "}{luckyNumber}</p>

            <p>{t("home.howItWorks.content23")}<span className="text-red_second">{t("home.howItWorks.content24")}</span> {t("home.howItWorks.content25")} <span className="text-red_second">{t("home.howItWorks.content26")}</span>{t("home.howItWorks.content27")}<span className="text-red_second">{luckyNumber}</span> = <span className="text-red_second">{score}</span>{t("home.howItWorks.content28")}</p>
          </div>


      </div>
    </>
  );
};

export { HomeLuckyNumber };
