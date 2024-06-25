import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { Button } from "@mui/material";

const Others = ({ rank, name, age, country, email, phone, user_type, index }) => {
  return (
    <>
      {/*ovo je ispod, samo da probas: border-b-2 border-red-500 */}

      {/* if user is NP, then show "edit field". so we can reuse this same component for all that... */}
      <tr key={index}>
        {user_type === "NP" ? (
          <>
            {/* <div className="flex justify-between items-center gap-2"> */}

            <td className="flex gap-2 justify-start">
              <div>
                <p>{rank}</p>
              </div>
              <div>
              {/*   <p className="cursor-pointer select-none text-gray_first">
                  Update Rank <img src="myaccount/pencil.svg" style={{width: "10px", height: "10px", display: "inline-block", marginBottom: "5px"}} />
                </p> */}
                <Popup
                  trigger={
                    <p className="cursor-pointer select-none text-gray_first">
                      Update Rank{" "}
                      <img
                        src="myaccount/pencil.svg"
                        style={{
                          width: "10px",
                          height: "10px",
                          display: "inline-block",
                          marginBottom: "5px",

                        }}
                      />
                    </p>
                  }
                  position="right center"
                  contentStyle={{ width: "auto" }}
                >
                  <div className="m-4">
                    <div className="flex gap-2 mb-2">
                      <p>Current rank</p>
                      <p>
                        <b>F1</b>
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <p>Update rank</p>

                      <div className="flex justify-center items-center gap-2">
                        <Button
                          /*   */
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
                          /*   */
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
                        /*   */
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
                        /*   */
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
                </Popup>
              </div>
            </td>
            {/* </div> */}
          </>
        ) : (
          <>
            {/* <div className="flex justify-between items-center gap-2"> */}
            <td className="flex gap-2 justify-start">
              <p>{rank}</p>
            </td>
            {/* </div> */}
          </>
        )}

        <td>{name}</td>
        <td>{age}</td>
        <td>{country}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>

      <tr><td colSpan="6"><hr /></td></tr>
      {/* <hr /> */}
    </>
  );
};

export { Others };
