



import "../../styles/news.scoped.scss"





const UpcomingGames = () => {


    return (<>


        {/* first  */}
        <div className="flex w-[70%] mt-8 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">


            <div className="basis-1/2">
                <img src="news/news1.png" />
            </div>


            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">June 1, 2024</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">This will be the title of the first post
                        We could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of text</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">Here we can add additional information for the readers
                        Can have multiple rows, same for the title
                    </p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">10 min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


        </div>



        {/* second  */}
        <div className="flex w-[70%] mt-8 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">



            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">June 1, 2024</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">This will be the title of the first post
                        We could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of text</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">Here we can add additional information for the readers
                        Can have multiple rows, same for the title
                    </p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">10 min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


            <div className="basis-1/2">
                <img src="news/news1.png" />
            </div>


        </div>




        {/* third  */}
        <div className="flex w-[70%] mt-8 bg-body_news p-4 rounded-lg gap-8 blog-container cursor-pointer">


            <div className="basis-1/2">
                <img src="news/news1.png" />
            </div>


            <div className="basis-1/2 flex flex-col ">

                <p className="text-text_news text-sm font-medium">June 1, 2024</p>



                <div className="grow mt-2">


                    <p className="two-line-limit text-xl font-semibold mb-2">This will be the title of the first post
                        We could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of textWe could have 2 rows of text</p>


                    <p className="three-line-limit text-base text-text_news font-medium ">Here we can add additional information for the readers
                        Can have multiple rows, same for the title
                    </p>

                </div>

                <div className="flex items-center justify-between ">
                    <p className="text-text_news text-sm">10 min read</p>

                    <p className="text-red_first text-sm font-semibold cursor-pointer select-none">Read More</p>
                </div>


            </div>


        </div>




    </>)


}


export { UpcomingGames }