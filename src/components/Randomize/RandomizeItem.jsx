import React, { Component } from "react";

const RandomizeItem = ({ icon, name }) => {
  let icon_url = "randomize/" + icon + ".svg";

  return (
    <>
      {/*   <div className="flex justify-center items-center gap-2 shadow-md p-3 rounded-lg cursor-pointer select-none ">
      */}
      <div className="flex justify-center items-center gap-2 cursor-pointer select-none">
        <img src={icon_url} className="w-4 h-4 mt-1" />

        <p>{name}</p>
      </div>
      {/* 
      </div> */}


    </>
  );
};

export { RandomizeItem };
