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
  const { t, i18n } = useTranslation();

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
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

      slideChanged() {
        
      },
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
      loop: true,
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

      slideChanged() {
        
      },
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
      <div className="flex items-start lexend-font text-black_second flex-col">
        <p className="text-4xl font-bold ml-6 mt-6">About us</p>

        <p className="text-3xl font-bold ml-6 mt-8 mb-8">Our Advisory Board</p>

        <div ref={sliderRef} className="keen-slider w-32">
          <div className="keen-slider__slide    flex flex-col justify-center items-center">
            <img src="/home/about/1.jpg" className="h-48 mb-4 object-contain" />

            {/*  <div className="item_div">
                    <img src="/home/about/1.jpg" />
            </div> */}

            <p className="font-bold ">Alex Carter</p>
            <p className="text-[#616673]">Advisory Board Member</p>
          </div>

          <div className="keen-slider__slide   flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/2.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                    <img src="/home/about/1.jpg" />
            </div> */}

            <p className="font-bold">Liam Patel</p>
            <p className="text-[#616673]">Advisory Board Member</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/3.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                   <img src="/home/about/1.jpg" />
           </div> */}

            <p className="font-bold">Michael Thompson</p>
            <p className="text-[#616673]">Member</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/4.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                   <img src="/home/about/1.jpg" />
           </div> */}

            <p className="font-bold">James Walker</p>
            <p className="text-[#616673]">Member</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/5.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                   <img src="/home/about/1.jpg" />
           </div> */}

            <p className="font-bold">David Wilson</p>
            <p className="text-[#616673]">Member</p>
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

        <p className="text-3xl font-bold ml-6 mt-8 mb-8">Our Management Team</p>

        <div ref={sliderRef2} className="keen-slider w-32">
      
          <div className="keen-slider__slide    flex flex-col justify-center items-center">
            <img src="/home/about/6.jpg" className="h-48 mb-4 object-contain" />

            {/*  <div className="item_div">
                    <img src="/home/about/1.jpg" />
            </div> */}

            <p className="font-bold ">Noah Bennett</p>
            <p className="text-[#616673]">{t("userTypes.user_type2")}</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/7.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                    <img src="/home/about/1.jpg" />
            </div> */}

            <p className="font-bold">Ethan Brooks</p>
            <p className="text-[#616673]">{t("userTypes.user_type6")}</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/8.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                   <img src="/home/about/1.jpg" />
           </div> */}

            <p className="font-bold">Henry Foster</p>
            <p className="text-[#616673]">{t("userTypes.user_type11")}</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/9.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                   <img src="/home/about/1.jpg" />
           </div> */}

            <p className="font-bold">Mia Cooper</p>
            <p className="text-[#616673]">{t("userTypes.user_type8")}</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img
              src="/home/about/10.jpg"
              className="h-48 mb-4 object-contain"
            />
            {/*  </div> */}

            {/*  <div className="item_div">
                   <img src="/home/about/1.jpg" />
           </div> */}

            <p className="font-bold">Amelia Ross</p>
            <p className="text-[#616673]">{t("userTypes.user_type7")}</p>
          </div>



          <div className="keen-slider__slide    flex flex-col justify-center items-center">
            <img src="/home/about/6.jpg" className="h-48 mb-4 object-contain" />

            {/*  <div className="item_div">
                    <img src="/home/about/1.jpg" />
            </div> */}

            <p className="font-bold ">Noah Bennett</p>
            <p className="text-[#616673]">{t("userTypes.user_type9")}</p>
          </div>

          <div className="keen-slider__slide    flex flex-col justify-center items-center  ">
            {/* <div className="flex justify-center "> */}
            <img src="/home/about/7.jpg" className="h-48 mb-4 object-contain" />
            {/*  </div> */}

            {/*  <div className="item_div">
                    <img src="/home/about/1.jpg" />
            </div> */}

            <p className="font-bold">Ethan Brooks</p>
            <p className="text-[#616673]">{t("userTypes.user_type4")}</p>
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

        <div className="w-full">
          <div
            className={`flex  items-center w-full bg-black text-white mt-4 ${
              expanded ? "rounded-t-lg" : "rounded-lg"
            }   pl-2 pr-2`}
          >
            <p
              expand={expanded}
              onClick={() => {
                setExpanded(!expanded);
              }}
              className="cursor-pointer select-none  pl-2 font-semibold text-red_second lexend-font "
            >
              Read more about management structure
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

          <div className="">
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            
              <div className=" rounded-b-lg p-4 text-black_second lexend-font ">
                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">Global President</p>
                  <p>
                    The Global President selects the management team and
                    oversees all operations, ensuring Randolympics' vision is
                    executed effectively worldwide.
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">Marketing Manager</p>
                  <p>
                    Develops and executes global marketing strategies, ensuring
                    strong engagement and visibility for the Randolympics
                    movement.
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">Sales Manager</p>
                  <p>
                    Responsible for securing sponsorships, partnerships, and
                    deals that support the growth and financial health of
                    Randolympics.
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">IT Manager</p>
                  <p>
                    Oversees the technical infrastructure and digital platforms,
                    ensuring seamless experiences for participants and
                    supporters globally.
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">Legal Manager</p>
                  <p>
                    Manages all legal aspects, ensuring that Randolympics
                    complies with international regulations and protects the
                    interests of the organization.
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">Validation Manager</p>
                  <p>
                    Verifies accounts, donations, and transactions to maintain
                    the transparency and security of our platform.
                  </p>
                </div>

                <div className="mt-4 mb-4">
                  <p className="text-2xl font-bold">Event Manager</p>
                  <p>
                    Organizes key events like the Stockholm 2028 Games, ensuring
                    everything runs smoothly, from logistics to athlete
                    management.
                  </p>
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
