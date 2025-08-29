"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";
import type { CoinSummary } from "types/types";

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
  coinsSummaries: CoinSummary []; 
}

export default function DoughnutChart({ coinsSummaries }: DoughnutChartProps) {

  const listOfCoinsQuantities = coinsSummaries.map((coin) => ({
    coinName: coin.coinName,
    quantity: Number(coin.quantity),
  }));

  const labels = listOfCoinsQuantities.map((item) => item.coinName);
  const quantities = listOfCoinsQuantities.map((item) => item.quantity);
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
      {coinsSummaries ? <Doughnut data={data} options={options}/> : <div>Error loading chart</div>}
    </div>
  );
}
