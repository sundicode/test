"use client";
import LoadingState from "@/components/LoadingState";
import useFilePreview from "@/hooks/useFilePreview";
import MedicksApi from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiChevronRight, BiUpload } from "react-icons/bi";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
type TSettings = {
  post: string;
  address: string;
  image: FileList;
};
const Setting = () => {
  const [Loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TSettings>();

  const file = watch("image");
  const [fileUrl] = useFilePreview(file);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const router = useRouter();
  const handleUpdateAdmin: SubmitHandler<TSettings> = (data: TSettings) => {
    MedicksApi.patch("/admin/profile", data)
      .then((res) => {
        setLoading(true);
        router.push("/dashboard/options/profile");
        toast.success("Successfully updated profile");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (Loading) return <LoadingState />;
  return (
    <div>
      <h1 className=" text-3xl font-semibold flex items-center">
        Option <BiChevronRight className="text-login-bg" /> Settings
      </h1>
      <div className="w-full h-[1px] bg-light"></div>

      <form onSubmit={handleSubmit(handleUpdateAdmin)}>
        <div className="min-h-[70vh] flex justify-center items-center gap-10">
          <div className=" flex justify-center items-center flex-col p-5 rounded h-[300px] w-[300px]">
            {fileUrl ? (
              <Image src={fileUrl} alt="preview" width={300} height={250} />
            ) : (
              <h1>Upload an image</h1>
            )}
            <div className="mt-4">
              <label htmlFor="photo" className="cursor-pointer">
                <div className="bg-primary w py-4 block">
                  <BiUpload
                    className="w-[250px] text-orange-400 rounded"
                    size={20}
                  />
                </div>
              </label>
              <input
                type="file"
                {...register("image")}
                className=" bg-primary text-white hidden"
                id="photo"
                placeholder="Upload An image"
              />
            </div>
          </div>
          <div className=" flex flex-col gap-y-5">
            <div>
              <input
                type="text"
                className="p-[.7rem] border-2 rounded focus:outline-none outline-none focus:border-primary"
                placeholder="Office Post"
                {...register("post")}
              />
            </div>

            <div>
              <input
                type="text"
                className="p-[.7rem] border-2 rounded focus:outline-none outline-none focus:border-primary"
                placeholder="Address"
                {...register("address")}
              />
            </div>
            <button
              className={twMerge(
                "w-full bg-primary py-3 rounded px-5 text-orange-400 font-bol",
                Loading && "bg-slate-100"
              )}
              type="submit"
              disabled={Loading}
            >
              Update Account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Setting;
