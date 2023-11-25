"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TSchedule } from "../../create-schedule/page";
import { useRouter } from "next/navigation";
import MedicksApi from "@/utils/axios";
import { toast } from "react-toastify";
import cn from "@/utils/cn";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
type Schedule = {
  time: string;
  date: string;
  numberOfPatients: string;
};
const UpdateScedule = ({ params }: { params: { scheduleId: string } }) => {
  const userRecord = async (id: string) => {
    const userRecodInfo = await MedicksApi.get(`/schedules/${id}`);
    return userRecodInfo.data as Schedule;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleUser", params.scheduleId],
    queryFn: () => userRecord(params.scheduleId),
  });

  const [Loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TSchedule>({
    defaultValues: {
      date: data?.date,
      time: data?.time,
      maxNumber: data?.numberOfPatients,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const router = useRouter();

  const handleCreateSchedule: SubmitHandler<TSchedule> = (data: TSchedule) => {
    MedicksApi.patch(`/schedules/${params.scheduleId}`, data)
      .then((res) => {
        setLoading(true);
        router.push("/dashboard/schedules/all-schedule");
        toast.success("Successfully updated schedule");
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
  if (isLoading) return <LoadingState />;
  return (
    <div>
      <div className="p-2">
        <h1 className=" text-3xl font-semibold">Update Schedule</h1>
        <div className="w-full h-[1px] bg-light">
          <div className="w-full flex items-center justify-center mt-5 min-h-[70vh]">
            <form
              className="w-[35%] flex flex-col gap-y-3 text-sm"
              onSubmit={handleSubmit(handleCreateSchedule)}
            >
              <div className="flex flex-col gap-y-2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                  placeholder="date"
                  {...register("date")}
                  value={data?.date}
                />
                {errors?.date ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.date?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="">Time</label>
                <input
                  type="time"
                  placeholder="time"
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                  {...register("time")}
                  value={data?.time}
                />
                {errors?.time ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.time?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="">Number Of Patients</label>
                <input
                  type="bumber"
                  placeholder="number of patients"
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                  {...register("maxNumber")}
                  value={data?.numberOfPatients}
                />
                {errors?.maxNumber ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.maxNumber?.message}
                  </p>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-white font-semibold"
                disabled={Loading}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateScedule;
