
import React, { useState, useEffect } from "react";

import {useTranslation} from "react-i18next";



// for countdown
const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }
  
    return timeLeft;
  };

  

// we need in format: 1 Jan 2024
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};




const CountDownTimerHome = () => {
  const { t } = useTranslation();

    const targetDate = new Date("2028-06-25T00:00:00");
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    
    
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);


    return (<>
    


    <div className="countdown-timer  flex flex-col items-start justify-start  ">
         

         <div className="flex justify-around w-full p-4">
          
          
           <div className="flex flex-col items-center md:ml-4 ">
             <p className="text-2xl md:text-4xl ">
               <b>{timeLeft.days ?? 0}</b>
             </p>
             <p>{t('home.firstScreen.countdown1')}</p>
           </div>

           <div className="flex flex-col justify-center items-center">
             <p className="text-2xl md:text-4xl">
               :
             </p>
            
           </div>

           <div className="flex flex-col items-center">
             <p className="text-2xl md:text-4xl">{timeLeft.hours ?? 0}</p>
             <p>{t('home.firstScreen.countdown2')}</p>
           </div>

           <div className="flex flex-col justify-center items-center">
             <p className="text-2xl md:text-4xl">
               :
             </p>
            
           </div>

           <div className="flex flex-col items-center">
             <p className="text-2xl md:text-4xl">{timeLeft.minutes ?? 0}</p>
             <p>{t('home.firstScreen.countdown3')}</p>
           </div>


           <div className="flex flex-col justify-center items-center">
             <p className="text-2xl md:text-4xl">
               :
             </p>
            
           </div>

           <div className="flex flex-col items-center md:mr-4">
             <p className="text-2xl md:text-4xl">{timeLeft.seconds ?? 0}</p>
             <p>{t('home.firstScreen.countdown4')}</p>
           </div>

         </div>




         <div className="flex justify-between md:items-center max-md:flex-col max-md:gap-2 w-full pl-4 md:pl-8 md:pr-8">
          
          
           <div className="flex gap-2">
             <img src="/home/location.svg" />
             <p className="text-sm md:text-normal font-bold ">{t('home.firstScreen.countdown5')}</p>
           </div>


           <p className="max-md:text-xs md:text-normal  font-medium  ">{t('home.firstScreen.countdown6')}</p>
         </div>




       </div>
    
    </>)
}


export {CountDownTimerHome}