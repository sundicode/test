"use client";

import React, { FormEvent, useEffect, useState } from "react";
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
import { twMerge } from "tailwind-merge";
export type Schedule = {
  time: string;
  date: string;
  numberOfPatients: string;
};
const UpdateScedule = ({ params }: { params: { scheduleId: string } }) => {
  const router = useRouter();
  const [ScheduleData, setUpdatedSchedule] = useState({
    date: "",
    time: "",
    maxNumber: "",
  });
  const userRecord = async (id: string) => {
    const userRecodInfo = await MedicksApi.get(`/schedules/${id}`);
    setUpdatedSchedule({
      time: userRecodInfo?.data?.time,
      date: userRecodInfo?.data?.date,
      maxNumber: userRecodInfo?.data?.numberOfPatients,
    });
    return userRecodInfo.data as Schedule;
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleUser", params.scheduleId],
    queryFn: () => userRecord(params.scheduleId),
  });
  const [Loading, setLoading] = useState<boolean>(false);

  const handleCreateSchedule = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    MedicksApi.patch(`/schedules/${params.scheduleId}`, ScheduleData)
      .then((res) => {
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
              onSubmit={handleCreateSchedule}
            >
              <div className="flex flex-col gap-y-2">
                <label htmlFor="">Date</label>
                <input
                  type="date"
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                  placeholder="date"
                  value={ScheduleData.date}
                  onChange={(e) =>
                    setUpdatedSchedule({
                      ...ScheduleData,
                      date: e.target.value,
                    })
                  }
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
                  value={ScheduleData.time}
                  onChange={(e) =>
                    setUpdatedSchedule({
                      ...ScheduleData,
                      time: e.target.value,
                    })
                  }
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
                  value={ScheduleData.maxNumber}
                  onChange={(e) =>
                    setUpdatedSchedule({
                      ...ScheduleData,
                      maxNumber: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                className={twMerge(
                  "w-full py-3 px-4 bg-primary text-white font-semibold",
                  Loading && "hidden"
                )}
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
