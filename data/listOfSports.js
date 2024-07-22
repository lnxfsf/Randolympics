



// can you make a list of sports, that's gonna be defined in: listOfSports.js file. and then exported and used , in function of another file. 

const listOfSports = [
    /* 
    {
    sportName: "Men's 50m Freestyle Swimming",
    howMuchAthletesMakeATeam: 1,
    locations: 1,

    // jos, treba da dodas, kolko to traje, na kolko dana se to proteze ! (uglv, ima 3 dana, i sada, samo namesti, 1stDay, 2ndDay, 3rdDay). // ! i onda, po hour, kolko mu treba ... i po tome 

    firstDayHowMuchTimeSlotsExpandBy: 1, // ovo je koliko time slots (po 3 sata da ima.. )
    secondDayHowMuchTimeSlotsExpandBy: 1,
    thirdDayHowMuchTimeSlotsExpandBy: 0,  // a jedostavno, ako je 0, onda nema za taj dan uopste !
    
    

    // this is starting time (time slot), it won't allow this sport, if it's not available at that time (we have fixed starting and ending times for sports.. so we only select randomly, out of them... )
    
    // start and end times for first day.. 3h time slot.. 
    firstDayStartGameTimeSlot: "12_15", 
    firstDayEndGameTimeSlot: "12_15",

    // start and end times for second day.. 3h time slot.. 
    secondDayStartGameTimeSlot: "9_12", 
    secondDayEndGameTimeSlot: "9_12",


    
    // start and end times for third day.. 3h time slot.. 
    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

   

    // so this is at what day it starts (so even if sport choosen randomly), it still, have fixed times when sports start... (so there's no overflow, and there don't have to be manager to manually insert values..)
    dayOfStart: "Sunday",


},


{
    sportName: "Men's 3m Springboard Diving",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 3,
    thirdDayHowMuchTimeSlotsExpandBy: 0,

    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "9_12", 
    secondDayEndGameTimeSlot: "15_18",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Sunday",


},



{
    sportName: "Men's 4x200m Freestyle Relay Swimming",
    howMuchAthletesMakeATeam: 4,
    locations: 4,



    firstDayHowMuchTimeSlotsExpandBy: 3,
    secondDayHowMuchTimeSlotsExpandBy: 1,
    thirdDayHowMuchTimeSlotsExpandBy: 0,







    // ----------

    
    firstDayStartGameTimeSlot: "12_15", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "15_18", 
    secondDayEndGameTimeSlot: "15_18",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Sunday",
},




{
    sportName: "Men's Water Polo",
    howMuchAthletesMakeATeam: 11,
    locations: 11,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 2,
    thirdDayHowMuchTimeSlotsExpandBy: 1,



    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "15_18", 
    secondDayEndGameTimeSlot: "18_21",


    thirdDayStartGameTimeSlot: "15_18", 
    thirdDayEndGameTimeSlot: "15_18",

    dayOfStart: "Monday",

},




{
    sportName: "Men's Water Polo",
    howMuchAthletesMakeATeam: 11,
    locations: 11,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 2,
    thirdDayHowMuchTimeSlotsExpandBy: 1,



    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "15_18", 
    secondDayEndGameTimeSlot: "18_21",


    thirdDayStartGameTimeSlot: "15_18", 
    thirdDayEndGameTimeSlot: "15_18",

    dayOfStart: "Tuesday",

},



{
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



{
    sportName: "Men's Water Polo",
    howMuchAthletesMakeATeam: 11,
    locations: 11,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 2,
    thirdDayHowMuchTimeSlotsExpandBy: 1,



    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "15_18", 
    secondDayEndGameTimeSlot: "18_21",


    thirdDayStartGameTimeSlot: "15_18", 
    thirdDayEndGameTimeSlot: "15_18",

    dayOfStart: "Thursday",

},


{
    sportName: "Men's Water Polo",
    howMuchAthletesMakeATeam: 11,
    locations: 11,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 2,
    thirdDayHowMuchTimeSlotsExpandBy: 1,



    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "15_18", 
    secondDayEndGameTimeSlot: "18_21",


    thirdDayStartGameTimeSlot: "15_18", 
    thirdDayEndGameTimeSlot: "15_18",

    dayOfStart: "Friday",

},



{
    sportName: "Men's Water Polo",
    howMuchAthletesMakeATeam: 11,
    locations: 11,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 2,
    thirdDayHowMuchTimeSlotsExpandBy: 1,



    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "18_21",
 
    secondDayStartGameTimeSlot: "15_18", 
    secondDayEndGameTimeSlot: "18_21",


    thirdDayStartGameTimeSlot: "15_18", 
    thirdDayEndGameTimeSlot: "15_18",

    dayOfStart: "Saturday",

},
  */


/* ovo */
{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Sunday",


},



{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Monday",


},



{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Tuesday",


},




{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Wednesday",


},




{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Thursday",


},




{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Friday",


},




{

    sportName: "Men's Long Jump",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 2,
    secondDayHowMuchTimeSlotsExpandBy: 0,
    thirdDayHowMuchTimeSlotsExpandBy: 0,



    

    // ----------

    
    firstDayStartGameTimeSlot: "9_12", 
    firstDayEndGameTimeSlot: "12_15",
 
    secondDayStartGameTimeSlot: "", 
    secondDayEndGameTimeSlot: "",


    thirdDayStartGameTimeSlot: "", 
    thirdDayEndGameTimeSlot: "",

    dayOfStart: "Saturday",


},





];





/// export default listOfSports;

module.exports = {
    listOfSports


}