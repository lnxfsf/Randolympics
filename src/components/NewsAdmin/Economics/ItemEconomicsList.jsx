






  import { useTranslation } from "react-i18next";

const ItemEconomicsList = ({ post, index, onClick }) => {

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



    return (
        <>

<div className="w-full flex justify-center">

<div
        key={index}
        className="p-4 w-full min-h-28 bg-body_news m-2 cursor-pointer flex justify-between items-start blog-container-list rounded-lg"
        onClick={onClick}
      >


        
        <div className="w-[80%]">
          <p className="two-line-limit text-lg font-semibold mb-2">
            {post.title}
          </p>

          <div className="w-[80%]">
            <p className="two-line-limit text-base text-text_news font-medium md:max-w-[35em] ">
              {post.subtitle}
            </p>
          </div>
        </div>



        <div className="basis-1/2 md:basis-1/3">
          <div className="flex flex-col justify-between items-end">
          
            <p className="text-text_news text-sm font-medium grow break-all">
              {formatDate(post.updatedAt) || "Date not available"}
            </p>

            <p className="justify-self-end text-red_second text-sm font-semibold cursor-pointer select-none ">
              {t("home.news.content2")}
            </p>
          </div>
        </div>



      </div>

      </div>
        </>
    )
}





export { ItemEconomicsList }
