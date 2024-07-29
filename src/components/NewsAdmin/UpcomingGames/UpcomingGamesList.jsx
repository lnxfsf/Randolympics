import axios from "axios";
import { useEffect, useState } from "react";
import { ItemUpcomingGamesList } from "./ItemUpcomingGamesList";





let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;



const UpcomingGamesList = () => {

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

                <ItemUpcomingGamesList post={post} index={index} />


            ))}

       
        
        


        </>
    )
}


export { UpcomingGamesList }