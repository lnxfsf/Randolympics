
import { Routes, Route } from "react-router-dom";


import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";



const App  = () =>  {

  
  return (
    <>
    

     

      <Routes>

        <Route path="/" element={ <LandingPage /> } />
        <Route path="/login" element={ <Login /> } />



      </Routes>
    
    </>
  )
}

export { App };
