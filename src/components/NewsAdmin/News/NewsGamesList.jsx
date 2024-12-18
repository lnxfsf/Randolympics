


import axios from "axios";
import { useEffect, useState } from "react";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


import "../../../styles/blogPosts.scoped.scss"
import { ItemNewsList } from "./ItemNewsList";


import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;

const NewsGamesList = ({ onSelectPost, onCreatePost }) => {


    const [newsPosts, setNewsPosts] = useState();

    const [limit, setLimit] = useState(10);
    const [newsPostsPage, setNewsPostsPage] = useState(1);
   


    const [maxPages, setMaxPages] = useState(0);


    const handlePaginationChange = (event, value) => {
        setNewsPostsPage(value);
      };


    useEffect(() => {


        getNewsPosts();


    }, [newsPostsPage]);



   




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


        setMaxPages(Math.ceil(response.data.count / 10));
        setNewsPosts(response.data.rows);






    }







    return (
        <>


            {newsPosts && newsPosts.map((post, index) => (

             


                <ItemNewsList post={post} index={index} key={index}
                onClick={() => onSelectPost(post)}

            />




            ))}





            <div className="flex justify-center items-start mt-4    w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={newsPostsPage}
            onChange={handlePaginationChange}
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#FFEAEA",
                  color: "#D24949",
                },
              },
            }}
          />
        </Stack>
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