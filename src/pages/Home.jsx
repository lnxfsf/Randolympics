// this is main page, where people can come from google search

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "@mui/material";


const Home = () => {
  return (
    <>
      <Navbar />

      <div className="">
        <h1 className="flex text-[40px] mt-8 justify-center underline decoration-red_first pl-4 ">
          Stockholm 2028 Games
        </h1>
      </div>


      <div>


      </div>




      {/* just temporary, so I can see content */}
      <div className="h-96"></div>

      





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

export { Home };
