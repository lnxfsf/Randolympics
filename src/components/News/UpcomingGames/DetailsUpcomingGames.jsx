
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from 'react-router-dom';

import 'react-quill/dist/quill.snow.css';
import { NavbarHome } from "../../NavbarHome";


import "../../../styles/blogPosts.scoped.scss"


let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;





const readingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
}

const DetailsUpcomingGames = () => {

    const { postId } = useParams();
    const navigate = useNavigate(); 


    const [post, setPost] = useState()


    useEffect(() => {
        updateLatestData();
    }, []);


    const updateLatestData = async () => {


        try {

            const response = await axios.get(
                `${BACKEND_SERVER_BASE_URL}/blog/gamesDetails`,
                {
                    params: {
                        postId: postId,


                    },
                }
            );

            console.log(response.data)
            setPost(response.data)




        } catch (error) {
            console.error(error);
        }


    }










    return (
        <>

            <NavbarHome />

            <div className="mt-64">







                {post && (

                    <>

                        <button className="bg-[#c7e029] " onClick={() => {navigate(-1);}}>Go back</button>


                        <img className="w-full h-64" style={{ objectFit: "contain" }} src={BACKEND_SERVER_BASE_URL + "/blog/upcominggames/" + post.cover_image} />

                        <br />

                        <h1 className="text-4xl">{post.title}</h1>
                        <br />

                        <hr />


                        <h2 className="text-xl">{post.subtitle}</h2>

                        <hr /><br />
                        <p>Date of publishing: {post.createdAt}</p>
                        <p>Updated at:  {post.updatedAt}</p>

                        <p>Reading time: {readingTime(post.content)} minute read</p>


                        <br /><br />
                        Content: <br />


                        <hr />
                        <br />


                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.content }} />


                    </>)}










            </div>

        </>
    )


}

export { DetailsUpcomingGames }