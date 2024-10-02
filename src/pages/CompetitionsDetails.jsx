import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CompetitionsDetails = () => {
  const { sportName } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <>
      <div className="lexend-font text-black_second">
        <div className="m-8">
          <p className="text-2xl md:text-3xl capitalize font-semibold 2xl:ml-16">
            {sportName}
          </p>

          <p className="text-sm md:text-base  capitalize 2xl:ml-16">{t("sportDetails.archery.subtitle1")}</p>

          <div className="flex md:flex-row flex-col mt-4 2xl:m-16 gap-6">
           
            <div className="w-full  ">
              <img src="/sportDetails/archery/1.jpg" className="object-cover" />
            </div>



            <div className="w-full">

            <p className="text-xl md:text-2xl capitalize font-semibold">
            {t("sportDetails.archery.title1")}
          </p>

            </div>

            
          </div>



        </div>
      </div>
    </>
  );
};

export { CompetitionsDetails };
