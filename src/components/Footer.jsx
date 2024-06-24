import "../styles/footer.scoped.scss";
import { Button } from "@mui/material";


import { useNavigate } from "react-router-dom";


const Footer = () => {


  const navigate = useNavigate();


  
  const handleToMainHome = () => {
    navigate("/home");
  };


  return (
    <>
      <div>
        <div className="fuuter flex">
          <div className="basis-1/2">
            <div className="basis-1/2 flex-col wrap ">
              <h1 className="pt-20 pl-16 text-4xl	" style={{ color: "#ffffff" }}>
                Ready to get started ?
              </h1>

       
              <Button
                onClick={handleToMainHome}
                className="w-56 "
                style={{ marginTop: "20px", marginLeft: "64px" }}
                sx={{
                  height: "60px",
                  bgcolor: "#fff",
                  color: "#000",
                  borderRadius: 25,
                  border: `1px solid #FFF`,
                  "&:hover": {
                    background: "rgb(255, 255, 255)",
                    color: "black",
                    border: `1px solid rgb(255, 255, 255)`,
                  },
                }}
                id="join-the-fun-btn"
              >
                <span className="popins-font">Join the fun</span>
              </Button>

              <img className="pt-16 pl-16 w-64 	" src="footer/logo_footer.svg" />

              <div className="flex pl-16 gap-2">
                <img className="pt-8  w-32" src="footer/app_store.svg" />
                <img className="pt-8  w-32 " src="footer/google_play.svg" />
              </div>
            </div>
          </div>

          <div className="basis-1/2 flex-col wrap footer-basic">
            <div className="footer_img">
              <img className="main_img" src="footer/footer_img.png" />
            </div>

            <div className="social">
              <a id="facebook" href="#">
                <i
                  className="bx bxl-facebook bx-tada-hover"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>

              <a id="insta" href="#">
                <i
                  className="bx bxl-linkedin bx-tada-hover"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>

              <a id="twitter" href="#">
                <i
                  className="bx bxl-twitter bx-tada-hover"
                  style={{ color: "#ffffff" }}
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { Footer };
