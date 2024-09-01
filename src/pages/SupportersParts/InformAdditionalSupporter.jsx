

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const InformAdditionalSupporter = ({
    additionalSupportersFormData,
    
    handleInputChange,
    removeInputSet,
    addInputSet,

    inputLabelPropsTextField,
    sxTextField,



}) => {
  
  
  
  return (<>
    
    <div className="flex flex-col justify-start w-full">

                {additionalSupportersFormData.map((data, index) => (
                  <div
                    className="flex flex-col items-start justify-center"
                    key={index}
                    style={{ marginBottom: "10px" }}
                  >
                   
                    <button 
                      className="self-end m-4"
                      type="button"
                      onClick={() => removeInputSet(index)}
                    >
                      <img src="supporters/trash.svg" />
                    </button>




                    <label
                    htmlFor="theirName"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    Their Name *
                  </label>
                    <TextField
                      
                      value={data.name}
                      onChange={(event) => handleInputChange(index, event)}
                   
                      placeholder="John"
                      name="theirName"
                      type="text"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />



<label
                    htmlFor="theirEmail"
                    className="lexend-font mb-1 mt-1 font-medium text-sm"
                  >
                    Their Email (optional)
                  </label>
                    <TextField
                      
                  
                      value={data.email}
                      onChange={(event) => handleInputChange(index, event)}
                    
                      placeholder="johndoe@gmail.com"
                      type="email"
                      name="theirEmail"
                      inputProps={{
                        maxLength: 255,
                      }}
                      InputLabelProps={inputLabelPropsTextField}
                      sx={sxTextField}
                    />

                

                   
                  </div>
                ))}



                <Button
                    onClick={addInputSet}
                    className="w-full md:w-50%"
                    style={{ textTransform: "none" }}
                    sx={{
                      height: "50px",
                      bgcolor: "#FFEAEA",

                      color: "#fff",
                      borderRadius: 3,
                      border: `1px solid #FFEAEA`,
                      "&:hover": {
                        background: "#FFEAEA",
                        color: "white",
                        border: `1px solid rgba(210, 73, 73, 1)`,
                      },
                    }}
                    id="join-the-fun-btn"
                  >
                    <img src="supporters/plus_sign.svg" className="mr-2" />{" "}
                    <span className="lexend-font text-[#D24949]"> Add Another Supporter</span>
                  </Button>







              </div>
    </>)

}

export {InformAdditionalSupporter}