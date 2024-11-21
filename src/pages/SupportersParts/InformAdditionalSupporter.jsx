import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import {useState} from "react";



const InformAdditionalSupporter = ({
  additionalSupportersFormData,

  handleInputChange,
  removeInputSet,
  addInputSet,

  inputLabelPropsTextField,
  sxTextField,
}) => {
  const { t } = useTranslation();

  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <>
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
              htmlFor="name"
              className="lexend-font mb-1 mt-1 font-medium text-sm"
            >
              {t('campaign.content1')}
            </label>
            <TextField
              value={data.name}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="John"
              name="name"
              type="text"
              inputProps={{
                maxLength: 255,
              }}
              InputLabelProps={inputLabelPropsTextField}
              sx={sxTextField}
            />

            <label
              htmlFor="email"
              className="lexend-font mb-1 mt-1 font-medium text-sm"
            >
              {t('campaign.content2')}
            </label>
            <TextField
              value={data.email}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="johndoe@gmail.com"
              type="email"
              name="email"
              inputProps={{
                maxLength: 255,
              }}
              InputLabelProps={inputLabelPropsTextField}
              sx={sxTextField}
            />
          </div>
        ))}

        <Button
         disabled={isDisabled}
          onClick={() => {
            addInputSet(); 

            setIsDisabled(true);

            setTimeout(() => {
              setIsDisabled(false);
            }, 500);
            

          }}
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
          <span className="lexend-font text-[#D24949]">
            {" "}
            {t('campaign.content3')}
          </span>
        </Button>
      </div>
    </>
  );
};

export { InformAdditionalSupporter };
