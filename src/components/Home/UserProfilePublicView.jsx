import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@mui/material";

import { settingUserType } from "../../context/user_types";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";


import { useTranslation } from "react-i18next";

import { QRCode } from "react-qrcode-logo";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

  let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;


const UserProfilePublicView = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();


  

function formatDate(dateString) {
  let date = new Date(dateString);
  let locale = i18n.language || "en-US";
  
  switch(locale){
    case "sr":
      locale = "sr-Latn";
      break;
      
  }

  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(locale, options);
}


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
                sx={{ width: { xs: 60, md: 80 }, height: { xs: 60, md: 80 } }}
                src={
                  S3_BUCKET_CDN_BASE_URL +
                  "/profile_pictures/" +
                  userData.picture
                }
              >
                {userData.name.charAt(0).toUpperCase()}
              </Avatar>

              <div className="lexend-font text-black_second">
                <p className="text-end text-2xl md:text-3xl  font-bold">
                  {userData.name}{" "}
                  {userData.middleName && <>({userData.middleName})</>}{" "}
                  {userData.lastName}
                </p>
                <p className="text-end font-medium">
                  {settingUserType(userData.user_type)}
                </p>
              </div>
            </div>

            <div className="lexend-font text-black_second   flex-col bg-gray_second rounded-2xl p-3 md:p-4 w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%] 3xl:w-[40%]">
              <p className="font-bold text-xl md:text-2xl">
              {t("userprofile.content1")}
              </p>




              <p className="text-lg font-medium mt-2">{t("userprofile.content2")}</p>
              <p className="text-lg font-medium text-[#616673]">
                {userData.bio}
              </p>


              <p className="text-lg font-medium mt-2">{t("userprofile.content3")}</p>
              <p className="text-lg font-medium text-[#616673]">
                {userData.gender === "M" ? t("campaign.content29") : t("campaign.content30")}
              </p>

              {!userData.isCelebrity && !userData.isVerified && (
                <>
                  {userData.birthdate && (
                    <>
                      <p className="text-lg font-medium mt-2">{t("userprofile.content4")}</p>

                      {userData.birthdate_private === 1 ? (
                        <>
                          <div className="flex gap-2">
                            <img
                              className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                              src="/editprofile/private_lock.svg"
                            />
                            <p className="text-lg font-medium text-[#616673] break-all">
                            {t("userprofile.content5")}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium text-[#616673]">
                            {formatDate(userData.birthdate)}
                          </p>
                        </>
                      )}
                    </>
                  )}

                  {userData.email && (
                    <>
                      <p className="text-lg font-medium mt-2">{t("userprofile.content6")}</p>

                      {userData.email_private === 1 ? (
                        <>
                          <div className="flex gap-2">
                            <img
                              className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                              src="/editprofile/private_lock.svg"
                            />
                            <p className="text-lg font-medium text-[#616673] break-all">
                            {t("userprofile.content5")}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium text-[#616673] break-all">
                            {userData.email}
                          </p>
                        </>
                      )}
                    </>
                  )}

                  {userData.phone && (
                    <>
                      <p className="text-lg font-medium mt-2">{t("userprofile.content7")}</p>

                      {userData.phone_private === 1 ? (
                        <>
                          <div className="flex gap-2">
                            <img
                              className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                              src="/editprofile/private_lock.svg"
                            />
                            <p className="text-lg font-medium text-[#616673] break-all">
                            {t("userprofile.content5")}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-medium text-[#616673] break-all">
                            {userData.phone}
                          </p>
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              {userData.weight !== 0 && (
                <>
                  <p className="text-lg font-medium mt-2">{t("userprofile.content8")}</p>
                  {userData.weight_private === 1 ? (
                    <>
                      <div className="flex gap-2">
                        <img
                          className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                          src="/editprofile/private_lock.svg"
                        />
                        <p className="text-lg font-medium text-[#616673] break-all">
                        {t("userprofile.content5")}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-medium text-[#616673]">
                        {userData.weight} kg
                      </p>
                    </>
                  )}
                </>
              )}

              {userData.isCelebrity && (
                <>
                  <p className="text-lg font-medium mt-2">{t("userprofile.content9")}</p>

                  {userData.fb_link && (
                    <a
                      href={`https://facebook.com/${userData.fb_link}`}
                      target="_blank"
                      className="text-[#616673] font-semibold underline cursor-pointer select-none"
                    >
                      {t("userprofile.content10")}
                    </a>
                  )}

                  {userData.ig_link && (
                    <a
                      href={`https://instagram.com/${userData.ig_link}`}
                      target="_blank"
                      className="text-[#616673] font-semibold underline cursor-pointer select-none"
                    >
                      {t("userprofile.content11")}
                    </a>
                  )}

                  {userData.tw_link && (
                    <a
                      href={`https://x.com/${userData.tw_link}`}
                      target="_blank"
                      className="text-[#616673] font-semibold underline cursor-pointer select-none"
                    >
                      {t("userprofile.content12")}
                    </a>
                  )}


{userData.tt_link && (
                    <a
                      href={`https://tiktok.com/${userData.tt_link}`}
                      target="_blank"
                      className="text-[#616673] font-semibold underline cursor-pointer select-none"
                    >
                      {t("userprofile.content14")}
                    </a>
                  )}

{userData.yt_link && (
                    <a
                      href={`https://youtube.com/${userData.yt_link}`}
                      target="_blank"
                      className="text-[#616673] font-semibold underline cursor-pointer select-none"
                    >
                      {t("userprofile.content15")}
                    </a>
                  )}

                </>
              )}

              {userData.cryptoaddress && (
                <>
                  <p className="text-lg font-medium mt-2">{t("userprofile.content13")}</p>

                  <p className="text-lg font-medium text-[#616673] break-all ">
                    {userData.cryptoaddress} {userData.cryptoaddress_type}
                  </p>

                  <div className=" mt-4 flex justify-center items-center">
                    <QRCode
                      value={userData.cryptoaddress}
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

      <Footer />
    </>
  );
};

export { UserProfilePublicView };
