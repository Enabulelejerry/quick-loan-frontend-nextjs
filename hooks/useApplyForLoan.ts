import api from "@/lib/axios";
import { parseAxiosError } from "@/lib/parseError";
import { useMutation } from "@tanstack/react-query";

type ApplyLoanPayload = {
  loan_product_id: number;
  amount: number;
  purpose: string;
};

function useApplyForLoan() {
  try {
    return useMutation({
      mutationFn: async (payload: ApplyLoanPayload) => {
        const response = await api.post("/user/loans", payload);
        return response.data;
      },
    });
  } catch (error) {
    throw new Error(parseAxiosError(error));
  }
}

export default useApplyForLoan;
