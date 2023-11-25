"use client";
import Button from "@/components/Button";
import MedicksApi from "@/utils/axios";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
export type TSchedule = {
  date: string;
  time: string;
  maxNumber: string;
};
const CreateSchedule = () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<TSchedule>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const router = useRouter();
  const handleCreateSchedule: SubmitHandler<TSchedule> = (data: TSchedule) => {
    MedicksApi.post("/schedules/create", data)
      .then((res) => {
        setLoading(true);
        router.push("/dashboard/schedules/all-schedule");
        toast.success("Successfully created schedule");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-2">
      <h1 className=" text-3xl font-semibold">Create A Schedule</h1>
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
  );
};

export default CreateSchedule;
