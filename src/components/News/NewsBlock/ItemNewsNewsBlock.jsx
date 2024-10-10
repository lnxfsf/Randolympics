import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import "../../../styles/news.scoped.scss";

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
    ? `${BACKEND_SERVER_BASE_URL}/blog/news/${coverImage}`
    : "news/news1.png";
}

const ItemNewsNewsBlock = ({ number }) => {
  const [gamesPosts, setGamesPosts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getGamesPosts();
  }, []);

  const getGamesPosts = async () => {
    var response = await axios.get(
      `${BACKEND_SERVER_BASE_URL}/blog/newsToUser`
    );

    setGamesPosts(response.data);
  };

  return (
    <>
      {gamesPosts && gamesPosts[number] && (
        <div
          className="flex flex-col w-full lg:w-[32%] mt-8 bg-body_news p-3 rounded-lg gap-2 blog-container cursor-pointer"
          onClick={() => {
            navigate(
              `/news/news/${gamesPosts[number].postId}/${gamesPosts[number].title}`
            );
          }}
        >
          <div className="basis-1/2 object-cover overflow-hidden rounded-lg">
            <img
              className="image_part"
              src={getImageUrl(gamesPosts[number].cover_image)}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-red_second text-xs font-medium">Randolympics</p>
            <img src="news/mdi_dot.svg" />
            <p className=" text-xs">
              {formatDate(gamesPosts[number].updatedAt) || "Date not available"}
            </p>
          </div>

          <div className="grow">
            <p className="three-line-limit text-sm font-bold mb-2 ">
              {gamesPosts[number].title || ""}
            </p>

            <p className="two-line-limit text-sm fond-semibold text-[#716363] ">
              {gamesPosts[number].subtitle || ""}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xs  text-[#9D9A9A]">
              {readingTime(gamesPosts[number].content)} min read
            </p>
            <p className="text-xs  text-red_second font-semibold">Read More</p>
          </div>
        </div>
      )}
    </>
  );
};

export { ItemNewsNewsBlock };
