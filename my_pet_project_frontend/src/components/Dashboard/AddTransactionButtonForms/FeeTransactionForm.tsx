"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface FeeTransactionFormProps {
    initialFee?: string;
    onClose: () => void;
    onSave: (fee: string) => void;
}

export default function FeeTransactionForm({
    initialFee = "0",
    onClose,
    onSave,
}: FeeTransactionFormProps) {
    const [fee, setFee] = useState(initialFee);

    const handleSave = () => {
        onSave(fee.trim());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="relative w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-lg">
                <div className="mb-5 flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition-colors hover:text-gray-200"
                        type="button"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <h2 className="flex-1 font-semibold text-lg text-white">
                        Transaction Fee
                    </h2>
                </div>


                <div className="relative">
                    <input
                        type="number"
                        step="0.0001"
                        min="0"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        placeholder="Enter fee"
                        className="w-full rounded-md border border-gray-300 bg-gray-700 py-2 pr-3 pl-8 text-sm text-white shadow-sm"
                    />
                    <span className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 select-none text-white">
                        $
                    </span>
                </div>

                <div className="mt-1 mb-4 ml-1 text-left text-gray-400 text-xs">
                    Enter the transaction fee (if applicable)
                </div>

                <button
                    onClick={handleSave}
                    type="button"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition duration-50 hover:bg-blue-700 active:scale-95"
                >
                    Save Fee
                </button>
                
            </div>
        </div>
    );
}
