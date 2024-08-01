import 'animate.css';



import { NavbarHome } from "../components/NavbarHome";
import { EconomicsNewsBlock } from "../components/News/EconomicsNewsBlock";
import { NewsNewsBlock } from "../components/News/NewsNewsBlock";
import { UpcomingGames } from "../components/News/UpcomingGames";
import { Footer } from "../components/Footer";



const News = () => {

    return (
        <>


           <NavbarHome />


            <div className="flex justify-center mt-48 flex-col items-center">
                <p className="text-4xl font-semibold  text-red_first ">Stockholm 2028 Games</p>

                <UpcomingGames />
            </div>





            <div className="flex justify-center mt-16 flex-col items-center">
                <p className="text-4xl font-semibold  text-red_first ">News</p>
                <NewsNewsBlock />

            </div>


            <div className="flex justify-center mt-16 flex-col items-center">
                <p className="text-4xl font-semibold  text-red_first mb-4">Economics</p>

                <EconomicsNewsBlock />
            </div>










        </>
    )
}

export { News }