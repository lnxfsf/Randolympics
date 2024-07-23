



// can you make a list of sports, that's gonna be defined in: listOfSports.js file. and then exported and used , in function of another file. 

// this is original, that works somehow..
/* const listOfSports = [
    
    
    
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
    
    dateOfStart: "June 25th",


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
    
    dateOfStart: "June 25th",


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
    
    dateOfStart: "June 25th",
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
    
    dateOfStart: "June 26th",

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
    
    dateOfStart: "June 27th",

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

    
    dateOfStart: "June 28th",

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
    
    dateOfStart: "June 29th",

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
    
    dateOfStart: "June 30th",

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

    
    dateOfStart: "June 24th",

},
  


/* ovo 


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


    dateOfStart: "June 25th",


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

    dateOfStart: "June 26th",



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

    dateOfStart: "June 27th",

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

    dateOfStart: "June 28th",


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

    dateOfStart: "June 29th",

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

    dateOfStart: "June 30th",

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

    dateOfStart: "June 24th",

},


{

    sportName: "drugi sport",
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


    dateOfStart: "June 24th",

},


{

    sportName: "treci sport",
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
    
    dateOfStart: "June 24th",


},



{

    sportName: "cetvrti sport",
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

    dateOfStart: "June 24th",

},









{

    sportName: "Sunday Men's Long Jump",
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

    dateOfStart: "June 25th",

},


{

    sportName: "Sunday drugi sport",
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


    dateOfStart: "June 25th",

},


{

    sportName: "Sunday treci sport",
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
    
    dateOfStart: "June 25th",


},



{

    sportName: " Sunday cetvrti sport",
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

    dateOfStart: "June 25th",

},



];
 */


const listOfSports = [

    {

        sportName: "Men's 50m Freestyle Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
        
        
           
    },
    
    {
        sportName: "Men's 100m Freestyle Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    {
        sportName: "Men's 200m Freestyle Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "18_21", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    
    
    
    {
        sportName: "Men's 400m Freestyle Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    
    
    {
        sportName: "Men's 1500m Freestyle Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    {
        sportName: "Men's 100m Backstroke Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    {
        sportName: "Men's 200m Backstroke Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    {
        sportName: "Men's 100m Breaststroke Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    {
        sportName: "Men's 200m Breaststroke Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    {
        sportName: "Men's 100m Butterfly Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    {
        sportName: "Men's 200m Butterfly Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    {
        sportName: "Men's 200m Individual Medley Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "18_21", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    {
        sportName: "Men's 400m Individual Medley Swimming",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },
    
    
    
    
    {
        sportName: "Men's 4x100m Freestyle Relay Swimming",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    
    
    
    {
        sportName: "Men's 4x200m Freestyle Relay Swimming",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    {
        sportName: "Men's 4x100m Medley Relay Swimming",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    {
        sportName: "Men's 3m Springboard Diving",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's 10m Platform Diving",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's Synchronized 3m Springboard Diving",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's Synchronized 10m Platform Diving",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's 100m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "18_21", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's 200m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    {
        sportName: "Men's 400m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's 800m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    {
        sportName: "Men's 1500m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's 5000m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's 10 000m",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's Marathon",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    {
        sportName: "Men's 110m Hurdles",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's 400m Hurdles",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's 3000m Steeplechase",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    
    
    {
        sportName: "Men's 4x100m Relay",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "21_24", 
        firstDayEndGameTimeSlot: "21_24",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's 4x400m Relay",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "21_24", 
        firstDayEndGameTimeSlot: "21_24",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    {
        sportName: "Men's 20km Race Walk",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's 50km Race Walk",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's High Jump",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    {
        sportName: "Men's Long Jump",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's Triple Jump",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's Shot Put",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    
    {
        sportName: "Men's Discus Throw",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Men's Hammer Throw",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Men's Javelin Throw",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    {
        sportName: "Men's Decathlon",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    
    {
        sportName: "Men's Singles Badminton",
        howMuchAthletesMakeATeam: 1,
        locations: 4,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 4,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    {
        sportName: "Men's Doubles Badminton",
        howMuchAthletesMakeATeam: 2,
        locations: 4,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    
    
    {
        sportName: "Kayak Strömkajen",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Kayak Stora Essingen runt lång",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Kayak Stora Essingen - Alvik Sprint",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    
    {
        sportName: "Kayak Lilla Essingen Stafett",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Dragbåtspaddling Essingen runt lång",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    {
        sportName: "Dragbåtspaddling - Alvik Sprint",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "June 25th",
    },	
    
    
    
    // ----- monday
    
    
    
    {
        sportName: "Men's Water Polo",
        howMuchAthletesMakeATeam: 11,
        locations: 4,
        
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
        dateOfStart: "June 26th",
    },	
    
    
    
    {
        sportName: "Men's Individual Archery",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 2,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },	
    
    
    
    
    
    {
        sportName: "Men's Team Archery",
        howMuchAthletesMakeATeam: 3,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 3,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "9_12", 
        thirdDayEndGameTimeSlot: "15_18",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },	
    
    
    
    
    
    {
        sportName: "Windsurfing",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },	
    
    
    
    
    {
        sportName: "Windsurfing Relay",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },	
    
    
    
    
    {
        sportName: "Optimist",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },
    
    
    
    
    {
        sportName: "Optimist Relay",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },
    
    
    
    
    
    {
        sportName: "Weightlifting Lightweight (<TBD)",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 2,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Monday",
        dateOfStart: "June 26th",
    },
    
    
    
    
    
    // --------- tuesday -------
    
    
    
    
    {
        sportName: "Boxing medium (<TBD)",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "21_24", 
        thirdDayEndGameTimeSlot: "21_24",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Boxing Heavyweight (> tbd kg) ",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "21_24",
        
        secondDayStartGameTimeSlot: "21_24", 
        secondDayEndGameTimeSlot: "21_24",
        
        thirdDayStartGameTimeSlot: "21_24", 
        thirdDayEndGameTimeSlot: "21_24",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    {
        sportName: "Men's Individual Épée ( 4-5 stages)",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "15_18", 
        thirdDayEndGameTimeSlot: "15_18",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    {
        sportName: "Men's Team Épée",
        howMuchAthletesMakeATeam: 4,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "18_21", 
        thirdDayEndGameTimeSlot: "18_21",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's Individual Foil",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "15_18", 
        thirdDayEndGameTimeSlot: "15_18",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's Team Foil",
        howMuchAthletesMakeATeam: 4,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "18_21", 
        thirdDayEndGameTimeSlot: "18_21",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    {
        sportName: "Men's Individual Sabre",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "15_18", 
        thirdDayEndGameTimeSlot: "15_18",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    
    {
        sportName: "Men's Team Sabre",
        howMuchAthletesMakeATeam: 4,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "18_21", 
        thirdDayEndGameTimeSlot: "18_21",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's Golf",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 4,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's 10m Air Pistol",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    {
        sportName: "Men's 25m Rapid Fire Pistol",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's 50m Pistol",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    {
        sportName: "Men's 10m Air Rifle",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's 50m Rifle Prone",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Men's 50m Rifle Three Positions",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Men's Trap",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Men's Double Trap",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    {
        sportName: "Men's Skeet",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    
    
    {
        sportName: "Men's Singles Tennis",
        howMuchAthletesMakeATeam: 1,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 2,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "9_12",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Men's Doubles Tennis",
        howMuchAthletesMakeATeam: 2,
        locations: 2,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 2,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "9_12",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    
    {
        sportName: "Men's Volleyball",
        howMuchAthletesMakeATeam: 12,
        locations: 8,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 2,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "21_24",
        
        thirdDayStartGameTimeSlot: "9_12", 
        thirdDayEndGameTimeSlot: "9_12",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    
    {
        sportName: "Wrestling Freestyle Lightweight (<TBD)",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "15_18", 
        thirdDayEndGameTimeSlot: "15_18",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Wrestling Freestyle medium (<TBD)",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "18_21", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "18_21", 
        thirdDayEndGameTimeSlot: "18_21",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Wrestling Freestyle Heavyweight (> tbd kg) ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "21_24", 
        firstDayEndGameTimeSlot: "21_24",
        
        secondDayStartGameTimeSlot: "21_24", 
        secondDayEndGameTimeSlot: "21_24",
        
        thirdDayStartGameTimeSlot: "21_24", 
        thirdDayEndGameTimeSlot: "21_24",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    {
        sportName: "Wrestling GrecoRoman Lightweight (<TBD) ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "15_18",
        
        thirdDayStartGameTimeSlot: "15_18", 
        thirdDayEndGameTimeSlot: "15_18",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    {
        sportName: "Wrestling GrecoRoman medium (<TBD) ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "18_21", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "18_21", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "18_21", 
        thirdDayEndGameTimeSlot: "18_21",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    {
        sportName: "Wrestling GrecoRoman Heavyweight (> tbd kg)  ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "21_24", 
        firstDayEndGameTimeSlot: "21_24",
        
        secondDayStartGameTimeSlot: "21_24", 
        secondDayEndGameTimeSlot: "21_24",
        
        thirdDayStartGameTimeSlot: "21_24", 
        thirdDayEndGameTimeSlot: "21_24",
        
        dayOfStart: "Tuesday",
        dateOfStart: "June 27th",
    },
    
    
    
    
    
    
    
    // wednesday..
    
    
    
    {
        sportName: "Men's Individual All-Around Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
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
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    
    {
        sportName: "Men's Floor Exercise Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    
    {
        sportName: "Men's Pommel Horse Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Rings Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    {
        sportName: "Men's Vault Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Parallel Bars Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Horizontal Bar Artistic Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Individual Trampoline Gymnastics",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    {
        sportName: "Judo Lightweight (<TBD)",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Judo medium (<TBD) ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Judo Heavyweight (> tbd kg)  ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Modern Pentathlon",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 3,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    {
        sportName: "Men's Single Sculls",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Double Sculls",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Lightweight Double Sculls",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Quadruple Sculls",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Pair",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Four",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Lightweight Four",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Eight",
        howMuchAthletesMakeATeam: 8,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "12_15", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    
    {
        sportName: "Men's Rugby Sevens",
        howMuchAthletesMakeATeam: 12,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 2,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "15_18", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "18_21", 
        thirdDayEndGameTimeSlot: "18_21",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Men's Singles Table Tennis",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Men's Team Table Tennis",
        howMuchAthletesMakeATeam: 3,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 1,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "6_9",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    {
        sportName: "Taekwondo Lightweight (<TBD)",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    {
        sportName: "Taekwondo medium (<TBD) ",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    {
        sportName: "Taekwondo Heavyweight (> tbd kg)",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "6_9",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    
    
    
    {
        sportName: "Men's Beach Volleyball",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 2,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "9_12",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "6_9",
        
        dayOfStart: "Wednesday",
        dateOfStart: "June 28th",
    },
    
    
    
    
    
    
    
    // Thursday    June 29th
    
    
    
    
    {
        sportName: "Men's Basketball",
        howMuchAthletesMakeATeam: 12,
        locations: 8,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 1,
        thirdDayHowMuchTimeSlotsExpandBy: 1,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "12_15", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "12_15", 
        thirdDayEndGameTimeSlot: "12_15",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    {
        sportName: "Men's Road Race Cycling 150km",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 3,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "12_15",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    
    {
        sportName: "Men's Time Trial Cycling 30km",
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
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    
    {
        sportName: "Men's Sprint Track Cycling",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 6,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "3_6", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    {
        sportName: "Men's Team Sprint Track Cycling",
        howMuchAthletesMakeATeam: 3,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 6,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "3_6", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    {
        sportName: "Men's Keirin Track Cycling",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 6,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "3_6", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    {
        sportName: "Men's Omnium Track Cycling",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 6,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "3_6", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    {
        sportName: "Men's Team Pursuit Track Cycling",
        howMuchAthletesMakeATeam: 4,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 6,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "3_6", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    
    {
        sportName: "Men's Cross-country Mountain Biking",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    {
        sportName: "Men's BMX",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Thursday",
        dateOfStart: "June 29th",
    },
    
    
    
    
    
    
    
    
    // Friday
    
    
    
    {
        sportName: "Men's Football",
        howMuchAthletesMakeATeam: 18,
        locations: 8,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 2,
        thirdDayHowMuchTimeSlotsExpandBy: 2,
        
        firstDayStartGameTimeSlot: "9_12", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "9_12", 
        secondDayEndGameTimeSlot: "12_15",
        
        thirdDayStartGameTimeSlot: "6_9", 
        thirdDayEndGameTimeSlot: "9_12",
        
        dayOfStart: "Friday",
        dateOfStart: "June 30th",
    },
    
    
    
    
    
    {
        sportName: "Men's Handball",
        howMuchAthletesMakeATeam: 14,
        locations: 8,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 5,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Friday",
        dateOfStart: "June 30th",
    },
    
    
    
    
    
    
    
    
    {
        sportName: "Men's Field Hockey",
        howMuchAthletesMakeATeam: 16,
        locations: 8,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 5,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "15_18", 
        firstDayEndGameTimeSlot: "18_21",
        
        secondDayStartGameTimeSlot: "6_9", 
        secondDayEndGameTimeSlot: "18_21",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Friday",
        dateOfStart: "June 30th",
    },
    
    
    
    
    
    // saturday
    
    
    
    
    {
        sportName: "Individual Dressage",
        howMuchAthletesMakeATeam: 2,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Saturday",
        dateOfStart: "July 1st",
    },
    
    
    
    
    {
        sportName: "Team Dressage",
        howMuchAthletesMakeATeam: 8,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 4,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "15_18",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Saturday",
        dateOfStart: "July 1st",
    },
    
    
    
    
    // Sunday
    
    
    
    {
        sportName: "Men's Triathlon",
        howMuchAthletesMakeATeam: 1,
        locations: 1,
        
        firstDayHowMuchTimeSlotsExpandBy: 2,
        secondDayHowMuchTimeSlotsExpandBy: 0,
        thirdDayHowMuchTimeSlotsExpandBy: 0,
        
        firstDayStartGameTimeSlot: "6_9", 
        firstDayEndGameTimeSlot: "9_12",
        
        secondDayStartGameTimeSlot: "", 
        secondDayEndGameTimeSlot: "",
        
        thirdDayStartGameTimeSlot: "", 
        thirdDayEndGameTimeSlot: "",
        
        dayOfStart: "Sunday",
        dateOfStart: "July 2nd",
    },
    
    
]

/// export default listOfSports;

module.exports = {
    listOfSports


}