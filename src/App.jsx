
import { Routes, Route } from "react-router-dom";


import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { ForgotPassword } from "./components/Login/ForgotPassword";
import { Randomize } from "./components/Randomize";



import { ToS } from "./pages/ToS";





const App  = () =>  {

  
  return (
    <>
    

     

      <Routes>

        <Route path="/" element={ <LandingPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/forgotpassword" element={ <ForgotPassword /> } />
        <Route path="/tos" element={ <ToS /> } />
        <Route path="/randomize" element={ <Randomize /> } />


        



      </Routes>
    
    </>
  )
}

export { App };
