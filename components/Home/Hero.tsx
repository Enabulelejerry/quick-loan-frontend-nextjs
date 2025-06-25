import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-green-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get Your Loan in Minutes
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Fast, secure, and smart micro-lending platform. Apply now and get
            instant approval with competitive rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login?redirect=/user/apply">
              <Button size="lg" variant="secondary" className="text-primary">
                Apply Now
              </Button>
            </Link>

            <Link href="/about">
              <Button size="lg" variant="secondary" className="text-primary">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
