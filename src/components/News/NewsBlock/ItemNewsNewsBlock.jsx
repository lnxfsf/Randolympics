
const ItemNewsNewsBlock = () => {


    return (
        <>


            <div className="flex flex-col w-[32%] mt-8 bg-body_news p-3 rounded-lg gap-2 blog-container cursor-pointer">

                <div className="basis-1/2">
                    <img className="image_part" src="news/news1.png" />
                </div>





                <div className="flex justify-between items-center">
                    <p className="text-red_first text-xs font-medium">Randolympics</p>
                    <img src="news/mdi_dot.svg"/>
                    <p className=" text-xs">June 1, 2024</p>

                </div>


                <div className="grow">
                    <p className="three-line-limit text-sm font-bold mb-2 ">Here we can add additional information for the readers
                    Can have multiple</p>



                    <p className="two-line-limit text-sm fond-semibold text-[#716363] ">This is the title of the third Article, it can have two rows</p>


                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xs  text-[#9D9A9A]">10 min read</p>
                    <p className="text-xs  text-red_first font-semibold">Read More</p>
                </div>




            </div>







        </>
    )
}


export { ItemNewsNewsBlock }