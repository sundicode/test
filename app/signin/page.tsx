"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import MedicksApi from "@/utils/axios";
import cn from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
type TLoginForm = {
  email: string;
  password: string;
};
const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TLoginForm>();
  const [Loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const router = useRouter();
  const hadleSignin = (data: TLoginForm) => {
    setLoading(true);
    MedicksApi.post("/admin/signin", data)
      .then((res) => {
        router.push("/dashboard/schedules/all-schedule");
        toast.success("Successfully signed in");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container>
      <div className="w-full flex justify-center items-center min-h-screen text-sm">
        <div className="w-[50%] bg-login-bg rounded-[.3rem]">
          <div className="flex justify-between items-center font-semibold">
            <h2 className="w-[20%] text-accent text-[17px] text-center">
              Admin
            </h2>
            <h2 className="w-[80%] text-black bg-white h-8 flex justify-center  text-[17px] item-center">
              Login
            </h2>
          </div>
          <div className="flex items-center ">
            <div className="w-[50%]">
              <Image
                src="/login.svg"
                alt="login"
                width={400}
                height={100}
                className="w-full h-auto"
              />
            </div>
            <form
              method="post"
              className="p-8 w-[50%] h-[390px] flex flex-col gap-y-4"
              onSubmit={handleSubmit(hadleSignin)}
            >
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                />
                {errors?.email ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.email?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register("password")}
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                />
                {errors?.password ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.password?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex justify-between items-end">
                <input type="checkbox" />
                <span>Remeber me</span>
              </div>
              {Loading ? (
               <ScaleLoader color="#2B33FF" className="mx-auto" />
              ) : (
                <Button
                  type="submit"
                  className="text-white bg-accent text-md font-bold py-3"
                >
                  Login
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Signin;
