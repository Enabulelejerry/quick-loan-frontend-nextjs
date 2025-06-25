// hooks/useUserDashboardStats.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

type UserLoan = {
  id: number;
  amount: string;
  status: string;
  created_at: string;
  loan_product: {
    name: string;
  };
};

type UserDashboardStats = {
  total_loans: number;
  pending_loans: number;
  active_loans: number;
  repaid_loans: number;
  total_paid_amount: number;
  total_outstanding_balance: number;
  recent_loans: UserLoan[];
};

export function useUserDashboardStats() {
  return useQuery<UserDashboardStats>({
    queryKey: ["user-dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/user/dashboard-stats");
      return res.data;
    },
  });
}
