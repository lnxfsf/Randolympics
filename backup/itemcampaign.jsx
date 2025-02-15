
{campaign && athlete && (
    <>
      {!payment && !showAllSupporters && (
        <div
          className="flex"
          style={{
            backgroundImage: "url('/supporters/supporter5.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            backgroundPosition: "center",
          }}
        >
          <div
            className="flex  basis-5/12 justify-between pr-0"
            style={{ backgroundColor: `${colorStatusGoing}` }}
          >
            <div className="flex flex-col grow">
              <div className="flex justify-center items-center">
                {/*   m-16  */}
                <img
                  className="w-52 mb-8 mt-8  border-2 border-[#C37F7F]"
                  src={
                    BACKEND_SERVER_BASE_URL +
                    "/imageUpload/profile_pics/" +
                    athlete.picture
                  }
                />
              </div>

              <hr
                className=" mb-8 w-[100%]"
                style={{ backgroundColor: "white", height: "1px" }}
              />

              <div className="flex justify-center items-center flex-col">
                <p className="text-[#fff]">
                  <span className="font-semibold">Gender:</span>{" "}
                  {athlete.gender === "M" ? "Male" : "Female"}
                </p>
                <p className="mb-12 text-[#fff]">
                  <span className="font-semibold">Birthdate:</span>{" "}
                  {formatDate(athlete.birthdate)}
                </p>
              </div>

              <div className="flex justify-center items-center flex-col">
                <p className="text-[#fff]">
                  {" "}
                  <span className="font-semibold"> Weight:</span>{" "}
                  {athlete.weight} kg
                </p>
              </div>


              {/* so, isVerified, means, that we truly know, if celebrity made account, or it was pre-filled already.. */}
              {!athlete.isCelebrity && athlete.isVerified && (
              <div className="flex justify-center items-center flex-col mt-8 mb-8">
                
                  <p className="text-[#fff]">
                    <span className="font-semibold">Email:</span>{" "}
                    {athlete.email}
                  </p>
                

                <p className="text-[#fff]">
                  <span className="font-semibold">Phone:</span>{" "}
                  {athlete.phone}
                </p>
              </div>

)}

              {/* show socials for celebrity */}
              {athlete.isCelebrity && (
                <div className="flex justify-center items-center flex-col mt-8 mb-8">
                  {athlete.fb_link && (
                    <a
                      href={athlete.fb_link}
                      target="_blank"
                      className="text-[#fff] font-semibold underline cursor-pointer select-none"
                    >
                      Facebook
                    </a>
                  )}

                  {athlete.ig_link && (
                    <a
                      href={athlete.ig_link}
                      target="_blank"
                      className="text-[#fff] font-semibold underline cursor-pointer select-none"
                    >
                      Instagram
                    </a>
                  )}

                  {athlete.tw_link && (
                    <a
                      href={athlete.tw_link}
                      target="_blank"
                      className="text-[#fff] font-semibold underline cursor-pointer select-none"
                    >
                      Twitter
                    </a>
                  )}
                </div>
              )}

              <hr
                className=" mb-8 w-[100%]"
                style={{ backgroundColor: "white", height: "1px" }}
              />

              <div className="flex justify-center items-center flex-col  ">
                <p className="text-[#fff]">


                  <span className="font-semibold">Crypto:</span>{" "}
                  {athlete.cryptoaddress ? athlete.cryptoaddress : "0"}{" "}
                  {athlete.cryptoaddress_type}
               
               
               
                </p>
              </div>
            </div>

            <div className="basis-16">
              <div className="flex items-start justify-start">
                {/*   <hr
                className=" mb-8 w-8 h-full"
                style={{ backgroundColor: "red"}}
              /> */}

                <hr className="vertical-line" />

                <p class="vertical-text text-3xl text-blue-500 text-[#fff] mt-12 font-bold uppercase whitespace-nowrap  ">
                  {textAthleteStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="flex grow flex-col ">
            <div className="flex   mt-14 pb-6 flex-col gap-y-2">
              <div className="flex justify-around items-center  ">
                <p className="text-4xl">
                  {athlete.name} {athlete.middleName} {athlete.lastName}
                </p>

                <div className="flex flex-col justify-center ">
                  <Flag className="flag-photo" code={athlete.nationality} />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <p className="text-xl">{athlete.athleteStatement}</p>
              </div>
            </div>

            <hr
              className=" mb-8 w-full"
              style={{ backgroundColor: "black", height: "2px" }}
            />

            <div className="flex justify-center gap-16 items-center w-full">
              <img className="w-12" src="/supporters/fb.svg" />
              <img className="w-12" src="/supporters/ig.svg" />
              <img className="w-12" src="/supporters/x.svg" />
            </div>

            <a
              /*   href={urlForCampaign} */

              className="underline mt-4 flex justify-center mb-4 cursor-pointer select-none"
              onClick={() => {
                navigator.clipboard.writeText(urlForCampaign);
              }}
            >
              Copy campaign link
            </a>

            {/* <div className="border-2 m-2">
            <p className="text-2xl font-bold">Athlete statement</p>

            <p></p>
          </div> */}

            {/*  <div className="border-2 m-2">
            <div className="flex justify-around">
              <p className="text-2xl font-bold">Supporters</p>
              <p className="font-semibold text-red_first pt-1">
                {howManySupporters}
              </p>
            </div>

            {lastCommentsSupporters &&
              lastCommentsSupporters.map((item, index) => (
                <>
                  <div className="flex border-2 rounded-lg m-1 p-2 ">
                    <p key={index}>{item.supporterComment}</p>
                  </div>
                </>
              ))}
          </div>

          <div className="flex justify-around border-2">
            <p className="text-2xl font-bold">Money raised</p>
            <p className="text-red_first font-semibold mt-1">
              {athlete.donatedAmount / 100} $
            </p>
          </div> */}

            <div className="flex  items-start ">
              <div className="basis-1/2 flex items-center justify-center gap-4">
                <p className="text-2xl font-bold uppercase">Supporters:</p>
                <p className="text-xl font-bold">{howManySupporters}</p>
              </div>

              <div className="basis-1/2 flex items-center justify-center gap-4">
                <p className="text-2xl font-bold uppercase">
                  Money raised:
                </p>
                <p className="text-xl font-bold">
                  {athlete.donatedAmount / 100} $
                </p>
              </div>
            </div>

            {/*   <div className="border-2 m-4 p-2">
            <div className="flex justify-around border-2 mt-2 ">
              <p className="text-2xl font-bold">Campaign stats</p>
              <p className="underline decoration-red_first text-red_first">
                further explanation needed
              </p>
            </div>

            {lastTransactionsSupporters &&
              lastTransactionsSupporters.map((item, index) => (
                <>
                  <div className="flex border-2 rounded-lg m-1 p-2 flex-col">
                    <p key={index}>
                      <span className="font-semibold">Supporter name:</span>{" "}
                      {item.supporterName}
                    </p>
                    <p>
                      <span className="font-semibold">Donated amount:</span>{" "}
                      {item.amount / 100} $
                    </p>
                  </div>
                </>
              ))}lastTransactionsSupporters
          </div> */}

            {firstSupportersCampaign &&
              firstSupportersCampaign.supporterName && (
                <div>
                  <div className="flex w-full flex-col  pl-16 pr-16 pt-4 mt-4 ">
                    <div className="flex items-center  justify-between">
                      <p>
                        <b>Creator:</b>{" "}
                        {firstSupportersCampaign.supporterName}
                      </p>

                      <p>${firstSupportersCampaign.amount / 100} </p>
                    </div>

                    <div>
                      <p className="text-sm">
                        {firstSupportersCampaign.supporterComment}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-2">
                    <div className="w-4/5 h-0.5 bg-[#000]"></div>
                  </div>
                </div>
              )}

            <div className="flex w-full flex-col mt-8">
              {lastTransactionsSupporters &&
                lastTransactionsSupporters.map((item, index) => (
                  <>
                    <div
                      className="flex w-full flex-col justify-start items-start p-0 pl-4 pr-4  "
                      style={{ marginTop: "-8px" }}
                    >
                      <div className="flex w-full border-l-2  items-center m-1 mb-0 pb-0 p-2 justify-between  ">
                        <p key={index} className=" pl-2 ">
                          <span className="font-semibold">
                            Supporter #{index + 1}:
                          </span>{" "}
                          {item.supporterName}
                        </p>

                        <div className="flex ">
                          <p>
                            <span className="font-semibold"></span> $
                            {item.amount / 100}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm m-1 ml-1 p-2 pl-4 pt-0 border-l-2 mt-0 ">
                        {item.supporterComment}
                      </p>
                    </div>
                  </>
                ))}
            </div>

            {/*  <p className="underline mt-4 flex justify-center border-2">
            Help {athlete.name} improve{" "}
            {athlete.gender === "M" ? "his" : "her"} stats !
          </p> */}

            {/*  <a
            href={urlForCampaign}
            target="_blank"
            className="underline mt-4 flex justify-center border-2 mb-4"
          >
            Share campaign
          </a>
*/}

            <p
              onClick={() => {
                setShowAllSupporters(true);
              }}
              className="flex justify-center items-center underline cursor-pointer select-none mt-2 mb-2"
            >
              Show all supporters
            </p>

            {lastTransactionsSupporters &&
              lastTransactionsSupporters.length >= 1 && (
                <p className="flex justify-center mt-6 mb-6">
                  Donate{" "}
                  {(lastTransactionsSupporters[0].amount + 100) / 100} USD
                  to become the top supporter of this campaign !
                </p>
              )}

            <p
              onClick={() => {
                setPayment(true);
              }}
              className="flex justify-center items-center underline cursor-pointer select-none  mt-2 mb-2"
            >
              Donate
            </p>
          </div>
        </div>
      )}

      {payment && !showAllSupporters && (
        <div
          className="flex flex-col items-center "
          style={{
            backgroundImage: "url('/supporters/supporter5.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-center items-center flex-col mt-8">
            <p className="text-2xl ">Supporter info</p>

            <div className="flex">
              {/*   <input
                  className="border-2 rounded-lg"
                  type="text"
                  placeholder="Supporter name"
                  value={supporterName}
                  onChange={(event) => {
                    setSupporterName(event.target.value);
                  }}
                /> */}

              <TextField
                variant="standard"
                value={supporterName}
                onChange={(event) => {
                  setSupporterName(event.target.value);
                }}
                label="Supporter name"
                placeholder="Supporter name"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />

              {/*  <input
                  className="border-2 rounded-lg"
                  type="email"
                  placeholder="Supporter email"
                  value={supporterEmail}
                  onChange={(event) => {
                    setSupporterEmail(event.target.value);
                  }}
                />
*/}

              <TextField
                variant="standard"
                value={supporterEmail}
                onChange={(event) => {
                  setSupporterEmail(event.target.value);
                }}
                label="Supporter email"
                placeholder="Supporter email"
                type="text"
                inputProps={{
                  maxLength: 255,
                }}
                InputLabelProps={inputLabelPropsTextField}
                sx={sxTextField}
              />
            </div>

            {/*  <input
                className="border-2 rounded-lg"
                type="text"
                placeholder="Supporter comment"
                value={supporterComment}
                onChange={(event) => {
                  setSupporterComment(event.target.value);
                }}
              /> */}

            <TextField
              variant="standard"
              value={supporterComment}
              onChange={(event) => {
                setSupporterComment(event.target.value);
              }}
              label="Supporter comment"
              placeholder="Supporter comment"
              type="text"
              inputProps={{
                maxLength: 255,
              }}
              InputLabelProps={inputLabelPropsTextField}
              sx={sxTextField}
            />

            {/*  <p className="text-red_first text-sm w-[50%] mt-4">
                if supporter (others) are donating to here, they don't need
                account (and they don't get one). these fields are
                optional.. (for transaction).
                <br />
                But if supporter have account, transaction he makes will be
                displayed on his profile (or even if he later decides to
                make account), he just need to use same email address, he
                made transaction with
              </p> */}
          </div>

          <div className="border-2 flex flex-col justify-center items-center p-4 mt-8 w-[50%]">
            <p className="underline text-red_first">Note:</p>
            <p>
              You can use{" "}
              <a
                className="underline text-[#0000ff]"
                href="https://docs.stripe.com/testing"
                target="_blank"
              >
                test card
              </a>
              : <b>4242 4242 4242 4242</b>
            </p>
            <p>
              CVC: <b>567</b> (it can be any 3 digits){" "}
            </p>
            <p className="mb-4">
              Date: <b>12/34</b> (it can be any date){" "}
            </p>

          {/*   <p className="underline font-bold text-red_first">
              Disable adblocker{" "}
            </p>
            <p>
              (or it will block request to stripe, as this is HTTP (insecure
              chanel))
            </p> */}
          </div>

          <div className="m-4 flex justify-center  items-center flex-col">
            {/* and this is for those 3 options  */}
            <p className="mt-4 font-semibold">Select amount</p>
            <div className="flex justify-around mt-6 mb-6 gap-4">
              <div
                className={` p-2 border-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16 
        `}
                style={{
                  backgroundColor: ` ${
                    amount === 1 ? "rgba(175, 38, 38, 0.5)" : "transparent"
                  }`,
                }}
                onClick={() => {
                  setAmount(1);
                }}
              >
                {/*  <img className="w-10 m-2 " src="supporters/1_dollar.svg" /> */}
                <p>1 $</p>
              </div>

              <div
                className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
                onClick={() => {
                  setAmount(10);
                }}
                style={{
                  backgroundColor: ` ${
                    amount === 10 ? "rgba(175, 38, 38, 0.5)" : "transparent"
                  }`,
                }}
              >
                {/*  <img className="w-8 " src="supporters/10_dollars.svg" /> */}
                <p>10 $</p>
              </div>

              <div
                className="border-2 p-2 flex justify-center items-center flex-col select-none cursor-pointer rounded-lg w-16"
                onClick={() => {
                  setAmount(100);
                }}
                style={{
                  backgroundColor: ` ${
                    amount === 100
                      ? "rgba(175, 38, 38, 0.5)"
                      : "transparent"
                  }`,
                }}
              >
                {/*  <img className="w-8 " src="supporters/100_dollars.sv" /> */}
                <p>100 $</p>
              </div>
            </div>

            <div className=" pay-container flex flex-col w-64 h-auto   rounded-lg  justify-center items-center">
              <ThemeProvider theme={theme}>
                <QueryProvider>
                  <DonationFormItemCampaign
                    amount={amount}
                    setAmount={setAmount}
                    campaignId={campaignId}
                    supporterName={supporterName}
                    supporterEmail={supporterEmail}
                    supporterComment={supporterComment}
                    discountCode={discountCode}
                    countryAthleteIsIn={countryAthleteIsIn}
                    separateDonationThruPage={true}
                  />
                </QueryProvider>
              </ThemeProvider>
            </div>
          </div>

          <div className="m-4 flex justify-center  items-center flex-col">
            <p>Discount codes</p>

            {/*   <input
                className="border-2 rounded-lg"
                type="text"
                placeholder="Code"
                value={discountCode}
                onChange={(event) => {
                  setDiscountCode(event.target.value);
                }}
              /> */}

            <AuthCode
              onChange={(res) => {
                setDiscountCode(res);
              }}
              inputClassName=" h-8 w-8 text-center  m-1 border-2 rounded-md"
            />

            <button
              style={{ backgroundColor: "#0000ff", color: "#fff" }}
              className="m-4 rounded-lg p-2"
              onClick={donateWithCouponOnly}
            >
              Donate with coupon only dd
            </button>
          </div>

          <Button
            onClick={() => {
              setPayment(false);
            }}
            className="w-56"
            style={{ marginTop: "25px", marginBottom: "25px" }}
            sx={{
              height: "50px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 4,
              border: `1px solid #FFF`,
              "&:hover": {
                background: "rgb(175, 38, 38)",
                color: "white",
                border: `1px solid rgb(175, 38, 38)`,
              },
            }}
            
          >
            <span className="lexend-font">Back</span>
          </Button>
        </div>
      )}

      {/* this is for showing LIST OF ALL supporters !!! */}
      {showAllSupporters  && (
        <>
          <div
            className="min-h-screen"
            style={{
              backgroundImage: "url('/supporters/supporter5.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              zIndex: -1,
              backgroundPosition: "center",
            }}
          >
            <div className="flex justify-end p-4 mr-12 ">
              <p
                className="underline cursor-pointer select-none"
                onClick={() => {
                  setShowAllSupporters(false);
                }}
              >
                Back
              </p>
            </div>


            <div className="flex w-full justify-center items-center ">
              <div className="flex justify-center items-center flex-col w-[90%]">
                <p className="text-2xl">{athlete.name}'s supporters:</p>

                {firstSupportersCampaign &&
                  firstSupportersCampaign.supporterName && (
                    <div>
                      <div className="flex w-full flex-col  pl-16 pr-16 pt-4 mt-4 ">
                        <div className="flex items-center  justify-between">
                          <p>
                            <b>Creator:</b>{" "}
                            {firstSupportersCampaign.supporterName}
                          </p>

                          <p>${firstSupportersCampaign.amount / 100} </p>
                        </div>

                        <div>
                          <p className="text-sm">
                            {firstSupportersCampaign.supporterComment}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-2">
                        <div className="w-4/5 h-0.5 bg-[#000]"></div>
                      </div>
                    </div>
                  )}


        {allTransactionsSupporters.length >= 1 && (
          
                <div className="flex w-full flex-col mt-8">
                  {allTransactionsSupporters &&
                    allTransactionsSupporters.map((item, index) => (
                      <>
                        <div className="flex w-full flex-col justify-start items-start ">
                          <div className="flex w-full border-l-2  items-center m-0 ml-1 mb-0 pb-0 p-0 justify-between  ">
                            <p key={index} className=" pl-2 ">
                              <span className="font-semibold">
                                Supporter #{index + 1}:
                              </span>{" "}
                              {item.supporterName}
                            </p>

                            <div className="flex ">
                              <p>
                                <span className="font-semibold"></span> $
                                {item.amount / 100}
                              </p>
                            </div>
                          </div>

                          <p className="text-sm m-1 mb-0 ml-1 p-2 pl-4 pt-0 border-l-2 mt-0 ">
                            {item.supporterComment}
                          </p>
                        </div>
                      </>
                    ))}

                  <button
                    className="underline"
                    onClick={() => {
                      setLimitAllTransactions((prev) => prev + 10);
                    }}
                  >
                    Show more
                  </button>
                </div>
)}


              </div>
            </div>


            {lastTransactionsSupporters.length >= 1 && (
              <p className="flex justify-center mt-6 pb-12">
                Donate {(lastTransactionsSupporters[0].amount + 100) / 100}{" "}
                USD to become the top supporter of this campaign !
              </p>
            )}


          </div>
        </>
      )}
    </>
  )}