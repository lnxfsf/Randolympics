const FooterClean = () => {
  return (
    <>
      <div className="flex flex-col m-12">
        <hr className="w-full" />

        <div className="flex justify-between pt-12 flex-col lg:flex-row  ">
          <div>
            <p className="lexend-font font-bold">
              © 2024 Randolympics. All rights reserved.
            </p>
          </div>

          <div className="flex gap-4 text-[#d24949] lexend-font font-bold flex-col lg:flex-row mt-4 lg:mt-0">
            <p>Privacy policy</p>
            <p>Terms of service</p>

            {/* as for now, we don't yet use non-essential cookies. https://law.stackexchange.com/questions/81602/why-does-the-gdpr-matter-to-me-a-us-citizen-with-no-property-in-europe/81624#81624 
            https://law.stackexchange.com/questions/94052/if-website-uses-cookies-only-after-users-login-can-i-ask-for-cookie-consent-dur
            */}
            <p>Cookies settings</p>
          </div>
        </div>
      </div>
    </>
  );
};

export { FooterClean };
