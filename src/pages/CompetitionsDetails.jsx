import { useParams, useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import YouTube from "react-youtube";

const CompetitionsDetails = () => {
  const { sportName } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();

  let variations = 0;

  if (t(sportName, { returnObjects: true })) {
    variations = t(`sportDetails.${sportName}.variations`, {
      returnObjects: true,
    });
  }

  return (
    <>
      <div className="lexend-font text-black_second">
        {/*  general info about sport */}
        <div className="m-8 mb-12">
          <p className="text-2xl md:text-3xl capitalize font-semibold 2xl:ml-16">
            {t(`sportDetails.${sportName}.maintitle`)}
          </p>

          <p
            className="text-sm md:text-base  2xl:ml-16"
            dangerouslySetInnerHTML={{
              __html: t(`sportDetails.${sportName}.subtitle1`),
            }}
          />

          <div className="flex md:flex-row flex-col mt-4 2xl:m-16 gap-6">
            <div className="w-full  ">
              {t(`sportDetails.${sportName}.image1`).startsWith(
                "/sportDetails"
              ) ? (
                <>
                  <img
                    src={t(`sportDetails.${sportName}.image1`)}
                    className="object-cover"
                  />
                </>
              ) : (
                <>
                  <YouTube
                    videoId={t(`sportDetails.${sportName}.image1`)}
                    opts={{ height: "350em", width: "100%" }}
                  />
                </>
              )}
            </div>

            <div className="w-full">
              <p className="text-xl md:text-2xl capitalize font-semibold">
                {t(`sportDetails.${sportName}.title1`)}
              </p>

              <p className="text-lg md:text-xl capitalize font-semibold">
                {t("sportDetails.common1")}
              </p>

              <p
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: t(`sportDetails.${sportName}.desc1`),
                }}
              />
            </div>
          </div>
        </div>

        {/* all variations of sport */}

        {variations === 0 && (
          <>
            {variations.map((variation, index) => (
              <div key={index} className="m-8">
                <p className="text-lg md:text-xl capitalize font-semibold">
                  {variation.title}
                </p>

                <div className="flex md:flex-row flex-col mt-4 2xl:m-16 gap-6">
                  <div className="md:basis-96">
                    <YouTube
                      videoId={variation.yt_link}
                      opts={{ height: "100%", width: "100%" }}
                    />
                  </div>

                  <div className="w-full">
                    <p
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: variation.desc,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export { CompetitionsDetails };
