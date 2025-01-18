import { Avatar, AvatarGroup } from "@mui/material";
import Flag from "react-world-flags";
import { settingUserType } from "../../context/user_types";


import { useTranslation } from "react-i18next";
import { useEffect } from "react";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

  let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;


const SubHeaderPart = ({
  athlete,
  howManySupporters,
  moreDetailsAboutSupporters,
}) => {

  
  const { t } = useTranslation();

  
  return (
    <>
      <div className="lexend-font text-black_second mt-8 m-6 md:m-8 flex-col md:flex-row">
        <div className="flex gap-4   mt-0 items-center">
          <p className="text-2xl font-bold">
            {athlete.name} {athlete.middleName && <> ({athlete.middleName}) </>}
            {athlete.lastName}{" "}
          </p>

          <div>
            <Flag className="w-4 md:w-8 shadow-flags-shadow " code={athlete.nationality} />
          </div>
        </div>

        <p className="text-[#616673] font-medium">
          {settingUserType(athlete.user_type)}
        </p>

        <p className="mt-1">{athlete.athleteStatement}</p>

        <p key={howManySupporters} className="mt-1">
          {howManySupporters} {t("campaign.content107")}
        </p>


        <div className="flex justify-start mt-2">
          <AvatarGroup
            max={5}
            sx={{
              "& .MuiAvatar-root": {
                width: { xs: 35, md: 40 },
                height: { xs: 35, md: 40 },
              },
            }}
          >
            {moreDetailsAboutSupporters && 
              
                moreDetailsAboutSupporters.map((supporter, index) => (

                  <Avatar

                    key={index}
                    sx={{
                      width: { xs: 30, md: 40 },
                      height: { xs: 30, md: 40 },
                    }}

                    src={ supporter.picture ? 
                      S3_BUCKET_CDN_BASE_URL +
                      "/profile_pictures/" +
                      supporter.picture : null
                    } 
                  >
                    {supporter.supporterName.charAt(0).toUpperCase()}
                  </Avatar>
                ))
              
            }
          </AvatarGroup>
        </div>
      </div>
    </>
  );
};

export { SubHeaderPart };
