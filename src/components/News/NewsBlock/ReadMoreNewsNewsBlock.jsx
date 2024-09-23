import axios from "axios";
import { useEffect, useState } from "react";

import "../../../styles/blogPosts.scoped.scss";
import { ItemNewsList } from "../../NewsAdmin/News/ItemNewsList";

import { NavbarHome } from "../../NavbarHome";

import { useNavigate } from "react-router-dom";
import { NavbarHomeCollapsed } from "../../NavbarHomeCollapsed";


import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { Navbar } from "../../Navbar";
import { FooterClean } from "../../FooterClean";


let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const ReadMoreNewsNewsBlock = () => {
  const [gamesPosts, setGamesPosts] = useState();

  const [limit, setLimit] = useState(10);
  const [gamesPostsPage, setGamesPostsPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getGamesPosts();
  }, [gamesPostsPage]);

  const handleNextPage = () => {
    if (hasMore) {
      setGamesPostsPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (gamesPostsPage > 1) {
      setGamesPostsPage((prev) => prev - 1);
    }
  };

  const getGamesPosts = async () => {
    var response = await axios.get(`${BACKEND_SERVER_BASE_URL}/blog/news`, {
      params: {
        limit: limit,
        offset: (gamesPostsPage - 1) * 10,
      },
    });

    setGamesPosts(response.data);

    const isThereNextPage = await axios.get(
      `${BACKEND_SERVER_BASE_URL}/blog/news`,
      {
        params: {
          limit: limit,
          offset: gamesPostsPage * 10,
        },
      }
    );

    if (isThereNextPage.data.length == 0) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mb-32"></div>

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

      {gamesPosts &&
        gamesPosts.map((post, index) => (
          <div className="flex justify-center items-center">
            <ItemNewsList
              post={post}
              index={index}
              onClick={() => {
                navigate(`/news/news/${post.postId}/${post.title}`);
              }}
            />
          </div>
        ))}

      <div className="flex justify-center mt-4">
        <button
          disabled={gamesPostsPage === 1}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          disabled={!hasMore}
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>

      <FooterClean />
    </>
  );
};

export { ReadMoreNewsNewsBlock };
