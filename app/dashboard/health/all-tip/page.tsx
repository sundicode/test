"use client";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

const AllTips = () => {
  const getAllTips = async () => {
    const { data } = await MedicksApi.get("/health");
    return data?.tips;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["tips"],
    queryFn: getAllTips,
  });

  type Ttip = {
    id: string;
    description: string;
    slug: string;
    title: string;
    image: string;
    createdAt: string;
  };

  if (isLoading) return <LoadingState />;
  return (
    <div className=" min-h-[70vh] overflow-x-hidden overflow-y-scroll flex flex-col gap-y-7">
      {data.map((tip: Ttip) => (
        <div key={tip.id} className="bg-light rounded p-16">
          {/* <Image src={tip.image} alt={tip.image} width={400} height={500} /> */}
          <h1>{tip.title}</h1>
          {`${tip.description}`}
        </div>
      ))}
    </div>
  );
};

export default AllTips;
