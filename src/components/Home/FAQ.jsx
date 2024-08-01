
import 'animate.css';


import React, { useState, useEffect } from "react";

import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: '5px',
  
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  
  // ? expand more


const FAQ = () => {

    

const [expandedFirstText, setExpandedFirstText] = useState(false);

const [expandedSecondText, setExpandedSecondText] = useState(false);
const [expandedThirdText, setExpandedThirdText] = useState(false);
const [expandedFourthText, setExpandedFourthText] = useState(false);
const [expandedFifthText, setExpandedFifthText] = useState(false);
const [expandedSixthText, setExpandedSixthText] = useState(false);
const [expandedSeventhText, setExpandedSeventhText] = useState(false);
const [expandedEighthText, setExpandedEighthText] = useState(false);
const [expandedNinethText, setExpandedNinethText] = useState(false);
const [expandedTenthText, setExpandedTenthText] = useState(false);


    return (
        <>

            <div className="flex justify-center items-center mt-8 flex-col" data-aos="fade-up" id="FAQ">

                <p className="text-[30px] text-red_first mt-8  "><b>FAQ</b></p>


                <div className='w-1/2'>


                    {/* <div className=" flex justify-around items-center w-full bg-black_first">
*/}

                    {/* prvi */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedFirstText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-4`}>


                        <p className="text-red_first font-semibold pl-2 select-none">1.</p>
                        <p expand={expandedFirstText}
                            onClick={() => { setExpandedFirstText(!expandedFirstText) }} className="cursor-pointer select-none flex-grow pl-4  ">What is Randolympics ?</p>





                        <ExpandMore

                            expand={expandedFirstText}
                            onClick={() => { setExpandedFirstText(!expandedFirstText) }}
                            aria-expanded={expandedFirstText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedFirstText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>



                    {/* drugi  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedSecondText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">2.</p>
                        <p expand={expandedSecondText}
                            onClick={() => { setExpandedSecondText(!expandedSecondText) }} className="cursor-pointer select-none flex-grow pl-4  ">How does Randolympics work ?</p>





                        <ExpandMore

                            expand={expandedSecondText}
                            onClick={() => { setExpandedSecondText(!expandedSecondText) }}
                            aria-expanded={expandedSecondText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedSecondText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>



                    {/* treci  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedThirdText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">3.</p>
                        <p expand={expandedThirdText}
                            onClick={() => { setExpandedThirdText(!expandedThirdText) }} className="cursor-pointer select-none flex-grow pl-4  ">Who can participate ?</p>





                        <ExpandMore

                            expand={expandedThirdText}
                            onClick={() => { setExpandedThirdText(!expandedThirdText) }}
                            aria-expanded={expandedThirdText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedThirdText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>



                    {/* cetvrti  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedFourthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">4.</p>
                        <p expand={expandedFourthText}
                            onClick={() => { setExpandedFourthText(!expandedFourthText) }} className="cursor-pointer select-none flex-grow pl-4  ">How are athletes selected ?</p>





                        <ExpandMore

                            expand={expandedFourthText}
                            onClick={() => { setExpandedFourthText(!expandedFourthText) }}
                            aria-expanded={expandedFourthText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedFourthText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>



                    {/* peti  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedFifthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">5.</p>
                        <p expand={expandedFifthText}
                            onClick={() => { setExpandedFifthText(!expandedFifthText) }} className="cursor-pointer select-none flex-grow pl-4  ">How are weight categories organized ?</p>





                        <ExpandMore

                            expand={expandedFifthText}
                            onClick={() => { setExpandedFifthText(!expandedFifthText) }}
                            aria-expanded={expandedFifthText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedFifthText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>



                    {/* sesti  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedSixthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">6.</p>
                        <p expand={expandedSixthText}
                            onClick={() => { setExpandedSixthText(!expandedSixthText) }} className="cursor-pointer select-none flex-grow pl-4  ">What sports are included in Randolympics ?</p>





                        <ExpandMore

                            expand={expandedSixthText}
                            onClick={() => { setExpandedSixthText(!expandedSixthText) }}
                            aria-expanded={expandedSixthText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedSixthText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>


                    {/* sedmi  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedSeventhText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">7.</p>
                        <p expand={expandedSeventhText}
                            onClick={() => { setExpandedSeventhText(!expandedSeventhText) }} className="cursor-pointer select-none flex-grow pl-4  ">How are travel costs covered ?</p>





                        <ExpandMore

                            expand={expandedSeventhText}
                            onClick={() => { setExpandedSeventhText(!expandedSeventhText) }}
                            aria-expanded={expandedSeventhText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedSeventhText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>


                    {/* osmi  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedEighthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">8.</p>
                        <p expand={expandedEighthText}
                            onClick={() => { setExpandedEighthText(!expandedEighthText) }} className="cursor-pointer select-none flex-grow pl-4  ">How can I sign up to participate ?</p>





                        <ExpandMore

                            expand={expandedEighthText}
                            onClick={() => { setExpandedEighthText(!expandedEighthText) }}
                            aria-expanded={expandedEighthText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedEighthText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>



                    {/* deveti  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedNinethText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">9.</p>
                        <p expand={expandedNinethText}
                            onClick={() => { setExpandedNinethText(!expandedNinethText) }} className="cursor-pointer select-none flex-grow pl-4  ">How can my company become a sponsor ?</p>





                        <ExpandMore

                            expand={expandedNinethText}
                            onClick={() => { setExpandedNinethText(!expandedNinethText) }}
                            aria-expanded={expandedNinethText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedNinethText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>


                    {/* deseti  */}
                    <div className={`flex justify-between items-center w-full bg-black text-white ${expandedTenthText ? 'rounded-t-lg' : 'rounded-lg'}  bg-[#F7FAFA] pl-2 pr-2 mt-2`}>


                        <p className="text-red_first font-semibold pl-2 select-none">10.</p>
                        <p expand={expandedTenthText}
                            onClick={() => { setExpandedTenthText(!expandedTenthText) }} className="cursor-pointer select-none flex-grow pl-4  ">Where can I find more information about Randolympics ?</p>





                        <ExpandMore

                            expand={expandedTenthText}
                            onClick={() => { setExpandedTenthText(!expandedTenthText) }}
                            aria-expanded={expandedTenthText}
                            aria-label="show more"
                        >

                            <ExpandMoreIcon />

                        </ExpandMore>


                    </div>
                    <div className="">
                        <Collapse in={expandedTenthText} timeout="auto" unmountOnExit>

                            <div className="bg-[#F7FAFA] rounded-b-lg p-4">

                                <p>familijo</p>
                            </div>

                        </Collapse>
                    </div>




                </div>
            </div>
        </>
    )

}


export { FAQ }