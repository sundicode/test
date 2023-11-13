"use client";
import Button from "@/components/Button";
import Container from "@/components/Container";
import cn from "@/utils/cn";
import { useRouter } from "next/navigation";
import axios from "axios";
// import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
type pageProps = {};
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

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const router = useRouter();
  const handleSignup: SubmitHandler<TSignupForm> = async (
    form: TSignupForm
  ) => {
    try {
      const signup = await axios.post(
        "http://localhost:4000/admin/signup",
        form
      );
      const status = signup.status;
      if (status == 201) {
        router.push("/signin");
        toast.success("Successfully created user");
      }
      console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              padding: "20px",
            },
          },
          error: {
            style: {
              background: "red",
              padding: "20px",
            },
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
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
              </div>
              <Button
                type="submit"
                className="text-white bg-accent text-md font-bold py-3"
              >
                Sign up
              </Button>
              <div className="flex justify-between items-center">
                <span>Dont have an account</span>
                <Link href={"/signin"} className="text-accent">
                  Sign in
                </Link>
              </div>
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
