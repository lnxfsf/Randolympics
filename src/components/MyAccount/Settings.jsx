import React, { useState, useEffect } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import { HeaderMyProfile } from "./HeaderMyProfile";

//we display it as fragment, inside MyProfile...
let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Settings = () => {
  const [userData, setUserData] = useState(null);

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

  const [original_email, setOriginalEmail] = useState(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    // this is the one that will be edited, as we input (onChange) input fields. this is the one we upload to backend (as a whole)
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");
    if (storedData) {
      var userJson = JSON.parse(storedData);

      setUserData(userJson);
      setOriginalEmail(userJson.data.email);

      setBio(userJson.data.bio);
    }
  }, []);

  const handleBioChange = (event) => {
    setBio(event.target.value);

    setUserData((prevUserData) => ({
      ...prevUserData,
      data: {
        ...prevUserData.data,
        bio: event.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/auth/update_user_data`,
        {
          original_email,
          bio: bio,
        }
      );

      if (response.status === 200) {
        if (localStorage.getItem("authTokens")) {
          localStorage.setItem("authTokens", JSON.stringify(userData));
        } else if (sessionStorage.getItem("authTokens")) {
          sessionStorage.setItem("authTokens", JSON.stringify(userData));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HeaderMyProfile />
      <div className="flex flex-col">
        <form action="#" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full h-32 mr-4 mt-2">
            <TextField
              label="About me"
              value={userData && userData.data.bio}
              onChange={handleBioChange}
              placeholder="Bio"
              id="bio"
              name="bio"
              multiline
              rows={4}
              className="w-full h-full rounded-md border border-gray-900"
              type="text"
              sx={{
                m: 1,
                /* width: "2px",  */
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5, // Rounded corners
                },

                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "red", // Red border on focus
                  },

                "& .MuiInputLabel-root": {
                  "&.Mui-focused": {
                    color: "black", // Set label color to black when focused
                  },
                },
              }}
              inputProps={{
                maxLength: 255,
              }}
            />
          </div>

          <p className="m-4 mt-6">
            Would you like to resign from current position ?{" "}
          </p>
          <Button
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






          <div className="flex justify-between mt-32 gap-2 items-center">



            <div className="self-center flex items-center">

              <img src="myaccount/trash.svg" style={{height: "20px", width: "20px", margin: "5px"}}/>
             {/*  // TODO, you just need to make request to backend. And after user click "OK" on "Are you sure" pop up box, then it sends request to backend, as email by which to delete. But it should send confirmation email , and on that email, is link, to actually delete account (so, it's security there... ) */}
              <p className="text-red_first cursor-pointer select-none">Delete account </p>

              
            </div>

            <div className="flex gap-2 items-center self-center">
              <Button
                onClick={handleCancel}
                className="w-[200px]"
                style={{ marginTop: "0px" }}
                sx={{
                  height: "50px",
                  bgcolor: "#fff",
                  color: "#000",
                  borderRadius: 15,
                  border: `1px solid #AF2626`,
                  "&:hover": {
                    background: "rgb(196, 43, 43)",
                    color: "white",
                    border: `1px solid rgb(196, 43, 43)`,
                  },
                }}
                variant="text"
                value="Login"
                id="login-btn"
              >
                <span className="popins-font">Cancel</span>
              </Button>

              <Button
                className="w-[200px]"
                style={{ marginTop: "0px" }}
                sx={{
                  height: "50px",
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
                type="submit"
                variant="text"
              >
                <span className="popins-font">Save</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { Settings };
