import { DonatePart } from "./DonatePart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Button, Avatar } from "@mui/material";
import { formatDistanceToNow } from 'date-fns';

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ViewFullActivity = ({
  wantToDonate,
  setWantToDonate,
  campaign,
  supporterName,
  setSupporterName,
  supporterEmail,
  setSupporterEmail,
  supporterComment,
  setSupporterComment,
  campaignId,
  discountCode,
  countryAthleteIsIn,
  athlete,
  setDiscountCode,
  donateWithCouponOnly,
  viewFullActivity,
  setViewFullActivity,
  howManySupporters,

  allTransactionsSupporters,


  handlePaginationChangeAllTransactions,
  allTransactionsPage,
  maxPages,

}) => {


  return (
    <>
      <div className=" flex justify-center items-center">
        <div className="w-[92%] flex items-center ">
          <IconButton
            className="back-icon"
            onClick={() => {
              setViewFullActivity(false);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <p className="lexend-font font-bold text-black_second text-xl md:text-2xl">
            Campaign Activity 
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full p-3 md:p-8 gap-6 ml-0 ">
        <DonatePart
          wantToDonate={wantToDonate}
          setWantToDonate={setWantToDonate}
          campaign={campaign}
          athlete={athlete}
          supporterName={supporterName}
          setSupporterName={setSupporterName}
          supporterEmail={supporterEmail}
          setSupporterEmail={setSupporterEmail}
          supporterComment={supporterComment}
          setSupporterComment={setSupporterComment}
          campaignId={campaignId}
          discountCode={discountCode}
          countryAthleteIsIn={countryAthleteIsIn}
          setDiscountCode={setDiscountCode}
          donateWithCouponOnly={donateWithCouponOnly}
          viewFullActivity={viewFullActivity}
          howManySupporters={howManySupporters}
        />
      </div>

      <div className="flex flex-col lg:flex-row w-full p-3 md:p-8 gap-6 ml-0 ">
        {/*  h-54 md:h-56 */}
        <div
          className="lexend-font text-black_second  flex  flex-col justify-start  rounded-2xl p-6 md:p-8 w-full "
          style={{ boxShadow: "4px 4px 10px 0px #0000001A" }}
        >
          <p className="font-bold text-xl md:text-2xl">Activity</p>

          <div className="flex w-full flex-col mt-4">
            {allTransactionsSupporters &&
              allTransactionsSupporters.map((item, index) => (
                <>
                  {/* pl-4 pr-4 */}
                  <div className="flex w-full flex-col justify-start items-start mt-4 mb-4">
                    

                    <div className="flex w-full  items-center justify-between  ">
                      
                      <div className="flex gap-2 items-center">
                        {/*  width: 55, height: 55 */}
                    <Avatar
                      sx={{
                        width: { xs: 35, md: 55 },
                        height: { xs: 35, md: 55 },
                      }}
                    >
                      {item.supporterName.charAt(0).toUpperCase()}
                    </Avatar>
                        
                        <div className="flex flex-col">
                        <p key={index} className="font-bold text-lg  ">
                        {item.supporterName}
                      </p>
                    
                      <p className="text-sm  break-all pr-4">
                      {item.supporterComment}
                    </p>

                    <p className="text-sm font-medium break-all">
                      
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </p>


                    </div>

                      </div>

                      <div className="flex ">
                        <p className="font-bold text-lg text-[#44BC49]">
                          +$
                          {item.amount / 100}
                        </p>
                      </div>
                    </div>

                   
                  </div>
                </>
              ))}
          </div>

          {allTransactionsSupporters &&
            allTransactionsSupporters.length === 0 && (
              <>
                <div className="lexend-font text-black_second">
                  <p className="text-1xl md:text-2xl font-bold">None</p>
                  <p className="font-medium">Be first to donate 💰 🙌</p>
                </div>
              </>
            )}

<div className="flex justify-center items-start mt-4    w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={allTransactionsPage}
            onChange={handlePaginationChangeAllTransactions}
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#FFEAEA",
                  color: "#D24949",
                },
              },
            }}
          />
        </Stack>
      </div>
        </div>
      </div>
    </>
  );
};

export { ViewFullActivity };
