
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
import { EconomicsDetails } from './Economics/EconomicsDetails';
import { CreateEconomicsPost } from './Economics/CreateEconomicsPost';
import { EconomicsList } from './Economics/EconomicsList';



const NewsAdmin = () => {





    // za toast kada se obrise post (bolje izgleda)
    const [openSnackbarDeleted, setOpenSnackbarDeleted] = useState(false);





    const handleSnackbarDeletedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbarDeleted(false);
    };




    const [openSnackbarCreated, setOpenSnackbarCreated] = useState(false);



    const handleSnackbarCreatedClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbarCreated(false);
    };




    const [user_type, setUserType] = useState("");

    useEffect(() => {
        const storedData =
            localStorage.getItem("authTokens") ||
            sessionStorage.getItem("authTokens");
        if (storedData) {
            var userJson = JSON.parse(storedData);

            setUserType(userJson.data.user_type);
        }
    }, []);



    // upcoming 2028 games
    const [selectedUpcomingPost, setSelectedUpcomingPost] = useState(null);
    const [createUpcomingPost, setCreateUpcomingPost] = useState(false)


    // news
    const [selectedNewsPost, setSelectedNewsPost] = useState(null);
    const [createNewsPost, setCreateNewsPost] = useState(false)



    // Economics
    const [selectedEconomicsPost, setSelectedEconomicsPost] = useState(null);
    const [createEconomicsPost, setCreateEconomicsPost] = useState(false)




    return (
        <>

            <Tabs>
                <TabList>
                    {((user_type === "GP" || user_type === "EM" || user_type === "ITM")) && (
                        <Tab>Upcoming 2028 Games</Tab>
                    )}


                    {((user_type === "GP" || user_type === "MM" || user_type === "ITM")) && (
                        <Tab>News</Tab>
                    )}


                    {((user_type === "GP" || user_type === "SM" || user_type === "ITM")) && (
                        <Tab>Economics</Tab>
                    )}

                </TabList>

                <TabPanel>


                    {(selectedUpcomingPost || createUpcomingPost) ? (
                        selectedUpcomingPost ? (
                            <GameDetails postZ={selectedUpcomingPost} onBack={(deleting) => { setSelectedUpcomingPost(null); if (deleting) { setOpenSnackbarDeleted(true) } }} />
                        ) : (
                            <CreateUpcomingPost onBack={(deleting, created) => { setCreateUpcomingPost(false); if (created) { setOpenSnackbarCreated(true) }; console.log("on izvrsava ovo i dobija: " + created) }}



                            />
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
                            <NewsDetails postZ={selectedNewsPost} onBack={(deleting, created) => { setSelectedNewsPost(null); if (deleting) { setOpenSnackbarDeleted(true) } }} />
                        ) : (
                            <CreateNewsPost onBack={(deleting, created) => { setCreateNewsPost(false); if (created) { setOpenSnackbarCreated(true) }; console.log("on izvrsava ovo i dobija: " + created) }} />
                        )
                    ) : (
                        <NewsGamesList onSelectPost={setSelectedNewsPost} onCreatePost={setCreateNewsPost} />
                    )}


                </TabPanel>

                <TabPanel>

                    {(selectedEconomicsPost || createEconomicsPost) ? (
                        selectedEconomicsPost ? (
                            <EconomicsDetails postZ={selectedEconomicsPost} onBack={(deleting, created) => { setSelectedEconomicsPost(null); if (deleting) { setOpenSnackbarDeleted(true) } }} />
                        ) : (
                            <CreateEconomicsPost onBack={(deleting, created) => { setCreateEconomicsPost(false); if (created) { setOpenSnackbarCreated(true) }; console.log("on izvrsava ovo i dobija: " + created) }} />
                        )
                    ) : (
                        <EconomicsList onSelectPost={setSelectedEconomicsPost} onCreatePost={setCreateEconomicsPost} />
                    )}



                </TabPanel>

            </Tabs>






            <Snackbar open={openSnackbarDeleted}
                autoHideDuration={6000}
                onClose={handleSnackbarDeletedClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleSnackbarDeletedClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}

                >
                    Deleted post
                </Alert>
            </Snackbar>





            <Snackbar open={openSnackbarCreated}
                autoHideDuration={6000}
                onClose={handleSnackbarCreatedClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert
                    onClose={handleSnackbarCreatedClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}

                >
                    Created post
                </Alert>
            </Snackbar>




        </>
    );
}

export { NewsAdmin };
