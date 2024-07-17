



// can you make a list of sports, that's gonna be defined in: listOfSports.js file. and then exported and used , in function of another file. 

const listOfSports = [{
    sportName: "Men's 50m Freestyle Swimming",
    howMuchAthletesMakeATeam: 1,
    locations: 1,

    // jos, treba da dodas, kolko to traje, na kolko dana se to proteze ! (uglv, ima 3 dana, i sada, samo namesti, 1stDay, 2ndDay, 3rdDay). // ! i onda, po hour, kolko mu treba ... i po tome 

    firstDayHowMuchTimeSlotsExpandBy: 1,
    secondDayHowMuchTimeSlotsExpandBy: 1,
    thirdDayHowMuchTimeSlotsExpandBy: 0,


},


{
    sportName: "Men's 3m Springboard Diving",
    howMuchAthletesMakeATeam: 1,
    locations: 1,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 3,
    thirdDayHowMuchTimeSlotsExpandBy: 0,


},



{
    sportName: "Men's 4x200m Freestyle Relay Swimming",
    howMuchAthletesMakeATeam: 4,
    locations: 4,



    firstDayHowMuchTimeSlotsExpandBy: 3,
    secondDayHowMuchTimeSlotsExpandBy: 1,
    thirdDayHowMuchTimeSlotsExpandBy: 0,


},




{
    sportName: "Men's Water Polo",
    howMuchAthletesMakeATeam: 11,
    locations: 11,



    firstDayHowMuchTimeSlotsExpandBy: 4,
    secondDayHowMuchTimeSlotsExpandBy: 2,
    thirdDayHowMuchTimeSlotsExpandBy: 1,


},



];





/// export default listOfSports;

module.exports = {
    listOfSports


}