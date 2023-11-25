import { toast } from "react-toastify";
import MedicksApi from "./axios";

export const deleteSchedule = async (id: string) => {
  MedicksApi.delete(`/schedules/${id}`)
    .then((res)=>{
        toast.success("")
    })
    .catch(() => {})
    .finally(() => {});
};


export const updateSchedule = async (id: string) => {
  MedicksApi.delete(`/schedules/${id}`)
    .then()
    .catch(() => {})
    .finally(() => {});
};
