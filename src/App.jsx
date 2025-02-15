import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./components/Login/ForgotPassword";
import { Randomize } from "./components/MockupRandomizer/Randomize";
import { ToS } from "./pages/ToS";
import { MyAccount } from "./pages/MyAccount";

import PrivateRoute from "./utils/PrivateRoute";
import { EconomiscLoansHome } from "./pages/Home/EconomiscLoansHome";
import { EconomicsBroadcastingHome } from "./pages/Home/EconomicsBroadcastingHome";
import { EconomicsSponsorshipHome } from "./pages/Home/EconomicsSponsorshipHome";
import { News } from "./pages/News";
import { DetailsUpcomingGames } from "./components/News/UpcomingGames/DetailsUpcomingGames";
import { ReadMoreUpcomingGames } from "./components/News/UpcomingGames/ReadMoreUpcomingGames";
import { DetailsNewsEconomics } from "./components/News/Economics/DetailsNewsEconomics";
import { ReadMoreNewsEconomics } from "./components/News/Economics/ReadMoreNewsEconomics";
import { ReadMoreNewsNewsBlock } from "./components/News/NewsBlock/ReadMoreNewsNewsBlock";
import { DetailsNewsBlock } from "./components/News/NewsBlock/DetailsNewsBlock";
import { Supporters } from "./pages/Supporters";
import { RegisteredByFriend } from "./components/Login/RegisteredByFriend";

import { Campaign } from "./pages/Campaign";

import { ItemCampaign } from "./components/Campaign/ItemCampaign";
import { PageNotFound } from "./pages/PageNotFound";
import { UpdateAthleteStatus } from "./components/MyAccount/UpdateAthleteStatus";

import ReactGA from "react-ga";
import { FAQPage } from "./pages/FAQPage";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { Competitions } from "./pages/Competitions";
import { UserProfilePublicView } from "./components/Home/UserProfilePublicView";
import { CompetitionsDetails } from "./pages/CompetitionsDetails";
import { CookieMain } from "./components/cookies/CookieMain";
import { useCookies } from "react-cookie";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Sponsors } from "./pages/Sponsors";




const App = () => {
  const [cookies, setCookie] = useCookies(["cookieNeccessary", "cookieConsentOpen"]);


  return (
    <>
      {/* // show cookies in all pages */}
      {(cookies.cookieNeccessary !== true || cookies.cookieConsentOpen) === true && <CookieMain />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/updateAthleteStatus" element={<UpdateAthleteStatus />} />

        <Route path="/register" element={<Register />} />
     

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/passresetbyfriend" element={<RegisteredByFriend />} />
        <Route path="/tos" element={<ToS />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

        <Route path="/randomize" element={<Randomize />} />

        <Route
          path="/myaccount"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />

        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/sponsors" element={<Sponsors />} />

        <Route path="/competitions" element={<Competitions />} />

        <Route
          path="/competitions/:sportName"
          element={<CompetitionsDetails />}
        />

        <Route path="/economicsloan" element={<EconomiscLoansHome />} />
        <Route
          path="/economicsbroadcast"
          element={<EconomicsBroadcastingHome />}
        />
        <Route
          path="/economicssponsorship"
          element={<EconomicsSponsorshipHome />}
        />

        <Route path="/news" element={<News />} />

        {/* for list of all Upcoming 2028 Games  */}
        <Route path="/news/upcoming" element={<ReadMoreUpcomingGames />} />
        <Route
          path="/news/upcoming/:postId/:title"
          element={<DetailsUpcomingGames />}
        />

        {/* for list of all Economics news  */}
        <Route path="/news/economics" element={<ReadMoreNewsEconomics />} />
        <Route
          path="/news/economics/:postId/:title"
          element={<DetailsNewsEconomics />}
        />

        {/* for list of all News news  */}
        <Route path="/news/news" element={<ReadMoreNewsNewsBlock />} />
        <Route
          path="/news/news/:postId/:title"
          element={<DetailsNewsBlock />}
        />

        {/* for campaign supporters */}
        <Route path="/supporters" element={<Supporters />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/campaign/:campaignId" element={<ItemCampaign />} />

        <Route path="/profile/:userId" element={<UserProfilePublicView />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>



    </>
  );
};

export { App };
