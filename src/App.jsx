
import { Routes, Route } from "react-router-dom";


import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./components/Login/ForgotPassword";





const App  = () =>  {

  
  return (
    <>
    

     

      <Routes>

        <Route path="/" element={ <LandingPage /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/forgotpassword" element={ <ForgotPassword /> } />

        



      </Routes>
    
    </>
  )
}

export { App };
