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
        <h2 className="text-xl md:text-2xl font-bold mx-auto text-base-content">
          {headerText}
        </h2>
      )}
      {headerText2 && (
        <h2 className="text-xl md:text-2xl font-bold mx-auto text-base-content">
          {headerText2}
        </h2>
      )}
      {headerText3 && (
        <h3 className="text-xs font-bold text-base-content/70 mx-auto">
          {headerText3}
        </h3>
      )}
      {emailText && (
        <h3 className="text-xs text-base-content/90 font-bold mx-auto truncate px-2">
          {emailText}
        </h3>
      )}
      <div className="inline-flex items-center justify-center w-full relative pt-2">
        <hr className="h-px my-4 bg-base-content/20 w-[60%] mx-auto border-base-content/20 border" />
        <span className="absolute px-3 py-1 bg-base-200/80 backdrop-blur-sm text-base-content rounded-xl shadow-sm">
          <BsFillBuildingsFill className="text-lg my-1" />
        </span>
      </div>
    </div>
  );
}
