"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ForgetPassowrdComp from "@/components/ForgetPassowrdComp/ForgetPassowrdComp";
import { Eye } from "lucide-react";

// form data types
type FormValues = {
  email: string;
  password: string;
};

// zod schema
const schema = z.object({
  email: z.email("email isn't valid").nonempty("field can't be empty"),
  password: z.string().nonempty("field can't be empty"),
});

const Login = () => {
  // router
  const router = useRouter();
  // password input field
  const [showPassword, setShowPassword] = useState(false);

  // toggle password
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // forget password component
  const [lightbox, setLightbox] = useState(false);

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
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (response?.ok) {
        // navigate to home
        router.push("/");
      } else {
        setError("root", { message: "unauthorized login" });
      }
    } catch (error) {
      console.log(error);
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
              <h2 className="text-3xl font-bold mb-2">
                Log in with your account
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
              <div className="input-field mb-8">
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
                <div className="flex border-b-2 border-slate-600/50 focus-within:border-primary">
                  <input
                    {...register("password")}
                    placeholder="Password"
                    type={`${showPassword ? "text" : "password"}`}
                    className="w-full font-medium focus:outline-0"
                  />
                  <Eye onClick={togglePassword} />
                </div>
                {errors?.password && (
                  <p className={"text-red-500 font-medium"}>
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                {" "}
                <Button
                  type="submit"
                  className="capitalize h-12 px-10 cursor-pointer"
                >
                  <span>log in</span>
                </Button>
                <div
                  onClick={() => {
                    setLightbox(true);
                  }}
                  className="capitalize h-12 bg-background flex items-center hover:bg-background cursor-pointer"
                >
                  <span className="text-primary text-sm font-medium capitalize">
                    Forget Password?
                  </span>
                </div>
              </div>
            </form>
            <div className="flex justify-center gap-4">
              <p className="text-base text-slate-600/70 font-medium">
                Don&apos;t have an account?
              </p>
              <Link
                href="/register"
                className={`capitalize font-medium align-baseline underline`}
              >
                signup
              </Link>
            </div>
          </div>
        </div>
        {/* forgot password form */}
        <ForgetPassowrdComp lightbox={lightbox} setLightbox={setLightbox} />
      </div>
    </>
  );
};

export default Login;
