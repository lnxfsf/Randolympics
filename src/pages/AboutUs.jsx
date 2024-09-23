import { FooterClean } from "../components/FooterClean";
import { Navbar } from "../components/Navbar";
import { SeventhScreenHome } from "./Home/SeventhScreenHome";
import { SixthScreenHome } from "./Home/SixthScreenHome";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <SeventhScreenHome />
      <SixthScreenHome />
      <FooterClean />
    </>
  );
};

export { AboutUs };
