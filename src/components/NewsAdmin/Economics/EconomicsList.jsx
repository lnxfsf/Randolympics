

import axios from "axios";
import { useEffect, useState } from "react";
import { ItemEconomicsList } from "./ItemEconomicsList";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import "../../../styles/blogPosts.scoped.scss"


let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;






const EconomicsList = ({ onSelectPost, onCreatePost }) => {

    const [gamesPosts, setGamesPosts] = useState();

    const [limit, setLimit] = useState(10);
    const [gamesPostsPage, setGamesPostsPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);


    
    useEffect(() => {


        getGamesPosts();


    }, [gamesPostsPage]);



    

    const handleNextPage = () => {
        if (hasMore) {
            setGamesPostsPage((prev) => prev + 1);
        }
    };


    const handlePreviousPage = () => {
        if (gamesPostsPage > 1) {
            setGamesPostsPage((prev) => prev - 1);
        }
    };



    
    const getGamesPosts = async () => {





        var response = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/economics`,
            {
                params: {
                    limit: limit,
                    offset: (gamesPostsPage - 1) * 10,

                },

            }
        );


        setGamesPosts(response.data);




        const isThereNextPage =  await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/economics`,
            {
                params: {
                    limit: limit,
                    offset: (gamesPostsPage) * 10,

                },

            }
        );

        if (isThereNextPage.data.length == 0) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }



    }











    return (
        <>



            {gamesPosts && gamesPosts.map((post, index) => (

                <ItemEconomicsList post={post} index={index} key={index}
                    onClick={() => onSelectPost(post)}

                />


            ))}


            <div className="flex justify-center mt-4">
                <button

                    disabled={gamesPostsPage === 1}
                    onClick={handlePreviousPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
                >
                    Previous
                </button>
                <button
                    disabled={!hasMore}
                    onClick={handleNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Next Page
                </button>
            </div>


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
    
    export {EconomicsList}