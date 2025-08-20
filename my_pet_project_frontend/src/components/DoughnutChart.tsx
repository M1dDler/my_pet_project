"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import type { Portfolio, CoinQuantity, Transaction } from "types/types";
import { getListOfCoinsQuantitiesFromTransactions } from "@/app/api/transactions";
import { getSession } from "next-auth/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  cutout: "65%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

function generateColors(num: number) {
  const colors: string[] = [];
  for (let i = 0; i < num; i++) {
    const hue = Math.floor((360 / num) * i);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}

interface DoughnutChartProps {
  portfolio: Portfolio | null;
}

export default function DoughnutChart({ portfolio }: DoughnutChartProps) {
  const [labels, setLabels] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      const session = await getSession();
      if (!(session?.accessToken && portfolio)) return;

      const transactions: Transaction[] = await getListOfCoinsQuantitiesFromTransactions(
        portfolio.id,
        session.accessToken
      );

      const listOfCoinsQuantities: CoinQuantity[] = transactions.map((t) => ({
        coinName: t.coinName,
        quantity: Number(t.quantity),
      }));

      setLabels(listOfCoinsQuantities.map((item) => item.coinName));
      setQuantities(listOfCoinsQuantities.map((item) => item.quantity));
    }

    fetchData();
  }, [portfolio]);

  const colors = generateColors(labels.length);

  const data = {
    labels,
    datasets: [
      {
        label: "Portfolio coins",
        data: quantities,
        backgroundColor: colors,
        borderWidth: 1.2,
      },
    ],
  };

  return (
    <div className="mx-auto h-45 w-full">
      <Doughnut data={data} options={options} />
    </div>
  );
}
