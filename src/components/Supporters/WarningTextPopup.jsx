import { Button } from "@mui/material";

const WarningTextPopup = ({
  setSecondIsVisible,
  setThirdIsVisible,
  setPopupWarning,
  popupWarning,
}) => {


    const titlesOfText = ["Watch out !", "Be careful !", "Take care !"];

    const listOfText = ["Your friend could face a Turkmenistan gorilla in a boxing match !",
        "Your friend could underperform in weightlifting in front of a lot of girls in the audience !",
        "Your friend could be very upset with you if he gets humiliated by a Chinese prodigy in Table Tennis !"
    ];


    const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

    const randomIndex = getRandomIndex(titlesOfText);

    const randomTitle = titlesOfText[randomIndex];
    const randomText = listOfText[randomIndex];

  return (
    <>
      <div className="flex justify-center items-center flex-col lexend-font text-black_second">
      
        <p className="text-center w-[80%] md:w-[50%] font-semibold text-2xl mb-2 mt-2">{randomTitle}</p>
        <p className="text-center w-[95%] md:w-[75%] font-semibold text-xl">{randomText}</p>


<div className="w-full p-2 flex items-center justify-center">
        <Button
          onClick={() => {
            setSecondIsVisible(false);
            setThirdIsVisible(true);
            
            setPopupWarning(false); // then close this popup
          }}
          className="w-full md:w-56"
          style={{ marginTop: "25px", marginBottom: "25px", textTransform: "none" }}
         
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

          id="join-the-fun-btn"
        >
          <span className="lexend-font">Proceed anyways</span>
        </Button>
        </div>

      </div>
    </>
  );
};

export { WarningTextPopup };
