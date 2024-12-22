import { useEffect } from "react";
import { FooterClean } from "../components/FooterClean";
import { Navbar } from "../components/Navbar";
import { NavbarClean } from "../components/NavbarClean";

const ToS = () => {


  useEffect(()=>{

    const hash = window.location.hash;
    if(hash === "#termsof"){
      const element = document.getElementById("termsof");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      
    }
  },[])



  return (
    <>
     
      <Navbar />

      <div className="m-8">
       

       
     
      </div>

      <FooterClean />
    </>
  );
};

export { ToS };
