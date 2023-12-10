"use client";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const AllTips = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
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
  const deleteTip = (id: string) => {
    MedicksApi.delete(`/health/${id}`)
      .then((res) => {
        setLoading(true);
        router.push("/dashboard/health/all-tip");
        toast.success("Successfully deleted tip");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (isLoading) return <LoadingState />;

  return (
    <div className=" min-h-[70vh] overflow-x-hidden overflow-y-scroll flex flex-col gap-y-7">
      {data?.map((tip: Ttip) => (
        <div key={tip.id} className="bg-light rounded p-8">
          {/* <Image src={tip.image} alt={tip.image} width={400} height={500} /> */}
          <h1>{tip.title}</h1>
          {`${tip.description.slice(3).slice(0, -4)}`}
          <button
            onClick={() => deleteTip(tip.id)}
            className="text-red border-0 cursor-pointer"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllTips;
