// hooks/usePublicLoans.ts
import { useQuery } from "@tanstack/react-query";
import { publicApi } from "@/lib/publicApi"; // ✅ Updated to use publicApi

export type PublicLoan = {
  id: number;
  name: string;
  description: string;
  max_amount: number;
  interest_rate: number;
  duration_days: number;
  created_at: string;
};

export function usePublicLoans() {
  return useQuery<PublicLoan[]>({
    queryKey: ["public-loans"],
    queryFn: async () => {
      const res = await publicApi.get("/public/loan-products");
      return res.data.loan_products;
    },
  });
}

export const usePublicLoanDetails = (id: string | number | undefined) => {
  return useQuery<PublicLoan>({
    queryKey: ["public-loan-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await publicApi.get(`public/loan-products/${id}`);
      return res.data.loan_product;
    },
  });
};
