"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MedicksApi from "@/utils/axios";
import Image from "next/image";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const LogOut = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const logout = () => {
    setLoading(true);
    MedicksApi.get("/admin/logout")
      .then((res) => {
        toast.success("Log out SuccessFull");
        router.push("/signin");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-full flex justify-center items-center min-h-[80vh]">
      <div className="p-10 bg-primary text-sm text-white rounded flex gap-4 items-center min-h-[25vh]">
        <Image src={"/logo.svg"} alt="logo" height={200} width={200} />
        <div>
          <p className="font-bold mb-2">Confirm By clicking the button</p>

          {Loading ? (
            <ScaleLoader color="#2B33FF" className="mx-auto" />
          ) : (
            <button
              className="bg-orange-500 w-full font-bold text-lg py-4 rounded"
              onClick={() => logout()}
            >
              Click to LogOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogOut;
