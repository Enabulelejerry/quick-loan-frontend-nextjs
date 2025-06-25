"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";
import api from "@/lib/axios"; // Your Axios instance

interface MakePaymentButtonProps {
  repaymentScheduleId: number;
  email: string;
  amount: number; // in Naira
}

const MakePaymentButton = ({
  repaymentScheduleId,
  email,
  amount,
}: MakePaymentButtonProps) => {
  const router = useRouter();

  const handlePayment = async () => {
    try {
      const res = await api.post("/paystack/initialize", {
        email,
        amount,
        repayment_schedule_id: repaymentScheduleId,
      });

      const { reference } = res.data;

      const { default: PaystackPop } = await import("@paystack/inline-js");

      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email,
        amount: amount * 100,
        reference,
        onSuccess: () => {
          toast.success("Payment successful, verifying...");
          router.push(`/user/payments/verify?reference=${reference}`);
        },
        onCancel: () => {
          toast.warning("Payment was cancelled.");
        },
      });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Payment failed to initialize"
      );
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-primary/90 transition"
    >
      Pay Now
    </button>
  );
};

export default MakePaymentButton;
