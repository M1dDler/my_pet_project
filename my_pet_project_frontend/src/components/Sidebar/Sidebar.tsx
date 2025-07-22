"use client";

import { useEffect, useState, useRef } from "react";
import { PencilIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import LoadingSpinner from "../LoadingSpinner";
import SortablePortfolioItem from "./SortablePortfolioItem";
import handleDragEnd from "./usePortfolioDrag";
import { usePortfolios } from "./usePortfolios";

interface SidebarProps {
  onSelectPortfolio: (id: number | null) => void;
  selectedPortfolioId: number | null;
  onOpenCreatePortfolioForm: () => void;
  onRequestDeletePortfolio: (id: number) => void;
}

export default function Sidebar({
  onSelectPortfolio,
  selectedPortfolioId,
  onOpenCreatePortfolioForm,
  onRequestDeletePortfolio,
}: SidebarProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const prevEditMode = useRef(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const {
    portfolios,
    setPortfolios,
    loading,
  } = usePortfolios(selectedPortfolioId, onSelectPortfolio);

  useEffect(() => {
    const LS_KEY = "portfolioOrder";
    if (prevEditMode.current && !isEditMode) {
      localStorage.setItem(LS_KEY, JSON.stringify(portfolios.map((p) => p.id)));
    }
    prevEditMode.current = isEditMode;
  }, [isEditMode, portfolios]);

  if (loading)
    return (
      <div className="flex h-full w-80 min-w-[320px] items-center justify-center bg-[#1a1a1a] text-white">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="hidden h-full w-80 min-w-[320px] flex-col overflow-hidden bg-[#1a1a1a] p-5 text-white md:flex">
      <div className={`relative mb-4 flex items-center gap-4 rounded-lg p-2 text-left ${selectedPortfolioId===null
        ? "bg-gray-700 bg-opacity-40 hover:bg-gray-800"
        : "bg-[#1a1a1a] hover:bg-gray-800"
        } hover:bg-opacity-60`}
      >
        <button
          type="button"
          className="flex flex-1 items-center gap-4 text-left"
          onClick={() => onSelectPortfolio(null)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              role="img"
            >
              <title>Review all portfolios</title>
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
          </div>
          <div className="max-w-[200px] truncate font-semibold text-white">
            Review
            <div className="text-gray-300 text-xs">
              USD {portfolios.reduce((acc, p) => acc + p.totalValue, 0).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </button>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-semibold text-lg">My portfolios ({portfolios.length})</h2>
        {portfolios.length !== 0 && (
          <button
            type="button"
            aria-label={isEditMode ? "Disable edit mode" : "Enable edit mode"}
            onClick={() => setIsEditMode((prev) => !prev)}
            className="focus:outline-none"
          >
            {isEditMode ? (
              <CheckIcon className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-200" />
            ) : (
              <PencilIcon className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-200" />
            )}
          </button>
        )}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={(e) => handleDragEnd(e, portfolios, setPortfolios)}
      >
        <SortableContext items={portfolios.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {portfolios.length !== 0 &&
            portfolios.map((portfolio) => (
              <SortablePortfolioItem
                key={portfolio.id}
                portfolio={portfolio}
                isActive={selectedPortfolioId === portfolio.id}
                onSelectPortfolio={onSelectPortfolio}
                isEditMode={isEditMode}
                onRequestDeletePortfolio={onRequestDeletePortfolio}
              />
            ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        className="mt-2 mb-10 flex items-center gap-2 font-medium text-gray-400 hover:underline"
        onClick={onOpenCreatePortfolioForm}
      >
        <PlusIcon className="h-5 w-5" />
        <span>Create new portfolio</span>
      </button>
    </div>
  );
}
