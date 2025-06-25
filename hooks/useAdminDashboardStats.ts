import api from "@/lib/axios";
import { AdminDashboardStats } from "@/types/Dashboard";
import { useQuery } from "@tanstack/react-query";

export function useAdminDashboardStats() {
  return useQuery<AdminDashboardStats>({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard-stats");
      return res.data;
    },
  });
}
