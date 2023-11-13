import React from "react";

const AllSchedules = () => {
  return (
    <div className="w-full">
      <h1 className=" text-3xl font-semibold">Today&apos;s Schedules</h1>
      <div className="w-full h-[1px] bg-light"></div>

      <div className="w-[80%] mx-auto mt-10">
        <table className="text-[11px] w-full text-center">
          <tr className="border border-solid border-l-0 border-r-0">
            <th className="text-md px-6 py-3">No</th>
            <th className="text-md  px-6 py-3">Students Name</th>
            <th className="text-md  px-6 py-3">Matricule</th>
            <th className="text-md  px-6 py-3">Department</th>
            <th className="text-md  px-6 py-3">Date/time</th>
          </tr>
          <tr className="border border-solid border-l-0 border-r-0 hover:bg-light duration-200 cursor-pointer">
            <td className="text-md  px-6 py-3">01</td>
            <td className="text-md  px-6 py-3">numfor smith .s</td>
            <td className="text-md  px-6 py-3">college of tech </td>
            <td className="text-md  px-6 py-3">aA12B123</td>
            <td className="text-md  px-6 py-3">7:30 9/10/2022</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default AllSchedules;
