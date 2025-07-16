"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ky from "ky";
import { getSession } from "next-auth/react";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "./LoadingSpinner";

interface Portfolio {
    id: number;
    name: string;
    totalValue: number;
}

interface SidebarProps {
    onSelectPortfolio: (id: number) => void;
    selectedPortfolioId: number | null;
    onOpenCreatePortfolioForm: () => void;
}

export default function Sidebar({
    onSelectPortfolio,
    selectedPortfolioId,
    onOpenCreatePortfolioForm,
}: SidebarProps) {
    const router = useRouter();

    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
    useEffect(() => {
        const fetchPortfolios = async () => {
            const session = await getSession();

            if (!session?.accessToken) {
                router.push("/login");
                return;
            }

            try {
                const response = await ky.get("http://localhost:8080/api/v1/users/me/portfolios", {
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                    throwHttpErrors: false,
                });

                if (!response.ok) throw new Error("Не вдалося завантажити портфоліо");

                const data = (await response.json()) as Portfolio[];
                setPortfolios(data);

                if (data.length > 0 && !selectedPortfolioId) {
                    onSelectPortfolio(data[0].id);
                }
            } catch (_) {
                setErrorMessage("Помилка завантаження портфоліо");
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, [router, onSelectPortfolio, selectedPortfolioId]);

    if (loading) return <div className="flex h-full w-80 min-w-[320px] items-center justify-center bg-[#1a1a1a] text-white">
        <LoadingSpinner />
    </div>
    if (errorMessage) return <div className="p-4 text-red-400">{errorMessage}</div>;

    return (
        <div className="hidden h-full w-80 min-w-[320px] flex-col overflow-hidden bg-[#1a1a1a] p-5 text-white md:flex">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="font-semibold text-lg">My portfolios ({portfolios.length})</h2>
                {portfolios.length !== 0 && (
                    <PencilIcon className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-200" />
                )}
            </div>

            {portfolios.length !== 0 && (
                portfolios.map((portfolio) => {
                    const isActive = selectedPortfolioId === portfolio.id;
                    return (
                        <button
                            key={portfolio.id}
                            type="button"
                            className={`mb-4 flex cursor-pointer items-center gap-4 rounded-lg p-2 text-left ${isActive ? "bg-gray-700 bg-opacity-40 hover:bg-gray-800" : "bg-[#1a1a1a] hover:bg-gray-800"
                                } hover:bg-opacity-60`}
                            onClick={() => onSelectPortfolio(portfolio.id)}
                        >

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6"
                                    role="img"
                                    aria-labelledby="iconTitle"
                                >
                                    <title id="iconTitle">User icon</title>
                                    <path d="M12 2C10 2 8.5 4 8.5 6S10 10 12 10 15.5 8 15.5 6 14 2 12 2zm0 12c-2 0-6 1-6 4v2h12v-2c0-3-4-4-6-4z" />
                                </svg>
                            </div>
                            <div>
                                <div className="max-w-[200px] truncate font-semibold text-white">{portfolio.name}</div>
                                <div className="text-gray-300 text-xs">
                                    USD {portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                        </button>
                    );
                })
            )}

            <button
                type="button"
                className="mt-2 flex items-center gap-2 font-medium text-gray-400 hover:underline"
                onClick={onOpenCreatePortfolioForm}
            >
                <PlusIcon className="h-5 w-5" />
                <span>Create new portfolio</span>
            </button>
        </div>
    );
}
