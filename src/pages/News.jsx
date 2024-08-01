

import { FAQ } from "../components/Home/FAQ";
import { NavbarHome } from "../components/NavbarHome";
import { EconomicsNewsBlock } from "../components/News/EconomicsNewsBlock";
import { UpcomingGames } from "../components/News/UpcomingGames";




const News = () => {

    return (
        <>


           <NavbarHome />


            <div className="flex justify-center mt-48 flex-col items-center">
                <p className="text-4xl font-semibold  text-red_first ">Stockholm 2028 Games</p>

                <UpcomingGames />
            </div>





            <div className="flex justify-center mt-48 flex-col items-center">
                <p className="text-4xl font-semibold  text-red_first ">Economics</p>

                <EconomicsNewsBlock />
            </div>





            <FAQ />



        </>
    )
}

export { News }