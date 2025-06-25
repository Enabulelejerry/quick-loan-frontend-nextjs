"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import useLogin from "@/hooks/useLogin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/toastErrorHandler";

type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { mutate, isPending, error } = useLogin();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Login successful!");
        if (response.user?.role === "admin") {
          router.push("/admin/loan-management"); // or any admin dashboard route
        } else {
          router.push("/"); // regular user homepage
        }
      },
      onError: handleApiError,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Enter your password"
        />
      </div>

      {/* <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="font-medium text-primary hover:text-primary/80"
          >
            Forgot your password?
          </Link>
        </div>
      </div> */}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Processing..." : "Login"}
      </Button>
      {error?.message && (
        <p className="text-red-500 text-sm mt-2">{error.message}</p>
      )}
    </form>
  );
}

export default LoginForm;
