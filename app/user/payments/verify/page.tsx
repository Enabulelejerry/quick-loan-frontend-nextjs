"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { toast } from "sonner";
import { publicApi } from "@/lib/publicApi";

import { parseAxiosError } from "@/lib/parseError";

export default function VerifyPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) return;

      try {
        const res = await publicApi.get(
          `/paystack/verify?reference=${reference}`
        );
        toast.success(res.data.message || "Payment verified!");
        router.push("/user/history");
      } catch (err: unknown) {
        parseAxiosError(err);
        router.push("/user/history");
      }
    };

    verifyPayment();
  }, [reference, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Verifying payment...
    </div>
  );
}
