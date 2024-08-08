

import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";


const ItemCampaign = () => {

    const { campaignId } = useParams();
   const navigate = useNavigate();


    return (
        <>

        <p>{campaignId}</p>
        </>
    )

}

export {ItemCampaign}