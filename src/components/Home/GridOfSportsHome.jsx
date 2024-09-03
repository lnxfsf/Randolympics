import "../../styles/home.scoped.scss";

/* 

<div className="flex flex-col justify-center items-center"> <div className="  flex justify-center items-center flex-col  competitionItem cursor-pointer select-none">
<img width={"30px"} height={"30px"} src="home/competitions//JavelinThrow.svg" />
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="ellipse-image-competitions">
    <circle class="fillme"></circle>
</svg>
</div>
 */

const GridOfSportsHome = () => {
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

          <p className="mt-7">Archery</p>
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
            <p className="mt-7">Athletics</p>
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
          <p className="mt-7">Badmington</p>
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
          <p className="mt-7">Gymnastics</p>
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
          <p className="mt-7">Skateboard</p>
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
          <p className="mt-7">Weightlifting</p>
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
          <p className="mt-7">Fencing</p>
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
          <p className="mt-2  text-center">Field Hockey</p>
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
          <p className="mt-7">Golf</p>
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
          <p className="mt-7">Shooting</p>
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
          <p className="mt-7">Volleyball</p>
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
          <p className="mt-7">Diving</p>
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
          <p className="mt-2 text-center">Modern Pentathlon</p>
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
          <p className="mt-7">Rowing</p>
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
          <p className="mt-7">Football</p>
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
          <p className="mt-7">Sailing</p>
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
          <p className="mt-7">Thriatlon</p>
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
          <p className="mt-7">Cycling</p>
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
          <p className="mt-7">Karate</p>
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
          <p className="mt-7">Swimming</p>
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
          <p className="mt-2 text-center">Table Tennis</p>
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
          <p className="mt-2 text-center">Rugby Sevens</p>
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
          <p className="mt-7">Tennis</p>
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
          <p className="mt-7">Cannoening</p>
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
          <p className="mt-7">Judo</p>
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
          <p className="mt-7">Surfing</p>
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
          <p className="mt-7">Swimrun</p>
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
          <p className="mt-2 text-center">Swimrun Sprint</p>
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
          <p className="mt-7">Taekwondo</p>
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
          <p className="mt-7">Basketball</p>
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
          <p className="mt-7">Handball</p>
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
          <p className="mt-2 text-center">Sport Climbing</p>
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
          <p className="mt-7">Wrestling</p>
        </div>

       
      </div>
    </>
  );
};

export { GridOfSportsHome };
