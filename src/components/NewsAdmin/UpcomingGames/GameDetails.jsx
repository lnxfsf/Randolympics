

import axios from "axios";
import { useEffect, useState } from "react";



let BACKEND_SERVER_BASE_URL =
    import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
    process.env.VITE_BACKEND_SERVER_BASE_URL;





const GameDetails = ({ post, onBack }) => {



    return (
        <>

            <div>
                <button onClick={onBack}>Back to list</button>
                <h1>{post.title}</h1>
                <h2>{post.subtitle}</h2>
                <p>{post.content}</p>
            </div>

        </>
    )

}


export { GameDetails }
