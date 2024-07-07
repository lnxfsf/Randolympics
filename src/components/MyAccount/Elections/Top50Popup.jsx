
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";



const Top50Popup = ({increaseRank, currentRank, decreaseRank, cancel, saveChanges }) => {









  return (
    <>
      <div className="m-4">
        <div className="flex gap-2 mb-2">
          <p>Current rank</p>
          <p>
            <b>{currentRank}</b>
          </p>
        </div>

        <div className="flex gap-2">
          <p>Update rank</p>

          <div className="flex justify-center items-center gap-2">
            <Button
              onClick={increaseRank}
              className="w-[15px]"
              style={{ marginTop: "0px", padding: "0px" }}
              sx={{
                height: "15px",
                bgcolor: "#fff",
                color: "#232323",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}
            >
              <span className="popins-font">+</span>
            </Button>
            <Button
              onClick={decreaseRank}
              className="w-[15px]"
              style={{ marginTop: "0px", padding: "0px" }}
              sx={{
                height: "15px",
                bgcolor: "#fff",
                color: "#232323",
                borderRadius: 15,
                border: `1px solid #AF2626`,
                "&:hover": {
                  background: "rgb(196, 43, 43)",
                  color: "white",
                  border: `1px solid rgb(196, 43, 43)`,
                },
              }}
            >
              <span className="popins-font">-</span>
            </Button>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 m-4">
          <Button
            onClick={cancel}
            className="w-[85px]"
            style={{ marginTop: "0px", padding: "0px" }}
            sx={{
              fontSize: "8pt",
              height: "30px",
              bgcolor: "#fff",
              color: "#232323",
              borderRadius: 15,
              border: `1px solid #fff`,
              "&:hover": {
                background: "rgb(196, 43, 43)",
                color: "white",
                border: `1px solid rgb(196, 43, 43)`,
              },
            }}
          >
            <span className="popins-font">Cancel</span>
          </Button>

          <Button
            onClick={saveChanges}
            className="w-[120px]"
            style={{ marginTop: "0px", padding: "0px" }}
            sx={{
              fontSize: "8pt",
              height: "30px",
              bgcolor: "#AF2626",
              color: "#fff",
              borderRadius: 15,
              border: `1px solid #AF2626`,
              "&:hover": {
                background: "rgb(196, 43, 43)",
                color: "white",
                border: `1px solid rgb(196, 43, 43)`,
              },
            }}
          >
            <span className="popins-font">Save changes</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export { Top50Popup };
