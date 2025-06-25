"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "user") {
      router.replace("/");
    }
  }, [user]);

  if (!user || user.role !== "user") {
    return null;
  }

  return <>{children}</>;
}
