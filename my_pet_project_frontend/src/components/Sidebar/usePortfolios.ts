import { useEffect, useState } from "react";
import ky from "ky";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import type { Portfolio } from "./types";

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState<{ id: number; position: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPortfolios = async () => {
      const session = await getSession();
      if (!session?.accessToken) {
        router.push("/login");
        return;
      }
      
      try {
        const response = await ky.get("http://localhost:8080/api/v1/users/me/portfolios", {
          headers: { Authorization: `Bearer ${session.accessToken}` },
          throwHttpErrors: false,
        });

        if (!response.ok) throw new Error("Cannot to load portfolios");

        const data = (await response.json()) as Portfolio[];

        const sortedPortfolios = [...data].sort((a, b) => a.position - b.position);
        setPortfolios(sortedPortfolios);
        setOrder(sortedPortfolios.map((p, index) => ({ id: p.id, position: index })));
      } catch (_) {
        setErrorMessage("Помилка завантаження портфоліо");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [router]);

  async function saveOrder() {
    try {
      const session = await getSession();
      if (!session?.accessToken) throw new Error("No access token");

      const newOrder = portfolios.map((p, index) => ({ id: p.id, position: index }));

      const changedPositions = newOrder.filter(({ id, position }) => {
        const oldItem = order.find(o => o.id === id);
        return oldItem?.position !== position;
      });

      if (changedPositions.length > 0) {
        const response = await ky.patch(
          "http://localhost:8080/api/v1/users/me/portfolios/order",
          {
            json: changedPositions,
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }
        );

        if (!response.ok) throw new Error("Cannot to save order");

        setOrder(newOrder);
      }
    } catch (_) {
      setErrorMessage("Error saving order");
    }
  }

  return { portfolios, setPortfolios, loading, errorMessage, saveOrder };
}
