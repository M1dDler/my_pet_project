"use client";

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { getSession } from "next-auth/react";

interface TransactionDTO {
    id: number;
    transactionType: "Buy" | "Sell" | "TransferIn" | "TransferOut";
    transactionDate: string;
    coinName: string;
    symbol: string;
    pricePerUnit: number;
    quantity: number;
    fee?: number;
    note?: string;
}

interface PagedResponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

const typeOptions = [
    { id: "all", label: "All Types" },
    { id: "Buy", label: "Buy" },
    { id: "Sell", label: "Sell" },
    { id: "TransferIn", label: "Transfer In" },
    { id: "TransferOut", label: "Transfer Out" },
];

const coinOptions = [
    { id: "all", label: "All Coins" },
    { id: "BTC", label: "BTC" },
    { id: "ETH", label: "ETH" },
];

const itemsPerPageOptions = [5, 10, 20, 50];

function Dropdown({
    options,
    selected,
    onChange,
}: {
    options: { id: string; label: string }[];
    selected: { id: string; label: string };
    onChange: (opt: { id: string; label: string }) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full sm:w-auto">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-gray-700 dark:hover:bg-gray-700"
            >
                {selected.label}
                <svg
                    className="ms-2.5 h-2.5 w-2.5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                >
                    <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <div className="absolute z-10 mt-1 w-full divide-y divide-gray-100 rounded-lg bg-white shadow-sm sm:w-48 dark:divide-gray-600 dark:bg-gray-700">
                    <ul className="w-full space-y-1 p-3 text-gray-700 text-sm sm:w-auto dark:text-gray-200">
                        {options.map((opt) => (
                            <li key={opt.id}>
                                <button
                                    type="button"
                                    className={`flex w-full items-center rounded-sm p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 ${selected.id === opt.id
                                        ? "bg-gray-200 font-semibold dark:bg-gray-600"
                                        : ""
                                        }`}
                                    onClick={() => {
                                        onChange(opt);
                                        setOpen(false);
                                    }}
                                >
                                    {opt.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default function TransactionsTable({ portfolioId }: { portfolioId: number }) {
    const [transactionsPage, setTransactionsPage] = useState<PagedResponse<TransactionDTO> | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectedType, setSelectedType] = useState(typeOptions[0]);
    const [selectedCoin, setSelectedCoin] = useState(coinOptions[0]);
    const [loading, setLoading] = useState(false);

    const fetchTransactions = useCallback(async () => {
        setLoading(true);

        const params = new URLSearchParams();
        params.append("page", String(currentPage));
        params.append("size", String(itemsPerPage));

        if (selectedType.id !== "all") {
            params.append("transactionType", selectedType.id);
        }

        if (selectedCoin.id !== "all") {
            params.append("coinName", selectedCoin.id);
        }

        const queryString = params.toString();

        const session = await getSession();
        if (!session?.accessToken) return;

        const res = await fetch(
            `http://localhost:8080/api/v1/users/me/portfolios/${portfolioId}/transactions?${queryString}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            setTransactionsPage({ content: [], page: 0, size: itemsPerPage, totalElements: 0, totalPages: 0 });
            setLoading(false);
            return;
        }

        const data = await res.json();
        setTransactionsPage(data);
        setLoading(false);
    }, [currentPage, itemsPerPage, portfolioId, selectedType, selectedCoin]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const totalPages = transactionsPage?.totalPages || 1;

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="relative sm:rounded-lg">
            <div className="flex flex-wrap items-center justify-start gap-4 pb-4">
                <Dropdown
                    options={typeOptions}
                    selected={selectedType}
                    onChange={(opt) => {
                        setSelectedType(opt);
                        setCurrentPage(1);
                    }}
                />
                <Dropdown
                    options={coinOptions}
                    selected={selectedCoin}
                    onChange={(opt) => {
                        setSelectedCoin(opt);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="w-full overflow-x-auto shadow-md">
                <table className="w-full min-w-[0px] text-left text-gray-500 text-sm rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-gray-700 text-xs uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Assets</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Fees</th>
                            <th className="px-6 py-3">Notes</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="py-4">
                                    <div className="flex items-center justify-center gap-2 text-white">
                                        <span>Loading...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactionsPage?.content.map((tx) => (
                                <tr key={tx.id} className="border-gray-700 border-b bg-gray-800 text-sm text-white">
                                    <td className="px-6 py-4 font-medium">
                                        <span
                                            className={`inline-flex items-center gap-2 font-semibold ${tx.transactionType === "Buy" || tx.transactionType === "TransferIn"
                                                ? "text-green-500"
                                                : "text-red-500"}`}
                                        >
                                            {tx.transactionType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(tx.transactionDate).toLocaleString()}</td>
                                    <td className="px-6 py-4 font-medium">
                                        {tx.coinName}
                                    </td>
                                    <td className="px-6 py-4">{tx.pricePerUnit ? `$${tx.pricePerUnit.toLocaleString()}` : "--"}</td>
                                    <td className="px-6 py-4 font-semibold">
                                        <span className={tx.quantity > 0 ? "text-green-500" : "text-red-500"}>
                                            {tx.quantity > 0 ? `+${tx.quantity}` : `${tx.quantity}`} <span>{tx.coinName}</span>
                                        </span>
                                        {tx.pricePerUnit ? (
                                            <>
                                                <br />
                                                <span className="text-xs">
                                                    ${Math.abs(tx.quantity * tx.pricePerUnit).toLocaleString()}
                                                </span>
                                            </>
                                        ): (<br />)}
                                    </td>
                                    <td className="px-6 py-4">{tx.fee ? `$${tx.fee.toFixed(4)}` : "--"}</td>
                                    <td className="px-6 py-4">{tx.note || "--"}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button className="rounded-lg bg-gray-700 p-1 hover:bg-gray-600" type="button">
                                                <Pencil className="h-4 w-4 text-white" />
                                            </button>
                                            <button className="rounded-lg bg-gray-700 p-1 hover:bg-gray-600" type="button">
                                                <Trash2 className="h-4 w-4 text-white" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-end gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white">Display</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="rounded border border-gray-600 px-1 py-2 text-white"
                    >
                        {itemsPerPageOptions.map((opt) => (
                            <option key={opt} value={opt} className="bg-gray-900 text-white hover:bg-gray-700">
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded border border-gray-600 px-3 py-1.5 transition duration-100 hover:brightness-120 active:scale-85"
                        type="button"
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`rounded border border-gray-600 px-3 py-1.5 text-white transition duration-100 hover:brightness-120 active:scale-85 ${currentPage === page ? "bg-gray-600" : "bg-gray-900 hover:bg-gray-800"
                                }`}
                            type="button"
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="rounded border border-gray-600 px-3 py-1.5 transition duration-100 hover:brightness-120 active:scale-85"
                        type="button"
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
    );
}
