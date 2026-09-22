"use client";

import React from "react";
import { BsFillBuildingsFill } from "react-icons/bs";

interface HeaderTextProps {
  headerText: string;
  headerText2?: string;
  headerText3?: string;
  emailText?: string;
}

export default function HeaderText({
  headerText,
  headerText2,
  headerText3,
  emailText,
}: HeaderTextProps) {
  return (
    <div className="text-center py-6 space-y-2">
      {(headerText || headerText2) && (
        <h2 className="text-2xl sm:text-3xl font-extrabold mx-auto text-base-content tracking-tight px-4">
          {headerText} {headerText2 && <span className="text-[#38B6FF]">{headerText2}</span>}
        </h2>
      )}
      {headerText3 && (
        <p className="text-xs sm:text-sm text-base-content/70 mx-auto max-w-xl px-4 leading-relaxed font-medium">
          {headerText3}
        </p>
      )}
      {emailText && (
        <p className="text-xs text-base-content/90 font-bold mx-auto truncate px-4">
          {emailText}
        </p>
      )}
      <div className="inline-flex items-center justify-center w-full relative pt-2">
        <hr className="h-px my-4 bg-base-content/15 w-[50%] max-w-xs mx-auto border-0" />
        <span className="absolute px-3 py-1 bg-base-200/90 backdrop-blur-sm text-base-content rounded-xl shadow-sm border border-base-content/10">
          <BsFillBuildingsFill className="text-base text-[#38B6FF] my-0.5" />
        </span>
      </div>
    </div>
  );
}
