


import axios from "axios";
import { useEffect, useState } from "react";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import "../../../styles/blogPosts.scoped.scss"
import { ItemNewsList } from "./ItemNewsList";



let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;

const NewsGamesList = ({ onSelectPost, onCreatePost }) => {


    const [newsPosts, setNewsPosts] = useState();

    const [limit, setLimit] = useState(10);
    const [newsPostsPage, setNewsPostsPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);




    useEffect(() => {


        getNewsPosts();


    }, [newsPostsPage]);



    const handleNextPage = () => {
        if (hasMore) {
            setNewsPostsPage((prev) => prev + 1);
        }
    };


    const handlePreviousPage = () => {
        if (newsPostsPage > 1) {
            setNewsPostsPage((prev) => prev - 1);
        }
    };




    const getNewsPosts = async () => {

        var response = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/news`,
            {
                params: {
                    limit: limit,
                    offset: (newsPostsPage - 1) * 10,

                },

            }
        );


        setNewsPosts(response.data);




        const isThereNextPage = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/news`,
            {
                params: {
                    limit: limit,
                    offset: (newsPostsPage) * 10,

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


            {newsPosts && newsPosts.map((post, index) => (

             


                <ItemNewsList post={post} index={index} key={index}
                onClick={() => onSelectPost(post)}

            />




            ))}



            <div className="flex justify-center mt-4">
                <button

                    disabled={newsPostsPage === 1}
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
                    right: 15,
                    zIndex: 1000,
                }}

                onClick={() => { onCreatePost(true) }}

            >
                <AddIcon sx={{ mr: 1 }} /> Add post
            </Fab>

        </>
    )
}


export { NewsGamesList }