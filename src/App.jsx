import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import { Randomize } from "./components/Randomize";
import { ToS } from "./pages/ToS";
import { MyAccount } from "./pages/MyAccount";

import PrivateRoute from './utils/PrivateRoute'
import { EconomiscLoansHome } from "./pages/Home/EconomiscLoansHome";
import { EconomicsBroadcastingHome } from "./pages/Home/EconomicsBroadcastingHome";
import { EconomicsSponsorshipHome } from "./pages/Home/EconomicsSponsorshipHome";




const App = () => {
  return (
    <>
      <Routes>


        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/" element={<Home />} />

        


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/tos" element={<ToS />} />
        <Route path="/randomize" element={<Randomize />} />

        <Route path="/myaccount" element={<PrivateRoute><MyAccount /></PrivateRoute>} />

        <Route path="/economicsloan" element={<EconomiscLoansHome />} />
        <Route path="/economicsbroadcast" element={<EconomicsBroadcastingHome />} />
        <Route path="/economicssponsorship" element={<EconomicsSponsorshipHome  />} />

      </Routes>
    </>
  );
};

export { App };
