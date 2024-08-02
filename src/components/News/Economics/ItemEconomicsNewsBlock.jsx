

import "../../../styles/news.scoped.scss"

import axios from "axios";


import { useEffect, useState } from "react";


import { useNavigate } from 'react-router-dom';




let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;



function formatDate(dateString) {
    let date = new Date(dateString);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);

}


const readingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
}




function getImageUrl(coverImage) {
    return coverImage
        ? `${BACKEND_SERVER_BASE_URL}/blog/economics/${coverImage}`
        : "news/news1.png";
}



const ItemEconomicsNewsBlock = ({number}) => {


    const navigate = useNavigate();

    
    const [gamesPosts, setGamesPosts] = useState();

    
    useEffect(() => {
        getGamesPosts();
    }, []);




    
    const getGamesPosts = async () => {





        var response = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/economicsToUser`,

        );


        setGamesPosts(response.data);



    }





    return (
        <>
        
        
        {(gamesPosts && gamesPosts[number]) && (
        <div className="flex w-[70%] mt-4 h-64 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer"
        onClick={() => { navigate(`/news/economics/${gamesPosts[number].postId}/${gamesPosts[number].title}`); }}
        >


            <div className="basis-1/2 object-cover overflow-hidden rounded-lg">
                <img className="image_part" src={getImageUrl(gamesPosts[number].cover_image)}  />
            </div>


            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">{formatDate(gamesPosts[number].updatedAt) || "Date not available"}</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">{gamesPosts[number].title || ""}</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">{gamesPosts[number].subtitle || ""}</p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">{readingTime(gamesPosts[number].content)} min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


        </div>
        )}
        
        
        </>
    )

}


export {ItemEconomicsNewsBlock}