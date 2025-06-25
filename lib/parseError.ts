import { AxiosError } from "axios";

export function parseAxiosError(error: unknown): string {
  const axiosError = error as AxiosError<{
    message?: string;
    errors?: Record<string, string[]>;
  }>;

  // Laravel validation error structure
  if (axiosError?.response?.data?.errors) {
    return Object.values(axiosError.response.data.errors).flat().join("\n");
  }

  // Generic Laravel error message
  return (
    axiosError?.response?.data?.message ||
    axiosError?.message ||
    "Something went wrong"
  );
}
