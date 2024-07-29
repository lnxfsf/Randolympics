
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { UpcomingGamesList } from './UpcomingGames/UpcomingGamesList';

import { useEffect, useState } from "react";
import { GameDetails } from './UpcomingGames/GameDetails';




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
                        <GameDetails post={selectedPost} onBack={() => { setSelectedPost(null); setOpenSnackbar(true) }} />
                        
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
