import { Button } from "@mui/material"
import { Navbar } from "../../components/Navbar"
import { Footer } from "../../components/Footer"

import "../../styles/home.scoped.scss"


const EconomiscLoansHome = () => {

    return (

        <>

            <Navbar />

            <div>
                <h1 className="flex text-[40px] mt-8 justify-center">
                    Randolympics Loan Auction
                </h1>


                <p className="m-4"> Welcome to the Randolympics Loan Auction page! Here, we invite bidders to offer financial support for the Randolympics events. The loans will be awarded to the bidder offering the lowest yearly interest rate. Each loan auction has a specific deadline, so be sure to place your bids promptly. </p>


                <br />
                <p className="m-4"><b>Repayment schedule</b>: The general rule is that 20% of all revenues are paid back to existing loan contracts in equal ratios to the same or another specified Eth address.

                    <br />
                </p>



                <p className="m-4">Below are the current loan opportunities available for bidding:</p>


                <h1 className="flex text-2xl ml-4 mt-8">
                    Current Loan Auctions
                </h1>


                <div className="flex justify-between m-4">
                    <p><b>Loan 1: $5,000</b></p>
                    <p className="text-red_first">Current lowest bidding: 14.8%</p>

                </div>


                <ul className="ml-12">

                    <li><b>Auction Deadline</b>: June 30, 2024, 11:59 PM UTC</li>

                    <li><b>Ethereum Address</b>: 0x1234567890abcdef1234567890abcdef12345678</li>

                    <li><b>Description</b>: Support the Randolympics with a loan of $5,000. Bidders offering the lowest yearly interest rate will win this auction. Your support helps in organizing and managing smaller-scale events, ensuring everything runs smoothly.</li>

                </ul>






                <div className="flex justify-between m-4">
                    <p><b>Bidders:</b></p>


                </div>


                <ol className="ml-12">

                    <li><b>Bidder</b>: Alex Johnson - <b>Interest Rate</b>: 15% - <b>ETH Address</b>: 0xa1b2c3d4e5f678901234567890abcdef1234567</li>
                    <li className="text-red_first"><b>Bidder</b>: Lisa Smith - <b>Interest Rate</b>: 14.8% - <b>ETH Address</b>: 0xb2c3d4e5f678901234567890abcdef12345678a1</li>
                    <li ><b>Bidder</b>: John Doe - <b>Interest Rate</b>: 14.9% - <b>ETH Address</b>: 0xc3d4e5f678901234567890abcdef12345678a1b2</li>
                    <li className="mt-4" style={{ listStyleType: "disc" }}><b>Place Your Bid</b>: [Link to Bid] </li>


                </ol>






                <div className="flex justify-between m-4 mt-12">
                    <p><b>Loan 2: $10,000</b></p>
                    <p className="text-red_first">Current lowest bidding: 14.8%</p>

                </div>


                <ul className="ml-12">

                    <li><b>Auction Deadline</b>: July 15, 2024, 11:59 PM UTC</li>

                    <li><b>Ethereum Address</b>: 0xabcdef1234567890abcdef1234567890abcdef12</li>

                    <li><b>Description</b>: This $10,000 loan auction is an excellent opportunity for bidders to contribute to the Randolympics. The loan will be awarded to the bidder with the lowest yearly interest rate. These funds will go towards enhancing the quality and reach of the games.

                    </li>

                </ul>







                <div className="flex justify-between m-4">
                    <p><b>Examples of Bidders:</b></p>


                </div>

                <ol className="ml-12">

                    <li><b>Bidder</b>: Emma Brown  - <b>Interest Rate</b>: 14.5% - <b>ETH Address</b>: 0xd4e5f678901234567890abcdef12345678a1b2c3</li>
                    <li className="mt-4" style={{ listStyleType: "disc" }}><b>Place Your Bid</b>: [Link to Bid] </li>


                </ol>






                <div className="flex justify-between m-4 mt-12">
                    <p><b>Loan 3: $100,000</b></p>
                    <p className="text-red_first">Current lowest bidding: 14.8%</p>

                </div>


                <ul className="ml-12">

                    <li><b>Auction Deadline</b>: July 31, 2024, 11:59 PM UTC</li>

                    <li><b>Ethereum Address</b>: 0x7890abcdef1234567890abcdef1234567890abcd</li>

                    <li><b>Description</b>: Be a major contributor to the success of the Randolympics with a $100,000 loan. The loan will be awarded to the bidder offering the lowest yearly interest rate
                    </li>

                </ul>







                <div className="flex justify-between m-4">
                    <p><b>Examples of Bidders:</b></p>


                </div>


                <ol className="ml-12">

                    <li className="mt-4" ><b>No bidders yet - Place Your Bid:</b>: [Link to Bid] </li>


                </ol>
            </div>




            <div >

                <h1 className="flex text-2xl ml-4 mt-8">
                    How It Works
                </h1>




                <ol className="ml-12">


                    <li><b>Review the Loan Details</b>: Select the loan auction you are interested in and review the details provided.
                    </li>

                    <li><b>Place Your Bid</b>: Click on the "Place Your Bid" link to submit your offer. Ensure you offer the lowest possible yearly interest rate to increase your chances of winning.
                    </li>


                    <li><b>Wait for the Auction Deadline</b>: Each auction has a specific deadline. Make sure to place your bid before the deadline to be considered.
                    </li>


                    <li><b>Winning the Auction</b>: The bidder with the lowest yearly interest rate at the auction deadline will be awarded the loan and has 1h to transact the payment.
                    </li>

                </ol>




            </div>





            <p className="ml-4 mt-6">Thank you for your support and participation in the Randolympics Loan Auction. Your contributions are invaluable in making the Randolympics a success!</p>


            <p className="ml-4">For more information or assistance, please contact us at randolympics@gmail.com</p>



            <div className="h-96"> </div>






            <Footer />





        </>
    )

}


export { EconomiscLoansHome }