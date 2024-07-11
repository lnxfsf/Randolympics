import { Footer } from "../../components/Footer"
import { Navbar } from "../../components/Navbar"


import "../../styles/home.scoped.scss"
const EconomicsSponsorshipHome = () => {

    return (

        <>

            <Navbar />


            <div>



                <p className="m-4"> Welcome to the Randolympics Sponsorship page! Here, companies and individuals can support the 2028 Games in Stockholm by sponsoring various aspects of the event. Sponsorship opportunities include sponsoring specific events, national teams, and even the names of the games. Additionally, branded items such as t-shirts can be sold through a branding contract. Below are the current sponsorship opportunities available:


                </p>


                <h1 className="flex text-2xl ml-4 mt-8">
                    Sponsorship Opportunities
                </h1>









                <div className="flex justify-between m-4">
                    <p><b>Event Sponsorship: 100m YOURNAME  Freestyle Swimming</b></p>


                </div>

                <ul>

                    <li><b>Event Time</b>: August 5, 2028, 10:00 AM - 1:00 PM UTC
                    </li>

                    <li><b>Sponsorship Amount</b>: $50.000
                    </li>


                    <li><b>Description</b>: Sponsor the 100m Freestyle Swimming event at the 2028 Games in Stockholm. Your brand will be prominently displayed during the event, including on signage, promotional materials, and live broadcasts.

                    </li>

                </ul>


                <div className="flex justify-between m-4">
                    <p><b>Current Sponsors:</b></p>


                </div>


                <ol className="ml-12">

                    <li><b>Sponsor</b>: AquaTech  - <b>ETH Address</b>: 0xa1b2c3d4e5f678901234567890abcdef1234567</li>

                    <li><b>Sponsor</b>: SwimPro  - <b>ETH Address</b>: 0xb2c3d4e5f678901234567890abcdef12345678a1</li>



                    <li className="mt-4" style={{ listStyleType: "disc" }}><b>Become a Sponsor</b>: [Link to Sponsor] </li>



                </ol>














                <div className="flex justify-between m-4">
                    <p><b>National Team Sponsorship: Team YOURNAME USA
                    </b></p>


                </div>

                <ul>




                    <li><b>Sponsorship Amount</b>: $100,000
                    </li>


                    <li><b>Description</b>: Become the official sponsor of Team USA at the 2028 Games in Stockholm. Your brand will be associated with one of the most competitive teams, gaining exposure during all their events and promotional activities.

                    </li>

                </ul>


                <div className="flex justify-between m-4">
                    <p><b>Current Sponsors:</b></p>


                </div>


                <ol className="ml-12">

                    <li><b>Sponsor</b>: Nike   - <b>ETH Address</b>: 0xd4e5f678901234567890abcdef12345678a1b2c3</li>

                    <li><b>Sponsor</b>: Gatorade   - <b>ETH Address</b>: 0xe5f678901234567890abcdef12345678a1b2c3d4</li>



                    <li className="mt-4" style={{ listStyleType: "disc" }}><b>Become a Sponsor</b>: [Link to Sponsor] </li>



                </ol>










                <div className="flex justify-between m-4">
                    <p><b>Games Naming Rights: Randolympics 2028
                    </b></p>


                </div>

                <ul>




                    <li><b>Sponsorship Amount</b>:  $500,000
                    </li>


                    <li><b>Description</b>: Acquire the naming rights for the 2028 Games in Stockholm. Your brand will be featured in the official name of the games, ensuring maximum visibility across all media and promotional channels.

                    </li>

                </ul>


                <div className="flex justify-between m-4">
                    <p><b>Current Sponsors:</b></p>


                </div>


                <ol className="ml-12">

                    <li><b>No sponsors yet</b></li>





                    <li className="mt-4" style={{ listStyleType: "disc" }}><b>Become a Sponsor</b>: [Link to Sponsor] </li>



                </ol>













                <div className="flex justify-between m-4">
                    <p><b>Branded Items: T-Shirts
                    </b></p>


                </div>

                <ul>




                    <li><b>Sponsorship Amount</b>:  $30,000
                    </li>


                    <li><b>Description</b>: Enter into a branding contract to sell official Randolympics 2028 t-shirts. Your brand logo will be displayed alongside the Randolympics logo, providing excellent exposure and a share of the merchandise revenue.

                    </li>

                </ul>


                <div className="flex justify-between m-4">
                    <p><b>Current Sponsors:</b></p>


                </div>



                <ol className="ml-12">

                    <li><b>Sponsor</b>: SportsWear Inc   - <b>ETH Address</b>: 0xf678901234567890abcdef12345678a1b2c3d4e5</li>





                    <li className="mt-4" style={{ listStyleType: "disc" }}><b>Become a Sponsor</b>: [Link to Sponsor] </li>



                </ol>
            </div>



            <div>

                <h1 className="flex text-2xl ml-4 mt-8">
                    How It Works
                </h1>




                <ol className="ml-12">


                    <li><b>Review the Sponsorship  Rights Details</b>: Select the sponsorship opportunity you are interested in and review the details provided                    </li>

                    <li><b>Become a Sponsor</b>: Click on the "Become a Sponsor" link to submit your sponsorship offer. Ensure you meet the sponsorship amount requirements.
                    </li>


                    <li><b>Finalize the Sponsorship</b>: The Randolympics organization will contact you to finalize the sponsorship agreement.
                    </li>




                </ol>


            </div>



            <div>
            <h1 className="flex text-2xl ml-4 mt-8">
                    Reselling Sponsorship Rights

                </h1>


<p className="m-4">Sponsorship rights can be resold on this website to another sponsor. One-third of the profits from the resale will go to Randolympics, and two-thirds will go to the current sponsor. There is no limit on how often sponsorship rights can be resold before the event starts.


</p>


<p className="m-4">Thank you for your interest and participation in the Randolympics Sponsorship program. Your support helps make the 2028 Games in Stockholm a success!
    
</p>


<p className="m-4">For more information or assistance, please contact us at [Insert Contact Information].
</p>
            </div>

            <div className="h-96"></div>


            <Footer />

        </>
    )
}


export { EconomicsSponsorshipHome }