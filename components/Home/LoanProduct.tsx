"use client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { usePublicLoans } from "@/hooks/usePublicLoans";
import GlobalLoading from "../Global/Loading";
import { useAuth } from "@/context/AuthContext"; // ⬅️ get auth context

import Link from "next/link";

function LoanProduct() {
  const { data: loans, isPending } = usePublicLoans();
  const { user } = useAuth();

  return (
    <section id="loan-products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Loan Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our flexible loan options designed for your needs
          </p>
        </div>

        <div>
          {isPending ? (
            <div className="flex items-center justify-center h-60">
              <GlobalLoading />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {loans?.map((product, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">
                      {product.name}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Max Amount:
                        </span>
                        <span className="font-semibold">
                          {product.max_amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Interest Rate:
                        </span>
                        <span className="font-semibold">
                          {product.interest_rate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="font-semibold">
                          {product.duration_days}
                        </span>
                      </div>
                    </div>
                    {user ? (
                      <Link href={`loan/apply/${product.id}`}>
                        <Button className="w-full">Apply Now</Button>
                      </Link>
                    ) : (
                      <Link href="/auth/login">
                        <Button className="w-full">Login to Apply</Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default LoanProduct;
