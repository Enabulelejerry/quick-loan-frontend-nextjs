"use client";

import Footer from "@/components/Home/Footer";
import Navbar from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, FileText, CreditCard, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: <FileText className="h-12 w-12 text-primary" />,
    title: "Apply",
    description:
      "Fill out our simple online application form with your basic information and loan requirements.",
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-primary" />,
    title: "Smart Scoring",
    description:
      "Our AI-powered system evaluates your application using advanced algorithms for fair assessment.",
  },
  {
    icon: <CreditCard className="h-12 w-12 text-primary" />,
    title: "Approval",
    description:
      "Get instant approval notification and receive funds directly to your bank account.",
  },
  {
    icon: <RefreshCw className="h-12 w-12 text-primary" />,
    title: "Repayment",
    description:
      "Flexible repayment options with automated reminders and easy online payments.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About QuickFund
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re revolutionizing micro-lending with technology, making
              financial services accessible, transparent, and fair for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At QuickFund, we believe that everyone deserves access to fair
                and transparent financial services. Our mission is to
                democratize lending by leveraging cutting-edge technology to
                provide fast, secure, and affordable micro-loans.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We&apos;re committed to financial inclusion, helping individuals
                and small businesses achieve their goals without the traditional
                barriers of conventional banking.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-gray-700">
                    Transparent pricing with no hidden fees
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-gray-700">
                    AI-powered fair credit assessment
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-gray-700">24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-gray-700">
                    Secure and compliant platform
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-green-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why We Started</h3>
              <p className="text-lg mb-4">
                Traditional lending often excludes those who need it most. We
                saw an opportunity to use technology to create a more inclusive
                financial ecosystem.
              </p>
              <p className="text-lg">
                Since our founding, we&apos;ve helped thousands of customers
                access the funds they need to grow their businesses, handle
                emergencies, and achieve their dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How QuickFund Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined process gets you from application to funding in
              just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow relative"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <div className="absolute -top-4 -right-4 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
