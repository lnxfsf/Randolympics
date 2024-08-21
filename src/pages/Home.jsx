// this is main page, where people can come from google search

// ovo import
import "animate.css";
import "@mui/material/styles/styled";

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
      <div className="firstHhomeImage flex justify-center items-center flex-col ">
        <p className="text-4xl mt-56" style={{ color: "white" }}>
          Real People. Randomly Selected.
          <br />
          Competing in Olympic Sports
        </p>

        <div className="flex items-center justify-center  flex-col pt-8">
          <p className="text-xl pb-4" style={{ color: "white" }}>
            Curious about possible schedules?
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

        <div className="countdown-timer  flex items-center justify-center ">
          <p className="text-center">
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

        {/*     <p className="text-xl w-[45em] text-center mt-4" style={{ color: "white" }}>
          Randolympics is a global competition where randomly selected
          participants face extraordinary athletic challenges, transforming
          everyday individuals into potential gold medalists.
        </p> */}

        <div className="flex items-center justify-center pt-16 gap-4 flex-col">
          <p className="text-xl text-center w-[70%]" style={{ color: "white" }}>
            Transform your friend from couch potato to gold medalist—sign them
            up by starting their Randolympic campaign!
          </p>

          <Button
            onClick={() => {
              navigate("/supporters");
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
              Sign up a friend
            </span>
          </Button>
        </div>

        <div className="flex items-center text-center justify-center pt-8 pl-24  pr-24 w-[80%]  ">
          <p style={{ color: "white" }}>
            Is your friend more of a couch potato than an athlete? Deep down,
            there's a great sports spirit waiting to emerge. Sign them up for a
            chance to win a gold medal—it’ll be a huge surprise and a big
            compliment, showing that you believe in their potential. By
            launching this campaign, you’re not just getting them off the couch;
            you’re giving them a fitness program that finally works. You’ll be
            by their side every step of the way—motivating them, managing their
            progress, and cheering them on all the way to the games. And best of
            all, this journey will be a lot of fun for everyone involved!
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

      <div className="bg-[#F7FAFA] p-4 pb-8">
          
        <div className="flex flex-col  justify-center items-center ">
          <hr />
          <p className=" text-black font-semibold text-base mt-1 mb-1">
            Campaign Donations
          </p>
          <p className="text-xs w-[50%] text-center">
            Income generated from donations made by supporters to campaigns for
            athletes. Even if athletes do not make it to the games, whether due
            to injury, a personal decision, or simply not being randomly
            selected, these funds contribute to the overall success of the
            Randolympics. These donations help to cover organizational costs and
            ensure that the spirit of competition and participation continues to
            thrive.
          </p>
         
        </div>

        <div className="flex flex-col mt-2 justify-center items-center ">
          <hr />
          <p className=" text-black font-semibold text-base  mt-1 mb-1">
            Broadcasting Rights
          </p>
          <p className="text-xs w-[50%] text-center">
            Broadcasting Rights involve granting media entities the permission
            to cover and report on Randolympics events. These rights can be
            acquired by various media platforms, such as: <br />
            YouTube Channels: Independent or corporate channels that wish to
            broadcast the events online. <br />
            TikTok Influencers: Content creators on TikTok who want to provide
            live coverage or highlights. <br />
            TV Stations: Traditional television broadcasters who aim to televise
            the events to a wider audience. <br />
            The broadcasting rights are distributed by country, meaning media
            outlets from different countries can acquire the rights specific to
            their region. This ensures wide and diverse media coverage, catering
            to different audiences globally.
          </p>
        </div>

        <div className="flex flex-col mt-2 justify-center items-center">
          <hr />
          <p className=" text-black font-semibold text-base  mt-1 mb-1">
            Sponsorship
          </p>

          <p className="text-xs w-[50%] text-center">
            Sponsorship is a significant source of income where various entities
            can sponsor different aspects of the Randolympics. This includes:
            Events: Companies or brands can sponsor individual events within the
            Randolympics.
            <br />
            National Teams: Sponsorship deals can be made with national teams,
            allowing sponsors to have their branding associated with specific
            teams.
            <br />
            Names of the Games: Sponsors can acquire naming rights for the games
            or specific events within the Randolympics.
            <br />
            Additionally, there are opportunities for branded merchandise:{" "}
            <br />
            Branded Items: Contracts can be made for selling branded items such
            as t-shirts, hats, and other merchandise. These contracts allow
            sponsors to use the Randolympics branding on their products,
            creating a source of revenue through merchandise sales. <br />
            These income sources ensure the Randolympics organization has a
            diverse stream of revenue, aiding in the sustainability and growth
            of the events. <br />
          </p>
        </div>

        <div className="flex flex-col mt-2 justify-center items-center">
          <hr />
          <p className=" text-black font-semibold text-base mt-1 mb-1">Loans</p>
          <p className="text-xs w-[50%] text-center">
            Loans are a source of income for the Randolympics organization where
            they receive funding from loan givers. These loans are provided with
            the expectation that the loan givers will receive their money back
            along with yearly interest. The terms and conditions of the loan,
            including the interest rate and repayment schedule, are agreed upon
            at the time of the loan agreement. The general rule is that 20% of
            all revenues are paid back to existing loan contracts in equal
            ratios.
          </p>
        </div>
      </div>

      <div
        className="flex justify-center items-center mt-12 flex-col "
        id="how_it_works"
      >
        <p className="text-3xl bold">How it works</p>

        <p className="text-xl semibold mt-12" id="how_it_works">
          Starting now Campaign Phase: Nominate and Support
        </p>

        <p className="w-[50%] text-center mt-4">
          At Randolympics, the journey starts with friends, family members, or
          fans initiating campaigns for those they believe have the potential to
          become Randolympians. During this phase, gathering as much support as
          possible is crucial—whether through financial contributions or
          spreading the word to build a strong backing for your nominee. The
          stronger the campaign, the better the athlete’s chances of securing a
          top spot in the final rankings.
        </p>

        <div className="flex justify-start gap-2 mt-8 ">
          <p className="semibold text-xl">June 25th 2026: </p>
          <p className="text-xl semibold " id="how_it_works">
            Final Ranking and Selection
          </p>
        </div>

        <p>All campaigns receive their final ranking scores:</p>

        <p className=" mt-4">
          Final Ranking Number = Random Multiplier x Number of Supporters x USD
          Raised
        </p>

        <p className="text-xl semibold mt-12" id="how_it_works">
          Two-Year Preparation Period
        </p>

        <p className="w-[70%] text-center mt-4">
          Once the final rankings are announced, the selected athletes enter a
          rigorous two-year preparation period. During this time, the National
          President of each participating country assembles their team, choosing
          the top 50 male and top 50 female athletes. This period is vital for
          athletes to train, build their skills, and prepare mentally and
          physically for the challenges ahead. Should any athlete drop out or
          suffer an injury, they will be replaced by the next highest-ranked
          athlete from their country.
        </p>

        <div className="flex justify-start gap-2 mt-8 ">
          <p className="semibold text-xl ">June 25th 2028</p>
          <p className="text-xl semibold " id="how_it_works">
            Opening Ceremony - Athletes receive their randomly assigned sports
          </p>
        </div>

        <p className="w-[70%] text-center mt-4">
          The excitement culminates on June 25th, 2028, with the grand opening
          ceremony in Stockholm. During this event, each athlete is randomly
          assigned their sports, typically ranging from three to seven different
          competitions. This moment marks the beginning of the Randolympics,
          setting the stage for a week of intense competition where anything can
          happen.
        </p>
        {/* 
        <p className="text-[#0000FF] mt-4">
          Event: Athletes receive their randomly assigned sports.
        </p> */}

        <div className="flex justify-start gap-2 mt-8 ">
          <p className="text-xl">June 25th to July 2nd, 2028: </p>
          <p className="text-xl semibold" id="how_it_works">
            Games: The Ultimate Test
          </p>
        </div>

        <p className="w-[70%] text-center mt-4">
          Following the opening ceremony, the competition begins in earnest.
          Over the course of the week, athletes will face a series of challenges
          across various disciplines, testing every aspect of their physical and
          mental endurance. From track and field events to endurance challenges,
          each competition is designed to push the participants to their limits.
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
