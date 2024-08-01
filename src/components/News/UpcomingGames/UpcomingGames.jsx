

import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';



import "../../../styles/news.scoped.scss"




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
      ? `${BACKEND_SERVER_BASE_URL}/blog/upcominggames/${coverImage}`
      : "news/news1.png";
  }



const UpcomingGames = () => {

    const [gamesPosts, setGamesPosts] = useState();

    const navigate = useNavigate();



    useEffect(() => {


        getGamesPosts();


    }, []);



    const getGamesPosts = async () => {





        var response = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/gamesToUser`,

        );


        setGamesPosts(response.data);



    }





    return (<>


        {/* first  */}
        {(gamesPosts && gamesPosts[0]) && (
            <div className="flex w-[70%] h-64 mt-8 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer"
            
            onClick={() => {navigate(`/news/upcoming/${gamesPosts[0].postId}/${gamesPosts[0].title}`);}}
            >

               
                <div className="basis-1/2 object-cover overflow-hidden rounded-lg ">
                    <img className="image_part "
                        src={getImageUrl(gamesPosts[0].cover_image)}


                    />
                </div>


                <div className="basis-1/2 flex flex-col ">

                    <p className="text-text_news text-sm font-medium">{formatDate(gamesPosts[0].updatedAt) || "Date not available"}</p>



                    <div className="grow mt-2">


                        <p className="two-line-limit text-xl font-semibold mb-2">{gamesPosts[0].title || ""}</p>


                        <p className="three-line-limit text-base text-text_news font-medium ">{gamesPosts[0].subtitle || ""}</p>

                    </div>

                    <div className="flex items-center justify-between ">
                        <p className="text-text_news text-sm">{readingTime(gamesPosts[0].content)} min read</p>

                        <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                    </div>


                </div>


            </div>
        )
        }


        {/* second  */}
        {(gamesPosts && gamesPosts[1]) && (
        <div className="flex w-[70%] mt-4 h-64 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">



            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">{formatDate(gamesPosts[1].updatedAt) || "Date not available"}</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">{gamesPosts[1].title || ""}</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">{gamesPosts[1].subtitle || ""}</p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">{readingTime(gamesPosts[1].content)} min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


            <div className="basis-1/2 object-cover overflow-hidden rounded-lg">
                <img className="image_part" src={getImageUrl(gamesPosts[1].cover_image)} />
            </div>


        </div>
        )}



        {/* third  */}
        {(gamesPosts && gamesPosts[2]) && (
            <div className="flex w-[70%] h-64 mt-8 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">

               
                <div className="basis-1/2 object-cover overflow-hidden rounded-lg">
                    <img className="image_part "
                        src={getImageUrl(gamesPosts[2].cover_image)}


                    />
                </div>


                <div className="basis-1/2 flex flex-col ">

                    <p className="text-text_news text-sm font-medium">{formatDate(gamesPosts[2].updatedAt) || "Date not available"}</p>



                    <div className="grow mt-2">


                        <p className="two-line-limit text-xl font-semibold mb-2">{gamesPosts[2].title || ""}</p>


                        <p className="three-line-limit text-base text-text_news font-medium ">{gamesPosts[2].subtitle || ""}</p>

                    </div>

                    <div className="flex items-center justify-between ">
                        <p className="text-text_news text-sm">{readingTime(gamesPosts[2].content)} min read</p>

                        <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                    </div>


                </div>


            </div>
        )
        }




    </>)


}


export { UpcomingGames }