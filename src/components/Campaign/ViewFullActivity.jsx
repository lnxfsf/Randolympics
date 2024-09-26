import { DonatePart } from "./DonatePart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

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
    </>
  );
};

export { ViewFullActivity };
