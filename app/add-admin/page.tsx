"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import cn from "@/utils/cn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import MedicksApi from "@/utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";
type TSignupForm = {
  email: string;
  password: string;
  name: string;
  phone: string;
};
const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TSignupForm>();
  const [Loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);
  const handleSignup: SubmitHandler<TSignupForm> = (form: TSignupForm) => {
    setLoading(true);
    MedicksApi.post("/admin/signup", form)
      .then((res) => {
        router.push("/dashboard/schedules/all-schedule");
        toast.success("Successfully created user");
      })
      .catch((error) => {
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
              Sign up
            </h2>
          </div>
          <div className="flex items-center ">
            <form
              method="post"
              className="p-8 w-[50%] min-h-[390px] flex flex-col gap-y-4"
              onSubmit={handleSubmit(handleSignup)}
            >
              <div className="flex flex-col gap-y-2">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  {...register("name")}
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                />
                {errors?.name ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.name?.message}
                  </p>
                ) : null}
              </div>
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
              <div className="flex flex-col gap-y-2">
                <label htmlFor="phone">Phone</label>
                <input
                  type="phone"
                  {...register("phone")}
                  className={cn(
                    "p-[.8rem] outline-none focus:outline-none rounded-[.2rem] border bg-gray-100"
                  )}
                />
                {errors?.phone ? (
                  <p className="text-[10px] text-red-600 text-semibold">
                    {errors?.phone?.message}
                  </p>
                ) : null}
              </div>
              {Loading ? (
                <ScaleLoader color="#fff" className="mx-auto" />
              ) : (
                <Button
                  type="submit"
                  className="text-white bg-accent text-md font-bold py-3"
                  disabled={Loading}
                >
                  Add Admin
                </Button>
              )}
            </form>
            <div className="w-[50%]">
              <Image
                src="/signup.svg"
                alt="login"
                width={500}
                height={1000}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Signup;
