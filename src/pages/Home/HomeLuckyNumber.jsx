import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const HomeLuckyNumber = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex items-start lexend-font text-black_second flex-col ">







        <Button
          onClick={() => {}}
          className="self-center   w-[50%] "
          /* w-full md:w-50% */
          style={{ textTransform: "none" }}
          sx={{
            mt: 5,
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
          <span className="lexend-font">{t("home.howItWorks.content21")}</span>


          
        </Button>




      </div>
    </>
  );
};

export { HomeLuckyNumber };
