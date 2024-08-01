

import axios from "axios";
import { useEffect, useState } from "react";


import "../../styles/news.scoped.scss"





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




const UpcomingGames = () => {

    const [gamesPosts, setGamesPosts] = useState();



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
            <div className="flex w-[70%] h-64 mt-8 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">

                {/*  */}
                <div className="basis-1/2 object-cover overflow-hidden rounded-lg">
                    <img className="image_part"
                        src={BACKEND_SERVER_BASE_URL + "/blog/upcominggames/" + gamesPosts[0].cover_image || "news/news1.png"}

                        alt={gamesPosts[0].title || "Title"}

                    />
                </div>


                <div className="basis-1/2 flex flex-col ">

                    <p className="text-text_news text-sm font-medium">{formatDate(gamesPosts[0].updatedAt) || "Date not available"}</p>



                    <div className="grow mt-2">


                        <p className="two-line-limit text-xl font-semibold mb-2">{gamesPosts[0].title || "Title"}</p>


                        <p className="three-line-limit text-base text-text_news font-medium ">{gamesPosts[0].subtitle || "Subtitle"}</p>

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
        <div className="flex w-[70%] mt-4 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">



            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">June 1, 2024</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">This will be the title of the first post
                        We could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of text</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">Here we can add additional information for the readers
                        Can have multiple rows, same for the title
                    </p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">10 min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


            <div className="basis-1/2">
                <img className="image_part" src="news/news1.png" />
            </div>


        </div>




        {/* third  */}
        <div className="flex w-[70%] mt-4 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">


            <div className="basis-1/2">
                <img className="image_part" src="news/news1.png" />
            </div>


            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">June 1, 2024</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">This will be the title of the first post
                        We could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of text</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">Here we can add additional information for the readers
                        Can have multiple rows, same for the title
                    </p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">10 min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


        </div>




    </>)


}


export { UpcomingGames }