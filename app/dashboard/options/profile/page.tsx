"use client";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
const Profile = () => {
  const adminProfile = async () => {
    const adminProfileInfo = await MedicksApi.get(`/admin/profile`);
    return adminProfileInfo.data?.admin;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: adminProfile,
  });

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorComponent message={error.message} status={500} />;
  return (
    <div className="w-full">
      <h1 className=" text-3xl font-semibold flex items-center">
        Option <BiChevronRight className="text-login-bg" /> Profile
      </h1>
      <div className="w-full h-[1px] bg-light"></div>

      <div className="w-[70%] mx-auto mt-24 flex gap-x-40">
        <div className="text-sm">
          <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Name:</span>
            <span>{data?.adminname}</span>
          </div>
          <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Email:</span>
            <span>{data?.email}</span>
          </div>
          {/* <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Name:</span>
            <span>Mary Jones</span>
          </div> */}
          <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Phone:</span>
            <span>{data?.phone}</span>
          </div>
          {/* <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Post</span>
            <span>Head</span>
          </div> */}
        </div>

        <div className="bg-light w-[40%] rounded-sm"></div>
      </div>
    </div>
  );
};

export default Profile;
