import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";

const SupporterFifthPart = ({
  fifthIsVisible,
  urlForCampaign,
  inputLabelPropsTextField,
  sxTextField,
  setOpenSnackbarSuccess,
  setSnackbarMessage,
  friendName,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`flex justify-center items-center flex-col  first-content-container ${
          fifthIsVisible ? "show" : "hide"
        } `}
      >
        {/* height: 90rem;  */}
        <div className="flex items-center  justify-start md:justify-center w-full min-h-screen">
          <div
            className="basis-1/2 justify-center items-center hidden lg:block 2xl:m-32 image-container min-h-screen"
            style={{ height: "0rem" }}
          >
            <img src="supporters/6.jpg" className="image_supporter" />
          </div>

          <div className="basis-1/2 flex flex-wrap flex-col  justify-start md:justify-center  items-start md:items-center lg:items-start p-4 md:p-16 text-black_second grow">
            <p className="text-3xl lexend-font text-black_second font-bold mb-2">
              {t("campaign.content4")}
            </p>

            <p className=" lexend-font text-black_second font-medium mb-4">
              {t("campaign.content5")} {friendName}
              {t("campaign.content6")}
            </p>

            <p className="text-xl lexend-font text-black_second font-semibold mb-3">
              {t("campaign.content7")}
            </p>

            <div className="flex w-full  gap-4">
              <Button
                onClick={() => {
                  navigate("/");
                }}
                className="w-full"
                style={{ textTransform: "none" }}
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
                id="join-the-fun-btn"
              >
                <img src="supporters/right_arrow.svg" className="mr-2" />
                <span className="lexend-font">{t("campaign.content8")}</span>
              </Button>

              <Button
                onClick={() => {
                  const copied = navigator.clipboard.writeText(urlForCampaign);

                  if (copied) {
                    setOpenSnackbarSuccess(true);
                    setSnackbarMessage(t("campaign.content9"));
                  }
                }}
                className="w-full"
                style={{ textTransform: "none" }}
                sx={{
                  p: 2,
                  height: "50px",
                  bgcolor: "#fff",
                  color: "#444444",
                  borderRadius: 3,
                  border: `1px solid #444444`,
                  "&:hover": {
                    background: "rgba(210, 73, 73, 1)",
                    color: "white",
                    border: `1px solid rgba(210, 73, 73, 1)`,
                  },
                }}
                id="join-the-fun-btn"
              >
                <img src="supporters/share.svg" className="mr-2" />
                <span className="lexend-font">{t("campaign.content10")}</span>
              </Button>
            </div>

            <div className="flex justify-center gap-4 items-center w-full mt-8">
              <img className="w-6" src="supporters/fb.svg" />
              <img className="w-6" src="supporters/ig.svg" />
              <img className="w-6" src="supporters/x.svg" />
              <img className="w-6" src="supporters/ln.svg" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { SupporterFifthPart };
