import { Button } from "@mui/material";
import ReactCurvedText from "react-curved-text";

import { Avatar, AvatarGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

import "../../styles/myaccount.scoped.scss";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;

const HeaderPart = ({
  athlete,
  statusImage,
  setOpenSnackbar,
  setSnackbarMessage,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative ">
        {/* <div className="bg-[#F5F5F5] h-32 sm:h-40 md:h-52"></div> */}

        {/* 
        <div className="image_editProfile">

          <img
        
            className="image_editProfile absolute top-10 left-0 right-0 h-40 sm:h-60 md:h-80 object-contain  z-10 rounded-full ml-4 mr-auto  "
            /*  src={getImageUrl(post.cover_image)} 
            style={{ position: "relative", zIndex: "-1" }}

            src="/supporters/profile_placeholder.jpeg"
          />




          
        </div> */}
        {athlete && (
          <>
            <div className="circle-campaign flex justify-center items-center top-10  ml-4 md:ml-8 ">
              <Avatar
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                }}
                /*  src="/supporters/profile_placeholder.jpeg"
                 */

                src={
                  S3_BUCKET_CDN_BASE_URL +
                  "/profile_pictures/" +
                  athlete.picture
                }
                /*  className=" absolute top-10 left-5 right-0 ml-4 md:ml-8 mr-auto  " */

                className="   "
              >
                {athlete.name.charAt(0).toUpperCase()}
              </Avatar>

              <div className="text-wrapper">
                <ReactCurvedText
                  width={250}
                  height={250}
                  cx={125}
                  cy={125}
                  rx={80}
                  ry={80}
                  startOffset="130"
                  reversed={false}
                  text="Most Likely Going"
                  textProps={{
                    style: {
                      fontSize: 12,
                      fill: "#fff",
                      fontFamily: "'Lexend', sans-serif",
                    },
                  }}
                  textPathProps={null}
                  tspanProps={{ dy: "-9" }}
                  ellipseProps={null}
                  svgProps={null}
                />
              </div>

              {/*   <img /* src="/supporters/likely_going.svg"  



              src={statusImage(athlete.athleteStatus)}


              className=" absolute top-7 min-[900px]:top-6 left-[0.45rem] min-[900px]:left-1 right-0 ml-4 md:ml-8 mr-auto w-[6.5rem] min-[900px]:w-[9.5rem] "
            />

 */}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            const copied = navigator.clipboard.writeText(window.location.href);

            if (copied) {
              setOpenSnackbar(true);
              setSnackbarMessage(t("campaign.content9"));
            }
          }}
          className="w-[110px] "
          style={{ textTransform: "none", marginRight: "10px" }}
          sx={{
            p: 2,

            height: "50px",
            bgcolor: "#D24949",

            color: "#fff",
            borderRadius: 3,
            border: `1px solid #D24949`,
            "&:hover": {
              background: "rgba(210, 73, 73, 1)",
              color: "white",
              border: `1px solid rgba(210, 73, 73, 1)`,
            },
          }}
        >
          <img src="/supporters/share_white.svg" className="mr-2" />
          <span className="lexend-font">{t("campaign.content10")}</span>
        </Button>
      </div>
    </>
  );
};

export { HeaderPart };
