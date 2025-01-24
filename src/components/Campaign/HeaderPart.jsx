import { Button } from "@mui/material";
import ReactCurvedText from "react-curved-text";

import { useState, useEffect } from "react";

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

const HeaderPart = ({ athlete, setOpenSnackbar, setSnackbarMessage }) => {
  const { t, i18n } = useTranslation();




  const isLargeScreen = useMediaQuery({ query: "(min-width: 900px)" });

  const [statusText, setStatusText] = useState("");
  const [colorOfStatus, setColorOfStatus] = useState("237, 172, 42");

  useEffect(() => {
    const athleteStatus = athlete?.athleteStatus;

    if (athleteStatus === "s1") {
      setStatusText(t("campaign.content112"));
      setColorOfStatus("237, 172, 42");

      //return "/supporters/likely_going.svg";
    } else if (athleteStatus === "s2") {
      setStatusText(t("campaign.content113"));
      setColorOfStatus("237, 172, 42");
      // return "/supporters/likely_going.svg";
    } else if (athleteStatus === "s3") {
      setStatusText(t("campaign.content114"));
      setColorOfStatus("63, 194, 93");

      //  return "/supporters/going_sure.svg";
    } else if (athleteStatus === "s4") {
      setStatusText(t("campaign.content115"));
      setColorOfStatus("237, 172, 42");

      // return "/supporters/likely_going.svg";
    } else if (athleteStatus === "s5") {
      setStatusText(t("campaign.content116"));
      setColorOfStatus("32, 117, 209");

      // return "/supporters/maybe_going.svg";
    } else if (athleteStatus === "s6") {
      setStatusText(t("campaign.content117"));
      setColorOfStatus("183, 22, 19");

      // return "/supporters/not_going.svg";
    }
  }, [athlete?.athleteStatus, i18n.language]);

  return (
    <>
      <div className="relative ">
        {athlete && (
          <>
            <div
              className="circle-campaign flex justify-center items-center top-10  ml-4 md:ml-8 "
              style={{
                "--circle-color": colorOfStatus,
              }}
            >
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
                  text={statusText}
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
