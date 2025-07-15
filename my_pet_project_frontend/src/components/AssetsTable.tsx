import { useState, useRef, useEffect } from "react";

const options = [
    { id: 1, label: "All Time" },
    { id: 2, label: "Last 7 days" },
    { id: 3, label: "Last 30 days" },
    { id: 4, label: "Last month" },
    { id: 5, label: "Last year" },
];

const transactions = [
    {
        name: "Bitcoin",
        price: "$30,000",
        change1h: "+0.5%",
        change24h: "-1.2%",
        change7d: "+3.4%",
        assets: "2.5 BTC",
        avgPurchase: "$28,000",
        profit: "+$5,000",
        profitColor: "text-green-600",
    },
    {
        name: "Ethereum",
        price: "$2,200",
        change1h: "+1.2%",
        change24h: "+4.8%",
        change7d: "-2.0%",
        assets: "10 ETH",
        avgPurchase: "$2,000",
        profit: "+$2,000",
        profitColor: "text-green-600",
    },
    {
        name: "Cardano",
        price: "$1.20",
        change1h: "-0.3%",
        change24h: "+2.1%",
        change7d: "+5.0%",
        assets: "5000 ADA",
        avgPurchase: "$1.10",
        profit: "+$500",
        profitColor: "text-green-600",
    },
    {
        name: "Polkadot",
        price: "$18.50",
        change1h: "+0.9%",
        change24h: "+3.5%",
        change7d: "-1.0%",
        assets: "120 DOT",
        avgPurchase: "$17.00",
        profit: "+$180",
        profitColor: "text-green-600",
    },
    {
        name: "Ripple (XRP)",
        price: "$0.90",
        change1h: "-0.5%",
        change24h: "+1.8%",
        change7d: "+2.3%",
        assets: "3000 XRP",
        avgPurchase: "$0.85",
        profit: "+$150",
        profitColor: "text-green-600",
    },
    {
        name: "Litecoin",
        price: "$130",
        change1h: "+1.0%",
        change24h: "-0.7%",
        change7d: "+4.5%",
        assets: "50 LTC",
        avgPurchase: "$120",
        profit: "+$500",
        profitColor: "text-green-600",
    },
];

export default function AssetsTable() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selected, setSelected] = useState(options[2]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative shadow-md sm:rounded-lg">
            <div className="flex flex-col flex-wrap items-center justify-between space-y-4 pb-4 sm:flex-row sm:space-y-0">
                <div className="relative w-full sm:w-auto" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setDropdownOpen((open) => !open)}
                        className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-700 dark:hover:bg-gray-700"
                    >
                        <svg
                            className="me-3 h-3 w-3 text-gray-500 dark:text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                        </svg>
                        {selected.label}
                        <svg
                            className="ms-2.5 h-2.5 w-2.5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                            aria-hidden="true"
                        >
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full divide-y divide-gray-100 rounded-lg bg-white shadow-sm sm:w-48 dark:divide-gray-600 dark:bg-gray-700">
                            <ul className="w-full space-y-1 p-3 text-gray-700 text-sm sm:w-auto dark:text-gray-200">
                                {options.map((option) => (
                                    <li key={option.id}>
                                        <button
                                            type="button"
                                            className={`flex w-full items-center rounded-sm p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${selected.id === option.id ? "bg-gray-200 font-semibold dark:bg-gray-600" : ""
                                                }`}
                                            onClick={() => {
                                                setSelected(option);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="filter-radio"
                                                checked={selected.id === option.id}
                                                readOnly
                                                className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                            />
                                            <span className="ms-2">{option.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                
                <div className="relative w-full sm:w-auto">
                    <input
                        type="text"
                        id="table-search"
                        placeholder="Search for items"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-gray-900 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-80 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
                        <svg
                            className="h-5 w-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[0px] text-left text-gray-500 text-sm rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-gray-700 text-xs uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th><th className="px-6 py-3">Price</th><th className="px-6 py-3">1h %</th><th className="px-6 py-3">24h %</th><th className="hidden px-6 py-3 md:table-cell">7d %</th><th className="px-6 py-3">Assets</th><th className="hidden px-6 py-3 md:table-cell">Avg. Purchase Price</th><th className="px-6 py-3">Profit / Loss</th><th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((item) => (
                            <tr key={item.name} className="border-gray-700 border-b bg-gray-800">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</td>
                                <td className="px-6 py-4">{item.price}</td>
                                <td className={`px-6 py-4 ${item.change1h.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{item.change1h}</td>
                                <td className={`px-6 py-4 ${item.change24h.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{item.change24h}</td>
                                <td className={`hidden px-6 py-4 md:table-cell ${item.change7d.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{item.change7d}</td>
                                <td className="px-6 py-4">{item.assets}</td>
                                <td className="hidden px-6 py-4 md:table-cell">{item.avgPurchase}</td>
                                <td className={`px-6 py-4 ${item.profitColor}`}>{item.profit}</td>
                                <td className="px-6 py-4"><button className="font-medium text-blue-600 hover:underline dark:text-blue-500" type="button">Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
