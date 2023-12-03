"use client";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { TPatient } from "../page";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
import Modal from "@/components/modal";
import { BiDownload } from "react-icons/bi";
const Single = ({ params }: { params: { matricule: string } }) => {
  const userRecord = async (matricule: string) => {
    const userRecodInfo = await MedicksApi.get(
      `/schedules/users/schedule/${matricule}`
    );
    return userRecodInfo.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["singleUser", params.matricule],
    queryFn: () => userRecord(params.matricule),
  });
  function downloadMedicals(link: string) {
    const linkTag = document.createElement("a");
    linkTag.href = link;
    const filename = link.split("/")[3].split("-")[1];
    linkTag.setAttribute("download", filename);
    document.body.append(linkTag);
    linkTag.click();
    linkTag.remove();
  }
  function downloadSchoolfees(link: string) {
    const linkTag = document.createElement("a");
    linkTag.href = link;
    const filename = link.split("/")[3].split("-")[1];

    linkTag.setAttribute("download", filename);
    document.body.append(linkTag);
    linkTag.click();
    linkTag.remove();
  }
  if (error) return <ErrorComponent message={error.message} status={500} />;
  if (isLoading) return <LoadingState />;
  return (
    <div className="p-1 relative">
      <h1 className=" text-3xl font-semibold">{data?.user?.username}</h1>
      <div className="w-full h-[1px] bg-light"></div>
      <div className="w-full flex justify-center items-center min-h-[70vh] flex-col">
        <div className="w-full mx-auto mt-6 flex gap-x-40 px-[5rem] items-center">
          <div className="text-md w-[40%]">
            <div className="border-b  p-4 flex gap-x-3">
              <span>Name:</span>
              <span className="font-semibold">{data?.user?.username}</span>
            </div>
            <div className="border-b p-4 flex gap-x-3">
              <span>Email:</span>
              <span className="font-semibold">{data?.user?.email}</span>
            </div>
            <div className="border-b p-4 flex gap-x-3">
              <span>Matricule:</span>
              <span className="font-semibold">{data?.user?.matricule}</span>
            </div>
            <div className="border-b p-4 flex gap-x-3">
              <span>Department:</span>
              <span className="font-semibold">{data?.user?.department}</span>
            </div>
          </div>

          <div className="w-[50%] flex gap-y-16 flex-col">
            <div className=" h-[300px] flex flex-col gap-y-4">
              {data?.user?.userInfo?.schoolfeeReciet && (
                <>
                  <div className="">
                    <iframe
                      src={`https://docs.google.com/gview?url=${data?.user?.userInfo?.schoolfeeReciet}&embedded=true`}
                      className="w-full h-[250px]"
                    ></iframe>
                  </div>
                  <button
                    className="bg-primary py-3 px-5 rounded text-white font-bold w-full flex justify-center items-center capitalize gap-x-2"
                    onClick={() =>
                      downloadSchoolfees(data?.user?.userInfo?.schoolfeeReciet)
                    }
                  >
                    schoolfee Reciet <BiDownload size={17} />
                  </button>
                </>
              )}
            </div>
            <div className="h-[300px] flex flex-col gap-y-4">
              <div>
                {data?.user?.userInfo?.medicalReciet && (
                  <iframe
                    src={`https://docs.google.com/gview?url=${data?.user?.userInfo?.medicalReciet}&embedded=true`}
                    className="w-full h-[250px]"
                  ></iframe>
                )}
              </div>
              <button
                className="bg-primary py-3 px-5 rounded text-white font-bold w-full flex justify-center items-center  capitalize gap-x-2"
                onClick={() =>
                  downloadSchoolfees(data?.user?.userInfo?.schoolfeeReciet)
                }
              >
                medical Reciet
                <BiDownload size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
