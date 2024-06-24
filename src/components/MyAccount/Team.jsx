import { HeaderMyProfile } from "./HeaderMyProfile";

/*


- team, treba da bude kao (u database) : 

A ako nisu prosli, onda NULL, i on nije u nijedan tim... (taj korisnik trenutni... )



f , Female , koji su prošli..
M+ , Male Heavy 





*/

//we display it as fragment, inside MyProfile...

const Team = () => {
  return (
    <>
      <HeaderMyProfile />

      <div className="flex">
        <p>Team</p>
      </div>
    </>
  );
};

export { Team };
