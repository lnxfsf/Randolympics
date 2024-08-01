



import "../../../styles/news.scoped.scss"
import { ItemEconomicsNewsBlock } from "./ItemEconomicsNewsBlock"

import { useNavigate } from 'react-router-dom';






const EconomicsNewsBlock = () => {

    const navigate = useNavigate();

    // nece prikazati on , ima on unutra.. ako nema taj item.. 

    return (<>

        <ItemEconomicsNewsBlock number={0} />
        <ItemEconomicsNewsBlock number={1} />
        <ItemEconomicsNewsBlock number={2} />


        <div className="flex gap-4 cursor-pointer select-none mt-6 mb-16" onClick={() => { navigate("/news/economics") }}>


            <p className="text-red_first text-lg font-medium">Read more</p>
            <img className="w-4 " src="news/arrow_down.svg" />

        </div>


    </>)





}

export { EconomicsNewsBlock }