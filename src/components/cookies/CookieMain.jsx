import "../../styles/cookies.scoped.scss";
import { useTranslation } from "react-i18next";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";



const CookieMain = () => {
  const [cookies, setCookie] = useCookies([
    "cookieNeccessary",
    "cookieConsentOpen",
    "cookiePreferences",
    "cookieStastistics",
    "cookieMarketing",
  ]);

  const selectionCookieConsent = () => {
    setCookie("cookieNeccessary", true, { path: "/" });
  };

  const acceptAllCookies = () => {

    setCookie("cookieNeccessary", true, { path: "/" });

    setCookie("cookiePreferences", true, { path: "/" });
    setCookie("cookieStastistics", true, { path: "/" });
    setCookie("cookieMarketing", true, { path: "/" });



  };





  const closeCookieWindow = () => {
    setCookie("cookieConsentOpen", false, { path: "/" });
  };



  const rejectAllCookies = () => {
    setCookie("cookieNeccessary", true, { path: "/" });

    setCookie("cookiePreferences", false, { path: "/" });
    setCookie("cookieStastistics", false, { path: "/" });
    setCookie("cookieMarketing", false, { path: "/" });

  }

  const { t } = useTranslation();

  const navigate = useNavigate();


  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-[60] main_window_cookie ">
        <div className="p-4 sm:p-6 bg-white border border-[#e5e7eb] shadow-sm ">
          <div className="max-w-[85rem] mx-auto">
            <div className="grid lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
              <div className="col-span-1">
                <a href="#" className="flex-none inline-block">
                  <img src="/cookies/cookie.png" className="w-32 md:w-40 h-auto" />
                </a>
              </div>

              <div className="lg:col-span-3">
                <h2 className="text-lg font-semibold text-[#1f2937] dark:text-white">
                  {t("cookies.text1")}
                </h2>
                <p className="mt-2 text-sm text-[#4b5563] dark:text-[#9ca3af]">
                  {t("cookies.text2")} <br /> {t("cookies.text3")} <br />{" "}
                  {t("cookies.text4")}<br/>
                  {t("cookies.text12")} <span className="text-red_second cursor-pointer" onClick={()=>{navigate("/privacyPolicy")}}>{t("cookies.text13")}</span> {t("cookies.text14")} <span className="text-red_second cursor-pointer" onClick={()=> {navigate("/privacyPolicy#cookiePolicy")}}>{t("cookies.text15")}</span>.
                </p>
               
                <div className="mt-5 grid md:flex md:items-center gap-3">
                  <div className="toggle-container">
                    <label className="toggle">
                      <input type="checkbox" checked disabled />
                      <span className="slider"></span>
                    </label>
                    <span className="label-text">{t("cookies.text5")}</span>
                  </div>

                  <div className="toggle-container">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={cookies.cookiePreferences === true}
                        onChange={(event) => {
                          setCookie("cookiePreferences", event.target.checked, {
                            path: "/",
                          });
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                    <span className="label-text">{t("cookies.text6")}</span>
                  </div>

                  <div className="toggle-container">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={cookies.cookieStastistics === true}
                        onChange={(event) => {
                          setCookie("cookieStastistics", event.target.checked, {
                            path: "/",
                          });
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                    <span className="label-text">{t("cookies.text7")}</span>
                  </div>

                  <div className="toggle-container">
                    <label className="toggle">
                      <input
                        type="checkbox"
                        checked={cookies.cookieMarketing === true}
                        onChange={(event) => {
                          setCookie("cookieMarketing", event.target.checked, {
                            path: "/",
                          });
                        }}
                      />
                      <span className="slider"></span>
                    </label>
                    <span className="label-text">{t("cookies.text8")}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full col-start-2 xl:col-start-5 xl:col-span-1">
                <div className="grid sm:grid-cols-3 xl:grid-cols-1 gap-y-2 sm:gap-y-0 sm:gap-x-5 xl:gap-y-2 xl:gap-x-0">
                  <button
                    onClick={() => {
                      acceptAllCookies();
                      closeCookieWindow();
                    }}
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#D24949] text-[#fff] hover:bg-[#C44141] focus:outline-none focus:ring-2 focus:ring-[#D24949] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    {t("cookies.text9")}
                  </button>
                  <button
                    onClick={() => {
                      selectionCookieConsent();
                      closeCookieWindow();
                    }}
                    type="button"
                    className="py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-[#D24949] font-semibold text-[#D24949] hover:text-[#fff] hover:bg-[#D24949] hover:border-[#D24949] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all text-sm dark:border-sky-500 dark:text-sky-500 dark:hover:text-[#fff]"
                  >
                    {t("cookies.text10")}
                  </button>
                  <button
                    onClick={() => {
                      rejectAllCookies();
                      closeCookieWindow();
                    }}
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center border-[#9ca3af]  gap-2 rounded-md border font-medium bg-[#fff] text-[#374151] shadow-sm align-middle hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-600 transition-all text-sm   "
                  >
                    {t("cookies.text11")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CookieMain };
