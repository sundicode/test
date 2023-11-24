"use client";
import MedicksApi from "@/utils/axios";
import Image from "next/image";
import React from "react";
import { BiBell, BiMoon, BiSearch, BiTime } from "react-icons/bi";
const adminProfile = async () => {
  const adminProfileInfo = await MedicksApi.get(`/admin/profile`);
  return adminProfileInfo.data?.admin;
};
const Navbar = () => {
  return (
    <header className="bg-secondary p-4 w-full flex justify-between text-sm pr-16 relative">
      <Image src="/logo.svg" alt="logo" width={100} height={100} />
      <div className="flex items-end gap-x-20">
        <div className="flex items-center gap-x-10">
          <div className="flex items-center bg-white rounded-[30px] h-[30px] px-3">
            <BiSearch className="text-gray-500" />
            <input
              className="rounded-[30px] py-[.1rem] bg-transparent focus:outline-none"
              placeholder="search"
            />
          </div>
          <div className="flex gap-x-2 text-white text-md">
            <BiBell />
            <BiTime />
            <BiMoon />
          </div>
        </div>
        <div></div>
        <div className="relative">
          <div className="w-[90px] h-[90px] rounded-full bg-white absolute right-6 -top-9 flex justify-center items-center">
            <div className="w-[80px] h-[80px] rounded-full border-[10px] border-accent">
              
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
