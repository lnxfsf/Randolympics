import { Button } from "@mui/material";

import {useTranslation} from "react-i18next";


const WarningTextPopup = ({
  isCelebrity,
  setSecondIsVisible,
  setThirdIsVisible,
  setPopupWarning,
  popupWarning,
}) => {

  const { t } = useTranslation();


  const titlesOfTextFrie = [
    
    t('campaign.warningPopupFriTitle1'),
    t('campaign.warningPopupFriTitle2'),
    t('campaign.warningPopupFriTitle3')
    
];

  const listOfTextFrie = [
    t('campaign.warningPopupFriText1'),
    t('campaign.warningPopupFriText2'),
    t('campaign.warningPopupFriText3'),
    t('campaign.warningPopupFriText4'),
    t('campaign.warningPopupFriText5'),
    t('campaign.warningPopupFriText6'),
    t('campaign.warningPopupFriText7'),
    t('campaign.warningPopupFriText8'),
    t('campaign.warningPopupFriText9'),
    t('campaign.warningPopupFriText10'),
    t('campaign.warningPopupFriText11'),
    t('campaign.warningPopupFriText12'),
  ];

  const titlesOfTextCeleb = [
    t('campaign.warningPopupCelebTitle1'),
    t('campaign.warningPopupCelebTitle2'),
    t('campaign.warningPopupCelebTitle3'),
  
  ];

  const listOfTextCeleb = [
    t('campaign.warningPopupCelebText1'),
    t('campaign.warningPopupCelebText2'),
    t('campaign.warningPopupCelebText3'),
    t('campaign.warningPopupCelebText4'),
    t('campaign.warningPopupCelebText5'),
    t('campaign.warningPopupCelebText6'),
    t('campaign.warningPopupCelebText7'),
    t('campaign.warningPopupCelebText8'),
    t('campaign.warningPopupCelebText9'),
    t('campaign.warningPopupCelebText10'),
   
  ];

  const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

  const randomIndexTitleFriend = getRandomIndex(titlesOfTextFrie);
  const randomIndexContentFriend = getRandomIndex(listOfTextFrie);


  const randomIndexTitleCeleb = getRandomIndex(titlesOfTextCeleb);
  const randomIndexContentCeleb = getRandomIndex(listOfTextCeleb);

  
  

  var randomTitle;
  var randomText;


  if (isCelebrity) {
    randomTitle = titlesOfTextCeleb[randomIndexTitleCeleb];
    randomText = listOfTextCeleb[randomIndexContentCeleb];
  } else {
    randomTitle = titlesOfTextFrie[randomIndexTitleFriend];
    randomText = listOfTextFrie[randomIndexContentFriend];
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col lexend-font text-black_second">
        <p className="text-center w-[80%] md:w-[50%] font-semibold text-2xl mb-2 mt-2">
          {randomTitle}
        </p>
        <p className="text-center w-[95%] md:w-[75%] font-semibold text-xl">
          {randomText}
        </p>

        <div className="w-full p-2 flex items-center justify-center">
          <Button
            onClick={() => {
              setSecondIsVisible(false);
              setThirdIsVisible(true);

              setPopupWarning(false); // then close this popup
            }}
            className="w-full md:w-56"
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              textTransform: "none",
            }}
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
