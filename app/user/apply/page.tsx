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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UserSidebar from "@/components/User-siderbar";
import { usePublicLoans } from "@/hooks/usePublicLoans";
import useApplyForLoan from "@/hooks/useApplyForLoan";
import { ApplyLoanPayload } from "@/types/Loan";
import { handleApiError } from "@/utils/toastErrorHandler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

function ApplyLoanPage() {
  const { data: loans } = usePublicLoans();
  const { mutate, isPending } = useApplyForLoan();
  const router = useRouter();
  const { register, handleSubmit, control, reset } =
    useForm<ApplyLoanPayload>();
  const onSubmit = (data: ApplyLoanPayload) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Loan application submitted!");
        reset();
        router.push("/user/apply");
      },
      onError: handleApiError,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex-1 md:ml-64">
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Apply for a Loan
              </h1>
              <p className="text-gray-600">
                Choose your loan product and enter your requirements
              </p>
            </div>

            {/* Application Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Loan Application</CardTitle>
                  <CardDescription>
                    Fill out the form below to apply for your loan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <Label htmlFor="product">Loan Product</Label>
                      <Controller
                        name="loan_product_id"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value?.toString() || ""}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a loan product" />
                            </SelectTrigger>
                            <SelectContent>
                              {loans?.map((product) => (
                                <SelectItem
                                  key={product.id}
                                  value={String(product.id)}
                                >
                                  {product.name} - Up to ₦
                                  {product.max_amount.toLocaleString()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div>
                      <Label htmlFor="amount">Loan Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter loan amount"
                        min="100"
                        required
                        {...register("amount", {
                          valueAsNumber: true,
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="purpose">Loan Purpose</Label>
                      <Textarea
                        id="purpose"
                        placeholder="Briefly describe what you'll use this loan for"
                        required
                        {...register("purpose")}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending
                        ? "Processing Application"
                        : " Submit Application"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ApplyLoanPage;
