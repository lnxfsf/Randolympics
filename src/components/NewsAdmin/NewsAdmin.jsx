
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UpcomingGamesList } from './UpcomingGames/UpcomingGamesList';

import { useEffect, useState } from "react";
import { GameDetails } from './UpcomingGames/GameDetails';




import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { CreateUpcomingPost } from './UpcomingGames/CreateUpcomingPost';


const NewsAdmin = () => {





    // za toast kada se obrise post (bolje izgleda)
    const [openSnackbar, setOpenSnackbar] = useState(false);



    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };






    const [selectedPost, setSelectedPost] = useState(null);

    const [createUpcomingPost, setCreateUpcomingPost] = useState(false)


    return (
        <>

            <Tabs>
                <TabList>
                    <Tab>Upcoming 2028 Games</Tab>

                    <Tab>News</Tab>

                    <Tab>Economics</Tab>

                </TabList>

                <TabPanel>


                    {(selectedPost || createUpcomingPost) ? (
                        selectedPost ? (
                            <GameDetails postZ={selectedPost} onBack={(deleting) => { setSelectedPost(null); if (deleting) { setOpenSnackbar(true) } }} />

                        ) : (
                            <CreateUpcomingPost onBack={() => {setCreateUpcomingPost(false)}}/>
                        )
                           

                                
                        


                    ) : (
                        <UpcomingGamesList onSelectPost={setSelectedPost} onCreatePost={setCreateUpcomingPost} />
                    )}


                    {/* ako kreiramo post ovo prikazuje... (aha, moze onBack isto, samo ce, da stavi ovu varijablu na null, )
 */}


                </TabPanel>

                <TabPanel>

                    <h2>News</h2>

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
