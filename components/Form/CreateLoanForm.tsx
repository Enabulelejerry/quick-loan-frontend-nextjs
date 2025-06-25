"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useCreateLoan from "@/hooks/useCreateLoan";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/toastErrorHandler";

type CreateLoanData = {
  name: string;
  description: string;
  max_amount: number;
  interest_rate: number;
  duration_days: number;
};

function CreateLoanForm() {
  const { register, handleSubmit } = useForm<CreateLoanData>();
  const { mutate, isPending } = useCreateLoan();
  const router = useRouter();

  const onSubmit = (data: CreateLoanData) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Loan product created successfully!");
        router.push("/admin/loan-management");
      },
      onError: handleApiError,
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Core details about the loan product</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Loan Product Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Personal Loan, Business Loan"
              {...register("name")}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the loan product"
              {...register("description")}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Financial Terms */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Terms</CardTitle>
          <CardDescription>
            Set the financial parameters for this loan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="maxAmount">Maximum Amount (N) *</Label>
            <Input
              id="maxAmount"
              {...register("max_amount", { valueAsNumber: true })}
              type="number"
              placeholder="100"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="interestRate">Interest Rate (%) *</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                placeholder="12.5"
                required
                {...register("interest_rate", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="duration">Duration (days) *</Label>
              <Input
                id="duration"
                type="number"
                {...register("duration_days", { valueAsNumber: true })}
                placeholder="30"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Loan"}
      </Button>
    </form>
  );
}

export default CreateLoanForm;
