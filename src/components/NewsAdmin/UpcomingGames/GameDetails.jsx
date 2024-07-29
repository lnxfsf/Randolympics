

import axios from "axios";
import { useEffect, useState } from "react";

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
/* 

    async function deletePost (postId) {
       try {

        const response = await axios.post(`${BACKEND_SERVER_BASE_URL}/blog/deletegamepost`, {
            postId: postId
        });
        

       } catch(error) {
        console.error(error);
       }
    } */




const GameDetails = ({ post, onBack }) => {


    const deletePost = async () => {
        try {
            const response = await axios.post(`${BACKEND_SERVER_BASE_URL}/blog/deletegamepost`, {
                postId: post.postId
            });


            if (response.status === 200) {
                console.log('Post deleted successfully', response.message);

                onBack()

            } else {
                console.error('Failed to delete post. Status:', response.status);
            }




        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <>

            <div>


                {/* controls */}
                <div className="flex justify-between">


                    <button className="border-2 mb-4 m-2 bg-[#fbbf24]" onClick={onBack}>Back to list</button>

                    <div className="flex gap-2 m-2" >
                        <img className="blogControlsIcon" src="blogs/pencil.svg" />
                        <img className="blogControlsIcon" src="blogs/trash.svg" onClick={deletePost} />
                    </div>
                </div>

                <img className="coverImageUpcomingGames" src={BACKEND_SERVER_BASE_URL + "/blog/upcominggames/" + post.cover_image} />



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

                <p >{post.content} </p>
            </div>

        </>
    )

}


export { GameDetails }
