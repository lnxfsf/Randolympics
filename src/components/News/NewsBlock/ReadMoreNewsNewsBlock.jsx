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

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const ReadMoreNewsNewsBlock = () => {
  const [gamesPosts, setGamesPosts] = useState();

  const [limit, setLimit] = useState(10);
  const [gamesPostsPage, setGamesPostsPage] = useState(1);

  const [maxPages, setMaxPages] = useState(0);

  const navigate = useNavigate();

  const handlePaginationChange = (event, value) => {
    setGamesPostsPage(value);
  };

  useEffect(() => {
    getGamesPosts();
  }, [gamesPostsPage]);

  const getGamesPosts = async () => {
    var response = await axios.get(`${BACKEND_SERVER_BASE_URL}/blog/news`, {
      params: {
        limit: limit,
        offset: (gamesPostsPage - 1) * 10,
      },
    });

    setMaxPages(Math.ceil(response.data.count / 10));
    setGamesPosts(response.data.rows);
  };

  return (
    <>
      <Navbar />

      <div className="mb-32"></div>

      <div className=" flex justify-center items-center">
        <div className="w-[97%]">
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

<div className="lg:p-8">
      {gamesPosts &&
        gamesPosts.map((post, index) => (
          <div className="flex justify-center items-center ">
            <ItemNewsList
              post={post}
              index={index}
              onClick={() => {
                navigate(`/news/news/${post.postId}/${post.title}`);
              }}
            />
          </div>
        ))}
        </div>

      <div className="flex justify-center items-start mt-4    w-full ">
        <Stack>
          <Pagination
            count={maxPages}
            page={gamesPostsPage}
            onChange={handlePaginationChange}
            sx={{
              "& .MuiPaginationItem-root": {
                "&.Mui-selected": {
                  backgroundColor: "#FFEAEA",
                  color: "#D24949",
                },
              },
            }}
          />
        </Stack>
      </div>

      <FooterClean />
    </>
  );
};

export { ReadMoreNewsNewsBlock };
