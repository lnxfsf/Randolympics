import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SearchBar from "@mkyy/mui-search-bar";

import { Button, Avatar } from "@mui/material";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { useTranslation } from "react-i18next";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const CreatedCampaigns = () => {
  const { t } = useTranslation();

  const [maxPages, setMaxPages] = useState(0);
  const [resultsAmount, setResultsAmount] = useState();

  const [campaigns, setCampaigns] = useState();
  const [campaignsPage, setCampaignsPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [searchFirstNameText, setSearchFirstNameText] = useState(""); //search box

  const [currentUserId, setCurrentUserId] = useState(() => {
    const storedData =
      localStorage.getItem("authTokens") ||
      sessionStorage.getItem("authTokens");

    if (storedData) {
      const userJson = JSON.parse(storedData);

      return userJson.data.userId;
    }
  });

  const handleSearch = (he) => {
    // Fired when enter button is pressed.
  };

  useEffect(() => {
    updateLatestData();
  }, [searchFirstNameText]);

  const handlePaginationChange = (event, value) => {
    setCampaignsPage(value);
  };

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/listCreatedCampaignsByUser`,
        {
          params: {
            limit: limit,
            offset: (campaignsPage - 1) * 10,

            currentUserId,

            searchFirstNameText: searchFirstNameText,
          },
        }
      );

      setMaxPages(Math.ceil(response.data.count / 10));
      setResultsAmount(response.data.count);

      setCampaigns(response.data.rows);

      console.log("campaigns for this user");
      console.log(response.data.rows);
    } catch (e) {
      console.log(e.stack);
    }
  };

  return <></>;
};

export { CreatedCampaigns };
