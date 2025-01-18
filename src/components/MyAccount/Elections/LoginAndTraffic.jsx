import Flag from "react-world-flags";
import { useState, useEffect, useRef } from "react";

const LoginAndTraffic = ({ row, index }) => {
  const nationality = row.nationality;
  const user_type = row.user_type;
  const numberOfLogins = row.numberOfLogins;

  const [userTypeText, setUserTypeText] = useState();




  useEffect(() => {
    functionSetUserTypeText();
  }, []);

  const functionSetUserTypeText = () => {
    if (user_type === "AH") {
      setUserTypeText("Athlete");
    } else if (user_type === "GP") {
      setUserTypeText("Global President");
    } else if (user_type === "NP") {
      setUserTypeText("National President");
    } else if (user_type === "EM") {
      setUserTypeText("Event Manager");
    } else if (user_type === "ITM") {
      setUserTypeText("IT Manager Page editor");
    } else if (user_type === "MM") {
      setUserTypeText("Marketing Manager");
    } else if (user_type === "SM") {
      setUserTypeText("Sales Manager");
    } else if (user_type === "VM") {
      setUserTypeText("Validation Manager");
    } else if (user_type === "LM") {
      setUserTypeText("Legal Manager");
    } else if (user_type === "RS") {
      setUserTypeText("Referee & Support");
    }
  };

  return (
    <>
      <tr key={index}>

        <td>{userTypeText}</td>

        <td className="">
          <Flag className="flag-photo-pass-verify  " code={nationality} />
        </td>

        <td>{numberOfLogins}</td>
      </tr>
    </>
  );
};

export { LoginAndTraffic };
