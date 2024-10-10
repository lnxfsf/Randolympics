import React, { Component } from "react";
import { useTranslation } from "react-i18next";

const RandomizeItem = ({ name, translatedName }) => {
  const { t } = useTranslation();

  /* let icon_url = "randomize/" + icon + ".svg"; */

  // let translatedName = "sport1";


  return (
    <>
      {/*   <div className="flex justify-center items-center gap-2 shadow-md p-3 rounded-lg cursor-pointer select-none ">
       */}
      <div className="flex justify-start items-start gap-2  ">
        {/*  mt-1 */}

        {translatedName ? (
          <>
            <p>{t(`sports.${translatedName}`)}</p>
          </>
        ) : (
          <>
            <p>{name}</p>
          </>
        )}
      </div>
      {/* 
      </div> */}
    </>
  );
};

export { RandomizeItem };
