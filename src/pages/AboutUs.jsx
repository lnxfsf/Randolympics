import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { FourthScreenHome } from "./Home/FourthScreenHome";
import { SeventhScreenHome } from "./Home/SeventhScreenHome";
import { SixthScreenHome } from "./Home/SixthScreenHome";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <SeventhScreenHome />
      <FourthScreenHome />

      <SixthScreenHome />

     
      <Footer />
    </>
  );
};

export { AboutUs };
