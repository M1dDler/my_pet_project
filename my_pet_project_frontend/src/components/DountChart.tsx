import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ["BTC", "ETH", "SOL"],
    datasets: [
        {
            label: "Traffic",
            data: [300, 50, 100],
            backgroundColor: ["#3b82f6", "#facc15", "#10b981"],
            borderWidth: 1,
        },
    ],
};

const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "65%",
    plugins: {
        legend: {
            display: false,
        },
    },
};

export default function DountChart() {
    return (
        <div className="mx-auto h-45 w-full">
            <Doughnut data={data} options={options} />
        </div>
    );
}