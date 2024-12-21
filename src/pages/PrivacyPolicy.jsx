import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { FooterClean } from "../components/FooterClean";

import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

    
useEffect(() => {
  
    const hash = window.location.hash;
    if (hash === "#cookiePolicy") {
      const element = document.getElementById("cookiePolicy");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
}, []);


 

  return (
    <>
      <Navbar />

      <div className="min-h-screen m-4 md:m-8 lexend-font text-black_second">
        <div>
          <p className="text-4xl">Privacy policy</p>
          <br />
          <p>1. Introduction</p>
          <p>
            We are responsible for maintaining and protecting the Personal
            Information under our control. We have designated an individual or
            individuals who is/are responsible for compliance with our privacy
            policy.
          </p>
          <br />
          <p>2. Identifying Purposes</p>
          <p>
            We collect, use and disclose Personal Information to provide you
            with the product or service you have requested and to offer you
            additional products and services we believe you might be interested
            in. The purposes for which we collect Personal Information will be
            identified before or at the time we collect the information. In
            certain circumstances, the purposes for which information is
            collected may be clear, and consent may be implied, such as where
            your name, address and payment information is provided as part of
            the order process.
          </p>
          <br />
          <p>3. Consent</p>
          <p>
            Knowledge and consent are required for the collection, use or
            disclosure of Personal Information except where required or
            permitted by law. Providing us with your Personal Information is
            always your choice. However, your decision not to provide certain
            information may limit our ability to provide you with our products
            or services. We will not require you to consent to the collection,
            use, or disclosure of information as a condition to the supply of a
            product or service, except as required to be able to supply the
            product or service.
          </p>
          <br />
          <p>4. Limiting Collection</p>
          <p>
            The Personal Information collected will be limited to those details
            necessary for the purposes identified by us. With your consent, we
            may collect Personal Information from you in person, over the
            telephone or by corresponding with you via mail, facsimile, or the
            Internet.
          </p>
          <br />
          <p>5. Limiting Use, Disclosure and Retention</p>
          <p>
            Personal Information may only be used or disclosed for the purpose
            for which it was collected unless you have otherwise consented, or
            when it is required or permitted by law. Personal Information will
            only be retained for the period of time required to fulfill the
            purpose for which we collected it or as may be required by law. [If
            applicable, include a description of any parties with whom you may
            share Personal Information.]
          </p>
          <br />
          <p>6. Accuracy</p>
          <p>
            Personal Information will be maintained in as accurate, complete and
            up-to-date form as is necessary to fulfill the purposes for which it
            is to be used.
          </p>
          <br />
          <p>7. Safeguarding Customer Information</p>
          <p>
            Personal Information will be protected by security safeguards that
            are appropriate to the sensitivity level of the information. We take
            all reasonable precautions to protect your Personal Information from
            any loss or unauthorized use, access or disclosure.
          </p>
          <br />
          <p>8. Openness</p>
          <p>
            We will make information available to you about our policies and
            practices with respect to the management of your Personal
            Information.
          </p>
          <br />
          <p>9. Customer Access</p>
          <p>
            Upon request, you will be informed of the existence, use and
            disclosure of your Personal Information, and will be given access to
            it. You may verify the accuracy and completeness of your Personal
            Information, and may request that it be amended, if appropriate.
            However, in certain circumstances permitted by law, we will not
            disclose certain information to you. For example, we may not
            disclose information relating to you if other individuals are
            referenced or if there are legal, security or commercial proprietary
            restrictions.
          </p>
          <br />
        </div>

        <div className="mt-8">
          <p className="text-4xl " id="cookiePolicy">
            {t("privacyPolicy.cookiePolicy1")}
          </p>
         

          <br />

          <p className="text-2xl">{t("privacyPolicy.cookiePolicy2")} </p>
          <p></p>
          <p>{t("privacyPolicy.cookiePolicy3")}</p>
          <p>{t("privacyPolicy.cookiePolicy4")}</p>
          <br />




          <p className="text-2xl">{t("privacyPolicy.cookiePolicy5")} </p>
          <p></p>
          <p>{t("privacyPolicy.cookiePolicy6")}</p>
          <br/>
          <p>{t("privacyPolicy.cookiePolicy7")}</p>

          <p><b>{t("privacyPolicy.cookiePolicy8")}</b>{t("privacyPolicy.cookiePolicy9")}</p>
          <p><b>{t("privacyPolicy.cookiePolicy10")}</b>{t("privacyPolicy.cookiePolicy11")}</p>


          <br />


          <p className="text-2xl">{t("privacyPolicy.cookiePolicy12")} </p>
          <p></p>
          <p className="text-xl">{t("privacyPolicy.cookiePolicy13")} </p>
          <p>{t("privacyPolicy.cookiePolicy14")}</p>
          <br/>

          <p className="text-xl">{t("privacyPolicy.cookiePolicy15")} </p>
          <p>{t("privacyPolicy.cookiePolicy16")}</p>
          <br/>

          <p className="text-xl">{t("privacyPolicy.cookiePolicy17")} </p>
          <p>{t("privacyPolicy.cookiePolicy18")}</p>
          <br/>

          <p className="text-xl">{t("privacyPolicy.cookiePolicy19")} </p>
          <p>{t("privacyPolicy.cookiePolicy20")}</p>
          <br/>

          <p className="text-xl">{t("privacyPolicy.cookiePolicy21")} </p>
          <p>{t("privacyPolicy.cookiePolicy22")}</p>
          <br/>
        </div>
      </div>

      <FooterClean />
    </>
  );
};

export { PrivacyPolicy };
