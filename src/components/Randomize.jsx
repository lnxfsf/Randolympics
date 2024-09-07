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

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

// we just removed  '0_3' , from here, not to show it everything looks fine
const timeSlots = ["3_6", "6_9", "9_12", "12_15", "15_18", "18_21", "21_24"];

/*  ja Mms, on ce ici redom ovde, ali samo je fora kad naidje na jul 1, jul 2, koristi taj drugi. odnosno za saturday, moze da proveri bas ako je PRAZAN TAJ, i onda znas da je prvi saturday kao*/
const days = [
  { day: "Saturday", date: "June 24th" },

  { day: "Sunday", date: "June 25th" },
  { day: "Monday", date: "June 26th" },
  { day: "Tuesday", date: "June 27th" },
  { day: "Wednesday", date: "June 28th" },
  { day: "Thursday", date: "June 29th" },
  { day: "Friday", date: "June 30th" },

  { day: "Saturday", date: "July 1st" },

  { day: "Sunday", date: "July 2nd" },
];

const Randomize = () => {
  const checkBeforeRandomize = () => {
    if (selectedGender && selectedWeightCategory) {
      handleRandomize();
      setShowTable(true);
    } else {
      if (!selectedGender) {
        setSnackbarText("Choose gender");
        setOpenSnackbarError(true);
      } else if (!selectedWeightCategory) {
        setSnackbarText("Choose weight category");
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

  const [scheduleData, setScheduleData] = useState([
    {
      name: "first",
      email: "first@gmail.com",
      weightCategory: "light",
      gender: "F",
      sportName: "Men's 50m Freestyle Swimming",
      howMuchAthletesMakeATeam: 1,
      locations: 1,
      firstDayHowMuchTimeSlotsExpandBy: 1,
      secondDayHowMuchTimeSlotsExpandBy: 1,
      thirdDayHowMuchTimeSlotsExpandBy: 0,
      firstDayStartGameTimeSlot: "12_15",
      firstDayEndGameTimeSlot: "12_15",
      secondDayStartGameTimeSlot: "9_12",
      secondDayEndGameTimeSlot: "9_12",
      thirdDayStartGameTimeSlot: "",
      thirdDayEndGameTimeSlot: "",
      dayOfStart: "Sunday",
    },
    {
      name: "first",
      email: "first@gmail.com",
      weightCategory: "light",
      gender: "F",
      sportName: "Men's Team All-Around Artistic Gymnastics",
      howMuchAthletesMakeATeam: 5,
      locations: 1,
      firstDayHowMuchTimeSlotsExpandBy: 4,
      secondDayHowMuchTimeSlotsExpandBy: 2,
      thirdDayHowMuchTimeSlotsExpandBy: 0,
      firstDayStartGameTimeSlot: "6_9",
      firstDayEndGameTimeSlot: "15_18",
      secondDayStartGameTimeSlot: "6_9",
      secondDayEndGameTimeSlot: "9_12",
      thirdDayStartGameTimeSlot: "",
      thirdDayEndGameTimeSlot: "",
      dayOfStart: "Wednesday",
    },
  ]);

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
        setHowManyMedals("one");
        break;
      case 2:
        setHowManyMedals("two");
        break;
      case 3:
        setHowManyMedals("three");
        break;
      case 4:
        setHowManyMedals("four");
        break;
      case 5:
        setHowManyMedals("five");
        break;
      case 6:
        setHowManyMedals("six");
        break;
      case 7:
        setHowManyMedals("seven");
        break;
      case 8:
        setHowManyMedals("eight");
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
            randomizeFormData: oneLandingPageUser,
          },
        }
      );

      console.log("a sta jeste funkcija:");
      console.log(response.data);

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
      return <RandomizeItem icon="swim" name={event.sportName} />;
    }

    const secondDayStartSlotIndex = timeSlots.indexOf(
      event.secondDayStartGameTimeSlot
    );
    const secondDayEndSlotIndex = timeSlots.indexOf(
      event.secondDayEndGameTimeSlot
    );

    // ! znaci, start slot, mora da ima.. uvek pocetno vrv..
    // samo, na ovaj sledeci dan, (row) to prikaze.. dan..  da.. (uh, samo slot, time table treba ). jer on ce ovako, i prikazivati podatke ..
    if (
      dayIndex + 1 === days.findIndex((d) => d.day === day) &&
      slotIndex === secondDayStartSlotIndex &&
      slotIndex <= secondDayEndSlotIndex
    ) {
      return <RandomizeItem icon="swim" name={event.sportName} />;
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
      return <RandomizeItem icon="swim" name={event.sportName} />;
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

    // ! const startDayIndex = days.findIndex(d => d.day === event.dayOfStart);
    const startDateIndex = days.findIndex((d) => d.date === event.dateOfStart);

    const addSlots = (startDayIndex, startSlot, expandBy) => {
      const startSlotIndex = getSlotIndex(startSlot);

      // if it's singular then
      /*  if(expandBy === 1){ */
      for (let i = 0; i < expandBy; i++) {
        slots.push({ dayIndex: startDayIndex, slotIndex: startSlotIndex + i });
      }
      /*  } else {
 
         // ! ovde je bio <= , ali je izgleda izbacivao dodatni jedan..
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
    // Data object (you'll likely receive this as a prop or from state)
    const data = {
        name: "first",
        email: "first@gmail.com",
        weightCategory: "medium",
        gender: "M",
        sportName: "Opening ceremony",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        firstDayStartGameTimeSlot: "6_9",
        firstDayEndGameTimeSlot: "6_9",
        secondDayStartGameTimeSlot: "",
        secondDayEndGameTimeSlot: "",
        thirdDayStartGameTimeSlot: "",
        thirdDayEndGameTimeSlot: "",
        dayOfStart: "Saturday",
        dateOfStart: "June 24th",
        icon: "olympic_flame"
    };

    // Check for match on dayOfStart and dateOfStart
    if (data.dayOfStart === "Saturday" && data.dateOfStart === "June 24th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        // Combine and display in <p> element
        return (
            <p>{startSlot} - {endSlot}</p>
        );
    }



    // If no match, return null
    return null;
};


const dataS = [{
  name: "first",
  email: "first@gmail.com",
  weightCategory: "medium",
  gender: "M",
  sportName: "game",
  howMuchAthletesMakeATeam: 1,
  locations: 1,
  firstDayHowMuchTimeSlotsExpandBy: 1,
  secondDayHowMuchTimeSlotsExpandBy: 0,
  thirdDayHowMuchTimeSlotsExpandBy: 0,
  firstDayStartGameTimeSlot: "6_9",
  firstDayEndGameTimeSlot: "6_9",
  secondDayStartGameTimeSlot: "",
  secondDayEndGameTimeSlot: "",
  thirdDayStartGameTimeSlot: "",
  thirdDayEndGameTimeSlot: "",
  dayOfStart: "Sundy",
  dateOfStart: "June 25th",
  icon: "olympic_flame"
}, 
{
name: "first",
email: "first@gmail.com",
weightCategory: "medium",
gender: "M",
sportName: "Opening ceremony",
howMuchAthletesMakeATeam: 1,
locations: 1,
firstDayHowMuchTimeSlotsExpandBy: 1,
secondDayHowMuchTimeSlotsExpandBy: 1,
thirdDayHowMuchTimeSlotsExpandBy: 0,
firstDayStartGameTimeSlot: "6_9",
firstDayEndGameTimeSlot: "6_9",
secondDayStartGameTimeSlot: "8_9",
secondDayEndGameTimeSlot: "22_23",
thirdDayStartGameTimeSlot: "",
thirdDayEndGameTimeSlot: "",
dayOfStart: "Saturday",
dateOfStart: "June 24th",
icon: "olympic_flame"
}
];


const sunMob25 = () => {
  // Data object (you'll likely receive this as a prop or from state)


/* 
return dataS.map((data, index) => { */

  for (let i = 0; i < dataS.length; i++) {


    const data = dataS[i];


    // Check for match on dayOfStart and dateOfStart
    if (data.dayOfStart === "Sunday" && data.dateOfStart === "June 25th") {
        // Extract start and end time slots
        const startSlot = data.firstDayStartGameTimeSlot.split("_")[0];
        const endSlot = data.firstDayEndGameTimeSlot.split("_").pop();

        console.log("stampa ovaj prvi  ? ")

        // Combine and display in <p> element
        return (
            <p>{startSlot} - {endSlot}</p>
        );
        
    }else if (data.dayOfStart === "Saturday" && data.dateOfStart === "June 24th" && (data.secondDayHowMuchTimeSlotsExpandBy > 0)) {
      // and this is to check for previous day, if there's no entry for current one ! 
      // only difference is that, it checks different dates, i.e. from that previous day ! so in this way, it continues on this day... the one from previous sport (you can easily get it's name as well)

      console.log("stampa ovaj drugo ? ")

      const startSlot = data.secondDayStartGameTimeSlot.split("_")[0];
      const endSlot = data.secondDayEndGameTimeSlot.split("_").pop();

      // Combine and display in <p> element
      return (
          <p>{startSlot} - {endSlot}</p>
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
          Let’s see your schedule for June 2028
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
            Congratulations: You would compete in {howManyMedals} disciplines -{" "}
            {howManyMedals} chances to win a gold medal and eternal fame. 🤩
          </p>

          <table className="tablez">
            <thead>
              <tr>
                <th className="thz">Date</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className="thz">
                    {slot.replace("_", "-")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(({ day, date }) => (
                /* ovo je jedan row ! */
                <tr key={date}>
                  <th className="thz">
                    {day} ({date})
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
                        style={{
                          backgroundColor:
                            (event && event.icon) === "olympic_flame"
                              ? "yellow"
                              : event
                              ? "#BB9A9A"
                              : "",
                        }}
                      >
                        {event ? (
                          <RandomizeItem
                            icon={event.icon}
                            name={event.sportName}
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




              {/* //TODO table for mobile */}
              <div>
                <div className="flex gap-4">
                  <p>Saturday 24th</p>
                  
                  {satMob24()}

                </div>

                <div className="flex gap-4">
                  <p>Sunday 25th</p>
                  
                  {sunMob25()}

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
              >
                <span className="lexend-font">Randomize again</span>
              </Button>

              <Button
                onClick={() => {
                  navigate("/register");
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
                <span className="lexend-font">Sign Up</span>
              </Button>
            </div>
          </div>

          {/* share to friends */}
          <form
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
              /> */}

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
 */}
              </div>
            ))}

            <button type="button" onClick={addInputSet}>
              Add Another
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
                <span className="popins-font">Send to friends</span>
              </Button>
            </div>
          </form>
        </>
      )}

      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={handleSnackbarErrorClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
