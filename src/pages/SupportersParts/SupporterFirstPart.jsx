
import { Button } from "@mui/material";






const SupporterFirstPart = ({firstIsVisible, setIsCelebrity, setFriendEmail, setFirstIsVisible, setSecondIsVisible, generateRandomEmail}) => {

    return (
        <>
          <div
        className={`flex justify-center w-full items-center flex-col first-content-container  min-h-screen ${
          firstIsVisible ? "show" : "hide"
        } `}
       /*  style={{
          backgroundImage: "url('/supporters/supporter1op.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
          backgroundPosition: "center",
        }} */
      >
      {/*   <div
          className="how_it_works cursor-pointer select-none "
          onClick={() => {
            setHowItWorks(true);
          }}
        >
          <p className="underline ">How it works</p>
        </div> */}
{/* 
        <img className="h-16" src="randolympics_logo.svg" /> */}

        <p className="text-3xl text-center font-bold lexend-font p-4 pb-0">
          Do you want someone to get into the<br />
          Randolympic Games?
        </p>

        {/* <p className="text-lg text-center mt-6">I want to sign up </p> */}
{/* 
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="friend"
            name="radio-buttons-group"
            onChange={(event) => {
              const value = event.target.value;

              if (value === "friend") {
                setIsCelebrity(false); // his is for that passing,you don't change this when going through pages
                setFriendEmail(""); // here we just bring back normal value
              } else if (value === "celebrity") {
                setFriendEmail(() => {return generateRandomEmail()})
                setIsCelebrity(true);
              }
            }}
          >
            <FormControlLabel
              value="friend"
              control={<Radio />}
              label={`Friend`}
            />
            <FormControlLabel
              value="celebrity"
              control={<Radio />}
              label={`Celebrity`}
            />
          </RadioGroup>
        </FormControl>
 */}

        <div className="flex gap-4 mt-6 md:mt-10 flex-col md:flex-row">
          
        <Button
          onClick={() => {
           
           
            setIsCelebrity(false); 
            setFriendEmail(""); 
        

            setFirstIsVisible(false);
            setSecondIsVisible(true);
        
          }}
          className="w-64 "
          style={{ textTransform: 'none', fontWeight: 'bold' }}
          sx={{
            height: "50px",
            bgcolor: "rgba(210, 73, 73, 1)",
            color: "#fff",
            borderRadius: 3,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgba(210, 73, 73, 1)",
              color: "white",
              border: `1px solid rgba(210, 73, 73, 1)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="lexend-font">I want to sign up a friend</span>
        </Button>



        <Button
          onClick={() => {
           
           
            setFriendEmail(() => {return generateRandomEmail()})
            setIsCelebrity(true);
        

            setFirstIsVisible(false);
            setSecondIsVisible(true);
        
          }}
          className="w-64"
          style={{ textTransform: 'none', fontWeight: 'bold' }}
          sx={{
            height: "50px",
            bgcolor: "rgba(210, 73, 73, 1)",
            color: "#fff",
            borderRadius: 3,
            border: `1px solid #FFF`,
            "&:hover": {
              background: "rgba(210, 73, 73, 1)",
              color: "white",
              border: `1px solid rgba(210, 73, 73, 1)`,
            },
          }}
          id="join-the-fun-btn"
        >
          <span className="lexend-font">I want to sign up a celebrity</span>
        </Button>


        </div>
       


{/* 
        <Button
          onClick={() => {
            setFirstIsVisible(false);
            setSecondIsVisible(true);
          }}
          className="w-56"
          style={{ marginTop: "80px", marginBottom: "35px" }}
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
          <span className="popins-font">Create a campaign</span>
        </Button>
 */}
        {/*   <p className="text-xl text-center underline decoration-red_first mt-8">
          Randolympics can bring your friend to the olympic games as a
          competitor !{" "}
        </p> */}
      </div>
        
        
        </>
    )
}


export {SupporterFirstPart}