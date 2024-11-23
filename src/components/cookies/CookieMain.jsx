import "../../styles/cookies.scoped.scss";

const CookieMain = () => {
  return (
    <>
      <div class="fixed bottom-0 inset-x-0 z-[60] main_window_cookie ">
       
        <div class="p-4 sm:p-6 bg-white border border-[#e5e7eb] shadow-sm ">
          <div class="max-w-[85rem] mx-auto">
            <div class="grid lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
              <div class="col-span-1">
                <a href="#" class="flex-none inline-block">
                  <img src="/cookies/cookie.png" class="w-32 md:w-40 h-auto" />
                </a>
              </div>

              <div class="lg:col-span-3">
                <h2 class="text-lg font-semibold text-[#1f2937] dark:text-white">
                  We use cookies
                </h2>
                <p class="mt-2 text-sm text-[#4b5563] dark:text-[#9ca3af]">
                Cookies are here to sweeten your Randolympics experience 🍪! <br/>They help us improve the site, bring you relevant content, and keep things running smoothly. <br/>Adjust your cookie settings or accept them all!
                </p>
                <div class="mt-5 grid md:flex md:items-center gap-3">
                  <div class="toggle-container">
                    <label class="toggle">
                      <input type="checkbox" checked disabled />
                      <span class="slider"></span>
                    </label>
                    <span class="label-text">Necessary</span>
                  </div>

                  <div class="toggle-container">
                    <label class="toggle">
                      <input type="checkbox" />
                      <span class="slider"></span>
                    </label>
                    <span class="label-text">Preferences</span>
                  </div>

                  <div class="toggle-container">
                    <label class="toggle">
                      <input type="checkbox" />
                      <span class="slider"></span>
                    </label>
                    <span class="label-text">Statistics</span>
                  </div>

                  <div class="toggle-container">
                    <label class="toggle">
                      <input type="checkbox" />
                      <span class="slider"></span>
                    </label>
                    <span class="label-text">Marketing</span>
                  </div>
                </div>
              </div>

              <div class="col-span-full col-start-2 xl:col-start-5 xl:col-span-1">
                <div class="grid sm:grid-cols-3 xl:grid-cols-1 gap-y-2 sm:gap-y-0 sm:gap-x-5 xl:gap-y-2 xl:gap-x-0">
                  <button
                    type="button"
                    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#D24949] text-[#fff] hover:bg-[#C44141] focus:outline-none focus:ring-2 focus:ring-[#D24949] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Allow all
                  </button>
                  <button
                    type="button"
                    class="py-[.688rem] px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-[#D24949] font-semibold text-[#D24949] hover:text-[#fff] hover:bg-[#D24949] hover:border-[#D24949] focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all text-sm dark:border-sky-500 dark:text-sky-500 dark:hover:text-[#fff]"
                  >
                    Allow selection
                  </button>
                  <button
                    type="button"
                    class="py-3 px-4 inline-flex justify-center items-center border-[#9ca3af]  gap-2 rounded-md border font-medium bg-[#fff] text-[#374151] shadow-sm align-middle hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-600 transition-all text-sm   "
                  >
                    Reject all
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
