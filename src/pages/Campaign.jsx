import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";
import { useNavigate } from 'react-router-dom';

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const Campaign = () => {
  const [campaigns, setCampaigns] = useState();

  const [campaignsPage, setCampaignsPage] = useState(1);
  const [hasMoreCampaigns, setHasMoreCampaigns] = useState(true);

  const [limit, setLimit] = useState(10);

  
  const navigate = useNavigate();


  useEffect(() => {
    updateLatestData();
  }, []);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listAllCampaigns`,
        {
          params: {
            limit: limit,
            offset: (campaignsPage - 1) * 10,
          },
        }
      );

      console.log(response.data);
      setCampaigns(response.data);
    } catch (e) {
      console.log(e.stack);
    }
  };

  return (
    <>
      <p className="text-3xl">List of all campaigns</p>

      {campaigns && (
        <>
          {campaigns.map((item, index) => (
            <>


              <div
                key={index}
                className="flex justify-between border-2 m-4 p-2 select-none cursor-pointer"

                onClick={() => navigate(`/campaign/${item.campaignId}`)}
              >
                <div>
                  <p>
                    <b>First name:</b> {item.friendName}
                  </p>
                  <p>
                    <b>Gender:</b>{" "}
                    {item.friendGender === "M" ? "Male" : "Female"}
                  </p>
                </div>

                <div>
                  <Flag className="w-12 m-4" code={item.friendNationality} />
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
};

export { Campaign };
