import Cta from "@/components/Home/Cta";
import Feature from "@/components/Home/Feature";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import LoanProduct from "@/components/Home/LoanProduct";
import Navbar from "@/components/navbar";

import React from "react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-500">
      <Navbar />
      <Hero />
      <Feature />
      <LoanProduct />
      <Cta />
      <Footer />
    </div>
  );
}

export default HomePage;
