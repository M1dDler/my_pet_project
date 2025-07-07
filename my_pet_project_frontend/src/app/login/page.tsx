"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toast } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { data: session, status } = useSession();
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    if (status === "loading") return;
    if (session?.accessToken) {
      router.push("/users/me");
      return;
    }
    setLoading(false);
  }, [status, session, router]);

  if (loading || status === "loading") {
    return <LoadingSpinner />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    setErrorMessage("");
    setShowToast(false);

    if (!(login.trim() && password.trim())) {
      setIsProcessing(false);
      return;
    }

    const result = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/users/me");
    }
    else {
      setErrorMessage("Bad Credentials");
      setShowToast(true);
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
        <Navbar />
        {showToast && <Toast type="error" message={errorMessage} onClose={() => setShowToast(false)} />}
        <main className="flex grow items-center justify-center px-4" style={{
          backgroundImage: 'url("/login/background.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
          <div className="grid w-full max-w-6xl items-center gap-10 max-lg:max-w-lg lg:grid-cols-2">
            <div>
              <h1 className="!leading-tight font-bold text-4xl text-white lg:text-5xl">
                M1dDler’s Pet Project
              </h1>
              <p className="mt-6 text-[15px] text-gray-400 leading-relaxed">
                Dive into seamless management with M1dDler’s Pet Project — your handy
                tool for organizing and tracking all your portfolios and transactions
                in one place. Effortlessly keep everything under control!.
              </p>
              <p className="mt-6 text-[15px] text-gray-400 lg:mt-12">
                Don't have an account
                <a
                  href="/register"
                  className="ml-1 font-medium text-blue-500 hover:underline"
                >
                  Register here
                </a>
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md rounded-2xl bg-[#1a1a1a] p-8 shadow-black/50 shadow-xl lg:ml-auto"
              noValidate
            >
              <h2 className="mb-8 font-semibold text-3xl text-white">Sign in</h2>

              <div className="space-y-6">
                <div>
                  <input
                    id="login"
                    name="login"
                    type="text"
                    placeholder="Enter Username or Email"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-700 bg-[#2b2b2b] px-4 py-3 text-sm text-white placeholder-gray-500 outline-0 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-700 bg-[#2b2b2b] px-4 py-3 text-sm text-white placeholder-gray-500 outline-0 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-sm">
                    <a
                      href="/forgot-password"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={
                    !(login.trim() && password.trim()) || isProcessing
                  }
                  className={`w-full rounded-md px-4 py-2.5 font-medium text-[15px] shadow-xl transition-colors duration-300 ease-in-out focus:outline-none ${!(login.trim() && password.trim())
                    ? "cursor-not-allowed bg-gray-600 text-gray-400"
                    : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                    } `}
                >
                  {isProcessing && (
                    <svg
                      className="mr-2 inline h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-labelledby="loading-title"
                    >
                      <title id="loading-title">Loading spinner</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                  )}
                  {isProcessing ? "Logging in ..." : "Log in"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
