



import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();


import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";




let BACKEND_SERVER_BASE_URL = import.meta.env.VITE_BACKEND_SERVER_BASE_URL || process.env.VITE_BACKEND_SERVER_BASE_URL;

export default AuthContext;



export const AuthProvider = ({ children }) => {




    // TODO ovo je sa drugi, treba session isto..
  
   // let [user, setUser] = useState(() =>
  //  localStorage.getItem("authTokens")
  //    ? jwtDecode(localStorage.getItem("authTokens"))
  //    : null
 // );


 const [user, setUser] = useState(() => {

    // TODO on ustvari samo ČITA ! znači moze biti i samo || da i sa sessionStorage i tjt...
    const tokenString = localStorage.getItem("authTokens") || sessionStorage.getItem("authTokens");


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



  let [authTokens, setAuthTokens] = useState(() =>

        // TODO on ustvari samo ČITA ! znači moze biti i samo || da i sa sessionStorage i tjt...
{

  let authTokensString = 
  (typeof localStorage !== "undefined" && localStorage.getItem("authTokens")) ||
  (typeof sessionStorage !== "undefined" && sessionStorage.getItem("authTokens"));

  return authTokensString ? JSON.parse(authTokensString) : null;



}

        
 //    localStorage.getItem("authTokens")
   //   \? JSON.parse(localStorage.getItem("authTokens"))
     // : null 



  );
  



  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  

// TODO ovo je moj kod za sto treba ti.. 
  // let loginUser = async (e) => {

    let loginUser = async (email, password, remember_me, ) => {
    





    // e.preventDefault();

    //var email = e.target.email.value;
    // var password = e.target.pass.value;


    // TODO set up remember me (false) on session storage, and (true) on localstorage
   // var remember_me = e.target.remember.value;






    // check again, if email is correctly inserted
    //const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

   // if (!emailRegex.test(email)) {
  //    alert("Please enter a valid email address");
   // }

    // check if captcha okay
    //    const captchaValue = recaptcha.current.getValue();

  //  if (!captchaValue) {
    //  alert("Please verify the reCAPTCHA!");
   // } else {
     // const res = await fetch("http://localhost:5000/captcha/verify", {
     //   method: "POST",
    //    body: JSON.stringify({ captchaValue }),
   //     headers: {
   //       "content-type": "application/json",
   //     },
   //   });

     // const data = await res.json();

      // response in json we have "success" field, that google send us, if it's verified or not
    //  if (data.success) {
        // make form submission

        // TODO jos ovoga
        try {
            var response = await axios.post(`${BACKEND_SERVER_BASE_URL}/auth/login`, {email, password});
            console.log("damn" + response)
          
          } catch (error) {

            
    
            if (error.response.status === 401) {
              alert(error.response.data.message);
              console.log("ovde treba uzeti token da salje ti na email opet" + email)

              

            }else{
            
              console.log(error)

              

            }


            
            
          }
    
          console.log(response);


          // TODO, E OVDE JA MSM, MOZES ODLUCITI DA LI JE LOCAL ili session storage, zavisno jel "remember me" izabrano ili ne..
          if (response) {

            if(remember_me){
                          localStorage.setItem("authTokens", JSON.stringify(response));

            }else{
              sessionStorage.setItem("authTokens", JSON.stringify(response));

      
            }


            setAuthTokens(response);
    
            console.log("token je:" + response.data.access_token);
    
            setUser(jwtDecode(response.data.access_token));

            navigate("/");
          } else {
            console.log("Something went wrong while loggin in the user!");
          }



        // TODO, e ovde ides, za login kako treba, u context...
        // let response = await axios.post(
        //  `${BACKEND_SERVER_BASE_URL}/auth/login`,
          //{ email, password }
        //);



        if (response) {
          alert("Login success ");
        } else {
          alert("Login failed");
        }



        





       // alert("Form submission successful!");
   //   } else {
   //     alert("reCAPTCHA validation failed!");
   //   }

      // make form submission
    //}

    //  alert('Form submission successful!')
  };






  let logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("authTokens");
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



  //TODO refresh tokens  
 // useEffect(() => {
  //  const REFRESH_INTERVAL = 1000 * 60 * 9; // 9 minutes
  //  let interval = setInterval(() => {
  //    if (authTokens && loading) {
        //updateToken();
  //    }
   // }, REFRESH_INTERVAL);
  //  return () => clearInterval(interval);
 // }, [authTokens, loading]);



  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );

};


