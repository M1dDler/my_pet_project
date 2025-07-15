"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const labels = ["Feb 01", "Feb 02", "Feb 03", "Feb 04", "Feb 05", "Feb 06", "Feb 07", "Feb 08", "Feb 09", "Feb 10"];

const allDatasets = [
    {
        key: "total",
        label: "Total Profit",
        data: [150, 180, 200, 170, 210, 220, 180, 160, 120, 210],
        borderColor: "#3b82f6",
    },
    {
        key: "btc",
        label: "BTC Profit",
        data: [120, 130, 160, 140, 170, 180, 210, 110, 130, 150],
        borderColor: "#8b5cf6",
    },
    {
        key: "eth",
        label: "ETH Profit",
        data: [140, 150, 110, 90, 190, 210, 180, 190, 150, 160],
        borderColor: "#ffffff",
    },
];

export default function ProfitLineChart() {
    const [visibleKeys, setVisibleKeys] = useState<string[]>(allDatasets.map((d) => d.key));
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleKey = (key: string) => {
        setVisibleKeys((prev) =>
            prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
        );
    };

    const filteredDatasets = allDatasets
        .filter((d) => visibleKeys.includes(d.key))
        .map((d) => ({
            ...d,
            backgroundColor: "transparent",
            tension: 0.4,
        }));

    const data = {
        labels,
        datasets: filteredDatasets,
    };

    const options: ChartOptions<"line"> = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: "nearest",
            intersect: false,
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 8,
                backgroundColor: "#fff",
                borderWidth: 2,
                borderColor: "#3b82f6",
                hoverBorderWidth: 3,
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                backgroundColor: "#1f2937",
                titleColor: "#f9fafb",
                bodyColor: "#d1d5db",
                borderColor: "#4b5563",
                borderWidth: 1,
                padding: 10,
                cornerRadius: 4,
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || "";
                        const value = context.formattedValue || context.raw;
                        return `${label}: ${value}`;
                    },
                    labelPointStyle: () => ({
                        pointStyle: "circle",
                        rotation: 0,
                        borderWidth: 0,
                        backgroundColor: "auto",
                    }),
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#9ca3af" },
                grid: { color: "#374151" },
            },
            y: {
                ticks: { color: "#9ca3af" },
                grid: { color: "#374151" },
            },
        },
    };

    return (
        <div>
            <div className="h-[500px] overflow-x-auto rounded-lg border border-gray-700 bg-[#1e293b] p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                    <div className="font-bold text-white text-xl">Price Chart</div>

                    <div className="relative inline-block text-left">
                        <button
                            onClick={() => setOpenDropdown((prev) => !prev)}
                            type="button"
                            className="rounded-md bg-gray-700 px-3 py-2 font-medium text-sm text-white hover:bg-gray-600 focus:outline-none"
                        >
                            Toggle Datasets
                        </button>

                        {openDropdown && (
                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
                                <div className="py-1">
                                    {allDatasets.map((ds) => (
                                        <label
                                            key={ds.key}
                                            className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={visibleKeys.includes(ds.key)}
                                                onChange={() => toggleKey(ds.key)}
                                                className="mr-2"
                                            />
                                            {ds.label}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative h-[400px]">
                    <Line data={data} options={options} />
                </div>
            </div>

            <div className="mt-6 border-gray-700 border-t" />
        </div>
    );
}
