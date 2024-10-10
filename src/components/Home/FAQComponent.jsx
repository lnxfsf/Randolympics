import React, { useState, useEffect } from "react";

import { Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ? expand more, arrow icon transformation

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "5px",

  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// ? expand more

const FAQComponent = ({title, content}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div>
       
        <div
          className={`flex justify-between items-center w-full bg-black text-white mt-4 ${
            expanded ? "rounded-t-lg" : "rounded-lg"
          }  bg-[#F7FAFA] pl-2 pr-2`}
        >
          
          <p
            expand={expanded}
            onClick={() => {
              setExpanded(!expanded);
            }}
            className="cursor-pointer select-none flex-grow pl-2 font-semibold  "
          >
           {title}
          </p>

          <ExpandMore
            expand={expanded}
            onClick={() => {
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>

        <div className="">
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="bg-[#F7FAFA] rounded-b-lg p-4  text-sm md:text-base">
              {content}
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export { FAQComponent };
