// hooks/useApproveLoan.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { handleApiError } from "@/utils/toastErrorHandler";
import api from "@/lib/axios";

export function useApproveLoan(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`/admin/loans/${id}/approve`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Loan approved successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin-all-loan-application", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-all-loan-applications"],
      });
    },
    onError: handleApiError,
  });
}
