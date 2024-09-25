import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@mui/material";

import { settingUserType } from "../../context/user_types";
import { Navbar } from "../Navbar";
import { FooterClean } from "../FooterClean";

import { QRCode } from 'react-qrcode-logo';




let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

function formatDate(dateString) {
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const UserProfilePublicView = () => {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [userData, setUserData] = useState();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_SERVER_BASE_URL}/user/fetchLatestData`,
        {
          userId: userId,
        }
      );

      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching other users:", error);
    }
  };

  return (
    <>
     <Navbar />

      {userData && (
        <>



        <div className="p-8 flex flex-col gap-4 justify-center items-center">
       
       <div className="flex justify-between items-center w-full flex-wrap lg:w-[70%] xl:w-[60%] 2xl:w-[50%] 3xl:w-[40%]">
          <Avatar
            sx={{ width: { xs: 60, md: 80 },
            height: { xs: 60, md: 80 }, }}
           
          
            src={
              BACKEND_SERVER_BASE_URL +
              "/imageUpload/profile_pics/" +
              userData.picture
            }
          >
          {userData.name.charAt(0).toUpperCase()}
          </ Avatar>

          <div className="lexend-font text-black_second">
            <p className="text-end text-2xl md:text-3xl  font-bold" >{userData.name} {userData.middleName && (<>({userData.middleName})</>)} {userData.lastName}</p>
            <p className="text-end font-medium">{settingUserType(userData.user_type)}</p>
          </div>
          </div>

          <div className="lexend-font text-black_second   flex-col bg-gray_second rounded-2xl p-3 md:p-4 w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%] 3xl:w-[40%]">
            <p className="font-bold text-xl md:text-2xl">Personal Information</p>

            <p className="text-lg font-medium mt-2">Gender</p>
            <p className="text-lg font-medium text-[#616673]">
              {userData.gender === "M" ? "Male" : "Female"}
            </p>


            {!userData.isCelebrity && !userData.isVerified && (
              <>
              
            {userData.birthdate && (<>
            <p className="text-lg font-medium mt-2">Birthdate</p>
            <p className="text-lg font-medium text-[#616673]">
              {formatDate(userData.birthdate)}
            </p>
            </>)}

              {userData.email && (<>
                <p className="text-lg font-medium mt-2">Email</p>
                <p className="text-lg font-medium text-[#616673] break-all">
                  {userData.email}
                </p>
                </>)}

                {userData.phone && (<>
                    <p className="text-lg font-medium mt-2">Phone Number</p>
                    <p className="text-lg font-medium text-[#616673] break-all">
                    {userData.phone}
                    </p>
                </>)}


              </>
            )}

            {userData.weight !== 0 && (
              <>
                <p className="text-lg font-medium mt-2">Weight</p>
                <p className="text-lg font-medium text-[#616673]">
                  {userData.weight} kg
                </p>
              </>
            )}

            {userData.isCelebrity && (
              <>
                <p className="text-lg font-medium mt-2">Socials</p>

                {userData.fb_link && (
                  <a
                    href={`https://facebook.com/${userData.fb_link}`}
                    target="_blank"
                    className="text-[#616673] font-semibold underline cursor-pointer select-none"
                  >
                    Facebook
                  </a>
                )}

                {userData.ig_link && (
                  <a
                    href={`https://instagram.com/${userData.ig_link}`}
                    target="_blank"
                    className="text-[#616673] font-semibold underline cursor-pointer select-none"
                  >
                    Instagram
                  </a>
                )}

                {userData.tw_link && (
                  <a
                    href={`https://x.com/${userData.tw_link}`}
                    target="_blank"
                    className="text-[#616673] font-semibold underline cursor-pointer select-none"
                  >
                    Twitter
                  </a>
                )}
              </>
            )}

            {userData.cryptoaddress && (
              <>
                <p className="text-lg font-medium mt-2">Crypto</p>

                <p className="text-lg font-medium text-[#616673] break-all ">
                  {userData.cryptoaddress} {userData.cryptoaddress_type}
                </p>


                
                <div className=" mt-4 flex justify-center items-center">
                    <QRCode value={userData.cryptoaddress}
                    bgColor="#F8F8F8"

                    eyeRadius={100}
                  
                    qrStyle="dots"
                    
                    />
                </div>

               
              </>
            )}
          </div>


          </div>

        </>
      )}

      <FooterClean />
    </>
  );
};

export { UserProfilePublicView };
