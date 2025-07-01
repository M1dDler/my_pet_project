"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isProcessing) return;

        if (!(((username.trim() && email.trim() ) && password.trim() ) && cpassword.trim())) {
            setErrorMessage("Please fill all fields");
            setShowToast(true);
            return;
        }

        if (password !== cpassword) {
            setErrorMessage("Passwords do not match");
            setShowToast(true);
            return;
        }

        if (!acceptTerms) {
            setErrorMessage("You must accept Terms and Conditions");
            setShowToast(true);
            return;
        }

        setIsProcessing(true);
        setErrorMessage("");
        setShowToast(false);

        try {
            const response = await fetch("http://localhost:8080/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message = errorData?.error || "Registration failed";
                setErrorMessage(message);
                setShowToast(true);
                setIsProcessing(false);
                return;
            }

            const result = await signIn("credentials", {
                login: username,
                password: password,
                redirect: false,
            });

            if (result?.ok) {
                router.push("/users/me");
                return;
            } 
            setErrorMessage("Failed to sign in after registration");
            setShowToast(true);
            setIsProcessing(false);

        } catch (_) {
            setErrorMessage("Network error, please try again later.");
            setShowToast(true);
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
            <Navbar />
            {showToast && (
                <Toast
                    type="error"
                    message={errorMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
            <main className="flex grow items-center justify-center px-4" style={{
                backgroundImage: 'url("/login/background.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>
                <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-700 bg-[#2b2b2b] p-8 shadow-black/80 shadow-lg">
                    <h2 className="mb-8 text-center font-semibold text-3xl text-white">Sign Up</h2>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="mb-2 block font-medium text-gray-300 text-sm"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-gray-600 bg-[#1f1f1f] px-4 py-3 text-sm text-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block font-medium text-gray-300 text-sm"
                                >
                                    Email Id
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-gray-600 bg-[#1f1f1f] px-4 py-3 text-sm text-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block font-medium text-gray-300 text-sm"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-gray-600 bg-[#1f1f1f] px-4 py-3 text-sm text-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="cpassword"
                                    className="mb-2 block font-medium text-gray-300 text-sm"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="cpassword"
                                    name="cpassword"
                                    type="password"
                                    placeholder="Enter confirm password"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-gray-600 bg-[#1f1f1f] px-4 py-3 text-sm text-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="h-4 w-4 shrink-0 rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                                />
                                <label
                                    htmlFor="acceptTerms"
                                    className="ml-3 block text-gray-400 text-sm"
                                >
                                    I accept the{" "}
                                    <a
                                        href="/terms"
                                        className="ml-1 font-medium text-blue-600 hover:underline"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button
                                type="submit"
                                disabled={
                                    !(((email.trim() && password.trim()) && cpassword.trim()) && acceptTerms) || isProcessing
                                }
                                className={`w-full rounded-md px-4 py-3 font-medium text-sm tracking-wider transition-colors duration-300 focus:outline-none ${!(((email.trim() && password.trim() ) && cpassword.trim() ) && acceptTerms)
                                    ? "cursor-not-allowed bg-gray-600 text-gray-400"
                                    : "cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
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
                                {isProcessing ? "Creating account..." : "Create an account"}
                            </button>

                        </div>
                        <p className="mt-6 text-center text-gray-400 text-sm">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="ml-1 font-medium text-blue-600 hover:underline"
                            >
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}
