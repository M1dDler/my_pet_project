"use client";

import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <div
      className="flex min-h-screen flex-col text-gray-300"
      style={{
        backgroundImage: 'url("/login/background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <main className="mx-auto max-w-4xl flex grow flex-col items-center justify-start bg-[#1a1a1a]/80 px-6 py-16">
        <h1 className="mb-8 font-bold text-4xl text-white">Terms and Conditions</h1>

        <section className="space-y-6 text-sm leading-relaxed">
          <p>
            Welcome to our Terms and Conditions page. Please read the following carefully
            before using our services.
          </p>
          <p>
            By accessing or using our website, you agree to be bound by these Terms and Conditions.
            If you disagree with any part of the terms, you may not use our services.
          </p>

          <h2 className="mt-8 font-semibold text-xl">1. Use of Service</h2>
          <p>
            You agree to use the service only for lawful purposes and in a way that does not
            infringe the rights of others or restrict their use and enjoyment of the service.
          </p>

          <h2 className="mt-8 font-semibold text-xl">2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials.
            Any activity under your account is your responsibility.
          </p>

          <h2 className="mt-8 font-semibold text-xl">3. Privacy</h2>
          <p>
            We respect your privacy and handle your data according to our Privacy Policy.
            Please review it to understand how we collect, use, and protect your information.
          </p>

          <h2 className="mt-8 font-semibold text-xl">4. Changes to Terms</h2>
          <p>
            We reserve the right to update or change these Terms and Conditions at any time.
            Changes will be posted on this page with an updated effective date.
          </p>

          <h2 className="mt-8 font-semibold text-xl">5. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            <a href="mailto:support@example.com" className="ml-1 text-blue-600 hover:underline">
              m1ddler.ua@gmail.com
            </a>.
          </p>
        </section>
      </main>
    </div>
  );
}
