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

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;


























const timeSlots = [
  '0_3', '3_6', '6_9', '9_12', '12_15', '15_18', '18_21', '21_24'
];

/*  ja Mms, on ce ici redom ovde, ali samo je fora kad naidje na jul 1, jul 2, koristi taj drugi. odnosno za saturday, moze da proveri bas ako je PRAZAN TAJ, i onda znas da je prvi saturday kao*/
const days = [
  { day: 'Saturday', date: 'June 24th' },

  { day: 'Sunday', date: 'June 25th' },
  { day: 'Monday', date: 'June 26th' },
  { day: 'Tuesday', date: 'June 27th' },
  { day: 'Wednesday', date: 'June 28th' },
  { day: 'Thursday', date: 'June 29th' },
  { day: 'Friday', date: 'June 30th' },


  { day: 'Saturday', date: 'July 1st' },

  { day: 'Sunday', date: 'July 2nd' },
];







const Randomize = () => {








  const [randomizeFormData, setRandomizeFormData] = useState([{ name: '', email: '', weightCategory: 'light', gender: 'M' }]);




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
    setRandomizeFormData([...randomizeFormData, { name: '', email: '', weightCategory: 'light', gender: 'M' }]);
  };


  const removeInputSet = (index) => {
    setRandomizeFormData(randomizeFormData.filter((_, idx) => idx !== index));
  };




  const [scheduleData, setScheduleData] = useState([
    {
      name: 'first',
      email: 'first@gmail.com',
      weightCategory: 'light',
      gender: 'F',
      sportName: "Men's 50m Freestyle Swimming",
      howMuchAthletesMakeATeam: 1,
      locations: 1,
      firstDayHowMuchTimeSlotsExpandBy: 1,
      secondDayHowMuchTimeSlotsExpandBy: 1,
      thirdDayHowMuchTimeSlotsExpandBy: 0,
      firstDayStartGameTimeSlot: '12_15',
      firstDayEndGameTimeSlot: '12_15',
      secondDayStartGameTimeSlot: '9_12',
      secondDayEndGameTimeSlot: '9_12',
      thirdDayStartGameTimeSlot: '',
      thirdDayEndGameTimeSlot: '',
      dayOfStart: 'Sunday'
    },
    {
      name: 'first',
      email: 'first@gmail.com',
      weightCategory: 'light',
      gender: 'F',
      sportName: "Men's Team All-Around Artistic Gymnastics",
      howMuchAthletesMakeATeam: 5,
      locations: 1,
      firstDayHowMuchTimeSlotsExpandBy: 4,
      secondDayHowMuchTimeSlotsExpandBy: 2,
      thirdDayHowMuchTimeSlotsExpandBy: 0,
      firstDayStartGameTimeSlot: '6_9',
      firstDayEndGameTimeSlot: '15_18',
      secondDayStartGameTimeSlot: '6_9',
      secondDayEndGameTimeSlot: '9_12',
      thirdDayStartGameTimeSlot: '',
      thirdDayEndGameTimeSlot: '',
      dayOfStart: 'Wednesday'


    }
  ]);


  useEffect(() => {



  }, [scheduleData]);






  // ---------------


  const navigate = useNavigate();







  const handleRedirectRegister = () => {
    navigate("/register");
  };


  const handleRandomize = async (e) => {
    e.preventDefault();

    console.log("sent")



    // nece weight biti ! ovde ! 




    try {
      var response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/landingPageRandomize`,
        {
          params: {
            randomizeFormData
          },

        }
      );


      setScheduleData(response.data);



    } catch (error) {
      console.log(error);



    }

  }






  const renderEventInSlot = (event, day, slot) => {


    const dayIndex = days.findIndex(d => d.day === event.dayOfStart);  // koji je indeks u days listi, ??   dayIndex, je onaj sa podataka.
    // al ovo je isto sa rows, koji je mesto sada.. 

    const slotIndex = timeSlots.indexOf(slot);   // indeks, tog timeSlot-a u taj timeSlots koji je.. (mozda da bi radio sa brojkama..)
    // slotIndex, isto onda mora biti taj koji je sa podataka ! koji je sada trenutno na loop za rows

    const startSlotIndex = timeSlots.indexOf(event.firstDayStartGameTimeSlot);   // 
    const endSlotIndex = timeSlots.indexOf(event.firstDayEndGameTimeSlot); // isto, koja brojka je u taj indeks za timeSlots.



    if ((dayIndex === days.findIndex(d => d.day === day)) && slotIndex === startSlotIndex && slotIndex <= endSlotIndex) {
      return <RandomizeItem icon="swim" name={event.sportName} />;
    }




    const secondDayStartSlotIndex = timeSlots.indexOf(event.secondDayStartGameTimeSlot);
    const secondDayEndSlotIndex = timeSlots.indexOf(event.secondDayEndGameTimeSlot);

    // ! znaci, start slot, mora da ima.. uvek pocetno vrv..
    // samo, na ovaj sledeci dan, (row) to prikaze.. dan..  da.. (uh, samo slot, time table treba ). jer on ce ovako, i prikazivati podatke ..
    if (dayIndex + 1 === days.findIndex(d => d.day === day) && slotIndex === secondDayStartSlotIndex && slotIndex <= secondDayEndSlotIndex) {
      return <RandomizeItem icon="swim" name={event.sportName} />;
    }

    const thirdDayStartSlotIndex = timeSlots.indexOf(event.thirdDayStartGameTimeSlot);
    const thirdDayEndSlotIndex = timeSlots.indexOf(event.thirdDayEndGameTimeSlot);

    if (dayIndex + 2 === days.findIndex(d => d.day === day) && slotIndex === thirdDayStartSlotIndex && slotIndex <= thirdDayEndSlotIndex) {
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

    } else if (day.includes(data.dayOfStart) && timeSlot === data.secondDayStartGameTimeSlot) {
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
    const startDateIndex = days.findIndex(d => d.date === event.dateOfStart);
 

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
      addSlots(startDateIndex, event.firstDayStartGameTimeSlot, event.firstDayHowMuchTimeSlotsExpandBy);

      // Add slots for the second day if applicable
      if (event.secondDayStartGameTimeSlot) {
        addSlots(startDateIndex + 1, event.secondDayStartGameTimeSlot, event.secondDayHowMuchTimeSlotsExpandBy);
      }

      // Add slots for the third day if applicable
      if (event.thirdDayStartGameTimeSlot) {
        addSlots(startDateIndex  + 2, event.thirdDayStartGameTimeSlot, event.thirdDayHowMuchTimeSlotsExpandBy);
      }
  


    return slots;

    // slotIndex 

    // === index, problem, je sto on sacuva indeks, ali trebalo bi da sacuva i tekst, uz to sto ide. da bi bio precizan ?? kao "3_6". jer vidis
    // slots je samo array. i on ako ima array=[0]  (prvi element), onda i to ispada kao da je tu o u time, 0_3, 3_6.. a ne treba tako..
  };




  return (
    <>
      <Navbar />

      <div className="">

        <h1 className="flex text-[40px] mt-8 justify-center ">
          Let’s see <span className=" text-red_first pl-3 pr-3">your</span>{" "}
          schedule for{" "}
          <span className="underline decoration-red_first pl-4">June 2028</span>
        </h1>
      </div>






      <table className="tablez">
        <thead>
          <tr>
            <th className="thz">Date</th>
            {timeSlots.map(slot => (
              <th key={slot} className="thz">{slot.replace('_', '-')}</th>
            ))}
          </tr>
        </thead>
        <tbody>

{/* 
          <tr>
            <th rowSpan={2} className="thz">Saturday (June 24th)</th>
            <td className="tdz" colSpan={8} >Opening & Randomization of Athletes and Sports</td>

          </tr>


          <tr>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            {/*   <td className="tdz">{ if ( ) } </td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"></td>


          </tr>
 */}



          {days.map(({ day, date }) => (


            /* ovo je jedan row ! */
            <tr key={date}>

              <th className="thz">{day} ({date})</th>




              {/* prolazi kroz svaki, pocev od '00_03' , koji je onda "slot", , ali slot je onda ime.. (stringa) index 0 vrv
 */}
              {timeSlots.map((slot, index) => {



                // ako ima nesto u ovome, da vraca, taj event, taj entry da ga ima... uopste onda prikazuje ovde dole
               
               
                const event = scheduleData.find(event =>

                  getEventSlots(event).some(slotData =>

                    slotData.dayIndex === days.findIndex(d => d.date === date) && slotData.slotIndex === index

                  )

                );



                return (


                  // ! ovde treba, event.julyDay === true, da onda taj drugi prikaze.. 
                  // ! za to, da dodas jos taj jedan header kao
                  <td key={slot} className="tdz">
                    {event ? <RandomizeItem icon="swim" name={event.sportName} /> : ''}
                  </td>

                );
              })}
            </tr>


          ))}
          {/* Add rows for Sunday, July 2nd */}
       {/*    <tr>
            <th rowSpan={2} className="thz">Sunday (July 2nd)</th>


            {/* isto prolazi kroz svaki time slot. kolonu 
            {timeSlots.map((slot, index) => {

              // ! da, ja msm, treba specificno da gledas 8-mi, indeks, to je taj zadnji (zato sto on ovde stoji samostalno, ne vrti kroz petlju sve..).. a iz podataka ce on izvuci          
              // ustvari, on ovde radi van tog.. jer ima hardcoded  july 2nd..


              const event = scheduleData.find(event =>

                getEventSlots(event).some(slotData =>

                  slotData.dayIndex === days.findIndex(d => d.date === "July 2nd") && slotData.slotIndex === index

                )

              );


              return (
                <td key={index} className="tdz">


                  {index === 1 ? <RandomizeItem icon={"swim"} name={"Men's Football"} /> : ''}


                </td>
              );
            })}


          </tr>
          <tr>
            <td className="tdz" colSpan={timeSlots.length}>Closing & Randomization of Next Games</td>
          </tr> */}


          {/*   <tr >
            <th rowSpan={2} className="thz">Sunday July 2nd</th>



            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            {/*   <td className="tdz">{ if ( ) } </td> 
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>


          </tr>

          <tr>
            <td className="tdz" colSpan={8}>Closing & Randomization of Next Games</td>
          </tr> */}



        </tbody>
      </table>









      {/* <br /><br /><br /><br /><br /><br />

      <br />
      <br />
      <br />
      <br />

      <hr />
      <hr />
      <hr />
      <hr />

      <br />
      <br />
      <br />
      <br /> */}
      {/*   <table className="tablez">
        <thead>
          <tr>
            <th className="thz">Date</th>
            <th className="thz">00-03:00</th>
            <th className="thz">03-06:00</th>
            <th className="thz"> 06-09:00</th>
            <th className="thz">09-12:00</th>
            <th className="thz"> 12-15:00</th>
            <th className="thz">15-18:00</th>
            <th className="thz">18-21:00</th>
            <th className="thz">21-24:00</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <th className="thz">Saturday (June 24th)</th>

            <td className="tdz" colSpan={8} >Opening & Randomization of Athletes and Sports</td>


          </tr>


          <tr>
            <th className="thz">Sunday  June 25th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's 50m Freestyle Swimming"} /></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Monday June 26th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's 50m Freestyle Swimming"} /></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Tuesday June 27th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Wednesday (June 28th)</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>


            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Thursday June 29th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Team All-Around Artistic Gymnastics"} /></td>


            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Friday June 30th</th>
            <td className="tdz"></td>
            <td className="tdz"></td>


            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>


            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>
          <tr>
            <th className="thz">Saturday July 1st</th>
            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
          </tr>


          <tr >
            <th rowSpan={2} className="thz">Sunday July 2nd</th>



            <td className="tdz"></td>
            <td className="tdz"></td>

            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>
            <td className="tdz"><RandomizeItem icon={"swim"} name={"Men's Football"} /></td>

            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>
            <td className="tdz"></td>


          </tr>

          <tr>




            <td className="tdz" colSpan={8}>Closing & Randomization of Next Games</td>



          </tr>




        </tbody>
      </table> */}







      <div>


        <form
          action="#"
          className="sign-in-form flex flex-col wrap justify-start items-center"
          onSubmit={handleRandomize}
        >

          {randomizeFormData.map((data, index) => (


            <div key={index} style={{ marginBottom: '10px' }}>


              <input
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



              <select
                name="weightCategory"
                value={data.weightCategory}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select>


              <select
                name="gender"
                value={data.gender}
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="M">Man</option>
                <option value="F">Woman</option>

              </select>



              <button type="button" onClick={() => removeInputSet(index)}>
                Remove
              </button>



            </div>



          ))}



          <button type="button" onClick={addInputSet}>
            Add Another
          </button>



          <Button
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
            id="randomize-btn"

            type="submit"




          >
            <span className="popins-font">Randomize</span>
          </Button>


        </form>

      </div>





      <div className="flex mb-12 mt-32">
        <div className="basis-1/2 flex flex-col items-end justify-center">
          <h1 className="flex text-[40px] justify-center ">Sounds fun !</h1>
          <p>Sign up for the challenge now</p>
        </div>

        <div className="basis-1/2 ml-8 mr-[550px]">
          <Button
            onClick={handleRedirectRegister}
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
            id="register-btn"
          >
            <span className="popins-font">Register here</span>
          </Button>
        </div>
      </div>





      <Footer />
    </>
  );
};

export { Randomize };
