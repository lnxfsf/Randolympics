import "../styles/login.scoped.scss";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const Login = () => {







    let loginUser = async (e) => {
        

        console.log("hi");









    }






  return (
    <>
      <div className="flex m-16">


        <div className="basis-1/2 flex flex-wrap flex-col m-12 items-center">

          <img src="login/logo.svg" />





        {/* START FORM SUBMISSION (login), FOR LOGIN */}

          <form action="#" className="sign-in-form" onSubmit={loginUser}>
           

        <div className="flex flex-col mb-1 justify-center mt-16">
            <label for="email">Email*</label>
            <input className="w-[420px] " type="email" id="email" name="email" required/>
        </div>

        <div className="flex flex-col mb-2.5 justify-center mt-16">
            <label for="pass">Password*</label>
            <input type="password" id="pass" name="pass" required/>


        </div>
         


        {/*  this is for checkbox and forgot password*/}
        <div className="flex">
           
            <div className="basis-1/2">
                    <label for="remember">
                    
                        <input type="checkbox" id="remember" name="remember" className="mr-2"/>
                        Remember me
                    </label>

            </div>
                


                <div className="flex basis-1/2">
                    <Link to="/forgotpassword" className="bg-white  " >Forgot Password?</Link>
                </div>

            


        </div>



          <div className="flex justify-center mt-8">
            <Button
              className="w-[420px]"
              style={{ marginTop: "20px" }}
              sx={{
                height: "50px",
                bgcolor: "#AF2626",
                color: "#fff",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}


              type="submit"

              variant="text" 
              value="Login"

              id="login-btn"
            >
              <span className="popins-font">Login</span>
            </Button>
          </div>

          </form>
            {/* END FORM SUBMISSION (login), FOR LOGIN */}





          <div className="flex justify-center mt-2">
            <Button
              className="w-[420px]"
              style={{ marginTop: "20px" }}
              sx={{
                height: "50px",
                bgcolor: "#fff",
                color: "#AF2626",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}
              id="signup-btn"
            >
              <span className="popins-font">Sign Up</span>
            </Button>
          </div>


            <div className="flex justify-center mt-12">
                <img  src="login/other_sign_in.svg"/>
            </div>



        </div>

        <div className="basis-1/2 justify-center items-center rounded-md p-8 pl-0">
          <img src="login/1.png" className="image_login" />
        </div>
      </div>
    </>
  );
};

export { Login };
