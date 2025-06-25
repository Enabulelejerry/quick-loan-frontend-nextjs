import { CheckCircle, Clock, Shield, Zap } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Fast Approval",
    description: "Get approved in minutes, not days",
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Smart Scoring",
    description: "Credit assessment",
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Secure Payments",
    description: "Bank-level security for all transactions",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "24/7 Support",
    description: "Round-the-clock customer assistance",
  },
];
function Feature() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose QuickFund?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make lending simple, fast, and accessible for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
