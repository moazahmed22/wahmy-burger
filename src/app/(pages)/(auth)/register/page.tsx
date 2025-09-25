"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

// form data types
type FormValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

// zod schema
const schema = z
  .object({
    name: z
      .string()
      .min(3, "name must be at least 3 characters long")
      .nonempty("field can't be empty"),
    email: z.email("email isn't valid").nonempty("field can't be empty"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must be at least 8 characters long and includes [uppercase-symbol-lowercase]"
      )
      .nonempty("field can't be empty"),
    rePassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must be at least 8 characters long and includes [uppercase-symbol-digit-lowercase]"
      )
      .nonempty("field can't be empty"),
    phone: z.string().nonempty("field can't be empty"),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "password ot match",
    path: ["rePassword"],
  });

const Register = () => {
  // router
  const router = useRouter();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  // form submit
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        data
      );
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError("root", { message: error?.response?.data.message });
      }
    }
  };
  return (
    <>
      <div className="container mx-auto my-11 px-1 md:px-0">
        <div className="flex md:gap-5 lg:gap-40 items-stretch">
          {/* image */}
          <div className="image-container relative md:w-[400] lg:w-[800] lg:h-[800] hidden md:inline-block overflow-hidden">
            <Image
              src="/auth/authImage.png"
              alt=""
              fill
              priority
              loading="eager"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* form */}
          <div className="form-container flex flex-col flex-1 self-center gap-10 px-5 lg:min-w-96">
            {/* form title */}
            <div className="title">
              <h2 className="text-3xl font-bold capitalize mb-2">
                create an account
              </h2>
              {errors.root ? (
                <p className={"text-red-500 font-medium"}>
                  {errors.root.message}
                </p>
              ) : (
                <p className="text-base font-medium">
                  Enter your details below
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="input-field mb-8 ">
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="w-full border-b-2 border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                />
                {errors?.name && (
                  <p className={"text-red-500 font-medium"}>
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div className="inpit-field mb-8">
                <input
                  {...register("email")}
                  placeholder="Email or Phone Number"
                  className="w-full border-b-2 border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                />
                {errors?.email && (
                  <p className={"text-red-500 font-medium"}>
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="input-field mb-8">
                <input
                  {...register("password")}
                  placeholder="Password"
                  type="password"
                  className="w-full border-b-2 border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                />
                {errors?.password && (
                  <p className={"text-red-500 font-medium"}>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="input-field mb-8">
                {" "}
                <input
                  {...register("rePassword")}
                  placeholder="Re-enter Password"
                  type="password"
                  className="w-full border-b-2 border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                />
                {errors?.rePassword && (
                  <p className={"text-red-500 font-medium"}>
                    {errors.rePassword?.message}
                  </p>
                )}
              </div>

              <div className="input-field mb-8">
                <input
                  {...register("phone")}
                  placeholder="Phone"
                  className="w-full border-b-2 border-slate-600/50 focus:border-primary focus:outline-0 font-medium"
                />
                {errors?.phone && (
                  <p className={"text-red-500 font-medium"}>
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="capitalize h-12 cursor-pointer">
                <span>create account</span>
              </Button>
            </form>
            <div className="flex justify-center gap-4">
              <p className="text-base text-slate-600/70 font-medium">
                Already have account?
              </p>
              <Link
                href="/login"
                className={`capitalize font-medium align-baseline underline`}
              >
                login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
