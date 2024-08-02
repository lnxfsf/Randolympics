


import axios from "axios";
import { useEffect, useState } from "react";

import "../../../styles/blogPosts.scoped.scss"
import { ItemUpcomingGamesList } from "../../NewsAdmin/UpcomingGames/ItemUpcomingGamesList";
import { NavbarHome } from "../../NavbarHome";

import { useNavigate } from 'react-router-dom';


let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;




const ReadMoreUpcomingGames = () => {


    const [gamesPosts, setGamesPosts] = useState();

    const [limit, setLimit] = useState(10);
    const [gamesPostsPage, setGamesPostsPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);



    const navigate = useNavigate();

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
            `${BACKEND_SERVER_BASE_URL}/blog/games`,
            {
                params: {
                    limit: limit,
                    offset: (gamesPostsPage - 1) * 10,

                },

            }
        );


        setGamesPosts(response.data);




        const isThereNextPage = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/games`,
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

            <NavbarHome />


            <div className="mb-64"></div>


            <button className="bg-[#c7e029] " onClick={() => { navigate(-1); }}>Go back</button>
            {gamesPosts && gamesPosts.map((post, index) => (

                <ItemUpcomingGamesList post={post} index={index}
                    onClick={() => { navigate(`/news/upcoming/${post.postId}/${post.title}`); }}

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






        </>
    )


}



export { ReadMoreUpcomingGames }