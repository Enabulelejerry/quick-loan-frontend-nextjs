import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { Checkbox } from "@/components/ui/checkbox";
// import Link from "next/link";
import { Button } from "../ui/button";
import useRegister from "@/hooks/useRegister";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/toastErrorHandler";

type RegisterFormData = {
  fullName: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const { mutate, isPending } = useRegister();
  const router = useRouter();

  const onSubmit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Register successful!");
        router.push("/auth/login");
      },
      onError: handleApiError,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            required
            name="fullName"
            placeholder="John"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="john@example.com"
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Create a strong password"
        />
      </div>

      {/* <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(checked) => setAgreed(checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link href="#" className="text-primary hover:text-primary/80">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-primary hover:text-primary/80">
            Privacy Policy
          </Link>
        </Label>
      </div> */}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}

export default RegisterForm;
