

import "../../styles/news.scoped.scss"
import { ItemEconomicsNewsBlock } from "./ItemEconomicsNewsBlock"
import { ItemNewsNewsBlock } from "./ItemNewsNewsBlock"



const NewsNewsBlock = () => {


    return (
        <>


            {/* featured card story */}
            <div className="flex flex-col w-[70%] mt-8 bg-body_news rounded-lg gap-8 blog-container cursor-pointer news-card-landing ">

                <div className="grow">
                    <div className="w-1/3 h-9 bg-red_first text-[#fff] flex justify-start items-start p-2 pl-10 rounded-tl-lg">
                        <p className="text-sm">Featured story</p></div>
                </div>



                <div className="p-4 ">
                    <p className="text-[#fff] text-sm font-medium mb-2">June 1, 2024</p>
                    <p className="text-[#fff] text-sm font-semibold two-line-limit">This is where the title of the article goes
                        This is where the title of the article goes
                        This is where the title of the article goes
                        This is where the title of the article goes
                        This is where the title of the article goesThis is where the title of the article goesThis is where the title of the article goesThis is where the title of the article goesThis is where the title of the article goesThis is where the title of the article goes
                    </p>

                    <p className="text-[#B4B4B4] text-sm three-line-limit ">Here we can add additional information for the readers
                        Can have multiple rows, same for the title
                        Here we can add additional information for the readers
                        Can have multiple rows, same for the titleHere we can add additional information for the readers
                        Can have multiple rows, same for the titleHere we can add additional information for the readers
                        Can have multiple rows, same for the titleHere we can add additional information for the readers
                        Can have multiple rows, same for the titleHere we can add additional information for the readers
                        Can have multiple rows, same for the titleHere we can add additional information for the readers
                        Can have multiple rows, same for the titleHere we can add additional information for the readers
                        Can have multiple rows, same for the title





                    </p>


                </div>


            </div>

            {/* top stories header and read more */}
            <div className="flex justify-between items-center w-[70%] mt-8">

                <p className="text-3xl text-red_first font-semibold">Top stories</p>

                <div className="flex gap-4 cursor-pointer select-none">
                    <p className="text-lg text-red_first font-medium ">See all</p>
                    <img className="w-5 " src="news/arrow_right.svg" />
                </div>




            </div>

            {/* all cards, 3 */}
            <div className="flex w-[70%] justify-between ">

                <ItemNewsNewsBlock />
                <ItemNewsNewsBlock />
                <ItemNewsNewsBlock />

            </div>





        </>
    )
}

export { NewsNewsBlock }