"use client";

import { useState } from "react";
import ky from "ky";
import { getSession } from "next-auth/react";

interface DeletePortfolioFormProps {
    portfolioId: number;
    onClose: () => void;
    onDeleted: () => void;
}

export default function DeletePortfolioForm({
    portfolioId,
    onClose,
    onDeleted,
}: DeletePortfolioFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        setLoading(true);
        setError("");
        
        try {
            const session = await getSession();
            if (!session?.accessToken) {
                setError("Not authenticated");
                setLoading(false);
                return;
            }

            const response = await ky.delete(`http://localhost:8080/api/v1/users/me/portfolios/${portfolioId}`, {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete portfolio");
            }

            onDeleted();
            onClose();
        } catch (_) {
            setError("Failed to delete portfolio");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="relative w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-xl">
                <h2 className="mb-4 font-bold text-white text-xl">Confirm Deletion</h2>
                <p className="mb-6 text-gray-300">
                    Are you sure you want to delete this portfolio? This action cannot be undone.
                </p>

                {error && <p className="mb-4 text-red-500">{error}</p>}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
                        disabled={loading}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        disabled={loading}
                        type="button"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}
