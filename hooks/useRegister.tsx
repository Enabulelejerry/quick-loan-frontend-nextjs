import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { parseAxiosError } from "@/lib/parseError";
import { useMutation } from "@tanstack/react-query";

function useRegister() {
  const {} = useAuth();
  return useMutation({
    mutationFn: async (payload: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      try {
        const { data } = await api.post("/register", payload);
        return data;
      } catch (error: unknown) {
        throw new Error(parseAxiosError(error));
      }
    },
  });
}

export default useRegister;
