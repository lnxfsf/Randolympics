import { useEffect, useState } from "react";
import "../../styles/home.scoped.scss";

import { Button } from "@mui/material";

const ImagineHomeScreen = () => {
  const lines = Array.from({ length: 100 });

  return (
    <>
      <div className="flex w-full justify-center items-center lexend-font text-black_second flex-col">
        <div className="  p-8 w-full 2xl:w-[70%]">
          <p className=" font-bold text-3xl md:text-4xl ">Imagine</p>

          <div className="flex justify-between flex-col gap-y-2 md:flex-row">
            <p className=" font-medium sm:text-lg md:text-xl mt-2 mb-4 md:mb-0">
              Your boss completing a triathlon.
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
              <p className="font-medium text-black_second  p-2 pl-3">It will be fun to watch!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ImagineHomeScreen };
