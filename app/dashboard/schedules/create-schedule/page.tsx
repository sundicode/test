"use client";
import Button from "@/components/Button";
import cn from "@/utils/cn";
// import input from "@/components/Input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
type TSchedule = {
  date: string;
  time: string;
  maxNumber: string;
};
const CreateSchedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSchedule>();
  const handleCreateSchedule: SubmitHandler<TSchedule> = async (
    form: TSchedule
  ) => {
    console.log(form);
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
            </div>

            <Button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-white font-semibold"
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
