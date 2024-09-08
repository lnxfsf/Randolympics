import React, { Component } from "react";

const RandomizeItem = ({ name }) => {
  /* let icon_url = "randomize/" + icon + ".svg"; */

  return (
    <>
      {/*   <div className="flex justify-center items-center gap-2 shadow-md p-3 rounded-lg cursor-pointer select-none ">
      */}
      <div className="flex justify-start items-start gap-2  " >

     {/*  mt-1 */}
       

        <p>{name}</p>

      </div>
      {/* 
      </div> */}


    </>
  );
};

export { RandomizeItem };
