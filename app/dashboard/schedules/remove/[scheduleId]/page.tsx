"use client";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Schedule } from "../../update/[scheduleId]/page";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
const DeleteSchedule = ({ params }: { params: { scheduleId: string } }) => {
  const router = useRouter();
  const [Loading, setLoading] = useState<boolean>(false);
  const userRecord = async (id: string) => {
    const userRecodInfo = await MedicksApi.get(`/schedules/${id}`);
    return userRecodInfo.data as Schedule;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleUser", params.scheduleId],
    queryFn: () => userRecord(params.scheduleId),
  });
  const handleCreateSchedule = () => {
    MedicksApi.delete(`/schedules/${params.scheduleId}`)
      .then((res) => {
        setLoading(true);
        router.push("/dashboard/schedules/all-schedule");
        toast.success("Successfully deleted schedule");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (error) return <ErrorComponent message={error.message} status={500} />;
  if (Loading) return <LoadingState />;
  return (
    <div className="w-full min-h-[80vh] bg-light flex items-center justify-center">
      <div>
        <p className="font-bold text-xl">Confirm to Delete Schedule for</p>
        <div className=" w-full flex justify-center text-primary font-bold text-lg gap-4">
          <p>{new Date(data?.date!).toDateString()}</p>
          <p>{data?.time}</p>
        </div>

        <button
          className={twMerge(
            "w-full py-4 font-semibold rounded mt-3 text-orange-500 bg-primary",
            Loading && "hidden"
          )}
          onClick={handleCreateSchedule}
          disabled={Loading}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteSchedule;
