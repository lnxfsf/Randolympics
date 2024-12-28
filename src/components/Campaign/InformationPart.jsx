import { QRCode } from "react-qrcode-logo";
import { useTranslation } from "react-i18next";

const InformationPart = ({ athlete, formatDate }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="lexend-font text-black_second   flex-col bg-gray_second rounded-2xl p-3 md:p-4 w-full">
        <p className="font-bold text-xl md:text-2xl">
          {t("campaign.content80")}
        </p>

        <p className="text-lg font-medium mt-2">{t("campaign.content28")}</p>
        <p className="text-lg font-medium text-[#616673]">
          {athlete.gender === "M" ? "Male" : "Female"}
        </p>

        {!athlete.isCelebrity && athlete.isVerified && (
          <>
            <>
              <p className="text-lg font-medium mt-2">
                {t("campaign.content81")}
              </p>

              {athlete.birthdate_private === 1 ? (
                <>
                  <div className="flex gap-2">
                    <img
                      className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                      src="/editprofile/private_lock.svg"
                    />
                    <p className="text-lg font-medium text-[#616673] break-all">
                      {t("campaign.content82")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-[#616673]">
                    {formatDate(athlete.birthdate)}
                  </p>
                </>
              )}
            </>

            <>
              <p className="text-lg font-medium mt-2">
                {t("campaign.content31")}
              </p>

              {athlete.email_private === 1 ? (
                <>
                  <div className="flex gap-2">
                    <img
                      className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                      src="/editprofile/private_lock.svg"
                    />
                    <p className="text-lg font-medium text-[#616673] break-all">
                      {t("campaign.content82")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-[#616673] break-all">
                    {athlete.email}
                  </p>
                </>
              )}
            </>

            <>
              <p className="text-lg font-medium mt-2">
                {t("campaign.content83")}
              </p>
              {athlete.phone_private === 1 ? (
                <>
                  <div className="flex gap-2">
                    <img
                      className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                      src="/editprofile/private_lock.svg"
                    />
                    <p className="text-lg font-medium text-[#616673] break-all">
                      {t("campaign.content82")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium text-[#616673] break-all">
                    {athlete.phone}
                  </p>
                </>
              )}
            </>
          </>
        )}

        {athlete.weight !== 0 && (
          <>
            <p className="text-lg font-medium mt-2">
              {t("campaign.content84")}
            </p>

            {athlete.weight_private === 1 ? (
              <>
                <div className="flex gap-2">
                  <img
                    className=" bg-[#EAEAEA] p-2 rounded-lg items-center "
                    src="/editprofile/private_lock.svg"
                  />
                  <p className="text-lg font-medium text-[#616673] break-all">
                    {t("campaign.content82")}
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-medium text-[#616673] break-all">
                  {athlete.weight} kg
                </p>
              </>
            )}
          </>
        )}

        {athlete.isCelebrity == true && (
          <>
            <p className=" text-lg font-medium mt-2">
              {t("campaign.content85")}
            </p>
            <div className="flex flex-col">
              {athlete.fb_link && (
                <a
                  href={`https://facebook.com/${athlete.fb_link}`}
                  target="_blank"
                  className="text-[#616673] font-semibold underline cursor-pointer select-none"
                >
                  {t("campaign.content86")}
                </a>
              )}

              {athlete.ig_link && (
                <a
                  href={`https://instagram.com/${athlete.ig_link}`}
                  target="_blank"
                  className="text-[#616673] font-semibold underline cursor-pointer select-none"
                >
                  {t("campaign.content87")}
                </a>
              )}

              {athlete.tw_link && (
                <a
                  href={`https://x.com/${athlete.tw_link}`}
                  target="_blank"
                  className="text-[#616673] font-semibold underline cursor-pointer select-none"
                >
                  {t("campaign.content88")}
                </a>
              )}
            </div>
          </>
        )}

        {athlete.cryptoaddress && (
          <>
            <p className="text-lg font-medium mt-2">
              {t("campaign.content89")}
            </p>

            <p className="text-lg font-medium text-[#616673] break-all">
              {athlete.cryptoaddress} {athlete.cryptoaddress_type}
            </p>

            <div className=" mt-4 flex justify-center items-center">
              <QRCode
                value={athlete.cryptoaddress}
                bgColor="#F8F8F8"
                eyeRadius={100}
                qrStyle="dots"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { InformationPart };
