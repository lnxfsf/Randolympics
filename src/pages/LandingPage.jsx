//  this is landing page, where people can come from marketing links, intended for marketing purposes, like a flyer 


import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import '@mui/material/styles/styled';
import "../styles/landingPage.scoped.scss";

import { Button } from "@mui/material";

// on button click, redirect to other component. like <Link>
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  // on button, redirect to other component. like <Link>
  const navigate = useNavigate();

  // on button, redirect to other component. like <Link>
  const handleRedirectRegister = () => {
    navigate("/login");
  };

  const goToRandomize = () => {
    navigate("/randomize");
  };

  return (
    <>
      <div>
        <img src="/landing_page/first.png" className="z-10" />

        <div className="absolute bottom-0 left-0 flex items-center p-4 bg-opacity-75 bg-black text-white">
          <p className="text text-2xl ml-16 ">Discover more</p>
          <i className="bx bx-down-arrow-alt ml-3 text text-2xl	"></i>
        </div>
      </div>

      {/* second part */}
      <div className="flex">
        {/*//TODO basis-1/2  put it on both. for now 45% in css.. until you do for mobile, later.. */}
        <div className="first_div">
          <h1 className="text-[25px]">
            Are you ready to represent your country at the{" "}
            <span className="text-red_first  font-bold">Randolympics</span>,
            July 2028 ?
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
            onClick={goToRandomize}
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
            <span className="lexend-font">Randomize</span>
          </Button>
        </div>

        {/*//TODO basis-1/2  put it on both. for now 45% in css.. until you do for mobile, later.. */}
        <div className="second_div_grid_container ">
          {/* //TODO: dynamically update with images we want from server. or we can leave it just 3x5 as it is. but it's better, for responsiveness, to have some limit */}

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

      {/* start third part */}
      <h1 className="flex text-[40px] mt-32 justify-center underline decoration-red_first">
        How does it work ?
      </h1>

      <div className="flex">
        {/* image */}
        <div className="basis-1/2 flex justify-center items-center pl-32 pt-24 pb-16 ">
          <img
            src="landing_page/other_images/1.png "
            className="image_landing"
          />
        </div>

        {/* flex-wrap flex-col */}
        {/* text */}
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
                onClick={handleRedirectRegister}
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
                <span className="lexend-font">Register</span>
              </Button>
            </div>
          </div>

          {/* arrow */}
          <div className="flex justify-end items-end mt-[450px]">
            <img src="landing_page/arrow_down_1.png" />
          </div>
        </div>
      </div>

      {/* end third part */}

      {/* start fourth part */}

      <div className="flex">
        {/* flex-wrap flex-col */}
        {/* text */}
        <div className="basis-1/2 flex justify-start items-center flex-wrap">
          {/* arrow */}
          <div className="flex justify-start items-start mt-[450px] ml-16">
            <img src="landing_page/arrow_down_2.png" />
          </div>

          <div className="flex-wrap flex-col">
            <h2 className="text-2xl font-bold underline decoration-red_first pl-16 text-right">
              2. Two
            </h2>

            <h1 className="text-[43px] pl-16 pt-8 text-right">
              Get elected and <br /> represent{" "}
              <span className="text-red_first  font-bold ">your</span> <br />
              country
            </h1>
          </div>
        </div>

        {/* image */}
        <div className="basis-1/2 flex justify-center items-center pr-32 pt-24 pb-16 ">
          <img
            src="landing_page/other_images/2.png "
            className="image_landing"
          />
        </div>
      </div>

      {/* end fourth part */}

      {/* start fifth part */}
      {/* image */}
      <div className="flex">
        <div className="basis-1/2 flex justify-center items-center pl-32 pt-24 pb-16 ">
          <img
            src="landing_page/other_images/3.png "
            className="image_landing"
          />
        </div>

        {/* text */}
        {/* flex-wrap flex-col */}
        <div className="basis-1/2 flex justify-start items-center flex-wrap">
          <div className="flex-wrap flex-col">
            <h2 className="text-2xl font-bold underline decoration-red_first pl-16">
              3. Three
            </h2>

            <h1 className="text-[43px] pl-16 pt-8">
              Have a chance to <br /> win your{" "}
              <span className="text-red_first  font-bold ">gold</span> <br />
              medal
            </h1>
          </div>
        </div>
      </div>

      {/* end fifth part */}

      {/* start about us part */}

      <div className="mb-52">
        <h1 className="flex text-[40px] mt-32 justify-center underline decoration-red_first">
          About us
        </h1>

        <div className="flex ">
          <div className="basis-1/2 pl-8 pt-16 text-justify">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
              <br /> <br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur. But I must explain to you how all this
              mistaken idea of denouncing pleasure and praising pain was born
              and I will give you a complete account of the system, and expound
              the actual teachings of the great explorer of the truth, the
              master-builder of human happiness. No one rejects, dislikes, or
              avoids pleasure itself, because it is pleasure, but because those
              who do not know how to pursue pleas. But I must explain to you how
              all this mistaken idea of denouncing pleasure and praising pain
              was born and I will give <br />
            </p>
          </div>

          <div className="basis-1/2 flex justify-center items-center">
            <img
              src="landing_page/about_us.png"
              className="image_landing_about_us"
            />
          </div>
        </div>

        <div className="p-8 text-justify">
          But I must explain to you how all this mistaken idea of denouncing
          pleasure and praising pain was born and I will give you a complete
          account of the system, and expound the actual teachings of the great
          explorer of the truth, the master-builder of human happiness. No one
          rejects, dislikes, or avoids pleasure itself, because it is pleasure,
          but because those who do not know how to pursue pleasure rationally
          encounter consequences that are extremely painful. Nor again is there
          anyone who loves or pursues or desires to obtain pain of itself,
          because it is pain, but because occasionally circumstances occur in
          which toil and pain can procure him some great pleasure. To take a
          trivial example, which of us ever undertakes laborious physical
          exercise, except to obtain some advantage from it? But who has any
          right to find fault with a man who chooses to enjoy a pleasure that
          has no annoying consequences, or one who avoids a pain that produces
          no resultant pleasure
        </div>
      </div>

      {/* end about us part */}

      <Footer />
    </>
  );
};

export { LandingPage };
