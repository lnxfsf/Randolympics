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




const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/tos" element={<ToS />} />
        <Route path="/randomize" element={<Randomize />} />

        <Route path="/myaccount" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export { App };
