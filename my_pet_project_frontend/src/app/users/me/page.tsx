"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ky from "ky";
import { useRouter } from "next/navigation";

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
  const [error, setError] = useState<string | null>(null);

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
      .catch(() => setError("Не вдалося отримати дані"))
      .finally(() => setLoading(false));
  }, [session?.accessToken, status, router]);

  if (loading || status === "loading") return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;
  if (!jsonData) return <div>Дані відсутні</div>;

  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {JSON.stringify(jsonData, null, 2)}
    </pre>
  );
}