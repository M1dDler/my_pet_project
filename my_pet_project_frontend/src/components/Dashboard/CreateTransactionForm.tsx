"use client";

import { useState } from "react";
import { getSession } from "next-auth/react";
import ky from "ky";
import { XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import type { Transaction, Portfolio } from "../Sidebar/types";

interface CreateTransactionFormProps {
    portfolio: Portfolio & { id: number };
    onClose: () => void;
    onCreated: (newTransaction: Transaction) => void;
}

export default function CreateTransactionForm({
    portfolio,
    onClose,
    onCreated,
}: CreateTransactionFormProps) {
    const [form, setForm] = useState({
        transactionType: "Buy",
        coinName: "BTC",
        quantity: "",
        pricePerUnit: "",
        transactionDate: new Date().toISOString().slice(0, 16),
        fee: "0",
        note: "",
    });

    const [loading, setLoading] = useState(false);
    const quantityNum = Number.parseFloat(form.quantity) || 0;
    const priceNum = Number.parseFloat(form.pricePerUnit) || 0;
    const feeNum = Number.parseFloat(form.fee) || 0;
    const totalSpent = quantityNum * priceNum - feeNum;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const session = await getSession();
            if (!session?.accessToken) {
                setLoading(false);
                return;
            }

            const responseNewTransactionData = await ky.post(
                `http://localhost:8080/api/v1/users/me/portfolios/${portfolio.id}/transactions`,
                {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        "Content-Type": "application/json",
                    },
                    json: form,
                }
            );

            if (!responseNewTransactionData.ok) {
                setLoading(false);
                return;
            }

            const newTransaction = (await responseNewTransactionData.json()) as Transaction;
            onCreated(newTransaction);
            onClose();
        } catch (_) {
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="relative w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
                    type="button"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <h2 className="mb-5 font-semibold text-white text-xl">Add Transaction</h2>

                {/* Кнопки-перемикачі для типу транзакції */}
                <div className="mb-6 flex gap-3">
                    {["Buy", "Sell", "Transfer"].map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, transactionType: type }))}
                            className={`flex-1 rounded-md px-4 py-2 font-medium text-sm transition duration-50 hover:brightness-120 active:scale-95 ${form.transactionType === type
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        <select
                            id="coinName"
                            name="coinName"
                            value={form.coinName}
                            onChange={handleChange}
                            required
                            className="w-2/1 rounded-md border border-gray-300 bg-gray-700 px-3 py-2 text-sm text-white shadow-sm"
                        >
                            <option value="BTC">Bitcoin BTC</option>
                            <option value="ETH">Ethereum ETH</option>
                            <option value="USDT">Tether USDT</option>
                            <option value="ADA">Cardano ADA</option>
                            <option value="SOL">Solana SOL</option>
                        </select>

                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            placeholder="Quantity"
                            className="w-full rounded-md border border-gray-300 bg-gray-700 px-3 py-2 text-sm text-white shadow-sm"
                            step={1}
                            min={0}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="number"
                            name="pricePerUnit"
                            value={form.pricePerUnit}
                            onChange={handleChange}
                            placeholder="Price per coin"
                            className="w-full rounded-md border border-gray-300 bg-gray-700 py-2 pr-3 pl-8 text-sm text-white shadow-sm"
                            step={0.01}
                            min={0}
                        />
                        <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 select-none text-white">$</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="transactionDate"
                            type="datetime-local"
                            name="transactionDate"
                            value={form.transactionDate}
                            onChange={handleChange}
                            required
                            className="flex-grow rounded-md border border-gray-300 bg-gray-700 px-3 py-2 text-sm text-white shadow-sm"
                        />

                        <button
                            type="button"
                            className="flex items-center gap-1 rounded-md bg-gray-700 px-3 py-2 text-sm text-white shadow-sm transition duration-50 hover:bg-gray-600 hover:brightness-120 active:scale-95"
                        >
                            $Fee
                        </button>

                        <button
                            type="button"
                            className="flex items-center gap-1 rounded-md bg-gray-700 px-3 py-2 text-sm text-white shadow-sm transition duration-50 hover:bg-gray-600 hover:brightness-120 active:scale-95"
                        >
                            <PencilIcon className="h-4 w-4" /> Notes
                        </button>
                    </div>

                    <div className="flex rounded-md bg-gray-700 p-2.5 text-center font-semibold text-md text-white">
                        <div>Total Spent:</div>
                        <div className="ml-auto">
                            <span className="text-white">{totalSpent.toFixed(2)} $</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition duration-50 hover:bg-blue-700 hover:brightness-120 active:scale-95"
                        type="button"
                    >
                        {loading ? "Adding..." : "Add Transaction"}
                    </button>
                </div>
            </div>
        </div>
    );
}
