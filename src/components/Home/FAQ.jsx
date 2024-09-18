import React, { useState, useEffect } from "react";

import { Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FAQComponent } from "./FAQComponent";
import {useTranslation} from "react-i18next";

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "5px",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more

const FAQ = () => {
  const { t } = useTranslation();


  const [expandedFirstText, setExpandedFirstText] = useState(false);
  const [expandedSecondText, setExpandedSecondText] = useState(false);
  const [expandedThirdText, setExpandedThirdText] = useState(false);
  const [expandedFourthText, setExpandedFourthText] = useState(false);

  return (
    <>
      <div
        className="flex justify-center items-center  flex-col lexend-font text-black_second "
        data-aos="fade-up"
        id="FAQ"
      >
        <p className="text-2xl md:text-4xl text-red_second mt-8 mb-4  ">
          <b>{t('home.faq.title1')}</b>
        </p>

        <div className="w-[90%]  md:w-1/2">
          {/* <div className=" flex justify-around items-center w-full bg-black_first">
           */}

          {/* prvi */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedFirstText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-4`}
          >
            <p
              expand={expandedFirstText}
              onClick={() => {
                setExpandedFirstText(!expandedFirstText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second  "
            >
            {t('home.faq.title4')}
            </p>

            <ExpandMore
              expand={expandedFirstText}
              onClick={() => {
                setExpandedFirstText(!expandedFirstText);
              }}
              aria-expanded={expandedFirstText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>

          <div className="">
            <Collapse in={expandedFirstText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title={t('home.faq.title2')}
                 

                  content={t('home.faq.content1')}


                />

                <FAQComponent

                  title={t('home.faq.title3')}
                  
                  
                  content={t('home.faq.content2')}
                />

                <FAQComponent
                  title={t('home.faq.title5')}
                  content={t('home.faq.content3')}
                />

                <FAQComponent
                  title={t('home.faq.title6')}
                  content={t('home.faq.content4')}
              
              />

                <FAQComponent
                  title={t('home.faq.title7')}
                  content={t('home.faq.content5')}

                />

                <FAQComponent
                
                  title="

How do you verify that each supporter is unique?
"
                  content="

We verify each athlete through their valid passport, ensuring that there is no way to manipulate the system or create duplicate entries.


 "
                />

                <FAQComponent
                  title="

Can I create more than one campaign?


"
                  content="

Yes, you can create as many campaigns as you want! Starting a campaign is a huge compliment to a friend—a sign that you believe in their potential to achieve extraordinary things. Campaigns also make a thoughtful and inspiring gift for special occasions, like birthdays.

 "
                />

                <FAQComponent
                  title="

Can I be both an athlete and a supporter at the same time?


"
                  content="
Yes, you can! You can participate as an athlete in a campaign set up by your friend while also creating multiple campaigns yourself to support others. Your involvement can be as broad and supportive as you want it to be.
 "
                />

                <FAQComponent
                  title="

What happens to the money raised through donations?

"
                  content="

If the campaign is successful, the raised money will be transferred to the athlete to support their journey to the Randolympics, including training, equipment, and other preparation expenses. Additionally, if supporters wish to attend the event, up to three supporters from the campaign will receive a contribution towards their flight tickets to help them be part of the experience. If the campaign does not succeed in getting the athlete into an event, the donations will be used to ensure the event runs smoothly and is well-funded.
 
 "
                />

                <FAQComponent
                  title="

How does a celebrity campaign differ from a normal campaign?

"
                  content="

A celebrity campaign is similar to a normal campaign, but with a few key differences. Unlike regular campaigns, the contact details and email address of the celebrity may not be known to the person creating the campaign. If the celebrity decides to consider attending the Randolympics and wants to log in to their account, they need to announce their interest on social media and then contact both the National President and the campaign creator. They will coordinate and provide a secure login method for the celebrity to access their campaign account safely.
 "
                />

                <FAQComponent
                  title="

What campaign will succeed? How does the National Ranking work?


"
                  content="
A campaign's success depends on its position in the National Ranking, which is determined through a randomized ranking process. Each campaign is ranked based on three factors: the total amount of money raised, the number of unique supporters, and a random number between 0 and 1. These factors are combined to generate a final ranking for each campaign. To form each National Team, the top 50 men and top 50 women with the highest rankings are selected. However, teams must be balanced regarding weight categories, with each of the three weight groups equally represented. This balance requirement means that a campaign ranked 48th might not make the team if that weight category is already filled, while a campaign ranked 53rd could be included if that weight group is underrepresented.
 "
                />

                <FAQComponent
                  title="

What happens if athletes cannot attend due to injury or personal reasons?


"
                  content="
 
 If an athlete in the top 50 cannot attend the Randolympics due to injury, personal reasons, or other circumstances, they will be replaced by the next highest-ranked athlete from their weight category. This ensures that the team remains balanced and filled. Athletes ranked just above 50 still have a chance to participate if there are dropouts or changes in the roster, providing opportunities for those with a slightly lower ranking to make it to the games.

 "
                />

                <FAQComponent
                  title="

Can an athlete get rich?


"
                  content="
 Not directly from the Randolympics organization, but each athlete is free to sign sponsorship agreements. Unlike other events, there are no restrictions on how athletes dress or what brands they can display and when. Some events might go viral, and an athlete could become famous for a specific competition, opening up more sponsorship and earning opportunities.
 "
                />
              </div>
            </Collapse>
          </div>

          {/* drugi  */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedSecondText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-2`}
          >
            <p
              expand={expandedSecondText}
              onClick={() => {
                setExpandedSecondText(!expandedSecondText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second "
            >
              Events and Competitions
            </p>

            <ExpandMore
              expand={expandedSecondText}
              onClick={() => {
                setExpandedSecondText(!expandedSecondText);
              }}
              aria-expanded={expandedSecondText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
          <div className="">
            <Collapse in={expandedSecondText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title="

Can athletes request to change their assigned sports?


"
                  content="

No, once sports are assigned during the opening ceremony, they cannot be changed. The random assignment is part of the challenge and spirit of the Randolympics.

 "
                />

                <FAQComponent
                  title="

Am I forced to compete?


"
                  content="

No, participation in any competition is entirely voluntary. We prioritize the safety and well-being of all athletes. If an athlete feels uncomfortable or unprepared for any assigned sport, they are not required to compete. Our goal is to encourage participation and challenge limits, but never at the cost of an athlete's comfort or safety.
 "
                />

                <FAQComponent
                  title="

How many sports are assigned to an athlete?


"
                  content="

It depends, but typically an athlete will be assigned between 4 to 6 sports to compete in during the Randolympics.



 "
                />

                <FAQComponent
                  title="

What types of sports will be included in the Randolympics?


"
                  content="

The event will feature a wide range of sports, including endurance, strength, team-based, and individual competitions. The list on our webpage here might change as we get closer to the event.


 "
                />

                <FAQComponent
                  title="

What kind of training support is provided to athletes before the competition?


"
                  content="

Each athlete is responsible for their own training. Support from their campaign and community is encouraged.

 "
                />

                <FAQComponent
                  title="


Are there any specific rules that athletes need to follow during competitions?

"
                  content="

Yes, each sport has its own set of rules and regulations that must be followed to ensure fair play. These rules will be explained in detail before each competition.


 "
                />

                <FAQComponent
                  title="


What is the event structure or setup?


"
                  content={
                    <>
                      In every competition, each country is represented by one
                      team or athlete. There are three types of events:
                      <br />
                      Races like marathons: These allow up to 64 competitors in
                      one race, resulting in a single winner. <br />
                      Team sports like football or tennis: These are structured
                      in a knockout format where winners advance to the next
                      round until only four teams or athletes remain. <br />
                      Races with heats like swimming: These involve multiple
                      rounds with heats, leading to a final race to determine
                      the winner. <br />
                    </>
                  }
                />

                <FAQComponent
                  title="

What safety measures are in place for competitions?


"
                  content="
 
 
 All competitions are overseen by referees and safety officers. There will be medical staff on-site, and equipment will be inspected to ensure it meets safety standards.
 
 
 "
                />

                <FAQComponent
                  title="

Can supporters participate in any events or activities?

"
                  content="
 
 Supporters are encouraged to participate in designated fan events and activities during the Randolympics. However, they cannot compete in the official sports events unless they are registered athletes.
 
 "
                />

                <FAQComponent
                  title="

What about tight schedules?

"
                  content="
 We aim to plan sufficient time between two competitions to ensure athletes have time to rest and prepare. However, in extreme situations—such as a delay in the first competition and a traffic jam between venues—it is theoretically possible that an athlete may not be able to compete in the second event. Having good support can help manage such situations by quickly finding the venue and organizing transportation to minimize disruptions in such unlikely events.
 
 
 "
                />
              </div>
            </Collapse>
          </div>

          {/* treci  */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedThirdText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-2`}
          >
            <p
              expand={expandedThirdText}
              onClick={() => {
                setExpandedThirdText(!expandedThirdText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second  "
            >
              Sponsorship, Partners, and Media
            </p>

            <ExpandMore
              expand={expandedThirdText}
              onClick={() => {
                setExpandedThirdText(!expandedThirdText);
              }}
              aria-expanded={expandedThirdText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
          <div className="">
            <Collapse in={expandedThirdText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title="

Who will have the broadcasting rights?

"
                  content="
 
 
 The broadcasting rights for the Randolympics will soon be sold in an online auction. This auction will sell the rights for each event in the main languages. After purchasing, the entity or person who acquires these rights will have the exclusive ability to report in that language from the event.
 
 "
                />

                <FAQComponent
                  title="

How can I become a partner or sponsor?

"
                  content="
 
 We welcome potential partners and sponsors to join us in making the Randolympics a global success. If you are interested, please contact us through our Partner Inquiry Page for more information and to discuss opportunities.
 
 
 "
                />

                <FAQComponent
                  title="

What sponsorship opportunities are available?

"
                  content="
 Sponsorship opportunities range from event sponsorships and digital content integration to on-site activations. We offer flexible packages tailored to the needs and goals of each sponsor. Contact us to explore how we can create a unique sponsorship package for your brand.
 
 "
                />

                <FAQComponent
                  title="

Can sponsors have exclusive rights to specific events?

"
                  content="
 
 Yes, sponsors can secure exclusive rights to specific events within the Randolympics. This includes branding, digital presence, and other unique promotional opportunities during the event. However, athletes retain the right to have their own sponsorships and display personal branding on their gear and uniforms.
 
 
 "
                />

                <FAQComponent
                  title="

What branding opportunities are available for sponsors?

"
                  content="
 Sponsors can showcase their brands through event banners, digital streams, and social media channels. While event branding is available, keep in mind that athletes can feature their own sponsors and brands on their uniforms and during personal media appearances.
 
 "
                />

                <FAQComponent
                  title="

Can media outlets report on the Randolympics without purchasing broadcasting rights?

"
                  content="
 Media outlets are welcome to cover the Randolympics through general news reporting. However, for live broadcasts or detailed event coverage in a specific language, they must acquire broadcasting rights through the auction process.
 
 "
                />
              </div>
            </Collapse>
          </div>

          {/* cetvrti  */}
          <div
            className={`flex justify-between items-center w-full bg-black text-white ${
              expandedFourthText ? "rounded-t-lg" : "rounded-lg"
            }  bg-[#F7FAFA] pl-2 pr-2 mt-2`}
          >
            <p
              expand={expandedFourthText}
              onClick={() => {
                setExpandedFourthText(!expandedFourthText);
              }}
              className="cursor-pointer select-none flex-grow pl-4 font-semibold text-red_second "
            >
              Legal, Compliance, and Governance
            </p>

            <ExpandMore
              expand={expandedFourthText}
              onClick={() => {
                setExpandedFourthText(!expandedFourthText);
              }}
              aria-expanded={expandedFourthText}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
          <div className="">
            <Collapse in={expandedFourthText} timeout="auto" unmountOnExit>
              <div className="bg-[#F7FAFA] rounded-b-lg p-4">
                <FAQComponent
                  title="

How are National Presidents elected?

"
                  content="
 
 
 
 
 National Presidents are elected by athletes with an ongoing campaign and a valid passport for that country. If a candidate receives more than 120% of the votes compared to the current National President, the new candidate takes over the position.
 
 
 "
                />

                <FAQComponent
                  title="

How is the Global President elected?

"
                  content="
 
 
 
 The Global President is elected similarly to the National Presidents, but in this case, the electors are the National Presidents from each country. A candidate must receive a vote total exceeding 120% of the current Global President's votes to be elected.
 
 "
                />

                <FAQComponent
                  title="

How are managers selected?

"
                  content="
 
 
 
 Managers are selected by the Global President. The President appoints managers to various roles within the organization based on their expertise and the needs of Randolympics.
 
 
 "
                />

                <FAQComponent
                  title="

How are athletes selected for the Randolympics?

"
                  content="
 
 
 
 Athletes are selected through a randomized national ranking system. This ranking considers the total amount of money raised, the number of unique supporters, and a random number to ensure a fair and balanced selection process.
 
 "
                />

                <FAQComponent
                  title="

How do we try to avoid corruption?

"
                  content="
 
 
 
 We aim to prevent corruption by ensuring maximum transparency. All payments, contracts, and financial agreements are made open and accessible to the public to maintain trust and accountability.
 "
                />

                <FAQComponent
                  title="

What is the governance structure of Randolympics?

"
                  content="
 
 
 The governance structure of Randolympics includes the Global President, National Presidents, and appointed managers who oversee various functions of the organization. This structure ensures both global oversight and local representation, fostering fair and transparent management.

 "
                />

                <FAQComponent
                  title="

How is compliance maintained within Randolympics?

"
                  content="
 
 Compliance is maintained through a set of established rules and guidelines that all participants, managers, and officials must follow. Regular audits and reviews are conducted to ensure adherence to these rules and to uphold the integrity of the Randolympics.

 "
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};

export { FAQ };
