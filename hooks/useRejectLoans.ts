import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { handleApiError } from "@/utils/toastErrorHandler";
import api from "@/lib/axios";

export function useRejectLoan(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.post(`/admin/loans/${id}/reject`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Loan rejected successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin-all-loan-applications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-all-loan-application", id],
      });
    },
    onError: handleApiError,
  });
}
