import "animate.css";

import { NavbarHome } from "../components/NavbarHome";
import { EconomicsNewsBlock } from "../components/News/Economics/EconomicsNewsBlock";
import { NewsNewsBlock } from "../components/News/NewsBlock/NewsNewsBlock";
import { UpcomingGames } from "../components/News/UpcomingGames/UpcomingGames";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { FooterClean } from "../components/FooterClean";

import { useTranslation } from "react-i18next";

const News = () => {
  const { t } = useTranslation();


  return (
    <>
      <Navbar />

      {/* 

            <div className="flex justify-center mt-16 flex-col items-center">
                <p className="text-3xl md:text-4xl font-semibold  text-red_second ">Stockholm 2028 Games</p>

                <UpcomingGames />
            </div> */}

      <div className="flex justify-center mt-16 flex-col items-center">
        <p className="text-3xl md:text-4xl font-semibold  text-red_second ">
          {t("home.news.title1")}
        </p>
        <NewsNewsBlock />
      </div>

      {/* 
            <div className="flex justify-center mt-16 flex-col items-center">
                <p className="text-3xl md:text-4xl font-semibold  text-red_second mb-4">Economics</p>

                <EconomicsNewsBlock />
            </div> */}

      <FooterClean />
    </>
  );
};

export { News };
