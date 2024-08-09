function formatDate(dateString) {
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const ItemNewsList = ({ post, index, onClick }) => {
  // this is one post... and just, display it rendered as it

  return (
    <>
      <div
        key={index}
        className="p-4 w-[70%] h-28 bg-body_news m-2 cursor-pointer flex justify-between items-start blog-container-list rounded-lg"
        onClick={onClick}
      >
        <div>
          <p className="two-line-limit text-lg font-semibold mb-2">
            {post.title}
          </p>

          <div className="w-[80%]">
            <p className="two-line-limit text-base text-text_news font-medium w-[35em] ">
              {post.subtitle}
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col justify-between items-end  gap-10">
            <p className="text-text_news text-sm font-medium grow ">
              {formatDate(post.updatedAt) || "Date not available"}
            </p>

            <p className="justify-self-end text-red_first text-sm font-semibold cursor-pointer select-none ">
              Read more
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { ItemNewsList };
