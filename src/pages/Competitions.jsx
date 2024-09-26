import { FooterClean } from "../components/FooterClean";
import { GridOfSportsHome } from "../components/Home/GridOfSportsHome";
import { Navbar } from "../components/Navbar";

const Competitions = () => {
  return (
    <>
      <Navbar />

      <div className="lexend-font text-black_second m-8">
        
        <div >
          <p className="text-4xl ">Sports</p>
          <p className="text-xl mt-4">Explained</p>
          <p>Click on any, to open details about sport</p>
        </div>

        <div className="flex justify-center items-center w-full">
          <GridOfSportsHome />
        </div>
      </div>

      <FooterClean />
    </>
  );
};

export { Competitions };
