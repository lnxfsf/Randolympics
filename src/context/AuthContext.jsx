import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
import { useCallback } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

export default AuthContext;

export const AuthProvider = ({ children }) => {

  // declare it here, and define later
  async function refreshAccessToken(){

  }


  let [campaignId, setCampaignId] = useState("");

 

  
  const [user, setUser] = useState(() => {

    // getting userId from old accessToken jwt, but nothing to worry about, because it's going to be refreshed immediatelly on page load anyways (and will logout him if it's wrong, and server won't accept that old jwt access token if it's expired either.. so he will be logged out)
    // so, behaviour can be as follows
    // user is on /myprofile, refreshToken gets new accessToken
    // so, there's no way for accesstoken to be old in this case. 
    // but in case it does, it's safer to log out user then 
    if(localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")){
      const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
      return jwtDecode(accessToken);
    }

  });

  const navigate = useNavigate();

  let loginUser = async (email, password, remember_me) => {
    try {
      var response = await axios.post(`${BACKEND_SERVER_BASE_URL}/auth/login`, {
        email,
        password,
      }, {withCredentials: true }); // it needs withCredentials: true, so it can receive and setCookie refreshToken
    } catch (error) {
      if (error.response.status === 401) {
        // alert(error.response.data.message);
        return 0;
      } else {
        console.log(error);
        return 0;
      }
    }

    // AND HERE, YOU CAN DECIDE WHETHER IT IS local or session storage, depending on whether "remember me" is selected or not..
    if (response) {


      // TODO this is for now, but we shouldn't even return all these stuff, but just jwt token directly.. so wait until i refactor everything else, to comply with better jwt security practices
      const withoutAccessToken = { ...response }; // Shallow copy of response

       withoutAccessToken.data = Object.fromEntries(
        Object.entries(response.data).filter(([key]) => key !== 'access_token')
      );



      if (remember_me) {

        // set accessToken
        localStorage.setItem("accessToken", response.data.access_token);

        // this is where we actually save in localstorage (we actually directly access local/session storage in app whenever we need it)
        localStorage.setItem("authTokens", JSON.stringify(withoutAccessToken));



      } else {
         // set accessToken
         sessionStorage.setItem("accessToken", response.data.access_token);

        // this is where we actually save in sessionstorage 
        sessionStorage.setItem("authTokens", JSON.stringify(withoutAccessToken));
      }


/* 
      setAuthTokens(response);
 */

      // it gets userId, directly from JWT token payload
      setUser(jwtDecode(response.data.access_token));


      // here check if athleteStatus is "s1" or "s2", then it redirects to that screen where user inserts status (on that, once it's filled, then, we redirect to home, or myprofile). and this screen is shown only for athlete user type !
      if (
        (response.data.athleteStatus === "s1" ||
          response.data.athleteStatus === "s2") &&
        response.data.user_type === "AH"
      ) {
        navigate("/updateAthleteStatus");
      } else {
        navigate("/");
      }
    } else {
      return 0;
    }
  };



  refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true } //  cookies are sent
      );

   
      const access_token = response.data.accessToken;

      // Update accessToken in storage. so it depends if user signed one time or with remember me
      if (localStorage.getItem("accessToken")) {
        localStorage.setItem("accessToken", access_token);
      } else if (sessionStorage.getItem("accessToken")) {
        sessionStorage.setItem("accessToken", access_token);
      }


      setUser(jwtDecode(access_token)); // you need this, for first login, after refresh of page.. and we also get new accessTokens from refreshTokens
   
      return access_token;

    } catch (error) {
      console.error("Failed to refresh access token:", error);
      logoutUser(); // Log out if refresh fails, then we don't have latest credentials. maybe in backend, it said refreshToken is invalid, so we logout in here then
    }
  };


  useEffect(() => {

    
 
   // only for first time, but only if there is some user.. and that means we have accessToken in there.. as we can't send refreshToken if it's expired (when logout)
    if (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")) {
      refreshAccessToken();
    }
   



if(user){
   const REFRESH_INTERVAL = 4 * 60 * 1000; // 4 mins
  // const REFRESH_INTERVAL = 10 * 1000; // 4 mins

    const interval = setInterval(() => {
      refreshAccessToken();
    }, REFRESH_INTERVAL);


    return () => clearInterval(interval); 

  }


    
  }, []);




  // just call this function, for logout, and you're done
  let logoutUser = async (e) => {

    //you can see refreshToken, only in /auth routes.. 

    // clear http only cookie, will expiry after 1 sec
      const response = await axios.get(
      `${BACKEND_SERVER_BASE_URL}/auth/logout`,
   
      { withCredentials: true } 
    );  

    



    //e.preventDefault();
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");

    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
    
   // setAuthTokens(null);
    setUser(null);
    navigate("/");
  };

  // TODO for campaignID ! I should've moved in separate context

  let settingCampaignId = useCallback(
    (id) => {
      setCampaignId(id);
    },
    [campaignId]
  );

  let thisNow = (id) => {
    settingCampaignId(id);
  };

  let contextData = {
    user: user,
   // authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,

    // campaignId: campaignId,
    //setCampaignId: setCampaignId,
    //  settingCampaignId: thisNow,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
