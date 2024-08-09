import { NavbarHomeCollapsed } from "../NavbarHomeCollapsed";

import { useLocation } from "react-router-dom";

const RegisteredByFriend = () => {
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <>
      <NavbarHomeCollapsed />

     
      <div className="flex justify-center items-center mt-32">
       
       {email ? (
        <p>A password had been sent to <b>{email}</b>!</p>
       ) : (
        <p>No email provided</p>
       )}
        

      </div>


    </>
  );
};

export { RegisteredByFriend };
