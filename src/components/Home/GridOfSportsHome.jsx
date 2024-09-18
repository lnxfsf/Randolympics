import "../../styles/home.scoped.scss";



import {useTranslation} from "react-i18next";



/* 

<div className="flex flex-col justify-center items-center"> <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
<img width={"30px"} height={"30px"} src="home/competitions//JavelinThrow.svg" />
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="ellipse-image-competitions">
    <circle class="fillme"></circle>
</svg>
</div>
 */

const GridOfSportsHome = () => {

  const { t } = useTranslation();


  return (
    <>
      <div
        className=" md:w-[95%] lg:w-[85%] xl:w-[70%] 2xl:w-[55rem]     grid 
            
            mt-8


            m-1
            md:m-8

            p-4

            md:p-4

            grid-cols-3
            

            min-[500px]:grid-cols-4
            min-[500px]:gap-5


            min-[600px]:grid-cols-5
            min-[600px]:gap-7


            
            min-[700px]:grid-cols-6
         


            md:grid-cols-7
            
            lg:grid-cols-8



            gap-8

            xl:gap-12

            2xl:gap-16

            

            gap-y-16
            

           
            
            place-content-evenly
            
           place-items-center

           text-black_second
           lexend-font
           font-bold

           text-sm

           md:text-base
            
            
            "
      >
        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          <div className="  flex flex-col justify-center items-center  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/archery.svg"
            />
          </div>

          <p className="mt-7">{t('home.ourCompetitions.sport1')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            {" "}
            <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
              <img
                width={"30px"}
                height={"30px"}
                src="home/competitions/JavelinThrow.svg"
              />
            </div>
            <p className="mt-7">{t('home.ourCompetitions.sport2')}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/badminton.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport3')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/gymnastics.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport4')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/skateboarding.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport5')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/weightlifting.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport6')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/fencing.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport7')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center  items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/fieldHockey.svg"
            />
          </div>
          <p className="mt-2  text-center">{t('home.ourCompetitions.sport8')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/golf.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport9')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/shooting.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport10')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/volleyball.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport11')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/diving.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport12')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/modernPentathlon.svg"
            />
          </div>
          <p className="mt-2 text-center">{t('home.ourCompetitions.sport13')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/rowing.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport14')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/football.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport15')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/sailing.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport16')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/triathlon.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport17')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/cycling.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport18')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/karate.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport19')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/swim.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport20')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/tableTenis.svg"
            />
          </div>
          <p className="mt-2 text-center">{t('home.ourCompetitions.sport21')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/rugby.svg"
            />
          </div>
          <p className="mt-2 text-center">{t('home.ourCompetitions.sport22')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/tennis.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport23')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/cannoening.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport24')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/judo.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport25')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/surfing.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport26')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/swimrun.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport27')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/swimrun.svg"
            />
          </div>
          <p className="mt-2 text-center">{t('home.ourCompetitions.sport28')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/taekwondo.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport29')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/basketball.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport30')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/handball.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport31')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/climbing.svg"
            />
          </div>
          <p className="mt-2 text-center">{t('home.ourCompetitions.sport32')}</p>
        </div>

        {/* one item */}
        <div className="flex flex-col justify-center items-center">
          {" "}
          <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
            <img
              width={"30px"}
              height={"30px"}
              src="home/competitions/wrestling.svg"
            />
          </div>
          <p className="mt-7">{t('home.ourCompetitions.sport33')}</p>
        </div>

       
      </div>
    </>
  );
};

export { GridOfSportsHome };
