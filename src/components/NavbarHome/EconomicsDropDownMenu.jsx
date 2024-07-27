

const EconomicsDropDownMenu = ({ scrolled }) => {

    return (

        <>


            <div className={`economics-dropdown-menu ${scrolled ? 'scrolled' : ''} p-4`}  >
                <div className="h-[300px] flex flex-wrap overflow-y-auto	">

                    <p className=" text-red_first font-semibold text-base ">Economics</p>



                    <div className="flex flex-col mt-2 ">

                        <hr />
                        <p className=" text-black font-semibold text-base mt-1 mb-1">Loans</p>
                        <p className="text-xs">Loans are a source of income for the Randolympics organization where they receive funding from loan givers. These loans are provided with the expectation that the loan givers will receive their money back along with yearly interest. The terms and conditions of the loan, including the interest rate and repayment schedule, are agreed upon at the time of the loan agreement. The general rule is that 20% of all revenues are paid back to existing loan contracts in equal ratios.</p>




                    </div>


                    <div className="flex flex-col   mt-2 ">

                        <hr />
                        <p className=" text-black font-semibold text-base  mt-1 mb-1">Broadcasting Rights</p>
                        <p className="text-xs">
                            Broadcasting Rights involve granting media entities the permission to cover and report on Randolympics events. These rights can be acquired by various media platforms, such as: <br />
                            YouTube Channels: Independent or corporate channels that wish to broadcast the events online. <br />
                            TikTok Influencers: Content creators on TikTok who want to provide live coverage or highlights. <br />
                            TV Stations: Traditional television broadcasters who aim to televise the events to a wider audience. <br />
                            The broadcasting rights are distributed by country, meaning media outlets from different countries can acquire the rights specific to their region. This ensures wide and diverse media coverage, catering to different audiences globally.

                        </p>

                    </div>



                    <div className="flex flex-col   mt-2 ">
                        <hr />
                        <p className=" text-black font-semibold text-base  mt-1 mb-1">Sponsorship</p>

                        <p className="text-xs">
                            Sponsorship is a significant source of income where various entities can sponsor different aspects of the Randolympics. This includes:
                            Events: Companies or brands can sponsor individual events within the Randolympics.<br />
                            National Teams: Sponsorship deals can be made with national teams, allowing sponsors to have their branding associated with specific teams.<br />
                            Names of the Games: Sponsors can acquire naming rights for the games or specific events within the Randolympics.<br />
                            Additionally, there are opportunities for branded merchandise: <br />
                            Branded Items: Contracts can be made for selling branded items such as t-shirts, hats, and other merchandise. These contracts allow sponsors to use the Randolympics branding on their products, creating a source of revenue through merchandise sales. <br />
                            These income sources ensure the Randolympics organization has a diverse stream of revenue, aiding in the sustainability and growth of the events. <br />

                        </p>

                    </div>


                </div>

            </div>
        </>
    )
}


export { EconomicsDropDownMenu }