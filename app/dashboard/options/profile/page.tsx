"use client";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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

  console.log(data);

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
          <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Phone:</span>
            <span>{data?.phone}</span>
          </div>
          <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Post:</span>
            <span>{data?.post}</span>
          </div>
          <div className="border-b w-[200px] p-4 flex gap-x-3">
            <span>Address:</span>
            <span>{data?.address}</span>
          </div>
        </div>
        {data.image ? (
          <Image src={data?.image} alt="image" width={400} height={100} />
        ) : (
          <div className="bg-light w-[40%] rounded-sm"></div>
        )}
      </div>
    </div>
  );
};

export default Profile;
