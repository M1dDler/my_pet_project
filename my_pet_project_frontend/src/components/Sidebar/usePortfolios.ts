import { useEffect, useState } from "react";
import ky from "ky";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

interface Portfolio {
  id: number;
  name: string;
  totalValue: number;
}

const LS_KEY = "portfolioOrder";

export function usePortfolios(
  selectedPortfolioId: number | null,
  onSelectPortfolio: (id: number) => void
) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
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

        if (!response.ok) throw new Error("Не вдалося завантажити портфоліо");

        const data = (await response.json()) as Portfolio[];

        const savedOrder = localStorage.getItem(LS_KEY);
        let orderedPortfolios = data;

        if (savedOrder) {
          const order = JSON.parse(savedOrder) as number[];
          orderedPortfolios = order
            .map((id) => data.find((p) => p.id === id))
            .filter(Boolean) as Portfolio[];

          const missingPortfolios = data.filter((p) => !order.includes(p.id));
          orderedPortfolios = [...orderedPortfolios, ...missingPortfolios];
        }

        setPortfolios(orderedPortfolios);

        if (orderedPortfolios.length > 0 && !selectedPortfolioId) {
          onSelectPortfolio(orderedPortfolios[0].id);
        }
      } catch (_) {
        setErrorMessage("Помилка завантаження портфоліо");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [router, selectedPortfolioId, onSelectPortfolio]);

  function saveOrder(portfolios: Portfolio[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(portfolios.map((p) => p.id)));
  }

  return { portfolios, setPortfolios, loading, errorMessage, saveOrder };
}
