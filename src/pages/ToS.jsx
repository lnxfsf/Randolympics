import { useEffect } from "react";
import { FooterClean } from "../components/FooterClean";
import { Navbar } from "../components/Navbar";
import { NavbarClean } from "../components/NavbarClean";
import { useTranslation } from "react-i18next";
const ToS = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#termsof") {
      const element = document.getElementById("termsof");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className="m-8">
        <p className="text-4xl">{t("privacyPolicy.ToSTitle")}</p>
        <br />

        <p className="text-3xl">{t("privacyPolicy.ToSSubTitle1")}</p>
        <br />

        <p
          className=""
          dangerouslySetInnerHTML={{
            __html: t(`privacyPolicy.ToSText1`),
          }}
        />

 <br />
 <br />



        <p className="text-3xl">{t("privacyPolicy.ToSSubTitle2")}</p>
        <br />

        <p
          className=""
          dangerouslySetInnerHTML={{
            __html: t(`privacyPolicy.ToSText2`),
          }}
        />


      </div>

      <FooterClean />
    </>
  );
};

export { ToS };
