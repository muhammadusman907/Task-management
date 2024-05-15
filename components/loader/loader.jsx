"use client"
import React from "react";
const Loader = (classAdd) => {
  return (
    <>
      <div className={`${classAdd} flex h-[100%] w-[100%] justify-center items-center fixed z-50 loader top-0`}>
        <div
          className={`flex items-center justify-center loader-child h-[100px] w-[100px] p-20 rounded-md`}
        >
          <div className="rounded-md h-12 w-12 border-4 border-t-4 border-gray-500 animate-spin absolute z-10" />
        </div>
      </div>
    </>
  );
};

export default Loader;