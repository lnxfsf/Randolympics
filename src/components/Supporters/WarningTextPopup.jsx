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
      <div className="flex justify-center items-center flex-col ">
      
        <p className="text-center w-[50%] font-semibold text-2xl mb-2 mt-2">{randomTitle}</p>
        <p className="text-center w-[75%] font-semibold text-xl">{randomText}</p>

        <Button
          onClick={() => {
            setSecondIsVisible(false);
            setThirdIsVisible(true);
            
            setPopupWarning(false); // then close this popup
          }}
          className="w-56"
          style={{ marginTop: "25px", marginBottom: "25px" }}
          sx={{
            height: "50px",
            bgcolor: "#AF2626",
            color: "#fff",
            borderRadius: 4,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgb(175, 38, 38)",
              color: "white",
              border: `1px solid rgb(175, 38, 38)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="popins-font">Proceed anyways</span>
        </Button>
      </div>
    </>
  );
};

export { WarningTextPopup };
