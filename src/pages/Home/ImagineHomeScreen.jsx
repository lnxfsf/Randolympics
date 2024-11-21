import { useEffect, useState } from "react";
import "../../styles/home.scoped.scss";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "animate.css";

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const ImagineHomeScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const lines = Array.from({ length: 100 });

  const [animate, setAnimate] = useState(true);

  const listOfTitle1 = [
    t("home.ourCompetitions.sport1"),

    t("home.ourCompetitions.sport2"),
    t("home.ourCompetitions.sport3"),
    t("home.ourCompetitions.sport4"),
    t("home.ourCompetitions.sport6"),
    t("home.ourCompetitions.sport7"),
    t("home.ourCompetitions.sport8"),
    t("home.ourCompetitions.sport9"),
    t("home.ourCompetitions.sport10"),

    t("home.ourCompetitions.sport11"),
    t("home.ourCompetitions.sport12"),
    t("home.ourCompetitions.sport13"),
    t("home.ourCompetitions.sport14"),
    t("home.ourCompetitions.sport15"),
    t("home.ourCompetitions.sport16"),
    t("home.ourCompetitions.sport17"),
    t("home.ourCompetitions.sport18"),
    t("home.ourCompetitions.sport19"),

    t("home.ourCompetitions.sport20"),
    t("home.ourCompetitions.sport21"),
    t("home.ourCompetitions.sport22"),
    t("home.ourCompetitions.sport23"),
    t("home.ourCompetitions.sport24"),
    t("home.ourCompetitions.sport25"),
    t("home.ourCompetitions.sport27"),
    t("home.ourCompetitions.sport28"),

    t("home.ourCompetitions.sport29"),
    t("home.ourCompetitions.sport30"),
    t("home.ourCompetitions.sport31"),
    t("home.ourCompetitions.sport33"),
  ];

  const listOfHappen = [
    t('home.imagineHome.happen1'),
    t('home.imagineHome.happen2'),


    
    "Fail",
    "Die of embarrassment",
    "Wish the ground would swallow him",
    "Feel like crawling under a rock",
    "Humiliated",
    "Burn with shame",
    "Be red-faced with embarrassment",
    "Feel utterly humiliated",
  ];

  const listOfScenarios = [
    "Your boss completing a triathlon.",
    "Your grandma winning gold in archery.",
    "Your cousin scoring the game-winning goal in football.",
    "Your gym buddy doing backflips in gymnastics.",
    "Your dad surprising everyone with a 50m dive.",
    "Your favorite celebrity boxing like a champ.",
    "Your neighbor leading the volleyball team to victory.",
    "Your sibling crushing it in table tennis.",
    "Your roommate throwing the perfect discus.",
    "Your best friend sprinting to glory in the 200m race.",
  ];

  const [title1, setTitle1] = useState(() => {
    const randomIndex = getRandomIndex(listOfTitle1);
    return listOfTitle1[randomIndex];
  });

  const [happen, setHappen] = useState(() => {
    const randomIndex = getRandomIndex(listOfHappen);
    return listOfHappen[randomIndex];
  });

  const [scenarios, setScenarios] = useState(() => {
    const randomIndex = getRandomIndex(listOfScenarios);
    return listOfScenarios[randomIndex];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      const randomIndex = getRandomIndex(listOfTitle1);
      setTitle1(listOfTitle1[randomIndex]);

      const randomIndex2 = getRandomIndex(listOfHappen);
      setHappen(listOfHappen[randomIndex2]);

      const randomIndex3 = getRandomIndex(listOfScenarios);
      setScenarios(listOfScenarios[randomIndex3]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <>
      <div className="flex w-full justify-center items-center lexend-font text-black_second flex-col">
        <div className="  p-8 w-full 2xl:w-[70%]">
          <p className=" font-bold text-3xl md:text-4xl ">Imagine</p>

          <div className="flex justify-between flex-col gap-y-2 md:flex-row">
            <p
              className={` font-medium sm:text-lg md:text-xl mt-2 mb-4 md:mb-0 ${
                animate
                  ? "animate__animated animate__zoomInLeft   "
                  : "animate__animated animate__zoomOutRight"
              }`}
            >
              {scenarios}
            </p>

            <Button
              className="w-60 self-center  "
              style={{ textTransform: "none" }}
              sx={{
                height: "45px",
                bgcolor: "#D24949",

                color: "#fff",
                borderRadius: 2,
                border: `1px solid #D24949`,
                "&:hover": {
                  background: "rgba(210, 73, 73, 1)",
                  color: "white",
                  border: `1px solid rgba(210, 73, 73, 1)`,
                },
              }}
            >
              <span className="lexend-font">That's Randolympics!</span>
            </Button>
          </div>

          <div className="w-full h-96 overflow-hidden container_imagine_pic1 mt-4 ">
            <img src="/home/imagine1.jpeg" className="imagine_pic1 " />
          </div>

          <div className="textBox1 inline-block mr-8">
            <p className="font-medium text-black_second pr-3 p-2 pl-3">
              <span className="text-red-600 mr-2">
                <img className="inline " src="/home/imagine1icon.svg" />
              </span>{" "}
              It’s wild, it’s fun, and it will be unforgettable.
            </p>
          </div>
        </div>

        <div className="pl-8 pr-8 w-full 2xl:w-[70%] flex justify-between flex-col lg:flex-row">
          <div>
            <p className=" font-bold text-3xl md:text-4xl ">Why</p>

            <div className="flex items-start">
              <img className="inline w-5 mt-4 md:mt-3" src="/home/shoe.svg" />
              <p className="font-medium text-red_second pr-3 p-2 pl-3">
                Randolympics is a one-of-a-kind event where random people
                compete in unpredictable sports.
              </p>
            </div>

            <div className="zebra_line_bar">
              {lines.map((_, index) => (
                <div
                  key={index}
                  className={`zebra_line ${index % 2 === 0 ? "even" : "odd"}`}
                />
              ))}

              <div className="zebra_line" />
            </div>

            <div className="flex items-start">
              <img className="inline w-5 mt-4 md:mt-3" src="/home/loop.svg" />
              <p className="font-medium text-black_second pr-3 p-2 pl-3">
                We are transforming everyday people into unforgettable
                competitors.
              </p>
            </div>
          </div>

          <div className="basis-1/3 p-4 flex self-center flex-col">
            <img className="2xl:w-96" src="home/imagine2.jpeg" />

            <div className="textBox2 max-w-fit inline-block mr-8">
              <p className="font-medium text-black_second  p-2 pl-3">
                It will be fun to watch!
              </p>
            </div>
          </div>
        </div>

        <div className="pl-8 pr-8 w-full 2xl:w-[70%] flex justify-between  flex-col lg:flex-row">
          <div className="self-center grow">
            <p className="font-medium text-lg text-center">
              Who would you want to see compete in
            </p>

            <div className="flex justify-center items-center flex-col gap-4 p-8">
              <p
                className={`text-xl md:text-2xl font-semibold ${
                  animate
                    ? "animate__animated animate__flipInX  "
                    : "animate__animated animate__flipOutX"
                }`}
              >
                {title1}
              </p>

              <p>and</p>

              {/* animate__hinge */}
              <p
                className={`text-xl md:text-2xl font-semibold ${
                  animate
                    ? "animate__animated  animate__jackInTheBox  "
                    : "animate__animated animate__slideOutDown"
                }`}
              >
                {happen}
              </p>
            </div>

            <div className="w-full flex justify-center items-center pt-8 flex-col">
              <div className="flex max-md:w-full items-center gap-2">
                <Button
                  onClick={() => {
                    navigate("/supporters#friend");
                  }}
                  className="w-full md:w-60 self-center  "
                  style={{ textTransform: "none" }}
                  sx={{
                    height: "45px",
                    bgcolor: "#D24949",

                    color: "#fff",
                    borderRadius: 2,
                    border: `1px solid #D24949`,
                    "&:hover": {
                      background: "rgba(210, 73, 73, 1)",
                      color: "white",
                      border: `1px solid rgba(210, 73, 73, 1)`,
                    },
                  }}
                >
                  <span className="lexend-font">Friend</span>
                </Button>

                <p className="font-medium">or</p>

                <div className="relative max-md:w-full">
                  <div className="all_stars z-10">
                    <div className="flex justify-end">
                      <img className="first_star" src="/home/first_star.svg" />
                      <img
                        className="second_star"
                        src="/home/second_star.svg"
                      />
                      <img className="third_star" src="/home/third_star.svg" />
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      navigate("/supporters#celebrity");
                    }}
                    className="w-full md:w-60 self-center  "
                    style={{ textTransform: "none" }}
                    sx={{
                      height: "45px",
                      bgcolor: "#D24949",

                      color: "#fff",
                      borderRadius: 2,
                      border: `1px solid #D24949`,
                      "&:hover": {
                        background: "rgba(210, 73, 73, 1)",
                        color: "white",
                        border: `1px solid rgba(210, 73, 73, 1)`,
                      },
                    }}
                  >
                    <span className="lexend-font">Celebrity</span>
                  </Button>
                </div>
              </div>

              <p className="text-sm mt-4">Make your choice now !</p>
            </div>
          </div>

          <div className="basis-1/3 p-4 flex self-center flex-col">
            <div className="textBox3 max-w-fit inline-block mr-8">
              <p className="font-medium text-black_second  p-2 pl-3">
                33 competitions in total
              </p>
            </div>
            <img className="2xl:w-96" src="home/imagine3.jpeg" />

            <img className="2xl:w-96 mt-6" src="home/imagine4.jpeg" />
          </div>
        </div>
      </div>
    </>
  );
};

export { ImagineHomeScreen };
