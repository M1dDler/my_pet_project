"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ky from "ky";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Toast } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [jsonData, setJsonData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session?.accessToken) {
      router.push("/login");
      return;
    }

    ky.get("http://localhost:8080/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      throwHttpErrors: false,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Помилка завантаження");
        }
        const data = (await response.json()) as User;
        setJsonData(data);
      })
      .catch(() => setErrorMessage("Error"))
      .finally(() => setLoading(false));
  }, [session?.accessToken, status, router]);

  if (loading || status === "loading") return <LoadingSpinner/>
;
  if (errorMessage) return <div>{errorMessage}</div>;
  if (!jsonData) return <div>Дані відсутні</div>;

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
    <div className="flex flex-1 overflow-hidden">
      <Sidebar/>

      <main
        className="flex grow items-center justify-center bg-gray-900 px-4"
        // style={{
        //   backgroundImage: 'url("/login/background.jpg")',
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {/* Content */}
      </main>
    </div>
  </div>
);
}