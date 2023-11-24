import Button from "@/components/Button";
import { greeting } from "@/utils/greeting";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const page = () => {
  return (
    <div className="w-full bg-light min-h-screen flex items-center justify-center flex-col">
      <div className="bg-primary w-[70%] h-[60vh] p-8 flex flex-col gap-y-7 justify-center">
        <div className="flex justify-center">
          <Image src="/logo.svg" alt="icon" width={300} height={200} />
        </div>
        <div>
          <h1 className="text-5xl font-bold text-white mb-10 text-center">
            Welcome and {greeting()}
          </h1>
        </div>

        <div className="flex justify-center">
          <Link
            href="/dashboard/schedules/all-schedule"
            className="bg-orange-400 py-6 px-10 text-white font-bold rounded"
          >
            Proceed to Your Schedule
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
