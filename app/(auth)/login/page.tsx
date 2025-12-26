"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation, useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/redux/features/auth/authSlice";
import { TResponse } from "@/types/global.type";
import { UserRole } from "@/constants/enum";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: forgotErrors },
    reset: resetForgot
  } = useForm();

  const handleForgotSubmit = async (data: any) => {
    const toastId = toast.loading("Sending request ...");

    try {
      const res = (await forgotPassword(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Please check your mail", { id: toastId });
        setIsModalOpen(false);
        resetForgot();
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetForgot();
  };

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const loginToastId = toast.loading("Logging In");
    const userInfo = {
      id: data.userId,
      password: data.password,
    };

    try {
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In", { id: loginToastId, duration: 2000 });

      if (res?.data?.needsPasswordChange) {
        router.push("/change-password");
      } else {
        if (user.role === UserRole.CUSTOMER) {
          router.push("/");
        } else {
          router.push(`/${user.role.toLowerCase()}/dashboard`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: loginToastId, duration: 2000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted py-4 px-4 sm:px-4 lg:px-4">
      <div className="max-w-md w-full space-y-2">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-primary">
            Xecom
          </Link>
          <h2 className="mt-4 text-3xl font-bold text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80"
            >
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
                <label htmlFor="userId" className="block text-sm font-medium text-muted-foreground">
                  User ID / Email
                </label>
                <div className="mt-1">
                  <Input
                    {...register("userId", {
                      required: "User ID is required",
                    })}
                    type="text"
                    placeholder="Enter your user ID or email"
                    className={errors.userId ? "border-danger" : ""}
                  />
                  {errors.userId && (
                    <p className="mt-1 text-sm text-primary">{errors.userId.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
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
                    <p className="mt-1 text-sm text-primary">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={showModal}
                    className="font-medium text-primary hover:text-primary/80"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Forgot Password Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-primary flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  Enter your email to receive a password reset link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitForgot(handleForgotSubmit)} className="space-y-2">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
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
                        <p className="mt-1 text-sm text-primary">errorrrr</p>
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
  );
};

export default Login;