import "../../styles/home.scoped.scss"






const FourthScreenHome = () => {

    return (<>
    <div className="flex flex-col min-h-screen fourth_screen text-black_second lexend-font  p-8 md:p-16 justify-start">
       
        <div>
            <p className="text-3xl md:text-4xl font-bold mb-4">Economics: Four types of income</p>    
            

            <p className="font-medium text-lg md:text-xl mb-4 2xl:w-[44em]">Our organization has four types of income sources. 
                <br/>Most payments are published on the blockchain. 
           
            </p>
        </div>


        {/* explained incomes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">

            <div className="flex flex-col mt-8 justify-start items-start ">
                
         
                <div className="  flex flex-col justify-center items-center  competitionItem select-none mb-4">
                    <img
                    width={"30px"}
                    height={"30px"}
                    src="home/charityBox.svg"
                    />
                </div>

                <p className="text-xl md:text-2xl font-semibold text-start mb-4">Campaign donations</p>


                <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
                Income generated from donations made by supporters to campaigns for athletes. 
                <br/>Even if athletes do not make it to the games, whether due to injury, a personal decision, or simply not being randomly selected, these funds contribute to the overall success of the Randolympics.
                These donations help to cover organizational costs and ensure...
                </p>


                <div className="flex gap-2 items-center cursor-pointer select-none">

                    <img src="/home/right_arrow.svg" />
                    <p className="font-bold text-red_second text-sm md:text-base">Read more</p>
                </div>

            </div>




            <div className="flex flex-col mt-8 justify-start items-start ">
                
         
                <div className="  flex flex-col justify-center items-center  competitionItem mb-4 select-none">
                    <img
                    width={"30px"}
                    height={"30px"}
                    src="home/radioTower.svg"
                    />
                </div>

                <p className="text-xl md:text-2xl font-semibold text-start mb-4">Broadcasting Rights</p>


                <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
                Broadcasting Rights involve granting media entities the permission to cover and report on Randolympics events. <br/>These rights can be acquired by various media platforms, such as:
<br/>YouTube Channels: Independent or corporate channels that wish to broadcast the events online.
<br/>TikTok Influencers: Content creators on TikTok who want to provide live...
                </p>

                <div className="flex gap-2 items-center cursor-pointer select-none">

<img src="/home/right_arrow.svg" />
<p className="font-bold text-red_second text-sm md:text-base">Read more</p>
</div>

            </div>

            <div className="flex flex-col mt-8 justify-start items-start ">
                
         
                <div className="  flex flex-col justify-center items-center  competitionItem  mb-4 select-none">
                    <img
                    width={"30px"}
                    height={"30px"}
                    src="home/newspaper.svg"
                    />
                </div>

                <p className="text-xl md:text-2xl font-semibold text-center mb-4">Sponsorship</p>


                <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
                Sponsorship is a significant source of income where various entities can sponsor different aspects of the Randolympics. This includes: <br/>Events: Companies or brands can sponsor individual events within the Randolympics.
<br/>National Teams: Sponsorship deals can be made with national teams, allowing sponsors to have their...
                </p>

                <div className="flex gap-2 items-center cursor-pointer select-none">

<img src="/home/right_arrow.svg" />
<p className="font-bold text-red_second text-sm md:text-base">Read more</p>
</div>


            </div>

            <div className="flex flex-col mt-8 justify-start items-start ">
                
         
                <div className="  flex flex-col justify-center items-center  competitionItem  mb-4 select-none">
                    <img
                    width={"30px"}
                    height={"30px"}
                    src="home/loans.svg"
                    />
                </div>

                <p className="text-xl md:text-2xl font-semibold text-center mb-4">Loans</p>



                <p className="font-medium mb-4 pl-0 pr-8 limit_lines_mobile limit_lines_PC text-sm md:text-base">
                Loans are a source of income for the Randolympics organization where they receive funding from loan givers. <br/>These loans are provided with the expectation that the loan givers will receive their money back along with yearly interest. The terms and conditions of the loan, including the interest rate and repayment schedule, are agreed upon at the time of the...
                </p>

                <div className="flex gap-2 items-center cursor-pointer select-none">

<img src="/home/right_arrow.svg" />
<p className="font-bold text-red_second text-sm md:text-base">Read more</p>
</div>

            </div>








        </div>


    </div>
    
    
    </>)
}


export {FourthScreenHome}