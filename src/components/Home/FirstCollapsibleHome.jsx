

import { Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';

import React, { useState, useEffect } from "react";


/* 
// ? expand more

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

   */



const FirstCollapsibleHome = () => {


    const [firstHeaderExpanded, setFirstHeaderExpanded] = useState(false);

    const [secondHeaderExpanded, setSecondHeaderExpanded] = useState(false);
   
    const [thirdHeaderExpanded, setThirdHeaderExpanded] = useState(false);
    const [fourthHeaderExpanded, setFourthHeaderExpanded] = useState(false);
    const [fifthHeaderExpanded, setFifthHeaderExpanded] = useState(false);
    const [sixthHeaderExpanded, setSixtHeaderExpanded] = useState(false);




    return (
        <>






            <h1 onClick={() => { setFirstHeaderExpanded(!firstHeaderExpanded) }} className="mb-4 p-2 cursor-pointer select-none rounded-lg border border-black_first "> 1. Reducing Commercialization and Corruption</h1>
            <Collapse in={firstHeaderExpanded} timeout="auto" unmountOnExit>
                <p> The randolympics incorporates cryptocurrency and open-source technology to reduce the focus on high-profile endorsements and commercial interests. This approach increases transparency and diminishes the potential for corruption, ensuring a more genuine and fair competition.
                </p>
            </Collapse>




            <h1 onClick={() => { setSecondHeaderExpanded(!secondHeaderExpanded) }} className="mb-4 p-2 cursor-pointer select-none rounded-lg border border-black_first "> 2. Minimizing the Impact on Host Cities</h1>
            <Collapse in={secondHeaderExpanded} timeout="auto" unmountOnExit>
                <p> The randolympics leverages existing sports facilities, significantly lowering the financial and infrastructural burden on host cities. This approach promotes economic sustainability and reduces the risk of debt for host cities, similar to the ancient Olympic Games where existing structures were utilized                </p>
            </Collapse>


            <h1 onClick={() => { setThirdHeaderExpanded(!thirdHeaderExpanded) }} className="mb-4 p-2 cursor-pointer select-none rounded-lg border border-black_first "> 3. Promoting Environmental Sustainability</h1>
            <Collapse in={thirdHeaderExpanded} timeout="auto" unmountOnExit>
                <p> By utilizing existing venues and facilities, the randolympics minimizes the need for new construction, thereby lowering the environmental impact. This commitment to sustainability ensures that the event is eco-friendly and responsible, reminiscent of the ancient Olympic Games that celebrated harmony with nature.
                </p>
            </Collapse>


            <h1 onClick={() => { setFourthHeaderExpanded(!fourthHeaderExpanded) }} className="mb-4 p-2 cursor-pointer select-none rounded-lg border border-black_first "> 4. Mitigating Political and Ethical Issues</h1>
            <Collapse in={fourthHeaderExpanded} timeout="auto" unmountOnExit>
                <p> Randomly assigning athletes to events shifts the focus away from nationalistic and political exploitation, fostering a spirit of inclusivity and apolitical competition. The randolympics champions fair play and global unity, echoing the original ethos of the ancient Olympic Games.
                </p>
            </Collapse>


            <h1 onClick={() => { setFifthHeaderExpanded(!fifthHeaderExpanded) }} className="mb-4 p-2 cursor-pointer select-none rounded-lg border border-black_first "> 5. Enhancing Fairness and Reducing Doping  </h1>
            <Collapse in={fifthHeaderExpanded} timeout="auto" unmountOnExit>
                <p> The unpredictable nature of the randolympics diminishes the incentive to dope for specific events, potentially reducing the prevalence of performance-enhancing drugs. This format promotes a fairer and cleaner competition, ensuring that all athletes compete on an even playing field.                </p>
            </Collapse>


            <h1 onClick={() => { setSixtHeaderExpanded(!sixthHeaderExpanded) }} className="mb-4 p-2 cursor-pointer select-none rounded-lg border border-black_first "> 6. Embracing Cultural and Social Diversity </h1>
            <Collapse in={sixthHeaderExpanded} timeout="auto" unmountOnExit>
                <p> The randolympics celebrates a broader range of sports and cultures by not concentrating solely on traditional glamour events. This inclusive approach fosters cultural sensitivity and global participation, honoring the diverse heritage of the ancient Olympic Games.
                </p>
            </Collapse>






        </>

    );
};


export { FirstCollapsibleHome };