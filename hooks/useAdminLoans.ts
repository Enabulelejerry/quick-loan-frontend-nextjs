import api from "@/lib/axios";
import { LoanProduct, UpdateLoanData } from "@/types/Loan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminLoans() {
  return useQuery<LoanProduct[]>({
    queryKey: ["admin-loans"],
    queryFn: async () => {
      const response = await api.get("/admin/loan-products");
      return response.data.LoanProducts;
    },
  });
}

export const useLoan = (id: string | number | undefined) => {
  return useQuery<LoanProduct>({
    queryKey: ["loan", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/admin/loan-products/${id}`);
      return res.data.loan;
    },
  });
};

export function useUpdateLoan(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateLoanData) => {
      const response = await api.post(`/admin/loan-products/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loan", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-loans"] });
    },
  });
}
