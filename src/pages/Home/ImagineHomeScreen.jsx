import { useEffect, useState, useMemo } from "react";
import "../../styles/home.scoped.scss";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "animate.css";

const getRandomIndex = (array, excludeIndex) => {
  let index;

  do {
    index = Math.floor(Math.random() * array.length);
  } while (index === excludeIndex);

  return index;
};

let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;

const ImagineHomeScreen = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const lines = Array.from({ length: 100 });

  const [animate, setAnimate] = useState(true);

  const listOfTitle1 = useMemo(
    () => [
      t("home.imagineHome.sport1"),

      t("home.imagineHome.sport2"),
      t("home.imagineHome.sport3"),
      t("home.imagineHome.sport4"),
      t("home.imagineHome.sport6"),
      t("home.imagineHome.sport7"),
      t("home.imagineHome.sport8"),
      t("home.imagineHome.sport9"),
      t("home.imagineHome.sport10"),

      t("home.imagineHome.sport11"),
      t("home.imagineHome.sport12"),
      t("home.imagineHome.sport13"),
      t("home.imagineHome.sport14"),
      t("home.imagineHome.sport15"),
      t("home.imagineHome.sport16"),
      t("home.imagineHome.sport17"),
      t("home.imagineHome.sport18"),
      t("home.imagineHome.sport19"),

      t("home.imagineHome.sport20"),
      t("home.imagineHome.sport21"),
      t("home.imagineHome.sport22"),
      t("home.imagineHome.sport23"),
      t("home.imagineHome.sport24"),
      t("home.imagineHome.sport25"),
      t("home.imagineHome.sport27"),
      t("home.imagineHome.sport28"),

      t("home.imagineHome.sport29"),
      t("home.imagineHome.sport30"),
      t("home.imagineHome.sport31"),
      t("home.imagineHome.sport33"),
    ],
    [i18n.language]
  );

  const listOfHappen = useMemo(
    () => [
      t("home.imagineHome.happen1"),
      t("home.imagineHome.happen2"),
      t("home.imagineHome.happen4"),
      t("home.imagineHome.happen5"),
      t("home.imagineHome.happen6"),
      t("home.imagineHome.happen7"),
      t("home.imagineHome.happen8"),
      t("home.imagineHome.happen9"),
      t("home.imagineHome.happen11"),
      t("home.imagineHome.happen12"),

      t("home.imagineHome.happen13"),
      t("home.imagineHome.happen14"),
      t("home.imagineHome.happen15"),
      t("home.imagineHome.happen16"),
      t("home.imagineHome.happen17"),
    ],
    [i18n.language]
  );

  const listOfScenarios = useMemo(
    () => [
      t("home.imagineHome.scenario1"),
      t("home.imagineHome.scenario2"),
      t("home.imagineHome.scenario3"),
      t("home.imagineHome.scenario4"),
      t("home.imagineHome.scenario5"),
      t("home.imagineHome.scenario6"),
      t("home.imagineHome.scenario7"),
      t("home.imagineHome.scenario8"),
      t("home.imagineHome.scenario9"),
      t("home.imagineHome.scenario10"),
    ],
    [i18n.language]
  );

  const listOfImages = [
    "/home/home_random_sports/imagine3.jpg",
    "/home/home_random_sports/imagine4.jpg",
    "/home/home_random_sports/imagine5.jpg",
    "/home/home_random_sports/imagine6.jpg",
    "/home/home_random_sports/imagine7.jpg",
    "/home/home_random_sports/imagine8.jpg",
    "/home/home_random_sports/imagine9.jpg",
    "/home/home_random_sports/imagine10.jpg",
    "/home/home_random_sports/imagine11.jpg",
    "/home/home_random_sports/imagine12.jpg",
    "/home/home_random_sports/imagine13.jpg",
    "/home/home_random_sports/imagine14.jpg",
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

  const [imageImagine1, setImageImagine1] = useState(listOfImages[3]);
  const [imageImagine2, setImageImagine2] = useState(listOfImages[1]);

  useEffect(() => {
    // force preload of images. it caches all images in cache, so when it switches again, it's should be faster
    listOfImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setAnimate(true);

      const randomIndex = getRandomIndex(listOfTitle1);
      setTitle1(listOfTitle1[randomIndex]);

      const randomIndex2 = getRandomIndex(listOfHappen);
      setHappen(listOfHappen[randomIndex2]);

      const randomIndex3 = getRandomIndex(listOfScenarios);
      setScenarios(listOfScenarios[randomIndex3]);

      /*   const randomIndexOfImages1 = getRandomIndex(listOfImages);
      const randomIndexOfImages2 = getRandomIndex(
        listOfImages,
        randomIndexOfImages1
      );

      setImageImagine1(listOfImages[randomIndexOfImages1]);
      setImageImagine2(listOfImages[randomIndexOfImages2]); */
    }, 5000);

    return () => clearInterval(interval);
  }, [i18n.language]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      const randomIndexOfImages1 = getRandomIndex(listOfImages);
      const randomIndexOfImages2 = getRandomIndex(
        listOfImages,
        randomIndexOfImages1
      );

      setImageImagine1(listOfImages[randomIndexOfImages1]);
      setImageImagine2(listOfImages[randomIndexOfImages2]);
    }, 9100);

    return () => clearInterval(interval2);
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
          <p className=" font-bold text-3xl md:text-4xl ">
            {t("home.imagineHome.text1")}
          </p>

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

            {/*  <Button
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
              <span className="lexend-font">{t('home.imagineHome.text2')}</span>
            </Button> */}

            <div
              className="w-60 self-center lexend-font"
              style={{
                textTransform: "none",
                height: "45px",
                backgroundColor: "#D24949",
                color: "#fff",
                borderRadius: "8px", // equivalent to `borderRadius: 2`
                border: "1px solid #D24949",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "default",
              }}
            >
              {t("home.imagineHome.text2")}
            </div>
          </div>

          {/* imagine1.jpg  h-96 */}
          <div className="w-full  md:h-auto overflow-hidden container_imagine_pic1 mt-4 ">
            {/*  <img src="/home/imagine_high_screen.jpg" className="imagine_pic1 " /> */}

            <video width="100%" height="100%" autoPlay muted loop controls>
              <source
                src={`${S3_BUCKET_CDN_BASE_URL}/videos/randomlympics_video.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="textBox1 inline-block mr-8">
            <p className="font-medium text-black_second pr-3 p-2 pl-3">
              <span className="text-red-600 mr-2">
                <img className="inline " src="/home/imagine1icon.svg" />
              </span>
              {t("home.imagineHome.text3")}
            </p>
          </div>
        </div>

        <div className="pl-8 pr-8 w-full 2xl:w-[70%] flex justify-between flex-col lg:flex-row">
          <div>
            <p className=" font-bold text-3xl md:text-4xl ">
              {t("home.imagineHome.text14")}
            </p>

            <div className="flex items-start">
              <img className="inline w-5 mt-4 md:mt-3" src="/home/shoe.svg" />
              <p className="font-medium text-red_second pr-3 p-2 pl-3">
                {t("home.imagineHome.text4")}
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
                {t("home.imagineHome.text5")}
              </p>
            </div>
          </div>

          <div className="basis-1/3 p-4 flex self-center flex-col">
            <img
              className="2xl:w-96"
              src="/home/home_random_sports/imagine2.jpg"
            />

            <div className="textBox2 max-w-fit inline-block lg:mr-8  ">
              <p className="font-medium text-black_second  p-2 pl-3 text-sm md:text-base">
                {t("home.imagineHome.text6")}
              </p>
            </div>
          </div>
        </div>

        <div className="pl-8 pr-8 w-full 2xl:w-[70%] flex justify-between  flex-col lg:flex-row">
          <div className="self-center grow">
            <p className="font-medium text-lg text-center ">
              {t("home.imagineHome.text7")}
            </p>

            <div className="flex justify-center items-center flex-col gap-4 p-8">
              <p
                className={`text-xl text-center md:text-2xl font-semibold ${
                  animate
                    ? "animate__animated animate__flipInX  "
                    : "animate__animated animate__flipOutX"
                }`}
              >
                {title1}
              </p>

              <p>{t("home.imagineHome.text8")}</p>

              {/* animate__hinge */}
              <p
                className={`text-xl text-center md:text-2xl font-semibold ${
                  animate
                    ? "animate__animated  animate__jackInTheBox  "
                    : "animate__animated animate__slideOutDown"
                }`}
              >
                {happen}
              </p>
            </div>

            <div className="w-full flex justify-center items-center pt-8 flex-col">

            <Button
                  onClick={() => {
                    navigate("/supporters#myself");
                  }}
                  className="w-full md:w-60 self-center "
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
                  <span className="lexend-font">
                    {t("home.imagineHome.text15")}
                  </span>
                </Button>


              <div className="flex max-md:w-full items-center gap-2 mt-4">
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
                  <span className="lexend-font">
                    {t("home.imagineHome.text9")}
                  </span>
                </Button>

                <p className="font-medium">{t("home.imagineHome.text10")}</p>

                <div className="relative max-md:w-full">
                  <div className="all_stars z-10">
                    <div className="flex justify-end">
                      <img
                        className="first_star animate_heartBeat "
                        src="/home/first_star.svg"
                      />
                      <img
                        className="second_star animate_heartBeat animate__delay-2s"
                        src="/home/second_star.svg"
                      />
                      <img
                        className="third_star animate_heartBeat animate__delay-4s"
                        src="/home/third_star.svg"
                      />
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
                    <span className="lexend-font">
                      {t("home.imagineHome.text11")}
                    </span>
                  </Button>
                </div>
              </div>

              <p className="text-sm mt-4">{t("home.imagineHome.text12")}</p>
            </div>
          </div>

          <div className="basis-1/3 p-4 flex self-center flex-col">
            <div className="textBox3 max-w-fit inline-block lg:mr-8">
              <p className="font-medium text-black_second  p-2 pl-3 text-sm md:text-base ">
                {t("home.imagineHome.text13")}
              </p>
            </div>

            {/*    ${
                animate
                  ? "animate__animated animate__bounceInLeft   "
                  : "animate__animated animate__bounceOutRight"
              } */}
            <img
              className={`2xl:w-96`}
              src={imageImagine1}
            />

            {/* 
${
  animate
    ? "animate__animated animate__bounceInLeft   "
    : "animate__animated animate__bounceOutRight"
}
 */}
            <img
              className={`2xl:w-96 mt-6`}
              src={imageImagine2}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { ImagineHomeScreen };
