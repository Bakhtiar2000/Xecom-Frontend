"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { TResponse } from "@/types/global.type";

const Register = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
    watch,
    reset
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
          duration: 3000
        });
        reset();
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: registerToastId, duration: 2000 });
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80"
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
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
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
                    <p className="mt-1 text-sm text-primary">{errors.name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
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
                    <p className="mt-1 text-sm text-primary">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-muted-foreground">
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
                    <p className="mt-1 text-sm text-primary">{errors.phoneNumber.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
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
                        message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                      },
                    })}
                    type="password"
                    placeholder="Create a strong password"
                    className={errors.password ? "border-danger" : ""}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-primary">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground">
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
                    <p className="mt-1 text-sm text-primary">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:text-primary/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                >
                  Create Account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;