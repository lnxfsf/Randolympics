

import "../../../styles/news.scoped.scss"
import { ItemEconomicsNewsBlock } from "../Economics/ItemEconomicsNewsBlock"
import { ItemNewsNewsBlock } from "./ItemNewsNewsBlock"




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



function getImageUrl(coverImage) {
    return coverImage
        ? `${BACKEND_SERVER_BASE_URL}/blog/news/${coverImage}`
        : "news/news1.png";
}


const NewsNewsBlock = () => {
    const [gamesPosts, setGamesPosts] = useState();

    const navigate = useNavigate();



    useEffect(() => {


        getGamesPosts();


    }, []);


    const getGamesPosts = async () => {





        var response = await axios.get(
            `${BACKEND_SERVER_BASE_URL}/blog/newsToUser`,

        );


        setGamesPosts(response.data);


        console.log(response.data)
    }




    return (
        <>


            {/* featured card story */}
            {(gamesPosts && gamesPosts[0]) && (
                <div className="flex flex-col w-[70%] mt-8 bg-body_news rounded-lg gap-8 blog-container cursor-pointer news-card-landing "


                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%), url(${getImageUrl(gamesPosts[0].cover_image)})`
                    }}

                    onClick={() => { navigate(`/news/news/${gamesPosts[0].postId}/${gamesPosts[0].title}`); }}

                >

                    <div className="grow">
                        <div className="w-1/3 h-9 bg-red_first text-[#fff] flex justify-start items-start p-2 pl-10 rounded-tl-lg">
                            <p className="text-sm">Featured story</p></div>
                    </div>



                    <div className="p-4 ">
                        <p className="text-[#fff] text-sm font-medium mb-2">{formatDate(gamesPosts[0].updatedAt) || "Date not available"}</p>
                        <p className="text-[#fff] text-sm font-semibold two-line-limit">{gamesPosts[0].title || ""}</p>

                        <p className="text-[#B4B4B4] text-sm three-line-limit ">{gamesPosts[0].subtitle || ""}</p>


                    </div>


                </div>
            )}




            {/* top stories header and read more */}
            <div className="flex justify-between items-center w-[70%] mt-8">

                <p className="text-3xl text-red_first font-semibold">Top stories</p>

                <div className="flex gap-4 cursor-pointer select-none" onClick={() => { navigate("/news/news") }}>
                    <p className="text-lg text-red_first font-medium ">See all</p>
                    <img className="w-5 " src="news/arrow_right.svg" />
                </div>




            </div>

            {/* all cards, 3 */}
            <div className="flex w-[70%] justify-between ">

                <ItemNewsNewsBlock number={1}/>
                <ItemNewsNewsBlock number={2}/>
                <ItemNewsNewsBlock number={3}/>

            </div>





        </>
    )
}

export { NewsNewsBlock }