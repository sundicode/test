"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MedicksApi from "@/utils/axios";
import Image from "next/image";
import React from "react";

const LogOut = () => {
  const router = useRouter();
  const logout = () => {
    MedicksApi.get("/admin/logout")
      .then((res) => {
        toast.success("Log out SuccessFull");
        router.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
      });
    console.log("logout");
  };
  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="p-10 bg-primary text-sm text-white rounded flex gap-4 items-center min-h-[25vh]">
        <Image src={"/logo.svg"} alt="logo" height={200} width={200} />
        <div>
          <p className="font-bold mb-2">Confirm By clicking the button</p>
          <button
            className="bg-orange-500 w-full font-bold text-lg py-4 rounded"
            onClick={() => logout()}
          >
            Click to LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
