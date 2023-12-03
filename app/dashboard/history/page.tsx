"use client";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { BiEdit, BiTrash } from "react-icons/bi";

type TUser = {
  id: string;
  username: string;
  matricule: string;
  email: string;
  department: string;
};

export type TPatient = {
  id: string;
  userInfo: TUser;
  medicalReciet: string;
  schoolfeeReciet: string;
};

type TSchedule = {
  id: string;
  patient: [];
  numberOfPatients: number;
  date: string;
  time: string;
};
const ScheduleHistory = () => {
  const getHistotychedules = async () => {
    const res = await MedicksApi.get("/schedules/history");
    return res.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: getHistotychedules,
  });
  const router = useRouter();
  const handleClick = (matricule: string) => {
    router.push(`/dashboard/schedules/all-schedule/${matricule}`);
  };
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorComponent message={error.message} status={500} />;
  return (
    <div className="w-full">
      <h1 className=" text-3xl font-semibold">Today&apos;s Schedules</h1>
      <div className="w-full h-[1px] bg-light"></div>

      <div className="w-[80%] mx-auto mt-10">
        {data?.length === 0 ? (
          <div className=" text-[3rem] text-center">No schedule Today</div>
        ) : (
          <div>
            {data?.map((schedules: TSchedule) => (
              <div key={schedules.id} className="mb-8">
                {schedules?.patient?.length === 0 ? (
                  <div className=" flex justify-center gap-2 text-primary font-semibold text-sm">
                    No Booking made for{" "}
                    <p> {new Date(schedules.date).toDateString()}</p>
                    <p>
                      {schedules.time}{" "}
                      {Number(schedules.time.split(":")[0]) > 12 ? "pm" : "am"}
                    </p>
                    <div className="flex gap-x-4">
                      <BiTrash
                        size={20}
                        className="text-red-500 cursor-pointer hover:text-red-400"
                        titles={"Delete Schedule"}
                        onClick={() =>
                          router.push(
                            `/dashboard/schedules/remove/${schedules.id}`
                          )
                        }
                      />
                      <BiEdit
                        size={20}
                        className="text-green-500  cursor-pointer hover:text-green-400"
                        titles={"Update Schedule"}
                        onClick={() =>
                          router.push(
                            `/dashboard/schedules/update/${schedules.id}`
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className=" w-full flex justify-end text-sm font-bold gap-4">
                      <p> {new Date(schedules.date).toDateString()}</p>
                      <p>{schedules.time}</p>
                    </div>

                    <table className="text-[11px] w-full text-center bg-light text-slate-800">
                      <thead className="font-light">
                        <tr className="border border-solid border-l-0 border-r-0">
                          <th className="text-sm px-6 py-3 ">No</th>
                          <th className="text-sm  px-6 py-3">Students Name</th>
                          <th className="text-sm  px-6 py-3">Department</th>
                          <th className="text-sm  px-6 py-3">Matricule</th>
                          <th className="text-sm  px-6 py-3">Date/time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules?.patient.map((patients: TPatient, index) => (
                          <tr
                            className="border border-solid border-l-0 border-r-0 hover:bg-primary hover:text-white duration-200 cursor-pointer"
                            onClick={() =>
                              handleClick(patients.userInfo.matricule)
                            }
                            key={patients.id}
                          >
                            <td className="text-sm  px-6 py-3">
                              {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {patients.userInfo.username}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {patients.userInfo.department}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {patients.userInfo.matricule}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {schedules.date}/{schedules.time}
                              {Number(schedules.time.split(":")[0]) > 12
                                ? "pm"
                                : "am"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleHistory;
