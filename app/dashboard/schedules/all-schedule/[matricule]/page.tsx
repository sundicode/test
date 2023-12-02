"use client";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TPatient } from "../page";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
const Single = ({ params }: { params: { matricule: string } }) => {
  const userRecord = async (matricule: string) => {
    const userRecodInfo = await MedicksApi.get(`/schedules/users/${matricule}`);
    return userRecodInfo.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleUser", params.matricule],
    queryFn: () => userRecord(params.matricule),
  });
  const [Pages, setPages] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setPages(numPages);
  }
  if (error) return <ErrorComponent message={error.message} status={500} />;
  if (isLoading) return <LoadingState />;
  console.log(data);

  return (
    <div className="p-1">
      <h1 className=" text-3xl font-semibold">{data?.user?.username}</h1>
      <div className="w-full h-[1px] bg-light"></div>
      <div className="w-full flex justify-center items-center min-h-[70vh] flex-col">
        <div className="w-[70%] mx-auto mt-6 flex gap-x-40">
          <div className="text-md">
            <div className="border-b  p-4 flex gap-x-3">
              <span>Name:</span>
              <span className="font-semibold">{data?.user?.username}</span>
            </div>
            <div className="border-b w-[200px] p-4 flex gap-x-3">
              <span>Email:</span>
              <span className="font-semibold">{data?.user?.email}</span>
            </div>
            <div className="border-b w-[200px] p-4 flex gap-x-3">
              <span>Matricule:</span>
              <span className="font-semibold">{data?.user?.matricule}</span>
            </div>
            <div className="border-b w-[200px] p-4 flex gap-x-3">
              <span>Department:</span>
              <span className="font-semibold">{data?.user?.department}</span>
            </div>
          </div>

          <div className="bg-light w-[40%] rounded-sm flex gap-10">
            <div className="bg-primary w-[50%]">
            <iframe src={data.user.userInfo?.medicalReciet} className=""></iframe>
            </div>
            <div className="bg-red-200 w-[50%]">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
