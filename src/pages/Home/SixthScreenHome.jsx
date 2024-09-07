
import "../../styles/home.scoped.scss"
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";


import { useNavigate } from "react-router-dom";

const sxTextField = {
 
  
    width: "100%",
  
    /*  "& .MuiInputBase-input": { height: 39, padding: 1 },
     */
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      fontFamily: "'Lexend', sans-serif",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiInputLabel-root": {
      fontFamily: "'Lexend', sans-serif",
      
      "&.Mui-focused": {
        color: "black",
      },
  
  
  
  
      
    },
  };


const SixthScreenHome = () => {

    const navigate = useNavigate();


    return (<>
    <div className="flex items-center justify-center w-full">
        <div className=" bg-red_third w-full m-4 mt-12 md:m-16 lg:w-[80%] 2xl:w-[60%] rounded-2xl flex lexend-font text-black_second">


            <div className="grow lg:basis-1/2 flex flex-col p-8 md:p-16 pl-6 md:pl-10  justify-center">


                <p className="text-2xl md:text-4xl font-bold">Ready to get started?</p>


                <p className=" font-medium mt-4" >Sign Up today and start living the adventure.</p>




<div className="mt-2 mb-2 flex flex-col md:flex-row gap-2">

                <TextField
                  className="grow"
                   /*  value={signUpEmail} */

                /*     onChange={(event) => {
                      setSupporterName(event.target.value);
                    }} */

                    placeholder="example@email.com"
                    type="text"
                    inputProps={{
                      maxLength: 255,
                    }}
                   
                    sx={sxTextField}
                  />



<Button
             
              className="self-center w-full md:basis-1/2"
              /* w-full md:w-50% */
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
              id="join-the-fun-btn"
            >
              
              <img src="supporters/right_arrow.svg" className="mr-2" />{" "}
              <span className="lexend-font" onClick={()=>{navigate("/register")}}>Sign Up</span>
            </Button>



</div>


                <p className="font-medium mt-2 text-xs md:text-sm">By clicking Sign Up you're confirming that you agree with our <span className="text-red_second cursor-pointer select-none" onClick={() => {navigate("/ToS")}}>Terms and Conditions</span>.</p>



            </div>



            {/* // TODO, ovde treba zoom isto, da bi stao slika, upravo u tome..  */} 
           {/*  <div className="hidden md:basis-1/2 md:flex ">
                <img src="/home/join_us.jpg " className="rounded-r-2xl" />
            </div> */}


            

            <div className="hidden lg:basis-1/2  justify-center items-center lg:flex  container_join_us ">
                
                <img src="/home/join_us.jpg" className="image_join_us rounded-xl" />   

            </div>

            
        </div>
        </div>



    </>)
}

export {SixthScreenHome}