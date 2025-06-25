import { AxiosError } from "axios";
import { toast } from "sonner";

export function handleApiError(error: unknown) {
  const err = error as AxiosError<any>;
  const data = err?.response?.data;

  // Handle Laravel-style validation errors
  if (data?.errors && typeof data.errors === "object") {
    const validationMessages = Object.values(data.errors).flat();
    validationMessages.forEach((msg) => {
      toast.error(String(msg));
    });
    return;
  }

  // Fallback messages
  const message =
    data?.error || data?.message || err?.message || "Something went wrong";

  toast.error(message);
}
