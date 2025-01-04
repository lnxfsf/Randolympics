import { Button } from "@mui/material";
import ReactCurvedText from "react-curved-text";

import { Avatar, AvatarGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

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
  const isLargeScreen = useMediaQuery({ query: "(min-width: 900px)" });

  return (
    <>
      <div className="relative ">
        {athlete && (
          <>
            <div className="circle-campaign flex justify-center items-center top-10  ml-4 md:ml-8 ">
              <Avatar
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                }}
                src={
                  S3_BUCKET_CDN_BASE_URL +
                  "/profile_pictures/" +
                  athlete.picture
                }
                className="   "
              >
                {athlete.name.charAt(0).toUpperCase()}
              </Avatar>

              <div className="text-wrapper">
                <ReactCurvedText
                  width={isLargeScreen ? 250 : 175}
                  height={isLargeScreen ? 250 : 175}
                  cx={isLargeScreen ? 125 : 87.5}
                  cy={isLargeScreen ? 125 : 87.5}
                  rx={isLargeScreen ? 80 : 56}
                  ry={isLargeScreen ? 80 : 56}
                  startOffset={isLargeScreen ? "130" : "91"}
                  reversed={false}
                  text="Most Likely Going"
                  textProps={{
                    style: {
                      fontSize: isLargeScreen ? 12 : 8.4,
                      fill: "#fff",
                      fontFamily: "'Lexend', sans-serif",
                    },
                  }}
                  textPathProps={null}
                  tspanProps={{ dy: isLargeScreen ? "-9" : "-6.3" }}
                  ellipseProps={null}
                  svgProps={null}
                />
              </div>
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
