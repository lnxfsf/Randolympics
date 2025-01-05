import "../styles/randomize.scoped.scss";

import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";

import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { useRef, useState, useEffect } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Menu from "@mui/material/Menu";

import { useNavigate } from "react-router-dom";

import { RandomizeItem } from "../components/Randomize/RandomizeItem";
import axios from "axios";
import { FooterClean } from "./FooterClean";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MockupRandomizerSelect } from "./MockupRandomizer/MockupRandomizerSelect";

import { useTranslation } from "react-i18next";
import { t } from "i18next";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

// we just removed  '0_3' , from here, not to show it everything looks fine
// const timeSlots = ["3_6", "6_9", "9_12", "12_15", "15_18", "18_21", "21_24"];

const timeSlots = ["6_9", "9_12", "12_15", "15_18", "18_21", "21_24"];

/*  ja Mms, on ce ici redom ovde, ali samo je fora kad naidje na jul 1, jul 2, koristi taj drugi. odnosno za saturday, moze da proveri bas ako je PRAZAN TAJ, i onda znas da je prvi saturday kao*/
const days = [
  { day: "Saturday", date: "July 8th" },

  { day: "Sunday", date: "July 9th" },
  { day: "Monday", date: "July 10th" },
  { day: "Tuesday", date: "July 11th" },
  { day: "Wednesday", date: "July 12th" },
  { day: "Thursday", date: "July 13th" },
  { day: "Friday", date: "July 14th" },

  { day: "Saturday", date: "July 15th" },

  { day: "Sunday", date: "July 16th" },
];


const whichDay = (date) => {
  switch(date) {
    case "July 8th":
      return t("mockupRandomizer.table2");
      break;
      case "July 9th":
        return t("mockupRandomizer.table3");
        break;
        case "July 10th":
          return t("mockupRandomizer.table4");
          break;
          case "July 11th":
            return t("mockupRandomizer.table5");
            break;
            case "July 12th":
              return t("mockupRandomizer.table6");
              break;

              case "July 13th":
                return t("mockupRandomizer.table7");
                break;

                case "July 14th":
                  return t("mockupRandomizer.table8");
                  break;

                  case "July 15th":
                    return t("mockupRandomizer.table9");
                    break;


                    
                  case "July 16th":
                    return t("mockupRandomizer.table10");
                    break;



  }

}


const Randomize = () => {
  const { t } = useTranslation();

  // with this, you can change any svg, color, so it appears better on hover..
  const [isHovered, setIsHovered] = useState(false);

  const checkBeforeRandomize = () => {
    if (selectedGender && selectedWeightCategory) {
      handleRandomize();
      setShowTable(true);
    } else {
      if (!selectedGender) {
        setSnackbarText(t("mockupRandomizer.content1"));
        setOpenSnackbarError(true);
      } else if (!selectedWeightCategory) {
        setSnackbarText(t("mockupRandomizer.content2"));
        setOpenSnackbarError(true);
      }
    }
  };

  // za toast
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const handleSnackbarErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarError(false);
  };

  const [snackbarText, setSnackbarText] = useState("");

  // ---------

  const [randomizeFormData, setRandomizeFormData] = useState([
    { name: "", email: "", weightCategory: "light", gender: "M" },
  ]);

  const [selectedGender, setSelectedGender] = useState();
  const [selectedWeightCategory, setSelectedWeightCategory] = useState();

  const [oneLandingPageUser, setOneLandingPageUser] = useState();

  const [showTable, setShowTable] = useState(false);

  const [howManyMedals, setHowManyMedals] = useState();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = randomizeFormData.map((data, idx) => {
      if (index === idx) {
        return { ...data, [name]: value };
      }
      return data;
    });
    setRandomizeFormData(newFormData);
  };

  const addInputSet = () => {
    setRandomizeFormData([
      ...randomizeFormData,
      { name: "", email: "", weightCategory: "light", gender: "M" },
    ]);
  };

  const removeInputSet = (index) => {
    setRandomizeFormData(randomizeFormData.filter((_, idx) => idx !== index));
  };

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    changeTextHowManyMedals();

    // so, now we can use it.. so we send this one user only..
    if (selectedWeightCategory && selectedGender) {
      // TODO, this one is for gender, so it uses F or M (we used below one, just so backend can work for M for now..)
      // setOneLandingPageUser([{ name: 'first', email: 'first@gmail.com', weightCategory: selectedWeightCategory, gender: selectedGender }])

      setOneLandingPageUser([
        {
          name: "first",
          email: "first@gmail.com",
          weightCategory: selectedWeightCategory,
          gender: "M",
        },
      ]);
    }
  }, [scheduleData, selectedWeightCategory, selectedGender]);

  const changeTextHowManyMedals = () => {
    switch (scheduleData.length - 2) {
      case 1:
        setHowManyMedals(t("mockupRandomizer.medals1"));
        break;
      case 2:
        setHowManyMedals(t("mockupRandomizer.medals2"));
        break;
      case 3:
        setHowManyMedals(t("mockupRandomizer.medals3"));
        break;
      case 4:
        setHowManyMedals(t("mockupRandomizer.medals4"));
        break;
      case 5:
        setHowManyMedals(t("mockupRandomizer.medals5"));
        break;
      case 6:
        setHowManyMedals(t("mockupRandomizer.medals6"));
        break;
      case 7:
        setHowManyMedals(t("mockupRandomizer.medals7"));
        break;
      case 8:
        setHowManyMedals(t("mockupRandomizer.medals8"));
        break;
    }
  };

  // ---------------

  const navigate = useNavigate();

  const handleRedirectRegister = () => {
    navigate("/register");
  };

  // it is when user clicks, then we send to those friends...
  const sendToFriends = async (e) => {
    e.preventDefault();

    // let's just send

    const tableElement = document.querySelector(".tablez");
    const tableHTML = tableElement.outerHTML;

    var response = await axios.post(
      `${BACKEND_SERVER_BASE_URL}/listsData/shareTableLandingPage`,
      {
        tableHTML: tableHTML,
        emailsToSendTo: randomizeFormData,
      }
    );
  };

  const handleRandomize = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // nece weight biti ! ovde !

    try {
      var response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/landingPageRandomize`,
        {
          params: {
            randomizeFormData: JSON.stringify(oneLandingPageUser),
          },
        }
      );

      setScheduleData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderEventInSlot = (event, day, slot) => {
    const dayIndex = days.findIndex((d) => d.day === event.dayOfStart); // koji je indeks u days listi, ??   dayIndex, je onaj sa podataka.
    // al ovo je isto sa rows, koji je mesto sada..

    const slotIndex = timeSlots.indexOf(slot); // indeks, tog timeSlot-a u taj timeSlots koji je.. (mozda da bi radio sa brojkama..)
    // slotIndex, isto onda mora biti taj koji je sa podataka ! koji je sada trenutno na loop za rows

    const startSlotIndex = timeSlots.indexOf(event.firstDayStartGameTimeSlot); //
    const endSlotIndex = timeSlots.indexOf(event.firstDayEndGameTimeSlot); // isto, koja brojka je u taj indeks za timeSlots.

    if (
      dayIndex === days.findIndex((d) => d.day === day) &&
      slotIndex === startSlotIndex &&
      slotIndex <= endSlotIndex
    ) {
      return (
        <RandomizeItem
          icon="swim"
          name={event.sportName}
          translatedName={event.translatedSportName}
        />
      );
    }

    const secondDayStartSlotIndex = timeSlots.indexOf(
      event.secondDayStartGameTimeSlot
    );
    const secondDayEndSlotIndex = timeSlots.indexOf(
      event.secondDayEndGameTimeSlot
    );

    if (
      dayIndex + 1 === days.findIndex((d) => d.day === day) &&
      slotIndex === secondDayStartSlotIndex &&
      slotIndex <= secondDayEndSlotIndex
    ) {
      return (
        <RandomizeItem
          icon="swim"
          name={event.sportName}
          translatedName={event.translatedSportName}
        />
      );
    }

    const thirdDayStartSlotIndex = timeSlots.indexOf(
      event.thirdDayStartGameTimeSlot
    );
    const thirdDayEndSlotIndex = timeSlots.indexOf(
      event.thirdDayEndGameTimeSlot
    );

    if (
      dayIndex + 2 === days.findIndex((d) => d.day === day) &&
      slotIndex === thirdDayStartSlotIndex &&
      slotIndex <= thirdDayEndSlotIndex
    ) {
      return (
        <RandomizeItem
          icon="swim"
          name={event.sportName}
          translatedName={event.translatedSportName}
        />
      );
    }

    return null;
  };

  const getGameSlot = (data, day, timeSlot) => {
    const startSlot = data.firstDayStartGameTimeSlot;
    const endSlot = data.firstDayEndGameTimeSlot;

    // znaci pocinje gde treba da pocne ?
    if (day.includes(data.dayOfStart) && timeSlot === startSlot) {
      return { icon: "swim", name: data.sportName };
    } else if (
      day.includes(data.dayOfStart) &&
      timeSlot === data.secondDayStartGameTimeSlot
    ) {
      return { icon: "swim", name: data.sportName };
    }

    return null;
  };

  const getSlotIndex = (slot) => {
    return timeSlots.indexOf(slot);
  };

  const getEventSlots = (event) => {
    const slots = [];

    // const startDayIndex = days.findIndex(d => d.day === event.dayOfStart);
    const startDateIndex = days.findIndex((d) => d.date === event.dateOfStart);

    const addSlots = (startDayIndex, startSlot, expandBy) => {
      const startSlotIndex = getSlotIndex(startSlot);

      // if it's singular then
      /*  if(expandBy === 1){ */
      for (let i = 0; i < expandBy; i++) {
        slots.push({ dayIndex: startDayIndex, slotIndex: startSlotIndex + i });
      }
      /*  } else {
 
         for (let i = 0; i < expandBy; i++) {
           slots.push({ dayIndex: startDayIndex, slotIndex: startSlotIndex + i });
         }
       } */
    };

    //al sa ovim filtrom, trebalo bi.

    // Add slots for the first day
    addSlots(
      startDateIndex,
      event.firstDayStartGameTimeSlot,
      event.firstDayHowMuchTimeSlotsExpandBy
    );

    // Add slots for the second day if applicable
    if (event.secondDayStartGameTimeSlot) {
      addSlots(
        startDateIndex + 1,
        event.secondDayStartGameTimeSlot,
        event.secondDayHowMuchTimeSlotsExpandBy
      );
    }

    // Add slots for the third day if applicable
    if (event.thirdDayStartGameTimeSlot) {
      addSlots(
        startDateIndex + 2,
        event.thirdDayStartGameTimeSlot,
        event.thirdDayHowMuchTimeSlotsExpandBy
      );
    }

    return slots;

    // slotIndex

    // === index, problem, je sto on sacuva indeks, ali trebalo bi da sacuva i tekst, uz to sto ide. da bi bio precizan ?? kao "3_6". jer vidis
    // slots je samo array. i on ako ima array=[0]  (prvi element), onda i to ispada kao da je tu o u time, 0_3, 3_6.. a ne treba tako..
  };

  /* table for mobile */
  const satMob24 = () => {
    // Check for match on dayOfStart and dateOfStart
    // WE ‚avoid, those who have opening and closing ceremony, to allow space, for another, on this day.. Backend, always gives us single, so it get off that load..
    if (
      scheduleData.dayOfStart === "Saturday" &&
      scheduleData.dateOfStart === "July 8th" &&
      scheduleData.sportName !== "Opening ceremony"
    ) {
      // Extract start and end time slots
      const startSlot = scheduleData.firstDayStartGameTimeSlot.split("_")[0];
      const endSlot = scheduleData.firstDayEndGameTimeSlot.split("_").pop();

      // Combine and display in <p> element
      return (
        <>
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{scheduleData.sportName}</p>
          </div>
        </>
      );
    }

    // If no match, return null
    return null;
  };

  const sunMob25 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Sunday" && data.dateOfStart === "July 9th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Saturday" &&
        data.dateOfStart === "July 8th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const monMob26 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Monday" && data.dateOfStart === "July 10th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Sunday" &&
        data.dateOfStart === "July 9th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Saturday" &&
        data.dateOfStart === "July 8th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const tueMob27 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Tuesday" && data.dateOfStart === "July 11th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Monday" &&
        data.dateOfStart === "July 10th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Sunday" &&
        data.dateOfStart === "July 9th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const wedMob28 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Wednesday" && data.dateOfStart === "July 12th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Tuesday" &&
        data.dateOfStart === "July 11th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Monday" &&
        data.dateOfStart === "July 10th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const thuMob29 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Thursday" && data.dateOfStart === "July 13th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Wednesday" &&
        data.dateOfStart === "July 12th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Tuesday" &&
        data.dateOfStart === "July 11th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const friMob30 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Friday" && data.dateOfStart === "July 14th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Thursday" &&
        data.dateOfStart === "July 13th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Wednesday" &&
        data.dateOfStart === "July 12th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const satJulMob1 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (data.dayOfStart === "Saturday" && data.dateOfStart === "July 15th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Friday" &&
        data.dateOfStart === "July 14th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Thursday" &&
        data.dateOfStart === "July 13th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0 &&
        data.sportName !== "Opening ceremony"
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  const sunJulMob2 = () => {
    // Data object (you'll likely receive this as a prop or from state)

    /* 
return dataS.map((data, index) => { */

    for (let i = 0; i < scheduleData.length; i++) {
      const data = scheduleData[i];

      // Check for match on dayOfStart and dateOfStart
      if (
        data.dayOfStart === "Sunday" &&
        data.dateOfStart === "July 16th" &&
        data.sportName !== "Closing ceremony"
      ) {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Saturday" &&
        data.dateOfStart === "July 15th" &&
        data.secondDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      } else if (
        data.dayOfStart === "Friday" &&
        data.dateOfStart === "July 14th" &&
        data.thirdDayHowMuchTimeSlotsExpandBy > 0
      ) {
        // and this is to check for previous day, if there's no entry for current one !
        // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

        const startSlot = data.thirdDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.thirdDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
          <div className="bg-gray_second  flex gap-4 p-1 rounded-md">
            <p className="font-medium">
              {startSlot} - {endSlot}
            </p>
            <p>{data.sportName}</p>
          </div>
        );
      }
    }

    // If no match, return null
    return null;
  };

  return (
    <>
      <Navbar />

      <div className="lexend-font text-black_second">
        <h1 className="flex text-2xl text-center md:text-4xl mt-8 justify-center font-bold">
          {t("mockupRandomizer.content3")}
        </h1>
      </div>

      {/* before table is rendered */}
      {!showTable && (
        <>
          <MockupRandomizerSelect
            setSelectedGender={setSelectedGender}
            selectedGender={selectedGender}
            setSelectedWeightCategory={setSelectedWeightCategory}
            selectedWeightCategory={selectedWeightCategory}
            checkBeforeRandomize={checkBeforeRandomize}
          />
        </>
      )}

      {/* table of results */}
      {selectedGender && selectedWeightCategory && showTable && (
        <>
          <p className="font-medium text-black_second lexend-font text-center m-4">
            {t("mockupRandomizer.content4")} {howManyMedals}{" "}
            {t("mockupRandomizer.content5")} - {howManyMedals}{" "}
            {t("mockupRandomizer.content6")}. 🤩
          </p>

          {/* sports items in circles */}
          <div className="w-full md:flex md:justify-center">
            <div className="grid grid-cols-2  md:grid-cols-3 justify-center items-center flex-wrap gap-8 xl:gap-12 2xl:gap-16 text-black_second lexend-font font-bold text-sm md:text-base text-center w-full md:w-[80%] lg:w-[70%] xl:w-[60%]  mt-8 p-4">
              {scheduleData.map((data, index) => {
                /*    data.icon
        data.sportName 
        
        let icon_url = "randomize/" + icon + ".svg";
        
        */

                if (
                  data.sportName === "Opening ceremony" ||
                  data.sportName === "Closing ceremony"
                ) {
                  return null;
                }

                return (
                  <>
                    <div className="flex flex-col justify-center items-center ">
                      <div className="  flex flex-col justify-center items-center  competitionItem cursor-pointer select-none">
                        <img
                          width={"30px"}
                          height={"30px"}
                          src={`randomize/${data.icon}.svg`}
                        />
                      </div>

                      <p className="mt-7 text-center w-[70%]">
                         { t(`sports.${data.translatedSportName}`) }
                       {/*  {data.sportName} */}
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          {/* table for PC */}
          <div className="hidden lg:flex justify-center items-center  w-full p-16">
            <table className="tablez lexend-font text-black_second xl:w-[90%] 2xl:w-[70%] ">
              <thead>
                <tr>
                  <th className="thz font-medium">
                    {t("mockupRandomizer.table1")}
                  </th>
                  {timeSlots.map((slot) => (
                    <th key={slot} className="thz font-medium">
                      {slot.replace("_", "-")} h
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
            

                {days.map(({ day, date }) => (



                  


                  /* ovo je jedan row ! */
                  <tr key={date}>
                    <th className="thz font-medium">
                      {/* {day} {date.slice(-4)} */}
                      {whichDay(date)}
                    </th>

                    {/* prolazi kroz svaki, pocev od '00_03' , koji je onda "slot", , ali slot je onda ime.. (stringa) index 0 vrv
                     */}
                    {timeSlots.map((slot, index) => {
                      // ako ima nesto u ovome, da vraca, taj event, taj entry da ga ima... uopste onda prikazuje ovde dole

                      const event = scheduleData.find((event) =>
                        getEventSlots(event).some(
                          (slotData) =>
                            slotData.dayIndex ===
                              days.findIndex((d) => d.date === date) &&
                            slotData.slotIndex === index
                        )
                      );

                      return (
                        <td
                          key={slot}
                          className="tdz"
                          /*  style={{
                            backgroundColor:
                              (event && event.icon) === "olympic_flame"
                                ? "yellow"
                                : event
                                ? "#BB9A9A"
                                : "",
                          }}
                                
                          

                          icon={event.icon}

                          
                          */
                        >
                          {event ? (
                            <RandomizeItem
                              name={event.sportName}
                              translatedName={event.translatedSportName}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* //TODO table for mobile */}
          <div className=" flex flex-col p-4 md:p-16 lexend-font text-black_second lg:hidden">
            <div className="flex  flex-col">
              <p className="m-2 ml-0 mt-4">{t("mockupRandomizer.table2")}</p>

              <div className="bg-gray_second mb-2 flex gap-4 p-1 rounded-md">
                <p className="font-medium">6 - 9</p>
                <p>{t("mockupRandomizer.sport1")}</p>
              </div>

              {satMob24()}
            </div>

            {sunMob25 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table3")}
                  </p>

                  {sunMob25()}
                </div>
              </>
            )}

            {monMob26 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table4")}
                  </p>

                  {monMob26()}
                </div>
              </>
            )}

            {tueMob27 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table5")}
                  </p>

                  {tueMob27()}
                </div>
              </>
            )}

            {wedMob28 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table6")}
                  </p>

                  {wedMob28()}
                </div>
              </>
            )}

            {thuMob29 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table7")}
                  </p>

                  {thuMob29()}
                </div>
              </>
            )}

            {friMob30 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table8")}
                  </p>

                  {friMob30()}
                </div>
              </>
            )}

            {satJulMob1 && (
              <>
                <div className="flex  flex-col">
                  <p className="m-2 ml-0 mt-4">
                    {t("mockupRandomizer.table9")}
                  </p>

                  {satJulMob1()}
                </div>
              </>
            )}

            {/* // TODO, and one more thing, is to HIDE, if there is NO , in that function. you can create quick check { } with that function, if that returns anything (make sure to return null, if there's no match), so, we don't show this day then..  */}
            <div className="flex  flex-col">
              <p className="m-2 ml-0 mt-4">{t("mockupRandomizer.table10")}</p>

              {sunJulMob2()}

              <div className="bg-gray_second mt-2 flex gap-4 p-1 rounded-md">
                <p className="font-medium">12 - 15</p>
                <p>{t("mockupRandomizer.sport2")}</p>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div>
            {/* // da, znaci, kada selektuje i gender i weight category, onda, moze da prikaze ovaj dole "form". 
        
        
        
        
        */}

            <div className="flex justify-center w-full flex-col md:flex-row items-center p-8 gap-2">
              <Button
                onClick={handleRandomize}
                className="w-full "
                style={{ textTransform: "none" }}
                sx={{
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
                id="randomize-btn"
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={
                    isHovered
                      ? "randomizer/dice_hover.svg"
                      : "randomizer/dice.svg"
                  }
                  className="w-6  mr-2 mb-1"
                />
                <span className="lexend-font">
                  {t("mockupRandomizer.content7")}
                </span>
              </Button>

              <Button
                onClick={() => {
                  navigate("/supporters");
                }}
                className="w-full"
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
                type="submit"
              >
                <span className="lexend-font">
                  {t("mockupRandomizer.content8")}
                </span>
              </Button>
            </div>
          </div>

          {/* share to friends */}
          {/*   <form
            action="#"
            className="sign-in-form flex flex-col wrap justify-start items-center"
            onSubmit={sendToFriends}
          >
            {randomizeFormData.map((data, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                {/*   <input
                type="text"
                name="name"
                placeholder="Name"
                value={data.name}
                onChange={(event) => handleInputChange(index, event)}
              /> 

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(event) => handleInputChange(index, event)}
                />

                {/* 
              <select
                name="weightCategory"
                value={data.weightCategory}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select> */}

          {/* 
              <select
                name="gender"
                value={data.gender}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="M">Man</option>
                <option value="F">Woman</option>

              </select>
 */}

          {/*    <button type="button" onClick={() => removeInputSet(index)}>
                Remove
              </button>
 
              </div>
            ))}

            <button type="button" onClick={addInputSet}>
              {t("mockupRandomizer.content9")}
            </button>

            <div>
              <Button
                onClick={sendToFriends}
                className="w-44 "
                style={{ marginTop: "20px" }}
                sx={{
                  height: "60px",
                  bgcolor: "#AF2626",
                  color: "#fff",
                  borderRadius: 25,
                  border: `1px solid #AF2626`,
                  "&:hover": {
                    background: "rgb(196, 43, 43)",
                    color: "white",
                    border: `1px solid rgb(196, 43, 43)`,
                  },
                }}
                type="submit"
              >
                <span className="popins-font">
                  {t("mockupRandomizer.content10")}
                </span>
              </Button>
            </div>
          </form> */}
        </>
      )}

      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleSnackbarErrorClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
      <FooterClean />
    </>
  );
};

export { Randomize };
