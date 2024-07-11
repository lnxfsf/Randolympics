// this is main page, where people can come from google search

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { createDirectus, rest, readItems } from "@directus/sdk";

import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FirstCollapsibleHome } from "../components/Home/FirstCollapsibleHome";

import "../styles/home.scoped.scss"
import { CompetitionsHome } from "../components/Home/CompetitionsHome";
import { EconomiscLoansHome } from "./Home/EconomiscLoansHome";


import { useNavigate } from "react-router-dom";


let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: '5px',

  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more


// okej, ovo radi (ovo je sigurniji način da fetch-ujes, nego axios API... )

const Home = () => {


  // ? expand more
  const [expandedFirstText, setExpandedFirstText] = useState(false);
  const [expandedSecondText, setExpandedSecondText] = useState(false);
  const [expandedThirdText, setExpandedThirdText] = useState(false);



  const [expandedLoans, setExpandedLoans] = useState(false);
  const [expandedBroadcast, setExpandedBroadcast] = useState(false);
  const [expandedSponsorship, setExpandedSponsorship] = useState(false);











  const [games, setGames] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    fetchNewsGames();
  }, []);

  const fetchNewsGames = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/items/stockholm_games`
      );

      /* 
this is from official:
    const client = createDirectus('http://localhost:8055').with(rest());
    const response = await client.request(readItems('stockholm_games')); 
    */

      // set variable.
      setGames(response.data.data);

      //console.log(games);  // this on first will not reflect updated state ! so it will be null, but access it outside, and it will show...
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  // so once you accessed it outside of useEffect, then it worked fine..
  console.log(games);



  // we need in format: 1 Jan 2024
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <>
      <Navbar />

      <div className="">
        <h1 className="flex text-[40px] mt-8 justify-center underline decoration-red_first pl-4 ">
          Stockholm 2028 Games
        </h1>
      </div>

      {/* stockholm games content */}

      <br />
      <p><b>titles</b></p>

      <div>
        <ul>
          {games.map((item, index) => (
            <li key={index}>ID: {item.stockholm_games_id} -- {item.title}</li>
          ))}
        </ul>
      </div>

      <br />

      <p><b>subtitles</b></p>
      <div>
        <ul>
          {games.map((item, index) => (
            <li key={index}>ID: {item.stockholm_games_id} -- {item.subtitle}</li>
          ))}
        </ul>
      </div>

      <br />



      <p><b>time to read</b></p>
      <div>
        <ul>
          {games.map((item, index) => (
            <li key={index}>ID: {item.stockholm_games_id} -- {item.time_to_read} min read</li>
          ))}
        </ul>
      </div>



      <br />



      <p><b>Date</b></p>
      <div>
        <ul>
          {games.map((item, index) => (
            <li key={index}>ID: {item.stockholm_games_id} -- {formatDate(item.date_created)}</li>
          ))}
        </ul>
      </div>


      <br />

      <p><b>Content</b></p>
      <div>
        <ul>
          {games.map((item, index) => (
            <li key={index}>ID: {item.stockholm_games_id} -- {item.content && (
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            )}
            </li>
          ))}
        </ul>
      </div>



      <br />

      <p><b>Images</b></p>
      <div>
        <ul>
          {games.map((item, index) => (
            <>
              <li key={index}>ID: {item.stockholm_games_id}</li>

              <img src={"http://localhost:8055/assets/" + item.post_image} style={{ width: '100px', height: '100px' }} />
            </>
          ))}
        </ul>
      </div>


      <hr className="mt-10 mb-10" />







      <div className="mb-52">


        {/* prvi blok */}
        <div>
          <h1 className="flex text-[40px] mt-32 justify-center">
            We are Brothers & Sisters, United through Sports
          </h1>

          <div className="m-8">
            <p > The randolympics is an innovative and exciting event that reimagines traditional sports competitions by randomly assigning athletes to various events. This new format addresses several critical issues often associated with major sports events today, promoting a fairer, more inclusive, and sustainable sporting experience.
            </p>

          </div>





          <div className="m-8 flex justify-center items-center">

            <p expand={expandedFirstText}
              onClick={() => { setExpandedFirstText(!expandedFirstText) }} className="cursor-pointer select-none">Read More</p>




            <ExpandMore

              expand={expandedFirstText}
              onClick={() => { setExpandedFirstText(!expandedFirstText) }}
              aria-expanded={expandedFirstText}
              aria-label="show more"
            >

              <ExpandMoreIcon />
            </ExpandMore>
          </div>


          <div className="m-8">
            <Collapse in={expandedFirstText} timeout="auto" unmountOnExit>
              <FirstCollapsibleHome />
            </Collapse>
          </div>




          <div className="flex m-8 justify-center">
            <h1 className=" text-3xl">Get Involved</h1>
          </div>

          <ul className="m-8" >
            <li >Learn more about our mission and values</li>
            <li>Explore how you can participate or host future events.</li>
            <li>Discover the exciting range of sports and activities featured in the randolympics</li>
          </ul>




          <div className="flex m-8 justify-center">
            <h1 className=" text-3xl">Stay Connected</h1>
          </div>

          <ul className="m-8" >
            <li >Follow us on social media for the latest updates.</li>
            <li>Subscribe to our newsletter for exclusive content and event announcements.</li>
            <li>Engage with the randolympics community and share your experiences.</li>
          </ul>



          <p className="m-8" >Experience the thrill of unpredictability and the joy of unity at the randolympics!</p>

        </div>




        {/* drugi blok */}
        <div>

          <h1 className="flex text-[40px] mt-32 justify-center">
            Values and Beliefs
          </h1>


          <div className="m-8">
            <p > We welcome everyone to participate and compete, regardless of nationality, race, values, religion, political views, gender, sexual orientation, or age.
            </p>

          </div>


          <div className="m-8 flex justify-center items-center">

            <p expand={expandedSecondText}
              onClick={() => { setExpandedSecondText(!expandedSecondText) }} className="cursor-pointer select-none">Read More</p>




            <ExpandMore

              expand={expandedSecondText}
              onClick={() => { setExpandedSecondText(!expandedSecondText) }}
              aria-expanded={expandedSecondText}
              aria-label="show more"
            >

              <ExpandMoreIcon />
            </ExpandMore>
          </div>


          <div className="m-8">
            <Collapse in={expandedSecondText} timeout="auto" unmountOnExit>


              <p>

                In times of tension, the world needs us more than ever. Our host cities will ensure everyone can join, arranging necessary visas for all participants. <br />
                We stand against any political pressure to exclude athletes based on their identity or beliefs. <br />
                Transparency is our commitment, using open-source technology for payments and communication. <br />
                Our democratic approach guarantees equal rights and voting power for every nation and citizen. <br />
                We may not always have luxury, sometimes staying in tents or using old equipment, but we will never compromise on our core values. <br />

              </p>
            </Collapse>
          </div>

        </div>



        {/* treci blok */}
        <div>

          <h1 className="flex text-[40px] mt-32 justify-center">
            Our Competitions
          </h1>


          {/* for all text */}
          <div className="m-8">

            <div className="flex ">
              <img className="w-10 h-10 mr-4 mb-4" src="home/competitions/archery.png" />
              <p><b>Archery</b>: Discover your inner sharpshooter! Imagine Jack from work cheering as you hit the bullseye, excitedly sharing your achievements during coffee breaks. Archery enhances focus and precision, and it's a fantastic way to build mental discipline and physical control.
              </p>
            </div>


            <div className="flex ">
              <img className="w-10 h-10 mr-4 mb-4" src="home/competitions/archery.png" />
              <p><b>Athletics</b>: Whether it's running, jumping, or throwing, athletics offers a thrilling way to challenge your body and reach new personal bests. Eva from the gym will be inspired by your dedication and celebrate your milestones with you.
              </p>
            </div>


            <div className="m-8 flex justify-center items-center">

              <p expand={expandedThirdText}
                onClick={() => { setExpandedThirdText(!expandedThirdText) }} className="cursor-pointer select-none">Read More</p>




              <ExpandMore

                expand={expandedThirdText}
                onClick={() => { setExpandedThirdText(!expandedThirdText) }}
                aria-expanded={expandedThirdText}
                aria-label="show more"
              >

                <ExpandMoreIcon />
              </ExpandMore>
            </div>


            <Collapse in={expandedThirdText} timeout="auto" unmountOnExit>
              <CompetitionsHome />


            </Collapse>



          </div>

        </div>


      </div>




      {/* economics dio */}
      <div>

        <div>

          <h1 className="flex text-[40px] mt-32 justify-center">
            Economics
          </h1>


          {/* for all text */}
          <div className="m-8">


            {/* loans */}
            <div className="m-8 flex justify-center items-center">

              <p expand={expandedLoans}
                onClick={() => { setExpandedLoans(!expandedLoans) }} className="cursor-pointer select-none">1. Loans</p>




              <ExpandMore

                expand={expandedLoans}
                onClick={() => { setExpandedLoans(!expandedLoans) }}
                aria-expanded={expandedLoans}
                aria-label="show more"
              >

                <ExpandMoreIcon />
              </ExpandMore>
            </div>


            <Collapse in={expandedLoans} timeout="auto" unmountOnExit>

              <div>
                <h1 className="text-2xl mb-2">Loans</h1>

                <p className="mb-2">Loans are a source of income for the Randolympics organization where they receive funding from loan givers. These loans are provided with the expectation that the loan givers will receive their money back along with yearly interest. The terms and conditions of the loan, including the interest rate and repayment schedule, are agreed upon at the time of the loan agreement. The general rule is that 20% of all revenues are paid back to existing loan contracts in equal ratios.

                </p>


                <div className="flex justify-center">
                  <Button onClick={() => {
                    navigate("/economicsloan");
                  }}>Ongoing Loan Auctions</Button>

                </div>
              </div>


            </Collapse>





            {/* broadcasting rigths */}
            <div className="m-8 flex justify-center items-center">

              <p expand={expandedBroadcast}
                onClick={() => { setExpandedBroadcast(!expandedBroadcast) }} className="cursor-pointer select-none">2. Broadcasting Rights</p>




              <ExpandMore

                expand={expandedBroadcast}
                onClick={() => { setExpandedBroadcast(!expandedBroadcast) }}
                aria-expanded={expandedBroadcast}
                aria-label="show more"
              >

                <ExpandMoreIcon />
              </ExpandMore>
            </div>


            <Collapse in={expandedBroadcast} timeout="auto" unmountOnExit>

              <div>
                <h1 className="text-2xl mb-2">Broadcasting Rights</h1>

                <p className="mb-2">Broadcasting Rights involve granting media entities the permission to cover and report on Randolympics events. These rights can be acquired by various media platforms, such as:
                </p>


                <ul className="mb-2 ml-8">
                  <li><b>YouTube Channels</b>: Independent or corporate channels that wish to broadcast the events online.</li>
                  <li><b>Tik Tok Influencers</b>: Content creators on TikTok who want to provide live coverage or highlights.</li>
                  <li><b>TV Stations</b>: Traditional television broadcasters who aim to televise the events to a wider audience.</li>
                </ul>


                <p className="mb-2"> The broadcasting rights are distributed by country, meaning media outlets from different countries can acquire the rights specific to their region. This ensures wide and diverse media coverage, catering to different audiences globally.</p>

                <div className="flex justify-center">
                  <Button onClick={()=>{navigate("/economicsbroadcast")}}>Ongoing Loan Auctions</Button>

                </div>
              </div>


            </Collapse>





            {/* Sponsorship */}
            <div className="m-8 flex justify-center items-center">

              <p expand={expandedSponsorship}
                onClick={() => { setExpandedSponsorship(!expandedSponsorship) }} className="cursor-pointer select-none">3. Sponsorship</p>




              <ExpandMore

                expand={expandedSponsorship}
                onClick={() => { setExpandedSponsorship(!expandedSponsorship) }}
                aria-expanded={expandedSponsorship}
                aria-label="show more"
              >

                <ExpandMoreIcon />
              </ExpandMore>
            </div>


            <Collapse in={expandedSponsorship} timeout="auto" unmountOnExit>

              <div>
                <h1 className="text-2xl mb-2">Sponsorship</h1>

                <p className="mb-2">Sponsorship is a significant source of income where various entities can sponsor different aspects of the Randolympics. This includes               </p>


                <ul className="mb-2 ml-8">
                  <li><b>Events</b>: Companies or brands can sponsor individual events within the Randolympics.</li>
                  <li><b>National Teams</b>: Sponsorship deals can be made with national teams, allowing sponsors to have their branding associated with specific teams.</li>
                  <li><b>Names of the Games</b>: Sponsors can acquire naming rights for the games or specific events within the Randolympics.</li>
                </ul>


                <p className="mb-2"> Additionally, there are opportunities for branded merchandise
                </p>

                <ul className="mb-2 ml-8">
                  <li><b>Branded Items</b>: Contracts can be made for selling branded items such as t-shirts, hats, and other merchandise. These contracts allow sponsors to use the Randolympics branding on their products, creating a source of revenue through merchandise sales.</li>
                </ul>


                <p className="mb-2">These income sources ensure the Randolympics organization has a diverse stream of revenue, aiding in the sustainability and gr of the events</p>



                <div className="flex justify-center">
                  <Button onClick={()=>{navigate("/economicssponsorship")}}>Ongoing Sponsorship Auctions</Button>

                </div>
              </div>


            </Collapse>


          </div>

        </div>


      </div>



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
