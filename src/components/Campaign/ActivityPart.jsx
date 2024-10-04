import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";


const ActivityPart = ({ lastTransactionsSupporters, setViewFullActivity }) => {

  const { t } = useTranslation();


  return (
    <>
      <div className="flex flex-col lg:flex-row w-full p-3 md:p-8 gap-6 ml-0 ">
        {/*  h-54 md:h-56 */}
        <div
          className="lexend-font text-black_second  flex  flex-col justify-start  rounded-2xl p-6 md:p-8 w-full "
          style={{ boxShadow: "4px 4px 10px 0px #0000001A" }}
        >
          <p className="font-bold text-xl md:text-2xl">{t("campaign.content65")}</p>

          <div className="flex w-full flex-col mt-4">
            {lastTransactionsSupporters &&
              lastTransactionsSupporters.map((item, index) => (
                <>
                  {/* pl-4 pr-4 */}
                  <div className="flex w-full flex-col justify-start items-start mt-1 mb-1   ">
                    <div className="flex w-full  items-center justify-between">
                     
                      <p key={index} className="  ">
                        
                       
                        {item.supporterName !== '' ? (<>{item.supporterName}</>) : (<>{t("campaign.content66")}</>)}

                      </p>

                      <div className="flex ">
                        <p>
                          <span className="font-semibold"></span> $
                          {item.amount / 100}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm  break-all">
                      {item.supporterComment}
                    </p>
                  </div>
                </>
              ))}
          </div>

          {lastTransactionsSupporters &&
            lastTransactionsSupporters.length === 0 && (
              <>
                <div className="lexend-font text-black_second">
                  <p className="text-1xl md:text-2xl font-bold">{t("campaign.content67")}</p>
                  <p className="font-medium">{t("campaign.content68")}</p>
                </div>
              </>
            )}

          <Button
            onClick={() => {
              setViewFullActivity(true);
            }}
            className="w-full "
            style={{ textTransform: "none", marginTop: "20px" }}
            sx={{
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
          >
            <span className="lexend-font">{t("campaign.content69")}</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export { ActivityPart };
