import { Footer } from "../components/Footer";
import { GridOfSportsHome } from "../components/Home/GridOfSportsHome";
import { Navbar } from "../components/Navbar";


import { useTranslation } from "react-i18next";



const Competitions = () => {


const { t } = useTranslation();



  return (
    <>
      <Navbar />

      <div className="lexend-font text-black_second m-8">
        
        <div >
          <p className="text-4xl ">{t("home.ourCompetitions.title2")}</p>
          <p className="text-xl mt-4">{t("home.ourCompetitions.title3")}</p>
          <p>{t("home.ourCompetitions.title4")}</p>
        </div>

        <div className="flex justify-center items-center w-full">
          <GridOfSportsHome />
        </div>
      </div>

      <Footer />
    </>
  );
};

export { Competitions };
