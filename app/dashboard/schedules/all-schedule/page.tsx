"use client";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingState from "@/components/LoadingState";
import MedicksApi from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type TUser = {
  _id: string;
  username: string;
  matricule: string;
  email: string;
  department: string;
};

export type TPatient = {
  _id: string;
  user: TUser;
  medicalReciet: string;
  schoolfeeReciet: string;
};

type TSchedule = {
  _id: string;
  patient: [];
  numberOfPatients: number;
  date: string;
  time: string;
};
const AllSchedules = () => {
  const getAllSchedules = async () => {
    const res = await MedicksApi.get("/schedule/admin");
    return res.data;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["schedules"],
    queryFn: getAllSchedules,
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
        {data?.schedule.length === 0 ? (
          <div>No schedule Today</div>
        ) : (
          <div>
            {data?.schedule.map((schedules: TSchedule) => (
              <div key={schedules._id} className="mb-8">
                {schedules.patient.length === 0 ? (
                  <div className=" flex justify-center gap-2 text-primary font-semibold text-sm">
                    No Booking made for{" "}
                    <p> {new Date(schedules.date).toDateString()}</p>
                    <p>
                      {schedules.time}{" "}
                      {Number(schedules.time.split(":")[0]) > 12 ? "pm" : "am"}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className=" w-full flex justify-end text-sm font-bold gap-4">
                      <p> {new Date(schedules.date).toDateString()}</p>
                      <p>
                        {schedules.time}
                      </p>
                    </div>

                    <table className="text-[11px] w-full text-center bg-light text-slate-800">
                      <thead className="font-light">
                        <tr className="border border-solid border-l-0 border-r-0">
                          <th className="text-sm px-6 py-3 ">No</th>
                          <th className="text-sm  px-6 py-3">Students Name</th>
                          <th className="text-sm  px-6 py-3">Matricule</th>
                          <th className="text-sm  px-6 py-3">Department</th>
                          <th className="text-sm  px-6 py-3">Date/time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedules?.patient.map((patients: TPatient, index) => (
                          <tr
                            className="border border-solid border-l-0 border-r-0 hover:bg-primary hover:text-white duration-200 cursor-pointer"
                            onClick={() => handleClick(patients.user.matricule)}
                            key={patients._id}
                          >
                            <td className="text-sm  px-6 py-3">
                              {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {patients.user.username}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {patients.user.department}
                            </td>
                            <td className="text-sm  px-6 py-3">
                              {patients.user.matricule}
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

export default AllSchedules;
