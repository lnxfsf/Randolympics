
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UpcomingGamesList } from './UpcomingGames/UpcomingGamesList';


const NewsAdmin = () => {
    return (
        <>

            <Tabs>
                <TabList>
                    <Tab>Upcoming 2028 Games</Tab>
                  
                    <Tab>News</Tab>

                    <Tab>Economics</Tab>

                </TabList>

                <TabPanel>

                    
                    <UpcomingGamesList />


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
