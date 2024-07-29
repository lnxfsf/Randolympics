
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UpcomingGamesList } from './UpcomingGames/UpcomingGamesList';

import { useEffect, useState } from "react";
import { GameDetails } from './UpcomingGames/GameDetails';



const NewsAdmin = () => {


    const [selectedPost, setSelectedPost] = useState(null);



    return (
        <>

            <Tabs>
                <TabList>
                    <Tab>Upcoming 2028 Games</Tab>

                    <Tab>News</Tab>

                    <Tab>Economics</Tab>

                </TabList>

                <TabPanel>


                    {selectedPost ? (
                        <GameDetails post={selectedPost} onBack={() => setSelectedPost(null)} />
                        
                    ) : (
                        <UpcomingGamesList onSelectPost={setSelectedPost} />
                    )}


                </TabPanel>

                <TabPanel>

                    <h2>News</h2>

                </TabPanel>

                <TabPanel>

                    <h2>Economics</h2>

                </TabPanel>

            </Tabs>






        </>
    );
}

export { NewsAdmin };
