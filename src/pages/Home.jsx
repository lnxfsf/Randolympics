// this is main page, where people can come from google search

// ovo import
import "animate.css";
import '@mui/material/styles/styled';

import { Footer } from "../components/Footer";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { createDirectus, rest, readItems } from "@directus/sdk";

import "../styles/home.scoped.scss";
import { CompetitionsHome } from "../components/Home/CompetitionsHome";
import { EconomiscLoansHome } from "./Home/EconomiscLoansHome";

import { useNavigate } from "react-router-dom";
import { NavbarHome } from "../components/NavbarHome";

import AOS from "aos";
import "aos/dist/aos.css";
import { GridOfSportsHome } from "../components/Home/GridOfSportsHome";
import { FAQ } from "../components/Home/FAQ";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

// for countdown
const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  return timeLeft;
};

// okej, ovo radi (ovo je sigurniji način da fetch-ujes, nego axios API... )

const Home = () => {
  const targetDate = new Date("2028-06-25T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // we need in format: 1 Jan 2024
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <NavbarHome />

      {/* first div */}
      <div className="firstHhomeImage flex justify-center items-center flex-col">
        <p className="text-4xl mt-32" style={{ color: "white" }}>
          From Couch Potato to Gold Medalist
        </p>

        <p className="text-xl w-[45em] text-center mt-4" style={{ color: "white" }}>
          Randolympics is a global competition where randomly selected
          participants face extraordinary athletic challenges, transforming
          everyday individuals into potential gold medalists.
        </p>

        <div className="countdown-timer  flex items-center justify-center ">
          <p className="basis-1/2 p-8  ">
            Stockholm, Sweden <br /> June 25th - July 2nd 2028
          </p>

          <div className="flex space-x-8 p-4">
            <div className="flex flex-col items-center">
              <p className="text-4xl">
                <b>{timeLeft.days ?? 0}</b>
              </p>
              <p>Days</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-4xl">{timeLeft.hours ?? 0}</p>
              <p>Hours</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-4xl">{timeLeft.minutes ?? 0}</p>
              <p>Minutes</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-4xl">{timeLeft.seconds ?? 0}</p>
              <p>Sec</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pt-16 gap-8">
          <p className="text-4xl" style={{ color: "white" }}>
            Stockholm 2028 Games
          </p>

          <Button
            onClick={() => {
              navigate("/randomize");
            }}
            className="w-44 "
            style={{ marginTop: "0px" }}
            sx={{
              height: "45px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 3,
              border: `1px solid #AF2626`,
              "&:hover": {
                background: "rgb(202, 67, 67)",
                color: "white",
                border: `1px solid rgb(202, 67, 67)`,
              },
            }}
            id="randomize-btn"
            type="submit"
          >
            <span className="popins-font" style={{ textTransform: "none" }}>
              Randomize
            </span>
          </Button>
        </div>

        <div className="flex items-center justify-center pt-8 pl-24  pr-24  ">
          <p style={{ color: "white" }}>
            The Randomolympics is an innovative and exciting event that
            reimagines traditional sports competitions by randomly assigning
            athletes to various events. This new format addresses several
            critical issues often associated with major sports events today,
            promoting a fairer, more inclusive, and sustainable sporting
            experience.
          </p>
        </div>
      </div>

      {/* Our Competitions */}
      <div
        className="flex justify-center items-center flex-col"
        data-aos="fade-up"
        data-aos-offset="300"
      >
        <p className="text-[30px] text-red_first mt-8 ">
          <b>Our Competitions</b>
        </p>

        {/* outer box  */}
        <GridOfSportsHome />
      </div>

      {/* Our Beliefs */}
      <div className="flex justify-center items-start overflow-x-hidden">
        <div
          data-aos="fade-right"
          data-aos-offset="200"
          className="basis-1/3 secondHhomeImage flex justify-center items-start"
        >
          <p className="text-4xl mt-8 mr-6" style={{ color: "white" }}>
            Our Beliefs
          </p>
        </div>

        <div
          data-aos="fade-left"
          data-aos-offset="200"
          className="w-full h-[350px] p-4 pt-8 pr-24 bg-[#F7FAFA]"
        >
          <p className="text-justify">
            We welcome everyone to participate and compete, regardless of
            nationality, race, values, religion, political views, gender, sexual
            orientation, or age.
          </p>
          <br />
          <p className="text-justify">
            In times of tension, the world needs us more than ever. Our host
            cities will ensure everyone can join, arranging necessary visas for
            all participants. We stand against any political pressure to exclude
            athletes based on their identity or beliefs. Transparency is our
            commitment, using open-source technology for payments and
            communication. Our democratic approach guarantees equal rights and
            voting power for every nation and citizen. We may not always have
            luxury, sometimes staying in tents or using old equipment, but we
            will never compromise on our core values.
          </p>
        </div>
      </div>

      {/* Economics */}
      <div
        className="flex justify-center items-start bg-[#F7FAFA] mt-8"
        data-aos="fade-up"
        data-aos-offset="200"
      >
        <div className=" flex flex-col w-full h-[350px]  justify-center ml-24 mr-24 p-4 mb-16 ">
          <p className="text-[30px] text-red_first mt-8 self-center">
            <b>Economics: Three types of income:</b>
          </p>
          <p className=" self-center mt-4 text-center">
            Our organization has three types of income sources: Loans,
            Broadcasting Rights, and Sponsorships. All payments are published on
            the blockchain. Below is a detailed description of each income type:
          </p>

          <div className="flex justify-around mt-8 ml-16 mr-16">
            <div
              className=" flex justify-center items-center flex-col economicsItem cursor-pointer select-none "
              data-aos="zoom-in-right"
              data-aos-delay="100"
              data-aos-offset="100"
            >
              <p className="font-semibold">1</p>
              <p className="text-lg font-semibold text-red_first">Loans</p>

              {/* <img src="home/ellipse.svg" alt="Ellipse" className="ellipse-image"></img> */}

              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ellipse-image"
              >
                <circle class="fillme"></circle>
              </svg>
            </div>

            <div
              className=" flex justify-center items-center flex-col economicsItem cursor-pointer select-none"
              data-aos="zoom-in-right"
              data-aos-delay="300"
              data-aos-offset="100"
            >
              <p className="font-semibold">2</p>
              <p className="text-lg font-semibold text-red_first text-center">
                Broadcasting rights
              </p>
              {/* <img src="home/ellipse.svg" alt="Ellipse" class="ellipse-image"></img> */}

              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ellipse-image"
              >
                <circle class="fillme"></circle>
              </svg>
            </div>

            <div
              className="  flex justify-center items-center flex-col  economicsItem cursor-pointer select-none"
              data-aos="zoom-in-right"
              data-aos-delay="600"
              data-aos-offset="100"
            >
              <p className="font-semibold">3</p>
              <p className="text-lg font-semibold text-red_first text-center">
                Sponsorship
              </p>
              {/* <img src="home/ellipse.svg" alt="Ellipse" class="ellipse-image"></img> */}

              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ellipse-image"
              >
                <circle class="fillme"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-center items-center mt-12 flex-col " id="how_it_works">
        <p className="text-3xl bold" >How it works</p>





        <p className="text-xl semibold mt-12" id="how_it_works">1. Campaign Phase: Nominate and Support
        </p>

        <p>At Randolympics, the journey starts with friends, family members, or fans initiating campaigns for those they believe have the potential to become Randolympians. During this phase, gathering as much support as possible is crucial—whether through financial contributions or spreading the word to build a strong backing for your nominee. The stronger the campaign, the better the athlete’s chances of securing a top spot in the final rankings.
        </p>

<p className="text-[#0000FF]">Key to Success: Building Momentum
</p>





<p className="text-xl semibold mt-12" id="how_it_works">2. Final Ranking and Selection
<p className="bold underline">June 25th 2026
</p>
        </p>

        <p>On June 25th, 2026, the camp  ment of randomness to ensure a fair and unpredictable outcome:
        </p>

<p className="text-[#0000FF]">Final Ranking Number = Random Multiplier x Number of Supporters x USD Raised

</p>





<p className="text-xl semibold mt-12" id="how_it_works">3. Two-Year Preparation Period


        </p>

        <p>Once the final rankings are announced, the selected athletes enter a rigorous two-year preparation period. During this time, the National President of each participating country assembles their team, choosing the top 50 male and top 50 female athletes. This period is vital for athletes to train, build their skills, and prepare mentally and physically for the challenges ahead. Should any athlete drop out or suffer an injury, they will be replaced by the next highest-ranked athlete from their country.
        </p>

<p className="text-[#0000FF]">Key Activities: Team Assembly and Intensive Preparation

</p>





<p className="text-xl semibold mt-12" id="how_it_works">4. Opening Ceremony
<p className="bold underline">June 25th 2028

</p>


        </p>

        <p>The excitement culminates on June 25th, 2028, with the grand opening ceremony in Stockholm. During this event, each athlete is randomly assigned their sports, typically ranging from three to seven different competitions. This moment marks the beginning of the Randolympics, setting the stage for a week of intense competition where anything can happen.
        </p>

<p className="text-[#0000FF]">Event: Athletes receive their randomly assigned sports.

</p>




<p className="text-xl semibold mt-12" id="how_it_works">5. Games: The Ultimate Test




        </p>

        <p>Following the opening ceremony, the competition begins in earnest. Over the course of the week, athletes will face a series of challenges across various disciplines, testing every aspect of their physical and mental endurance. From track and field events to endurance challenges, each competition is designed to push the participants to their limits.
        </p>

<p className="text-[#0000FF]">Dates: June 25th to July 2nd, 2028

</p>




<p className="text-xl semibold mt-12" id="how_it_works">6. Closing Ceremony

<p className="bold underline">July 2nd 2028


</p>



        </p>

        <p>The Randolympics culminates on July 2nd, 2028, with the closing ceremony. This event celebrates the achievements of all participants, recognizing both the triumphs and the efforts of those who gave it their all. Whether they win or walk away with a story, every Randolympian is honored for their courage, determination, and participation in this extraordinary event.
        </p>

<p className="text-[#0000FF]">Event: Celebrating all who competed, with special recognition for those who triumphed in their events.


</p>

      </div>

      {/* FAQ */}
      <FAQ />

      <div className="h-96"></div>

      <Footer />
    </>
  );
};

export { Home };
