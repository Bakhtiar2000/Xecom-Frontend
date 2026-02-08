"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AnimatedSneakerImage2 from "@/components/customComponents/AnnimationSneakersImage2";

// Define form types
interface LoginFormData {
  email: string;
  password: string;
}

interface ForgotPasswordFormData {
  email: string;
}

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors },
    reset: resetForgot,
  } = useForm<ForgotPasswordFormData>();

  const handleForgotSubmit = async (data: ForgotPasswordFormData) => {
   console.log('forget password data'  , data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForgot();
  };

  const onSubmit = async (data: LoginFormData) => {
  console.log('login data'  , data);
  };

  // Google Sign
  const handleGoogleSignIn = async () => {
 console.log('google login');
  };

  return (
    <div className=" container  grid grid-cols-1 lg:grid-cols-2 items-center  gap-10  poppins-font">
      <div className="lg:flex justify-center hidden">
        <AnimatedSneakerImage2 />
      </div>

      <div className="flex justify-center  ">
        <div className="max-w-md w-full  space-y-2">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold ">
              Xecom
            </Link>
            <h2 className="mt-4 text-3xl font-bold text-foreground">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Or{" "}
              <Link href="/register" className="font-semibold">
                create a new account
              </Link>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    User ID / Email
                  </label>
                  <div className="mt-1">
                    <Input
                      {...register("email", {
                        required: "User ID is required",
                      })}
                      type="text"
                      placeholder="Enter your user ID or email"
                      className={errors.email ? "border-danger" : ""}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium "
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <Input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type="password"
                      placeholder="Enter your password"
                      className={errors.password ? "border-danger" : ""}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <button
                      type="button"
                      onClick={showModal}
                      className="font-medium "
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full" size="lg">
                    Sign in
                  </Button>
                </div>
              </form>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleGoogleSignIn()}
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-xl  font-medium shadow-sm bg-white  dark:bg-white/10 cursor-pointer transition-all"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M533.5 278.4c0-17.4-1.6-34.1-4.7-50.3H272v95h146.9c-6.3 34-25.1 62.8-53.6 82v68h86.7c50.9-46.9 80.5-115.9 80.5-194.7z"
                      fill="#4285F4"
                    />
                    <path
                      d="M272 544.3c72.6 0 133.5-24 178-65.1l-86.7-68c-24 16-54.7 25.5-91.3 25.5-70.1 0-129.5-47.2-150.7-110.6H33.7v69.4C78.1 487 168.4 544.3 272 544.3z"
                      fill="#34A853"
                    />
                    <path
                      d="M121.3 341.1c-8.6-25.7-8.6-53.6 0-79.3V192.4H33.7c-31.7 62.8-31.7 137.2 0 200l87.6-50.3z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M272 107.7c39.6 0 75.2 13.6 103.3 40.5l77.6-77.6C401.5 24.7 340.6 0 272 0 168.4 0 78.1 57.3 33.7 144.1l87.6 50.3C142.5 155 201.9 107.7 272 107.7z"
                      fill="#EA4335"
                    />
                  </svg>

                  <span>Sign up with Google</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Forgot Password Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <CardTitle>Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email to receive a password reset link
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmitForgot(handleForgotSubmit)}
                    className="space-y-2"
                  >
                    <div>
                      <label
                        htmlFor="forgot-email"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Email Address
                      </label>
                      <div className="mt-1">
                        <Input
                          {...registerForgot("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          type="email"
                          placeholder="Enter your email"
                          className={forgotErrors.email ? "border-danger" : ""}
                        />
                        {forgotErrors.email && (
                          <p className="mt-1 text-sm text-primary">
                            {forgotErrors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="flex-1">
                        Send Reset Link
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
