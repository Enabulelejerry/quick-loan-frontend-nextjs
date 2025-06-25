"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/"); // redirect to home if not admin
    }
  }, [user]);

  if (!user || user.role !== "admin") {
    return null; // or return a loading spinner
  }

  return <>{children}</>;
}
