import api from "@/lib/axios";
import { parseAxiosError } from "@/lib/parseError";
import { useMutation } from "@tanstack/react-query";

type CreateLoanPayload = {
  name: string;
  description: string;
  max_amount: number;
  interest_rate: number;
  duration_days: number;
};

function useCreateLoan() {
  try {
    return useMutation({
      mutationFn: async (payload: CreateLoanPayload) => {
        const response = await api.post("/admin/loan-products", payload);
        return response.data;
      },
    });
  } catch (error) {
    throw new Error(parseAxiosError(error));
  }
}

export default useCreateLoan;
