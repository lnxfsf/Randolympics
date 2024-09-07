import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";



const MockupRandomizerSelect = ({
  setSelectedGender,
  selectedGender,
  setSelectedWeightCategory,
  selectedWeightCategory,
  checkBeforeRandomize,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="flex w-full p-4 md:w-[50%] 2xl:w-[30%]  mt-8 text-black_second lexend-font flex-col ">
          <p className="text-xl md:text-2xl font-medium ">Select your gender</p>


        {/* gender */}
          <div className="flex w-full gap-4 mt-4 ">
            <div
              onClick={() => {
                setSelectedGender("M");
              }}
              className={`border-2 ${
                selectedGender === "M"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedGender === "M" ? (
                <>
                  <img
                    src="/randomizer/male_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/male.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedGender === "M"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2 `}
              >
                Male
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedGender("F");
              }}
              className={`border-2 ${
                selectedGender === "F"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedGender === "F" ? (
                <>
                  <img
                    src="/randomizer/female_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/female.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedGender === "F"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                Female
              </p>
            </div>
          </div>
        </div>

        {/* weight category */}
        <div className="flex w-full p-4  md:w-[50%] 2xl:w-[30%] mt-8 text-black_second lexend-font flex-col ">
        
        <div className="flex justify-between">
          <p className="text-xl md:text-2xl font-medium ">
            Select your weight category
          </p>

          

        <Popup
          trigger={<img src="/randomizer/info.svg" className="cursor-pointer select-none"/>}
          
          position="right center"
          className="popup-content "
          modal
          closeOnDocumentClick
        >
            <div className="p-4">
            
                <div>


                   <p className="text-2xl md:text-3xl  lexend-font text-black_second text-center font-bold">Weight category</p>
                </div>


                <div className="flex flex-col  lexend-font text-black_second text-start font-medium gap-2 mt-4 mb-4">
                    <p className="text-xl md:text-2xl  lexend-font text-black_second text-start font-bold">Male</p>

                    <p>Light category is below 74 kg / 163 lbs</p> 

                    <p>Medium category is in between of 74 kg / 163 lbs and 90 kg / 198 lbs</p>

                    <p>Heavy category is above 90 kg / 198 lbs</p>

                </div>

               
                <div className="w-full flex justify-center" >
                    <hr className="w-[80%]"/>
                </div>

                <div className="flex flex-col  lexend-font text-black_second text-start font-medium gap-2 mt-4">
                    <p className="text-xl md:text-2xl  lexend-font text-black_second text-start font-bold">Female</p>

                    <p>Light category is below 62 kg / 137 lbs</p> 

                    <p>Medium category is in between of 62 kg / 137 lbs and 76 kg / 168 lbs</p>

                    <p>Heavy category is above 76 kg / 168 lbs</p>


                </div>
            
            </div>
            
        </Popup>

       
        </div>
        
          <div className="flex w-full gap-4 mt-4 ">
            <div
              onClick={() => {
                setSelectedWeightCategory("light");
              }}
              className={`border-2 ${
                selectedWeightCategory === "light"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedWeightCategory === "light" ? (
                <>
                  <img
                    src="/randomizer/light_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/light.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedWeightCategory === "light"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                Light
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedWeightCategory("medium");
              }}
              className={`border-2 ${
                selectedWeightCategory === "medium"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedWeightCategory === "medium" ? (
                <>
                  <img
                    src="/randomizer/medium_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/medium.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedWeightCategory === "medium"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                Medium
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedWeightCategory("heavy");
              }}
              className={`border-2 ${
                selectedWeightCategory === "heavy"
                  ? "border-red_second"
                  : "border-black_second"
              } basis-1/2 justify-center items-center flex flex-col rounded-lg cursor-pointer select-none`}
            >
              {selectedWeightCategory === "heavy" ? (
                <>
                  <img
                    src="/randomizer/heavy_selected.svg"
                    className="m-4 mb-0"
                  />
                </>
              ) : (
                <>
                  <img src="/randomizer/heavy.svg" className="m-4 mb-0" />
                </>
              )}

              <p
                className={`${
                  selectedWeightCategory === "heavy"
                    ? "text-red_second"
                    : "text-black_second"
                } lexend-font m-4 mt-2`}
              >
                Heavy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex  justify-center items-center m-8">
        <div className=" md:w-[50%] w-[100%] 2xl:w-[30%] ">
          <Button
            onClick={checkBeforeRandomize}
            className="w-full "
            style={{ textTransform: "none" }}
            sx={{
              height: "50px",
              bgcolor: "#D24949",

              color: "#fff",
              borderRadius: 3,
              border: `1px solid #D24949`,
              "&:hover": {
                background: "rgba(210, 73, 73, 1)",
                color: "white",
                border: `1px solid rgba(210, 73, 73, 1)`,
              },
            }}
            id="randomize-btn"
          >
            <span className="lexend-font">Randomize</span>
          </Button>

          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="w-full "
            style={{ textTransform: "none" }}
            sx={{
              mt: 1,
              height: "50px",
              bgcolor: "#fff",
              color: "#444444",
              borderRadius: 3,
              border: `1px solid #444444`,
              "&:hover": {
                background: "rgba(210, 73, 73, 1)",
                color: "white",
                border: `1px solid rgba(210, 73, 73, 1)`,
              },
            }}
            id="join-the-fun-btn"
          >
            <img src="supporters/left_arrow.svg" className="mr-2" />{" "}
            <span className="lexend-font">Go Back</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export { MockupRandomizerSelect };
