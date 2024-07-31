
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import { UpcomingGamesList } from './UpcomingGames/UpcomingGamesList';
import { GameDetails } from './UpcomingGames/GameDetails';
import { CreateUpcomingPost } from './UpcomingGames/CreateUpcomingPost';






import { NewsGamesList } from './News/NewsGamesList';
import { NewsDetails } from './News/NewsDetails';
import { CreateNewsPost } from './News/CreateNewsPost';


import { useEffect, useState } from "react";





import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const NewsAdmin = () => {





    // za toast kada se obrise post (bolje izgleda)
    const [openSnackbar, setOpenSnackbar] = useState(false);



    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };





    // upcoming 2028 games
    const [selectedUpcomingPost, setSelectedUpcomingPost] = useState(null);
    const [createUpcomingPost, setCreateUpcomingPost] = useState(false)


    // news
    const [selectedNewsPost, setSelectedNewsPost] = useState(null);
    const [createNewsPost, setCreateNewsPost] = useState(false)


    return (
        <>

            <Tabs>
                <TabList>
                    <Tab>Upcoming 2028 Games</Tab>

                    <Tab>News</Tab>

                    <Tab>Economics</Tab>

                </TabList>

                <TabPanel>


                    {(selectedUpcomingPost || createUpcomingPost) ? (
                        selectedUpcomingPost ? (
                            <GameDetails postZ={selectedUpcomingPost} onBack={(deleting) => { setSelectedUpcomingPost(null); if (deleting) { setOpenSnackbar(true) } }} />
                        ) : (
                            <CreateUpcomingPost onBack={() => { setCreateUpcomingPost(false) }} />
                        )
                    ) : (
                        <UpcomingGamesList onSelectPost={setSelectedUpcomingPost} onCreatePost={setCreateUpcomingPost} />
                    )}


                    {/* ako kreiramo post ovo prikazuje... (aha, moze onBack isto, samo ce, da stavi ovu varijablu na null, )
 */}


                </TabPanel>

                <TabPanel>

                {(selectedNewsPost || createNewsPost) ? (
                        selectedNewsPost ? (
                            <NewsDetails postZ={selectedNewsPost} onBack={(deleting) => { setSelectedNewsPost(null); if (deleting) { setOpenSnackbar(true) } }} />
                        ) : (
                            <CreateNewsPost onBack={() => { setCreateNewsPost(false) }} />
                        )
                    ) : (
                        <NewsGamesList onSelectPost={setSelectedNewsPost} onCreatePost={setCreateNewsPost} />
                    )}


                </TabPanel>

                <TabPanel>

                    <h2>Economics</h2>

                </TabPanel>

            </Tabs>






            <Snackbar open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}

                >
                    Successfully deleted post
                </Alert>
            </Snackbar>



        </>
    );
}

export { NewsAdmin };
