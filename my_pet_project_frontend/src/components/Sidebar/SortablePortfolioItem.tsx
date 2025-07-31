"use client";

import { useEffect, useState, useRef } from "react";
import {
    useSortable,
    type UseSortableArguments,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Portfolio } from "./types";

interface SortablePortfolioItemProps {
    portfolio: Portfolio;
    isActive: boolean;
    isEditMode: boolean;
    onSelectPortfolio: (id: number | null) => void;
    onRequestDeletePortfolio: (id: number) => void;
    onRequestEditPortfolio: (portfolioToEdit: Portfolio) => void;
}

export default function SortablePortfolioItem({
    portfolio,
    isActive,
    onSelectPortfolio,
    isEditMode,
    onRequestDeletePortfolio,
    onRequestEditPortfolio,
}: SortablePortfolioItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: portfolio.id,
    } as UseSortableArguments);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    function handleEdit() {
        onRequestEditPortfolio(portfolio);
        setMenuOpen(false);
    }

    function handleDelete() {
        onRequestDeletePortfolio(portfolio.id);
        setMenuOpen(false);
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative mb-4 flex items-center gap-4 rounded-lg p-2 text-left ${isActive
                ? "bg-gray-700 bg-opacity-40 hover:bg-gray-800"
                : "bg-[#1a1a1a] hover:bg-gray-800"
                } hover:bg-opacity-60`}
        >
            {isEditMode && (
                <button
                    {...listeners}
                    {...attributes}
                    type="button"
                    aria-label={`Drag to reorder portfolio ${portfolio.name}`}
                    className="cursor-move p-1 text-gray-400 hover:text-gray-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        role="img"
                        aria-labelledby={`dragIconTitle-${portfolio.id}`}
                    >
                        <title id={`dragIconTitle-${portfolio.id}`}>Drag handle</title>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 15h8" />
                    </svg>
                </button>
            )}

            <button
                type="button"
                onClick={isEditMode ? undefined : () => onSelectPortfolio(portfolio.id)}
                aria-label={`Select portfolio ${portfolio.name}`}
                className="flex flex-1 items-center gap-4 text-left"
            >
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: portfolio.avatarColor }}
                >
                    {portfolio.avatarIcon}
                </div>
                <div>
                    {isEditMode ? (
                        <div className="max-w-[115px] truncate font-semibold text-white">{portfolio.name}</div>
                    ) : (
                        <div className="max-w-[200px] truncate font-semibold text-white">{portfolio.name}</div>
                    )}
                    <div className="text-gray-300 text-xs">
                        USD {(portfolio?.totalValue ?? 0).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                        })}
                    </div>
                </div>
            </button>

            {
                isEditMode && (
                    <div ref={menuRef} className="relative">
                        <button
                            type="button"
                            aria-label={`Open menu for portfolio ${portfolio.name}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setMenuOpen((open) => !open);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                role="img"
                                aria-labelledby={`menuIconTitle-${portfolio.id}`}
                            >
                                <title id={`menuIconTitle-${portfolio.id}`}>Menu</title>
                                <circle cx="12" cy="5" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="12" cy="19" r="1.5" />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div className="absolute top-full right-0 z-50 mt-4 w-40 rounded-lg bg-gray-800 p-2 shadow-xl ring-1 ring-black ring-opacity-30">
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h6m-3 3v12M4 19h12" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3a2 2 0 012 2v4" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-red-700 transition-colors hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 flex-shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Delete
                                </button>
                            </div>

                        )}
                    </div>
                )
            }
        </div >
    );
}
