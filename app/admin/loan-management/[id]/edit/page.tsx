"use client";

import AdminSideBar from "@/components/Admin-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import EditLoanForm from "@/components/Form/EditLoanForm";

function EditLoan() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <AdminSideBar />
      <div className="flex-1 p-4 md:ml-64 md:p-8">
        <div className="max-w-4xl w-full mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/loan-management"
              className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Loan Management
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Edit Loan Product
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Modify the settings for Personal Loan
                </p>
              </div>
            </div>
          </div>
          <EditLoanForm />
        </div>
      </div>
    </div>
  );
}

export default EditLoan;
