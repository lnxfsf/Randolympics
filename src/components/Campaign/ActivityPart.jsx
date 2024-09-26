import Button from "@mui/material/Button";

const ActivityPart = ({ lastTransactionsSupporters, setViewFullActivity }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row w-full p-3 md:p-8 gap-6 ml-0 ">
        {/*  h-54 md:h-56 */}
        <div
          className="lexend-font text-black_second  flex  flex-col justify-start  rounded-2xl p-6 md:p-8 w-full "
          style={{ boxShadow: "4px 4px 10px 0px #0000001A" }}
        >
          <p className="font-bold text-xl md:text-2xl">Activity</p>

          <div className="flex w-full flex-col mt-4">
            {lastTransactionsSupporters &&
              lastTransactionsSupporters.map((item, index) => (
                <>
                  {/* pl-4 pr-4 */}
                  <div className="flex w-full flex-col justify-start items-start mt-1 mb-1   ">
                    <div className="flex w-full  items-center justify-between">
                     
                      <p key={index} className="  ">
                        
                       
                        {item.supporterName !== '' ? (<>{item.supporterName}</>) : (<>Anonymous</>)}

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
                  <p className="text-1xl md:text-2xl font-bold">None</p>
                  <p className="font-medium">Be first to donate 💰 🙌</p>
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
            <span className="lexend-font">Show All</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export { ActivityPart };
