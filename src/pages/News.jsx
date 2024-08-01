

import { FAQ } from "../components/Home/FAQ";
import { NavbarHome } from "../components/NavbarHome";
import { UpcomingGames } from "../components/News/UpcomingGames";




const News = () => {

    return (
        <>


           <NavbarHome />


            <div className="flex justify-center mt-48 flex-col items-center">
                <p className="text-4xl font-semibold  text-red_first ">Stockholm 2028 Games</p>

                <UpcomingGames />
            </div>





            <FAQ />



        </>
    )
}

export { News }