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
     /* const tokenString =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens"); */

      /* 

    if (tokenString) { */
    /*   try {


        


        // const authData = JSON.parse(tokenString);

        const access_token = refreshAccessToken();

        console.log(access_token)

        return jwtDecode(access_token);


      } catch (error) {
        console.error("Invalid token:", error);
        // localStorage.removeItem("authTokens");
        // return null;
      } */
   /*  } */ 
    // return null;
  });

 /*  let [authTokens, setAuthTokens] = useState(() => {
    let authTokensString =
      (typeof localStorage !== "undefined" &&
        localStorage.getItem("authTokens")) ||
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("authTokens"));
// if authTokens is not empty in local/session storage, then save their values in this 
    return authTokensString ? JSON.parse(authTokensString) : null;
  });  */

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

 
    
    refreshAccessToken();


   // const REFRESH_INTERVAL = 4 * 60 * 1000; // 4 mins
   const REFRESH_INTERVAL = 10 * 1000; // 4 mins

    const interval = setInterval(() => {
      refreshAccessToken();
    }, REFRESH_INTERVAL);

    


    return () => clearInterval(interval); 
  }, []);




  // just call this function, for logout, and you're done
  let logoutUser = (e) => {
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
