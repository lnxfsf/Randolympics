import { Navbar } from "../components/Navbar";

import "../styles/landingPage.scoped.scss";

import { Button } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      {/* navbar

        doesn't need in landing page


        <Navbar />

         */}

      {/* first part */}
      <div>
        <img src="/landing_page/first.png" className="z-10" />

        {/* <div className="flex justify-start	items-center "> */}

        <div className="absolute bottom-0 left-0 flex items-center p-4 bg-opacity-75 bg-black text-white">
          <p className="text text-2xl ml-16 ">Discover more</p>
          <i className="bx bx-down-arrow-alt ml-3 text text-2xl	"></i>
        </div>
      </div>

      {/* second part */}

      <div className="flex">
        {/*TODO basis-1/2  to stavi na obje. za sada ovako 45% u css.. dok ne resis mobile posle */}
        <div className="first_div">
          <h1 className="text-[25px]">
            Are you ready to represent your country at the{" "}
            <span className="text-red_first  font-bold">Randolympics</span>,
            June 2028 ?
          </h1>

          <p className="pt-8 text-base">
            Imagine all the Olympic sports, but with a twist – athletes are
            randomly selected to compete in events they may have never trained
            for.
            <br />
            Nobody’s perfect, and that’s what makes the Randolympics such a big
            challenge for everyone involved. Whether you're a seasoned athlete
            or a newcomer, the playing field is leveled, making every
            competition a true test of spirit and resilience.
            <br />
            With a little bit of luck, you could find yourself on the podium,
            winning a gold medal!
          </p>

          <h1 className="text-[30px] pt-12">Ready for the adventure ?</h1>

          <p className="pt-2 text-base">
            Get a random time table now and see what sports you could compete
            in!
          </p>

          <Button
            className="w-full"
            style={{ marginTop: "20px" }}
            sx={{
              height: "60px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 5,
              border: `1px solid #AF2626`,
              "&:hover": {
                background: "rgb(196, 43, 43)",
                color: "white",
                border: `1px solid rgb(196, 43, 43)`,
              },
            }}
            id="randomize-btn"
          >
            <span className="popins-font">Randomize</span>
          </Button>
        </div>

        {/*TODO basis-1/2  to stavi na obje. za sada ovako 45% u css.. dok ne resis mobile posle */}
        <div className="second_div_grid_container ">
          {/* TODO: dynamically update with images we want from server. or we can leave it just 3x5 as it is. but it's better, for responsiveness, to have some limit */}

          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/1.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/2.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/3.png"
          />

          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/4.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/5.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/6.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/7.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/8.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/9.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/10.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/11.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/12.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/13.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/14.png"
          />
          <img
            className="second_div_grid_item"
            src="landing_page/grid_images/15.png"
          />
        </div>
      </div>

      {/* third part */}
      <h1 className="flex text-[40px] mt-32 justify-center underline decoration-red_first">
        How does it work ?
      </h1>

      <div className="flex">
        <div className="basis-1/2 flex justify-center items-center pl-32 pt-24 pb-16 ">
          <img
            src="landing_page/other_images/1.png "
            className="image_landing"
          />
        </div>

        {/* flex-wrap flex-col */}
        <div className="basis-1/2 flex justify-start items-center flex-wrap">


          <div className="flex-wrap flex-col">
            <h2 className="text-2xl font-bold underline decoration-red_first pl-16">
              1. One
            </h2>

            <h1 className="text-[43px] pl-16 pt-8">
              <span className="text-red_first  font-bold ">Sign up</span>{" "}
              together <br /> with your friends
            </h1>



            <div className="pl-16 pt-6">
              <Button
                className="w-32 "
                style={{ marginTop: "20px" }}
                sx={{
                  height: "60px",
                  bgcolor: "#AF2626",
                  color: "#fff",
                  borderRadius: 25,
                  border: `1px solid #AF2626`,
                  "&:hover": {
                    background: "rgb(196, 43, 43)",
                    color: "white",
                    border: `1px solid rgb(196, 43, 43)`,
                  },
                }}
                id="register-btn"
              >
                <span className="popins-font">Randomize</span>
              </Button>
            </div>




          </div>



          <div className="flex justify-end items-end mt-[450px]">
                    <img src="landing_page/arrow_down_1.png"/>
                </div>
                



        </div>
      </div>

      <h1>hello</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
};

export { LandingPage };
