"use client";

import Navbar from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can I get approved for a loan?",
    answer:
      "Most applications are processed within minutes. Our AI-powered system can provide instant approval for qualified applicants. In some cases, additional verification may be required, which typically takes 1-2 business days.",
  },
  {
    question: "What are the eligibility requirements?",
    answer:
      "To qualify for a QuickFund loan, you must be at least 18 years old, have a valid government-issued ID, proof of income, and an active bank account. We also consider your credit history and debt-to-income ratio.",
  },
  {
    question: "What interest rates do you offer?",
    answer:
      "Our interest rates range from 10% to 18% APR, depending on the loan type, amount, and your creditworthiness. We provide transparent pricing with no hidden fees.",
  },
  {
    question: "How much can I borrow?",
    answer:
      "Loan amounts vary by product: Personal loans up to $5,000, Business loans up to $25,000, Emergency loans up to $2,000, and Education loans up to $10,000. Your approved amount depends on your income and credit profile.",
  },
  {
    question: "What can I use the loan for?",
    answer:
      "Personal loans can be used for any legal purpose including debt consolidation, home improvements, or unexpected expenses. Business loans are for business-related expenses, and education loans are specifically for educational costs.",
  },
  {
    question: "How do I repay my loan?",
    answer:
      "Repayments are automatically deducted from your linked bank account on your scheduled due dates. You can also make manual payments through our online portal or mobile app. We offer flexible repayment terms from 6 to 36 months.",
  },
  {
    question: "Are there any fees?",
    answer:
      "We believe in transparent pricing. There are no application fees, prepayment penalties, or hidden charges. The only cost is the interest rate on your loan, which is clearly disclosed before you accept the terms.",
  },
  {
    question: "What if I can't make a payment?",
    answer:
      "If you're experiencing financial difficulties, contact our support team immediately. We offer hardship programs and may be able to modify your payment schedule. Late payments may incur fees and affect your credit score.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we use bank-level encryption and security measures to protect your data. We're compliant with all relevant financial regulations and never share your personal information with third parties without your consent.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "You can pay off your loan early without any prepayment penalties. This can help you save on interest charges. You can make additional payments or pay off the full balance at any time through our online portal.",
  },
  {
    question: "What happens if my application is rejected?",
    answer:
      "If your application is not approved, we'll provide you with the specific reasons. You can reapply after addressing the issues, or consider our alternative products that might better suit your current financial situation.",
  },
  {
    question: "Do you report to credit bureaus?",
    answer:
      "Yes, we report both positive and negative payment history to major credit bureaus. Making on-time payments can help improve your credit score, while missed payments may negatively impact it.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about QuickFund loans,
              applications, and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@quickfund.com"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
            <a
              href="tel:1-800-QUICKFUND"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
