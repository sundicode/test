"use client"
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const AllTips = () => {
  const getAllTips = async () => {
    const { data } = await MedicksApi.get("/health");
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["tips"],
    queryFn: getAllTips,
  });

  if (isLoading) return <LoadingState />;
  console.log(data);

  return <div></div>;
};

export default AllTips;
