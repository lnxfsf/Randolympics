import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

export default AuthContext;

export const AuthProvider = ({ children }) => {
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
      console.log("damn" + response);
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
        console.log("ovde treba uzeti token da salje ti na email opet" + email);
      } else {
        console.log(error);
      }
    }

    console.log(response);

    // AND HERE, YOU CAN DECIDE WHETHER IT IS local or session storage, depending on whether "remember me" is selected or not..
    if (response) {
      if (remember_me) {
        localStorage.setItem("authTokens", JSON.stringify(response));
      } else {
        sessionStorage.setItem("authTokens", JSON.stringify(response));
      }

      setAuthTokens(response);

      //console.log("token is:" + response.data.access_token);

      setUser(jwtDecode(response.data.access_token));

      navigate("/home");
    } else {
      console.log("Something went wrong while loggin in the user!");
    }

    if (response) {
      alert("Login success ");
    } else {
      alert("Login failed");
    }
  };

  // just call this function, for logout, and you're done
  let logoutUser = (e) => {
    //e.preventDefault();
    localStorage.removeItem("authTokens");
    sessionStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/login");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
