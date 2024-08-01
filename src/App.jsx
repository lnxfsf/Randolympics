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
import { News } from "./pages/News";
import { DetailsUpcomingGames } from "./components/News/UpcomingGames/DetailsUpcomingGames";
import { ReadMoreUpcomingGames } from "./components/News/UpcomingGames/ReadMoreUpcomingGames";
import { DetailsNewsEconomics } from "./components/News/Economics/DetailsNewsEconomics";
import { ReadMoreNewsEconomics } from "./components/News/Economics/ReadMoreNewsEconomics";



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




        <Route path="/news" element={<News />} />

        {/* for list of all Upcoming 2028 Games  */}
        <Route path="/news/upcoming" element={<ReadMoreUpcomingGames />} />
        <Route path="/news/upcoming/:postId/:title" element={<DetailsUpcomingGames />} />


        {/* for list of all Economics news  */}
        <Route path="/news/economics" element={<ReadMoreNewsEconomics />} />
        <Route path="/news/economics/:postId/:title" element={<DetailsNewsEconomics />} />

        
      </Routes>
    </>
  );
};

export { App };
