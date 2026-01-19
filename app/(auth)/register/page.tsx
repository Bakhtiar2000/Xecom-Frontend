"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { TResponse } from "@/types/global.type";
import AnimatedSneakerImage from "@/components/ui/annimationSneakersImage";

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const registerToastId = toast.loading("Creating Account...");

    const userInfo = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    };

    try {
      const res = (await register(userInfo)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: registerToastId });
      } else {
        toast.success("Account created successfully! Please login.", {
          id: registerToastId,
          duration: 3000,
        });
        reset();
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        id: registerToastId,
        duration: 2000,
      });
    }
  };

  const handleSocialLogin = (provider: string) => alert(provider);

  return (
    <div className="min-h-screen container   grid grid-cols-1 lg:grid-cols-2 items-center  gap-10 px-6 poppins-font">
      <div className="lg:flex justify-center hidden">
        <AnimatedSneakerImage />
      </div>

      <div className="flex justify-center ">
        <div className="max-w-md w-full space-y-2">
          <div className="text-center">
            <Link href="/" className="text-3xl font-bold text-primary">
              Xecom
            </Link>
            <h2 className="mt-4 text-3xl font-bold text-foreground">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary/80"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Join Xecom</CardTitle>
              <CardDescription>
                Fill in your information to create a new account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <Input
                      {...registerForm("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      type="text"
                      placeholder="Enter your full name"
                      className={errors.name ? "border-danger" : ""}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Email Address
                  </label>
                  <div className="mt-1">
                    <Input
                      {...registerForm("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      placeholder="Enter your email"
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
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <Input
                      {...registerForm("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+]?[\d\s\-\(\)]{10,}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      type="tel"
                      placeholder="Enter your phone number"
                      className={errors.phoneNumber ? "border-danger" : ""}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <Input
                      {...registerForm("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                        },
                      })}
                      type="password"
                      placeholder="Create a strong password"
                      className={errors.password ? "border-danger" : ""}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <Input
                      {...registerForm("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      type="password"
                      placeholder="Confirm your password"
                      className={errors.confirmPassword ? "border-danger" : ""}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    By creating an account, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:text-primary/80"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:text-primary/80"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <div>
                  <Button type="submit" className="w-full" size="lg">
                    Create Account
                  </Button>
                </div>
              </form>
              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  {/* <div className="w-full border-t border-gray-300 dark:border-gray-600"></div> */}
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleSocialLogin("google")}
                  className="flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
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
        </div>
      </div>
    </div>
  );
};

export default Register;
