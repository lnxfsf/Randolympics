import axios from "axios";
import { useEffect, useState } from "react";
import { ItemUpcomingGamesList } from "./ItemUpcomingGamesList";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import "../../../styles/blogPosts.scoped.scss"


let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;



const UpcomingGamesList = ({ onSelectPost, onCreatePost }) => {

    const [gamesPosts, setGamesPosts] = useState();

    const [limit, setLimit] = useState(10);
    const [gamesPostsPage, setGamesPostsPage] = useState(1);


    useEffect(() => {


        getGamesPosts();


    }, [gamesPostsPage]);




    const getGamesPosts = async () => {





        var response = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/games`,
            {
                params: {
                    limit: limit,
                    offset: (gamesPostsPage - 1) * 10,

                },

            }
        );


        setGamesPosts(response.data);







    }





    return (
        <>



            {gamesPosts && gamesPosts.map((post, index) => (

                <ItemUpcomingGamesList post={post} index={index} key={index}
                    onClick={() => onSelectPost(post) }

                />


            ))}

            <Fab color="primary" aria-label="add" variant="extended" size="big"
                style={{
                    position: 'fixed',
                    bottom: 16,
                    right: 65,
                    zIndex: 1000,
                }}

                onClick={() => { onCreatePost(true) }}

            >
                <AddIcon sx={{ mr: 1 }} /> Add post
            </Fab>



        </>
    )
}


export { UpcomingGamesList }