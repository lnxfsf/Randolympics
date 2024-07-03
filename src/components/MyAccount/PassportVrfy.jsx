import { HeaderMyProfile } from "./HeaderMyProfile";
import { PassVerify } from "./Elections/PassVerify";

import { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "@mkyy/mui-search-bar";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

const PassportVrfy = () => {
  // so, this is all users !
  const [listOfUsers, setListOfUsers] = useState([]);

  const [hasMoreListAllUsers, setHasMoreListAllUsers] = useState(true);

  const [listOfUsersPage, setlistOfUsersPage] = useState(1);

  // TODO, you will need to filter by user_type, obviously ! if it's "AH", "GP", so it's easier to verify their passports !
  // TODO , as well to put dropdown for what are you selecting "unverified" passports... possibly, there will be "verified", and stuff (for now, there put "All", so that means no filter for that one !). yea, makes sense
  // TODO, and maybe, you add gender filter.. but that later, only if he says we needs

  useEffect(() => {
    fetchlistOfUsers();
  }, [listOfUsersPage]);

  const fetchlistOfUsers = async () => {
    // yes, fetch all if there's no filter... ofc, it will fetch 10 by 10 (pages..)
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/auth/listAllUsers`,
        {
          params: {
            limit: 10,
            offset: (listOfUsersPage - 1) * 10,

            // user_type: selectedRole,  //! this is, for user_type ! we need this, to be able to filter it. if it's empty, then we don't put this filter in database, and fetch all of it !

            //  searchText: searchText,  // ! i ovo

            // ! nationality: nationality, // ! also by nationality as well (to easy filter out stuff... )

            // genderFilter: genderFilter, // ! i ovo kasnije..
            /*     categoryFilter: categoryFilter,  // */
          },
        }
      );
      setListOfUsers(response.data);

      console.log(response.data);

      // Check if we should switch to showing other users
      if (response.data.length < 10) {
        setHasMoreListAllUsers(false);
      } else {
        setHasMoreListAllUsers(true);
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };


  
  const handleNextPage = () => {
    if (hasMoreListAllUsers) {
        setlistOfUsersPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (listOfUsersPage > 1) {
        setlistOfUsersPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <HeaderMyProfile />

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-[15%]">Name</th>
              <th className="w-[13%]">Country</th>{" "}
              {/* ovo napravi kao flag !! lakse je !  (ionako moraš, da dodjes do toga, i dadneš mu  country_code, i prikazuje sa imenom, al sa slikom je bolje ionako...) */}
              <th className="w-[13%]">Role</th> {/* user_type */}
              <th className="w-[12%]">Passport status</th>{" "}
              {/* Passport status verification, polje u database */}
              <th className="w-[12%]">Account created</th>{" "}
              {/* imaš onaj "createdAt", to je od sequelize dolazi (kad je kreirao taj row..) */}
              <th className="w-[12%]">Passport uploaded</th>{" "}
              {/* znači, moraces da upises datum, kada uspesno sačuvas passport image ! (kad se upload-uje !) */}
              <th className="w-[12%]">Last Validated / rejected date</th>
            </tr>
          </thead>
          <tbody>
            {listOfUsers.map((user, index) => (
              <PassVerify user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-center mt-4">
        <button
    
          disabled={listOfUsersPage === 1}
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
        >
          Previous
        </button>
        <button
          disabled={!hasMoreListAllUsers}
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export { PassportVrfy };
