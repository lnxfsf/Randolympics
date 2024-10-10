import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import { NavbarHome } from "../../NavbarHome";

import "../../../styles/blogPosts.scoped.scss";
import { NavbarHomeCollapsed } from "../../NavbarHomeCollapsed";


import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Navbar } from "../../Navbar";
import { FooterClean } from "../../FooterClean";



let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

function formatDate(dateString) {
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}



const readingTime = (text) => {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
};

function getImageUrl(coverImage) {
  return coverImage
    ? `${BACKEND_SERVER_BASE_URL}/blog/economics/${coverImage}`
    : "news/news1.png";
}

const DetailsNewsEconomics = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState();

  useEffect(() => {
    updateLatestData();
  }, []);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/blog/economicsDetails`,
        {
          params: {
            postId: postId,
          },
        }
      );

      console.log(response.data);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative ">
      <div className="mt-32">
        <div className=" flex justify-center items-center">
          <div className="w-[70%]">
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
                  /*  ml-auto mr-auto */
                  className="absolute top-10 left-0 right-0 h-80 object-cover z-10 rounded-lg ml-auto mr-auto "
                  style={{ objectFit: "contain", boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                  src={getImageUrl(post.cover_image)}
                />
             

              <div className=" flex justify-center items-center ">
                <div className="bg-body_news m-16 mt-24 w-[70%] rounded-lg p-8 pt-0">
                  <div className="flex justify-between pt-64">
                    <h1 className=" text-3xl font-semibold w-[80%] ">
                      {post.title}
                    </h1>

                    <div className="flex flex-col justify-start items-end gap-2">
                      <p className="text-text_news text-sm font-medium">
                        {formatDate(post.createdAt)}
                      </p>
                      <p className="text-text_news text-sm">
                        {readingTime(post.content)} min read
                      </p>
                    </div>
                  </div>

                  <p className=" text-lg text-text_news font-medium w-[35em]">
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

      <FooterClean />
    </>
  );
};

export { DetailsNewsEconomics };
