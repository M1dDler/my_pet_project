"use client";

// biome-ignore assist/source/organizeImports :D
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/users/me");
    } else {
      alert("Невірний логін або пароль");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-[#1a1a1a] p-6 shadow-lg shadow-black"
      >
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Вхід до системи
        </h2>

        <div className="mb-4">
          <label
            htmlFor="login"
            className="mb-1 block text-sm font-medium text-gray-400"
          >
            Логін
          </label>
          <input
            id="login"
            type="text"
            placeholder="example123"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-700 bg-[#2b2b2b] px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-400"
          >
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-700 bg-[#2b2b2b] px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          Увійти
        </button>
      </form>
    </div>
  );
}
