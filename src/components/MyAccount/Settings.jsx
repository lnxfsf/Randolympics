import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { HeaderMyProfile } from "./HeaderMyProfile";

import Popup from "reactjs-popup";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/AuthContext";







//we display it as fragment, inside MyProfile...
let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Settings = () => {
  let { logoutUser } = useContext(AuthContext);

  
  
  const navigate = useNavigate();


  const [userData, setUserData] = useState(null);
  const popupRef = useRef(null);
  const popupRefResign = useRef(null);



  const [original_email, setOriginalEmail] = useState(null);
  const [userId, setUserId] = useState("");
  const [bio, setBio] = useState("");
  const [user_type, setUser_type] = useState("");



  const cancelResign = () => {
    // and exit popup
    popupRefResign.current.close();
  };


  const cancel = () => {
    // and exit popup
    popupRef.current.close();
  };

  const deleteAccount = async () => {

    


    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/deleteUser`,
        {
          userId: userId,
          

        }
      );

      if (response.status === 200) {
       

       popupRef.current.close();
       logoutUser();
       
        
        
        
      }
    } catch (error) {
      console.log(error);
    }




  }


  const handleCancel = (event) => {
    // this one is used, if "Cancel" is clicked. so it can revert storedData to original contents...
    const storedOriginalData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    // we will set setUserData if clicked on this !
    if (storedOriginalData) {
      setUserData(JSON.parse(storedOriginalData));

     


    }
  };


 
  useEffect(() => {
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);
      setOriginalEmail(userJson.data.email);
      setUserId(userJson.data.userId);
      setUser_type(userJson.data.user_type);

      setBio(userJson.data.bio);



    }
  }, []);


  
  const resignFromPosition = async () => {

    // just send, to backend,
    // just add, same for any account, doesn't matter which one it is (hasn't said.. so, just to all for now..)
    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/voting/resignFromCurrentPosition`,
        {
          userId,
          user_type

        }
      );

      if (response.status === 200) {
       alert("You resigned successfully")

       popupRefResign.current.close();
        
        
        
      }
    } catch (error) {
      console.log(error);
    }


    

  }




  return (
    <>

      <p className="lexend-font text-black_second font-bold text-xl md:text-2xl p-2">Settings</p>
      <div className="flex flex-col p-2">



      <div className="rounded-md lexend-font text-black_second select-none font-medium"
      style={{border: "1.5px solid #C6C6C6"}}
      >

        <div className="h-8 flex justify-start items-center gap-2 cursor-pointer">

          <img src="/editprofile/withdraw.svg"  className="w-5 ml-4" />
          <p>Withdraw Candidacy</p>



        </div>

        <hr style={{border: "1px solid #C6C6C6"}}/>

        <div className="h-8 flex justify-start items-center gap-2 cursor-pointer">

          <img src="/editprofile/resign.svg"  className="w-4 ml-4" />
          <p>Resign from this position</p>

        </div>



        <hr style={{border: "1px solid #C6C6C6"}}/>

<div className="h-8 flex justify-start items-center gap-2 cursor-pointer">

  <img src="/editprofile/delete.svg"  className="w-4 ml-4" />
  <p className="text-[#FD5757]">Delete Account</p>


</div>


      </div>


      


          <p className="m-4 mt-6">
            Would you like to resign from current position ?{" "}
          </p>

          <Popup
                  ref={popupRefResign}
                  trigger={
                   
                    <Button
                   /*  onClick={resignFromPosition} */
                     className="w-[100px] "
                     style={{ marginTop: "5px" }}
                     sx={{
                       marginLeft: "10px",
                       fontSize: "8pt",
                       height: "40px",
                       bgcolor: "#AF2626",
                       color: "#fff",
                       borderRadius: 15,
                       border: `1px solid #AF2626`,
                       "&:hover": {
                         background: "rgb(196, 43, 43)",
                         color: "white",
                         border: `1px solid rgb(196, 43, 43)`,
                       },
                     }}
                     variant="text"
                     value="resign"
                   >
                     <span className="popins-font">Resign</span>
                   </Button>
        
                  }
                  position="right center"
                  contentStyle={{ width: "auto" }}
                >
                  <div className="m-4">
                   
                    <div className="flex gap-2 mb-2 justify-center">
                      <p>Resign ?</p>
                    </div>


                    

                    <div className="flex justify-center items-center gap-2 m-4">
                      <Button
                        onClick={cancelResign}
                        className="w-[85px]"
                        style={{ marginTop: "0px", padding: "0px" }}
                        sx={{
                          fontSize: "8pt",
                          height: "30px",
                          bgcolor: "#fff",
                          color: "#232323",
                          borderRadius: 15,
                          border: `1px solid #fff`,
                          "&:hover": {
                            background: "rgb(196, 43, 43)",
                            color: "white",
                            border: `1px solid rgb(196, 43, 43)`,
                          },
                        }}
                      >
                        <span className="popins-font">Cancel</span>
                      </Button>

                      <Button
                        onClick={resignFromPosition}
                        className="w-[85px]"
                        style={{ marginTop: "0px", padding: "0px" }}
                        sx={{
                          fontSize: "8pt",
                          height: "30px",
                          bgcolor: "#AF2626",
                          color: "#fff",
                          borderRadius: 15,
                          border: `1px solid #AF2626`,
                          "&:hover": {
                            background: "rgb(196, 43, 43)",
                            color: "white",
                            border: `1px solid rgb(196, 43, 43)`,
                          },
                        }}
                      >
                        <span className="popins-font">Resign</span>
                      </Button>
                    </div>

                    
                  </div>
                </Popup>



         






          <div className="flex justify-between mt-32 gap-2 items-center">



           

            <Popup
                  ref={popupRef}
                  trigger={
                   
                    <div className="self-center flex items-center">

                    <img src="/myaccount/trash.svg" style={{height: "20px", width: "20px", margin: "5px"}}/>
                   {/*  // TODO, you just need to make request to backend. And after user click "OK" on "Are you sure" pop up box, then it sends request to backend, as email by which to delete. But it should send confirmation email , and on that email, is link, to actually delete account (so, it's security there... ) */}
                    <p className="text-red_first cursor-pointer select-none">Delete account </p>
      
                    
                  </div>
        
                  }
                  position="right center"
                  contentStyle={{ width: "auto" }}
                >
                  <div className="m-4">
                   
                    <div className="flex gap-2 mb-2 justify-center">
                      <p>Delete account ?</p>
                    </div>


                    

                    <div className="flex justify-center items-center gap-2 m-4">
                      <Button
                        onClick={cancel}
                        className="w-[85px]"
                        style={{ marginTop: "0px", padding: "0px" }}
                        sx={{
                          fontSize: "8pt",
                          height: "30px",
                          bgcolor: "#fff",
                          color: "#232323",
                          borderRadius: 15,
                          border: `1px solid #fff`,
                          "&:hover": {
                            background: "rgb(196, 43, 43)",
                            color: "white",
                            border: `1px solid rgb(196, 43, 43)`,
                          },
                        }}
                      >
                        <span className="popins-font">Cancel</span>
                      </Button>

                      <Button
                        onClick={deleteAccount}
                        className="w-[85px]"
                        style={{ marginTop: "0px", padding: "0px" }}
                        sx={{
                          fontSize: "8pt",
                          height: "30px",
                          bgcolor: "#AF2626",
                          color: "#fff",
                          borderRadius: 15,
                          border: `1px solid #AF2626`,
                          "&:hover": {
                            background: "rgb(196, 43, 43)",
                            color: "white",
                            border: `1px solid rgb(196, 43, 43)`,
                          },
                        }}
                      >
                        <span className="popins-font">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Popup>





        
          </div>
      </div>
    </>
  );
};

export { Settings };
