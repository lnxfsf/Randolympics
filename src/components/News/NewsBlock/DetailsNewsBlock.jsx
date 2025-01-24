import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";

import "../../../styles/blogPosts.scoped.scss";




import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";

import { useTranslation } from "react-i18next";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;


  let S3_BUCKET_CDN_BASE_URL =
  import.meta.env.VITE_S3_BUCKET_CDN_BASE_URL ||
  process.env.VITE_S3_BUCKET_CDN_BASE_URL;


const readingTime = (text) => {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};

function getImageUrl(coverImage) {
  return coverImage
    ? `${S3_BUCKET_CDN_BASE_URL}/blogs/news/${coverImage}`
    : "news/news1.png";
}

const DetailsNewsBlock = () => {


const { t, i18n } = useTranslation();


function formatDate(dateString) {
  let date = new Date(dateString);

  let locale = i18n.language || "en-US";
  
  switch(locale){
    case "sr":
      locale = "sr-Latn";
      break;
      
  }


  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(locale, options);
}




  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState();

  useEffect(() => {
    updateLatestData();
  }, []);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/blog/readingnewsDetails`,
        {
          params: {
            postId: postId,
          },
        }
      );


      
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <Navbar />


      <div className="relative ">
        <div className="mt-32 ">


          <div className=" flex justify-center items-center">
            <div className="w-[90%] sm:w-[90%] md:w-[70%]">
              <IconButton
                className="back-icon"
                aria-label="back"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
          </div>




          {post && (
            <>
              <br />
              

              



                <img
                  /*  className="w-full h-64" */
                  /*  ml-auto mr-auto 
                  
                  object-cover
                  
                  */
                  className="absolute top-10 left-0 right-0 h-40 sm:h-60 md:h-80 object-contain  z-10 rounded-lg ml-auto mr-auto  "
                 
                  /* style={{ objectFit: "contain", boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }} */

                  style={{boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}

                  
                  src={getImageUrl(post.cover_image)}

                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/news/news1.png"; 
                  }}
                /> 


             

              <div className=" flex justify-center items-center w-full grow ">
                <div className="bg-body_news md:m-16 mt-24 w-[90%] md:w-[70%] rounded-lg p-8 pt-0">

                  <div className="flex flex-col justify-start sm:flex-row sm:justify-between pt-20 sm:pt-36 md:pt-64">

                    <h1 className=" text-3xl font-semibold w-full sm:w-[80%] ">
                      {post.title}
                    </h1>

                    <div className="flex flex-col justify-start mt-2 sm:mt-0 sm:items-end gap-2">
                      <p className="text-text_news text-sm font-medium">
                        {formatDate(post.createdAt)}
                      </p>
                      <p className="text-text_news text-sm">
                       {readingTime(post.content)}  {t("home.news.content3")}
                      </p>
                    </div>

                  </div>

                  <p className=" text-lg text-text_news font-medium mt-2 sm:mt-0 w-full lg:w-[35em]">
                    {post.subtitle}
                  </p>

                  <div
                    className="ql-editor p-0 pt-12"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div> 
            </>
          )}


        </div>
      </div>

      <Footer />
    </>
  );
};

export { DetailsNewsBlock };
