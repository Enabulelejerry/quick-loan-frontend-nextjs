// hooks/useAdminAllApplications.ts
import api from "@/lib/axios";
import { RepaymentSchedule } from "@/types/Loan";
import { useQuery } from "@tanstack/react-query";

export type AdminLoanApplication = {
  id: number;
  user_id: number;
  loan_product_id: number;
  amount: string;
  purpose: string;
  interest_rate: string;
  duration_days: number;
  repayment_due: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  loan_product: {
    id: number;
    name: string;
  };
  loan_score: {
    score: number;
  };

  repayment_schedules?: RepaymentSchedule[];
};

export function useAdminAllApplications() {
  return useQuery<AdminLoanApplication[]>({
    queryKey: ["admin-all-loan-applications"],
    queryFn: async () => {
      const res = await api.get("/admin/loans");
      return res.data;
    },
  });
}

export function useAdminLoanApplication(id: string) {
  return useQuery<AdminLoanApplication>({
    queryKey: ["admin-loan-application", id],
    queryFn: async () => {
      const res = await api.get(`/admin/loans/${id}`);
      console.log(res.data);
      return res.data;
    },
    enabled: !!id,
  });
}
