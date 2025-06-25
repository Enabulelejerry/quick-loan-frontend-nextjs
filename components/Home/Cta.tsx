"use client";
import React from "react";
import { Button } from "../ui/button";

function Cta() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust QuickFund for their
          lending needs
        </p>

        <Button
          size="lg"
          variant="secondary"
          className="text-primary"
          onClick={() =>
            document
              .getElementById("loan-products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Choose Your Loan Product
        </Button>
      </div>
    </section>
  );
}

export default Cta;
