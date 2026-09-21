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
    <div className="text-center py-6 space-y-1">
      {headerText && (
        <h2 className="text-xl md:text-2xl font-bold mx-auto text-black">
          {headerText}
        </h2>
      )}
      {headerText2 && (
        <h2 className="text-xl md:text-2xl font-bold mx-auto text-black">
          {headerText2}
        </h2>
      )}
      {headerText3 && (
        <h3 className="text-xs font-bold text-black/70 mx-auto">
          {headerText3}
        </h3>
      )}
      {emailText && (
        <h3 className="text-xs text-black/90 font-bold mx-auto truncate px-2">
          {emailText}
        </h3>
      )}
      <div className="inline-flex items-center justify-center w-full relative pt-2">
        <hr className="h-px my-4 bg-white/40 w-[60%] mx-auto border-white/60 border" />
        <span className="absolute px-3 py-1 bg-white/40 backdrop-blur-sm text-black rounded-xl shadow-sm">
          <BsFillBuildingsFill className="text-lg my-1" />
        </span>
      </div>
    </div>
  );
}
