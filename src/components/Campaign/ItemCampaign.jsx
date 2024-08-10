import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Flag from "react-world-flags";

import "../../styles/campaign.scoped.scss";

import { useParams, useNavigate } from "react-router-dom";

let BACKEND_SERVER_BASE_URL =
  import.meta.env.VITE_BACKEND_SERVER_BASE_URL ||
  process.env.VITE_BACKEND_SERVER_BASE_URL;

let FRONTEND_SERVER_BASE_URL =
  import.meta.env.VITE_FRONTEND_SERVER_BASE_URL ||
  process.env.VITE_FRONTEND_SERVER_BASE_URL;

function formatDate(dateString) {
  let date = new Date(dateString);
  let options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

const ItemCampaign = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const urlForCampaign = `${FRONTEND_SERVER_BASE_URL}/campaign/${campaignId}`;

  const [campaign, setCampaign] = useState();
  const [athlete, setAthlete] = useState();

  const [textAthleteStatus, setTextAthleteStatus] = useState();

  const [supporterName, setSupporterName] = useState();
  const [supporterEmail, setSupporterEmail] = useState();

  useEffect(() => {
    updateLatestData();
  }, []);

  const updateLatestData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_SERVER_BASE_URL}/listsData/campaignDetails`,
        {
          params: {
            campaignId: campaignId,
          },
        }
      );

      console.log(response.data.oneCampaign);
      console.log(response.data.thatAthlete);

      setCampaign(response.data.oneCampaign);
      setAthlete(response.data.thatAthlete);

      if (response.data.thatAthlete) {
        switch (response.data.thatAthlete.athleteStatus) {
          case "s1":
            setTextAthleteStatus("Has not logged in yet");
          case "s2":
            setTextAthleteStatus("Logged in but no status");
          case "s3":
            setTextAthleteStatus("I'm 99% taking the challenge and going");
          case "s4":
            setTextAthleteStatus("I'm most likely going");
          case "s5":
            setTextAthleteStatus("I'm maybe going");
          case "s6":
            setTextAthleteStatus("I'm definitely not going");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {campaign && athlete && (
        <>
          <div className="flex">
            <div className="flex flex-col basis-1/2 p-16 pr-0">
              <img
                className="w-32 mb-8"
                src={
                  BACKEND_SERVER_BASE_URL +
                  "/imageUpload/profile_pics/" +
                  athlete.picture
                }
              />

              <hr className=" mb-8" />

              <p>{campaignId}</p>

              <p>Gender: {athlete.gender === "M" ? "Male" : "Female"}</p>
              <p className="mb-12">
                Birthdate: {formatDate(athlete.birthdate)}
              </p>

              <p>Weight: {athlete.weight}</p>

              <p>Email: {athlete.email}</p>

              <p>Phone: {athlete.phone}</p>

              <p>Crypto: {athlete.cryptoaddress}</p>
            </div>

            <p class="vertical-text text-lg text-blue-500 underline text-red_first">
              {textAthleteStatus}
            </p>

            <div className="flex basis-1/2 flex-col ml-8">
              <div className="flex justify-center text-4xl mt-14">
                {athlete.name}

                <div className="flex flex-col justify-center pl-4">
                  <Flag className="flag-photo" code={athlete.nationality} />
                </div>
              </div>

              <hr />
              <p className="text-2xl">Athlete statement</p>

              <p>{athlete.athleteStatement}</p>

              <div className="flex justify-around">
                <p className="text-2xl">Supporters</p>
                <p className="underline decoration-red_first text-red_first">
                  missing field in database, for <b>athlete user</b>
                </p>
              </div>

              <p className="underline decoration-red_first text-red_first">
                show 3-4 latest comments from supporters. Make a call to BE
              </p>

              <div className="flex justify-around">
                <p className="text-2xl">Money raised</p>
                <p className="">{athlete.donatedAmount / 100} $</p>
              </div>

              <div className="flex justify-around">
                <p className="text-2xl">Campaign stats</p>
                <p className="underline decoration-red_first text-red_first">
                  further explanation needed
                </p>
              </div>

              <p className="underline mt-4 flex justify-center">
                Help {athlete.name} improve{" "}
                {athlete.gender === "M" ? "his" : "her"} stats !
              </p>

              <a
                href={urlForCampaign}
                target="_blank"
                className="underline mt-4 flex justify-center"
              >
                Share campaign
              </a>

              <div className="border-2">
                <div className="flex justify-center items-center flex-col">
                  <p>Supporter info</p>

                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Supporter name"
                      value={supporterName}
                      onChange={(event) => {
                        setSupporterName(event.target.value);
                      }}
                    />

                    <input
                      type="text"
                      placeholder="Supporter email"
                      value={supporterEmail}
                      onChange={() => {
                        setSupporterEmail(event.target.value);
                      }}
                    />
                  </div>

                  <p className="text-red_first text-sm w-[50%]">
                    if supporter (others) are donating to here, they don't need
                    account (and they don't get one). these fields are
                    optional.. (for transaction)
                  </p>




                      






                </div>

                <p className="underline mt-4 flex justify-center">Donate</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { ItemCampaign };
