import React, { useState, useEffect } from "react";

import "../../styles/home.scoped.scss";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation, Trans } from "react-i18next";

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "5px",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more

const SeventhScreenHome = () => {
  const [expanded, setExpanded] = useState(false);

  const [expanded2, setExpanded2] = useState(false);

  const { t, i18n } = useTranslation();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: false, // this is usually 'true' , but it's when we have more employees
      breakpoints: {
        "(min-width: 500px)": {
          slides: {
            perView: 2.3, // For screens >= 500px
          },
        },
        "(min-width: 700px)": {
          slides: {
            perView: 3.3, // For screens >= 800px
          },
        },

        "(min-width: 1024px)": {
          slides: {
            perView: 4.3, // For screens >= 800px
          },
        },

        "(min-width: 1440px)": {
          slides: {
            perView: 5.3, // For screens >= 800px
          },
        },

        "(min-width: 2321px)": {
          slides: {
            perView: 7.3, // For screens >= 800px
          },
        },

        "(min-width: 3300px)": {
          slides: {
            perView: 9.3, // For screens >= 800px
          },
        },
      },

      slides: {
        perView: 1.3,
        spacing: 15,

        breakpoints: {
          "(min-width: 500px)": {
            perView: 3, // For screens >= 500px
          },
          "(min-width: 800px)": {
            perView: 5, // For screens >= 800px
          },
        },
      },

      slideChanged() {},
    },

    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const [sliderRef2, instanceRef2] = useKeenSlider(
    {
      loop: false, // this is usually 'true' , but it's when we have more employees
      breakpoints: {
        "(min-width: 500px)": {
          slides: {
            perView: 2.3, // For screens >= 500px
          },
        },
        "(min-width: 700px)": {
          slides: {
            perView: 3.3, // For screens >= 800px
          },
        },

        "(min-width: 1024px)": {
          slides: {
            perView: 4.3, // For screens >= 800px
          },
        },

        "(min-width: 1440px)": {
          slides: {
            perView: 5.3, // For screens >= 800px
          },
        },

        "(min-width: 2321px)": {
          slides: {
            perView: 7.3, // For screens >= 800px
          },
        },

        "(min-width: 3300px)": {
          slides: {
            perView: 9.3, // For screens >= 800px
          },
        },
      },

      slides: {
        perView: 1.3,
        spacing: 15,

        breakpoints: {
          "(min-width: 500px)": {
            perView: 3, // For screens >= 500px
          },
          "(min-width: 800px)": {
            perView: 5, // For screens >= 800px
          },
        },
      },

      slideChanged() {},
    },

    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  /*   const [sliderRef] = useKeenSlider({

    slides: {
      perView: 5,
      spacing: 15,

      breakpoints: {
        '(min-width: 500px)': {
          perView: 2, // For screens >= 500px
        },
        '(min-width: 800px)': {
          perView: 5, // For larger screens >= 800px
        },
      },


    },
  });
 */

  return (
    <>
      <div className="flex items-start lexend-font text-black_second flex-col ">
        <p className="text-3xl md:text-4xl font-bold md:ml-6 mt-6 self-center">
          {t("home.seventhScreen.content1")}
        </p>

        <p className="ml-6 mr-6 pl-2 pr-2 2xl:w-[50%] 2xl:text-center self-center">
          <br />
          {t("home.seventhScreen.content19")}
          <br />
        </p>

        <div className="w-full">
          <div
            className={`flex justify-center items-center w-full bg-black text-white mt-4 ${
              expanded2 ? "rounded-t-lg" : "rounded-lg"
            }   pl-2 pr-2`}
          >
            <p
              /* expand={expanded} */
              onClick={() => {
                setExpanded2(!expanded2);
              }}
              className="cursor-pointer select-none pl-2 md:pl-6 font-semibold text-black_second lexend-font  "
            >
              {t("home.seventhScreen.content0")}
            </p>

            <ExpandMore
              expand={expanded2}
              onClick={() => {
                setExpanded2(!expanded2);
              }}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon sx={{ color: "#444444" }} />
            </ExpandMore>
          </div>
        </div>

        <div className="pl-2 pr-2 w-full">
          <Collapse in={expanded2} timeout="auto" unmountOnExit>
            <div className="">
              <p className="text-2xl md:text-3xl font-bold md:ml-6 mt-8 mb-8 ">
                {t("home.seventhScreen.content2")}
              </p>

              <div
                ref={sliderRef}
                className="keen-slider w-5 overflow-hidden md:w-32"
              >
                <div className="keen-slider__slide    flex flex-col justify-start items-start p-4">
                  <div className="flex flex-col items-center">
                    <img
                      src="/home/about/jonatan-hedin.png"
                      className="h-48 mb-4 object-contain"
                    />

     

                    <p className="font-bold ">Jonatan Hedin</p>
                    <p className="text-[#616673]">{t("home.seventhScreen.roleAdvisoryMember")}</p>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-end p-8">
                <button
                  className="m-2 border-2 border-red_second rounded-full p-3 md:p-4"
                  onClick={() => instanceRef.current?.prev()}
                >
                  <img src="/home/about/left.svg" />
                </button>
                <button
                  className="m-2 border-2 border-red_second rounded-full p-3 md:p-4"
                  onClick={() => instanceRef.current?.next()}
                >
                  <img src="/home/about/right.svg" />
                </button>
              </div>

              <p className=" text-2xl md:text-3xl font-bold md:ml-6 mt-8 mb-8">
                {t("home.seventhScreen.content3")}
              </p>

              <div
                ref={sliderRef2}
                className="keen-slider  w-auto overflow-hidden md:w-32"
              >
                <div className="keen-slider__slide    flex flex-col justify-start items-start p-4">
                  {/* <img src="/home/about/6.jpg" className="h-48 mb-4 object-contain" />
                   */}

                  <img
                    src="/home/about/hans-kurz.png"
                    className="h-48 mb-4 object-contain "
                  />

                  {/*  <div className="item_div">
                          <img src="/home/about/1.jpg" />
                  </div> */}

                  <div className="pr-10 ">
                    <p className="font-bold ">Hans Kurz</p>
                    <p className="text-[#616673]">
                      {t("userTypes.user_type2")}
                    </p>
                  </div>

                 <a href="https://www.linkedin.com/in/hans-peter-kurz-7b04851/"> <img src="/home/linkedIn.svg" className="w-6 mt-1" /></a>

                  <p className="text-sm text-black_second mt-4">
                    <span className="font-medium">
                      {t("home.seventhScreen.content230")}
                    </span>{" "}
                    {t("home.seventhScreen.content25")}
                  </p>
                  <p className="text-sm text-black_second">
                    <span className="font-medium">
                      {t("home.seventhScreen.content24")}
                    </span>{" "}
                    {t("home.seventhScreen.content26")}
                  </p>
                </div>

                <div className="keen-slider__slide    flex flex-col justify-start items-start  p-4 ">
                  {/* <div className="flex justify-center "> */}
                  <img
                    src="/home/about/ilija-mladenovic.png"
                    className="h-48 mb-4 object-contain"
                  />
                  {/*  </div> */}

                  {/*  <div className="item_div">
                          <img src="/home/about/1.jpg" />
                  </div> */}

                  <div className="pr-10 ">
                    <p className="font-bold">Ilija Mladenović</p>
                    <p className="text-[#616673]">
                      {t("userTypes.user_type7")}
                    </p>
                  </div>

                  <a href="https://www.linkedin.com/in/ilijamladenovic" target="_blank"> <img src="/home/linkedIn.svg" className="w-6 mt-1" /></a>

                  <p className="text-sm text-black_second mt-4">
                    <span className="font-medium">
                      {t("home.seventhScreen.content230")}
                    </span>
                    {t("home.seventhScreen.content27")}
                  </p>
                  <p className="text-sm text-black_second">
                    <span className="font-medium">
                      {t("home.seventhScreen.content24")}
                    </span>
                    {t("home.seventhScreen.content28")}
                  </p>
                </div>




                <div className="keen-slider__slide    flex flex-col justify-start items-start  p-4 ">
                  {/* <div className="flex justify-center "> */}
                  <img
                    src="/home/about/katarina-cuturilo.jpg"
                    className="h-48 mb-4 object-contain"
                  />
                  {/*  </div> */}

                  {/*  <div className="item_div">
                          <img src="/home/about/1.jpg" />
                  </div> */}

                  <div className="pr-10 ">
                    <p className="font-bold">Katarina Cuturilo</p>
                    <p className="text-[#616673]">
                      {t("userTypes.user_type8")}
                    </p>
                  </div>

                  <a href="https://www.linkedin.com/in/katarina-cuturilo/" target="_blank"><img src="/home/linkedIn.svg" className="w-6 mt-1" /></a>

                  <p className="text-sm text-black_second mt-4">
                    <span className="font-medium">
                      {t("home.seventhScreen.content230")}
                    </span>
                    {t("home.seventhScreen.content31")}
                  </p>
                  <p className="text-sm text-black_second">
                    <span className="font-medium">
                      {t("home.seventhScreen.content24")}
                    </span>
                    {t("home.seventhScreen.content32")}
                  </p>
                </div>



              </div>

              <div className="flex w-full justify-end p-8">
                <button
                  className="m-2 border-2 border-red_second rounded-full p-3 md:p-4"
                  onClick={() => instanceRef2.current?.prev()}
                >
                  <img src="/home/about/left.svg" />
                </button>
                <button
                  className="m-2 border-2 border-red_second rounded-full p-3 md:p-4"
                  onClick={() => instanceRef2.current?.next()}
                >
                  <img src="/home/about/right.svg" />
                </button>
              </div>
            </div>
          </Collapse>
        </div>

        <div className="w-full">
          <div
            className={`flex justify-center items-center w-full bg-black text-white mt-4 ${
              expanded ? "rounded-t-lg" : "rounded-lg"
            }   pl-2 pr-2`}
          >
            <p
              /* expand={expanded} */
              onClick={() => {
                setExpanded(!expanded);
              }}
              className="cursor-pointer select-none pl-2 md:pl-6 font-semibold text-red_second lexend-font  "
            >
              {t("home.seventhScreen.content4")}
            </p>

            <ExpandMore
              expand={expanded}
              onClick={() => {
                setExpanded(!expanded);
              }}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon sx={{ color: "#D24949" }} />
            </ExpandMore>
          </div>

          <div className="pl-2 pr-2">
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <div className=" rounded-b-lg p-4 text-black_second lexend-font ">
                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content5")}
                  </p>
                  <p>{t("home.seventhScreen.content6")}</p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content7")}
                  </p>
                  <p>{t("home.seventhScreen.content8")}</p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content9")}
                  </p>
                  <p>{t("home.seventhScreen.content10")}</p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content11")}
                  </p>
                  <p>{t("home.seventhScreen.content12")}</p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content13")}
                  </p>
                  <p>{t("home.seventhScreen.content14")}</p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content15")}
                  </p>
                  <p>{t("home.seventhScreen.content16")}</p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">
                    {t("home.seventhScreen.content17")}
                  </p>
                  <p>{t("home.seventhScreen.content18")}</p>
                </div>
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export { SeventhScreenHome };
