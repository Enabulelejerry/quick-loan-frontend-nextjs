import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { parseAxiosError } from "@/lib/parseError";
import { useMutation } from "@tanstack/react-query";

function useLogin() {
  const { fetchMe } = useAuth();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      try {
        const { data } = await api.post("/login", payload);
        localStorage.setItem("access_token", data.token);
        return data;
      } catch (error: unknown) {
        throw new Error(parseAxiosError(error));
      }
    },
    onSuccess: async () => {
      await fetchMe();
    },
  });
}

export default useLogin;
