import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();
import { useCallback } from 'react';

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

export default AuthContext;

export const AuthProvider = ({ children }) => {

  
  
  let [campaignId, setCampaignId] = useState("");
  

  const [user, setUser] = useState(() => {
    const tokenString =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    if (tokenString) {
      try {
        const authData = JSON.parse(tokenString);
        return jwtDecode(authData.data.access_token);
      } catch (error) {
        console.error("Invalid token:", error);
        // localStorage.removeItem("authTokens");
        // return null;
      }
    }
    // return null;
  });

  let [authTokens, setAuthTokens] = useState(() => {
    let authTokensString =
      (typeof localStorage !== "undefined" &&
        localStorage.getItem("authTokens")) ||
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem("authTokens"));

    return authTokensString ? JSON.parse(authTokensString) : null;
  });

  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();




  let loginUser = async (email, password, remember_me) => {
    try {
      var response = await axios.post(`${BACKEND_SERVER_BASE_URL}/auth/login`, {
        email,
        password,
      });
      
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
      if (remember_me) {
        localStorage.setItem("authTokens", JSON.stringify(response));
      } else {
        sessionStorage.setItem("authTokens", JSON.stringify(response));
      }

      setAuthTokens(response);


      setUser(jwtDecode(response.data.access_token));


      // here check if athleteStatus is "s1" or "s2", then it redirects to that screen where user inserts status (on that, once it's filled, then, we redirect to home, or myprofile). and this screen is shown only for athlete user type ! 
      if((response.data.athleteStatus === "s1" || response.data.athleteStatus === "s2") && response.data.user_type === "AH" ){
        
        navigate("/updateAthleteStatus");
        
      } else {
        
          navigate("/");
          
        }

    } else {
      
      return 0;
    }

   

    
  };

  // just call this function, for logout, and you're done
  let logoutUser = (e) => {
    //e.preventDefault();
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/");
  };



  // TODO for campaignID ! I should've moved in separate context

  let settingCampaignId = useCallback((id) => {
    setCampaignId(id);
  }, [campaignId]);

  let thisNow = (id) => {
    settingCampaignId(id);
  }


  let contextData = {
    user: user,
    authTokens: authTokens,
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
