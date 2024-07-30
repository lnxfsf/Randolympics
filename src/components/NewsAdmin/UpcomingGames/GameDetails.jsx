

import axios from "axios";
import { useEffect, useState, useRef } from "react";

import "../../../styles/blogPosts.scoped.scss"


import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { Button } from "@mui/material";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';







let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;



const readingTime = (text) => {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time
}





const GameDetails = ({ post, onBack }) => {
    const popupRef = useRef(null);








    const cancelDeletion = () => {
        popupRef.current.close();

    }

    const deletePost = async () => {
        try {
            const response = await axios.post(`${BACKEND_SERVER_BASE_URL}/blog/deletegamepost`, {
                postId: post.postId
            });


            if (response.status === 200) {
                console.log('Post deleted successfully', response.message);


                onBack();

            } else {
                console.error('Failed to delete post. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };



    const handleUpdatePost = (e) => {
        e.preventDefault();



    }


    const [isEditing, setIsEditing] = useState(false)
    const [editingImage, setEditingImage] = useState("blogs/pen_to_square_filled.svg")


    const [editTitle, setEditTitle] = useState(post.title)
    const [editSubTitle, setEditSubTitle] = useState(post.subtitle)

    const [editContent, setEditContent] = useState(post.content)

    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
       
        [{ 'color': [] }, { 'background': [] }],
    
        ['clean'] // remove formatting button
      ];

    const modules = { toolbar: toolbarOptions };



    useEffect(() => {

        changeEditingImage();


    }, [isEditing]);


    const changeEditingImage = () => {
        if (isEditing) {
            setEditingImage("blogs/pen_to_square_filled.svg")
        } else {
            setEditingImage("blogs/pen_to_square_empty.svg")
        }
    }




    return (
        <>

            <div>


                {/* controls */}
                <div className="flex justify-between">


                    <button className="border-2 mb-4 m-2 bg-[#fbbf24]" onClick={onBack}>Back to list</button>

                    <div className="flex gap-2 m-2" >

                        <img className="blogControlsIcon cursor-pointer" src={editingImage} onClick={() => { setIsEditing(!isEditing) }} />


                        <Popup
                            ref={popupRef}
                            trigger={

                                <img className="blogControlsIcon cursor-pointer" src="blogs/trash.svg" onClick={deletePost} />
                            }
                            position="left center"
                            contentStyle={{ width: "auto" }}

                        >

                            <div className="m-4">

                                <div className="flex gap-2 mb-2 justify-center">
                                    <p>Delete post ?</p>
                                </div>




                                <div className="flex justify-center items-center gap-2 m-4">
                                    <Button
                                        onClick={cancelDeletion}
                                        className="w-[85px]"
                                        style={{ marginTop: "0px", padding: "0px" }}
                                        sx={{
                                            fontSize: "8pt",
                                            height: "30px",
                                            bgcolor: "#fff",
                                            color: "#232323",
                                            borderRadius: 15,
                                            border: `1px solid #fff`,
                                            "&:hover": {
                                                background: "rgb(196, 43, 43)",
                                                color: "white",
                                                border: `1px solid rgb(196, 43, 43)`,
                                            },
                                        }}
                                    >
                                        <span className="popins-font">Cancel</span>
                                    </Button>

                                    <Button
                                        onClick={deletePost}
                                        className="w-[85px]"
                                        style={{ marginTop: "0px", padding: "0px" }}
                                        sx={{
                                            fontSize: "8pt",
                                            height: "30px",
                                            bgcolor: "#AF2626",
                                            color: "#fff",
                                            borderRadius: 15,
                                            border: `1px solid #AF2626`,
                                            "&:hover": {
                                                background: "rgb(196, 43, 43)",
                                                color: "white",
                                                border: `1px solid rgb(196, 43, 43)`,
                                            },
                                        }}
                                    >
                                        <span className="popins-font">Delete</span>
                                    </Button>
                                </div>


                            </div>

                        </Popup>



                    </div>
                </div>


                {!isEditing && (<>



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

                </>)}




                {isEditing && (
                    <>
                        
     
                        <form action="#" onSubmit={handleUpdatePost}>
<div className="flex flex-col gap-4">
                            <input type="text" value={editTitle} name="title" maxLength={255} placeholder="title" onChange={(event) => {setEditTitle(event.target.value)}} />

                            <input type="text" value={editSubTitle} name="title" placeholder="subtitle" maxLength={255} onChange={(event) => {setEditSubTitle(event.target.value)}} />



                            <ReactQuill theme="snow" value={editContent} onChange={setEditContent} modules={modules} />;



<hr />
<p>Prikaz</p>

<div className="ql-editor" dangerouslySetInnerHTML={{ __html: editContent }} />
                            </div>



                        </form>

                        
                    </>
                )}





            </div>

        </>
    )

}


export { GameDetails }
