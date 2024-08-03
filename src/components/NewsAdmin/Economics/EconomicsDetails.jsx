



import axios from "axios";
import { useEffect, useState, useRef } from "react";

import "../../../styles/blogPosts.scoped.scss"


import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { Button } from "@mui/material";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import TextField from "@mui/material/TextField";


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



// FilePond
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";

// FilePond css
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css";
import FilePondPluginFileValidateType from "filepond-plugin-image-edit";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import "@pqina/pintura/pintura.css";

registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginFilePoster,
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginImageEdit
);





let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;






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



const EconomicsDetails = ({ postZ, onBack }) => {


    const popupRef = useRef(null);


    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const [post, setPost] = useState(postZ); 
    

    
    const cancelDeletion = () => {
        popupRef.current.close();

    }



    const deletePost = async () => {
        try {
            const response = await axios.post(`${BACKEND_SERVER_BASE_URL}/blog/deleteeconomicspost`, {
                postId: post.postId
            });


            if (response.status === 200) {
                console.log('Post deleted successfully', response.message);


                onBack(true);

            } else {
                console.error('Failed to delete post. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };




    

    const [isEditing, setIsEditing] = useState(false)
    const [editingImage, setEditingImage] = useState("/blogs/pen_to_square_filled.svg")


    const [editTitle, setEditTitle] = useState(post.title)
    const [editSubTitle, setEditSubTitle] = useState(post.subtitle)

    const [editContent, setEditContent] = useState(post.content)



    const [editCoverImage, setEditCoverImage] = useState(post.cover_image)  
	
    const [tempEditCoverImage, setTempEditCoverImage] = useState()  
	



    const handleCancel = () => {
        // samo vrati sto su bili values te pre (jer nisi nista upload-ovao)
        setIsEditing(false)
        setEditTitle(post.title)
        setEditSubTitle(post.subtitle)
        setEditContent(post.content)
        // setEditCoverImage(post.cover_image)  // e evo je taj original vidis, on cuva, url od pravog (i ovaj mozes koristiti da obrises pre nego sačuvaš u database ovaj novi... )


        // it must delete that image from server that was temporary uploaded, but not yet saved to that blog post
        fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertBlogs_economics_picture_upload`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename: tempEditCoverImage }),
        }).then(response => {
            if (response.ok) {
                load(); // Signal that the file has been reverted successfully
            } else {
                response.json().then(errorData => error(errorData.message));
            }
        }).catch(err => {
            console.error('Error reverting file:', err);

        });



        setTempEditCoverImage(null);

    }



    const handleUpdatePost = async (e) => {
        e.preventDefault();

        var title = e.target.title.value;
        var subtitle = e.target.subtitle.value;



        try {


            var response = await axios.post(
                `${BACKEND_SERVER_BASE_URL}/blog/updateEconomicsBlog`,
                {
                    postId: post.postId,
                    title,
                    subtitle,
                    content: editContent,
                    cover_image: tempEditCoverImage,

                }
            );

            if (response.status === 200) {
                // TODO, e sada, obrises prethodnu image url sto je bio ! 
                // ako je doslo do promena..
                console.log(response.data.message)



                console.log(" novi image treba da zameni sa starijim:" + editCoverImage)
                // so, we delete previous image (if there was one)
                // it must delete that image from server that was temporary uploaded, but not yet saved to that blog post
                // i ako zaista ima neki upload uopste.. 
                if (editCoverImage && tempEditCoverImage) {
                    fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertBlogs_economics_picture_upload`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ filename: editCoverImage }),
                    }).then(response => {
                        if (response.ok) {
                            load(); // Signal that the file has been reverted successfully
                        } else {
                            response.json().then(errorData => error(errorData.message));
                        }
                    }).catch(err => {
                        console.error('Error reverting file:', err);

                    });
                }




                
                setIsEditing(false)
                setOpenSnackbar(true)


            }

        } catch (error) {
            console.log(error);


            // TODO, ovde onaj popup da imas..
        }







    }


    
    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'video', 'code-block', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'align': [] }],

        [{ 'color': [] }, { 'background': [] }],

        ['clean'] // remove formatting button
    ];



    const modules = { toolbar: toolbarOptions };


    // ? filepond upload
    const [files, setFiles] = useState([]);

    


    const server = {
        /* url: 'http://localhost:5000/profile_photo/upload', */

        process: {
            url: `${BACKEND_SERVER_BASE_URL}/imageUpload/blogs_economics_picture_upload`,
            method: "POST",
            headers: {},
            withCredentials: false,

            onload: (response) => {
                // Parse the JSON response to get the filename






                const jsonResponse = JSON.parse(response);
                const filename = jsonResponse;

                console.log("Uploaded filename:", filename);

                // e ovde, ne treba da menjas original, nego kopiju napravis samo (koju uploadujes.. (i onda ona postaje original posle... ))
                setTempEditCoverImage(filename)

                // setEditCoverImage(filename)


            },
            onerror: (response) => {
                console.error("Error uploading file:", response);
                return response;
            },


        },







        revert: (uniqueFileId, load, error) => {
            // console.log("ovo mu je" + editCoverImage)


            // Send request to the server to delete the file with the uniqueFileId

            // it reverts the image it had ! but it's not yet uploaded, so we can delete it from backend..
            fetch(`${BACKEND_SERVER_BASE_URL}/imageUpload/revertBlogs_economics_picture_upload`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filename: tempEditCoverImage }),
            }).then(response => {
                if (response.ok) {
                    load(); // Signal that the file has been reverted successfully
                } else {
                    response.json().then(errorData => error(errorData.message));
                }
            }).catch(err => {
                console.error('Error reverting file:', err);
                error('Error reverting file');
            });


        },



    };



    


    

    useEffect(() => {

        changeEditingImage();
        updateLatestData();


    }, [isEditing]);



    const changeEditingImage = () => {
        if (isEditing) {
            setEditingImage("/blogs/pen_to_square_filled.svg")
        } else {
            setEditingImage("blogs/pen_to_square_empty.svg")
        }
    }


    const updateLatestData = async () => {


        try {

            const response = await axios.get(
                `${BACKEND_SERVER_BASE_URL}/blog/economicsDetails`,
                {
                    params: {
                        postId: post.postId,


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

            <div>


                {/* controls */}
                <div className="flex justify-between">


                    <button className="border-2 mb-4 m-2 bg-[#fbbf24]" onClick={() => { onBack(false) }}>Back to list</button>

                    <div className="flex gap-2 m-2" >

                        <img className="blogControlsIcon cursor-pointer" src={editingImage} onClick={() => { setIsEditing(!isEditing) }} />


                        <Popup
                            ref={popupRef}
                            trigger={

                                <img className="blogControlsIcon cursor-pointer" src="/blogs/trash.svg" onClick={deletePost} />
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



                    <img className="coverImageUpcomingGames" src={getImageUrl(post.cover_image)} />

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

                    {/*  <p >{post.content} </p> */}


                    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: post.content }} />

                </>)}



                <Snackbar open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}

                    >
                        Post edited
                    </Alert>
                </Snackbar>



                {isEditing && (
                    <>


                        <form action="#" onSubmit={handleUpdatePost}>
                            <div className="flex flex-col gap-4">


                                <FilePond
                                    /* className="filepond--root large" */
                                    type="file"
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    server={server}
                                    name="image"
                                    labelIdle='Drag & Drop cover image or <span class="filepond--label-action">Browse</span> '
                                    accept="image/png, image/jpeg, image/gif"
                                    dropOnPage
                                    dropValidation
                                    allowPaste={true}
                                    allowReplace={true}
                                    credits={""}
                                    allowFileEncode={true}
                                    allowFileTypeValidation={true}
                                    allowImagePreview={true}
                                    /* so, with this "allowImageCrop", "allowImageResize" , user can upload a picture, and even if too high resolution, here you can scale it down ! before it's sent to backend to store
                                   for now, we keep it original resolution, until I know what max resolution we should support 
                                 */
                                    allowImageCrop={false}
                                    allowImageResize={false}
                                    allowImageTransform={false}



                                    imagePreviewHeight={222}

                                    imageCropAspectRatio="1:1"
                                    /*            imageResizeTargetWidth={100}
                                    imageResizeTargetHeight={100} */

                                    stylePanelLayout="compact"

                                    styleLoadIndicatorPosition="center bottom"
                                    styleProgressIndicatorPosition="center bottom"
                                    styleButtonRemoveItemPosition="center  bottom"
                                    styleButtonProcessItemPosition="center bottom"
                                    imageEditAllowEdit={false}



                                />




                                <TextField
                                    value={editTitle}
                                    onChange={(event) => { setEditTitle(event.target.value) }}

                                    label="Title"

                                    placeholder="Title"
                                    id="name"
                                    name="title"
                                    type="text"
                                    inputProps={{
                                        maxLength: 255,
                                    }}
                                    sx={{
                                        m: 1,
                                        width: "auto",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 5,
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "red",
                                        },
                                        "& .MuiInputLabel-root": {
                                            "&.Mui-focused": {
                                                color: "black",
                                            },
                                        },
                                    }}
                                />




                                <TextField
                                    value={editSubTitle}
                                    onChange={(event) => { setEditSubTitle(event.target.value) }}

                                    label="Subtitle"

                                    placeholder="subtitle"
                                    id="name"
                                    name="subtitle"
                                    type="text"
                                    inputProps={{
                                        maxLength: 255,
                                    }}
                                    sx={{
                                        m: 1,
                                        width: "auto",
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 5,
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "red",
                                        },
                                        "& .MuiInputLabel-root": {
                                            "&.Mui-focused": {
                                                color: "black",
                                            },
                                        },
                                    }}
                                />





                                <ReactQuill theme="snow" value={editContent} onChange={setEditContent} modules={modules} />





                                <div className="flex justify-end mt-2 gap-2 items-end">
                                    <Button
                                        onClick={handleCancel}
                                        className="w-[200px]"
                                        style={{ marginTop: "20px" }}
                                        sx={{
                                            height: "50px",
                                            bgcolor: "#fff",
                                            color: "#000",
                                            borderRadius: 15,
                                            border: `1px solid #AF2626`,
                                            "&:hover": {
                                                background: "rgb(196, 43, 43)",
                                                color: "white",
                                                border: `1px solid rgb(196, 43, 43)`,
                                            },
                                        }}
                                        variant="text"
                                    >
                                        <span className="popins-font">Cancel</span>
                                    </Button>

                                    <Button
                                        className="w-[200px]"
                                        style={{ marginTop: "20px" }}
                                        sx={{
                                            height: "50px",
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
                                        type="submit"
                                        variant="text"
                                    >
                                        <span className="popins-font">Save</span>
                                    </Button>
                                </div>


                            </div>



                        </form>





                    </>
                )}





            </div>

        </>
    )




}

export { EconomicsDetails }

