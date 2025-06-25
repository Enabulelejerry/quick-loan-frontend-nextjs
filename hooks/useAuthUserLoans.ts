import api from "@/lib/axios";
import { UserLoan } from "@/types/Loan";
import { useQuery } from "@tanstack/react-query";

export function useAuthUserLoans() {
  return useQuery<UserLoan[]>({
    queryKey: ["user-loans"],
    queryFn: async () => {
      const res = await api.get("/user/loans");
      console.log("Full response:", res.data);
      return res.data;
    },
  });
}

export const useAuthUserLoan = (id: string | number | undefined) => {
  return useQuery<UserLoan>({
    queryKey: ["user-loan", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await api.get(`/user/loans/${id}`);
      return res.data;
    },
  });
};
