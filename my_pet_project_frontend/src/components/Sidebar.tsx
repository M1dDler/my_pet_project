"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import ky from "ky";
import { getSession } from "next-auth/react";
import { PencilIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "./LoadingSpinner";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

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

const LS_KEY = "portfolioOrder";

function SortablePortfolioItem({
  portfolio,
  isActive,
  onSelectPortfolio,
  isEditMode,
}: {
  portfolio: Portfolio;
  isActive: boolean;
  onSelectPortfolio: (id: number) => void;
  isEditMode: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: portfolio.id,
  });

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

  function handleEdit(e: React.MouseEvent) {
    e.stopPropagation();
    alert(`Edit portfolio ${portfolio.name}`);
    setMenuOpen(false);
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    alert(`Delete portfolio ${portfolio.name}`);
    setMenuOpen(false);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`mb-4 flex items-center gap-4 rounded-lg p-2 text-left relative ${
        isActive
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
        onClick={() => onSelectPortfolio(portfolio.id)}
        aria-label={`Select portfolio ${portfolio.name}`}
        className="flex flex-1 items-center gap-4 text-left"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="h-6 w-6"
            role="img"
            aria-labelledby={`iconTitle-${portfolio.id}`}
          >
            <title id={`iconTitle-${portfolio.id}`}>User icon</title>
            <path d="M12 2C10 2 8.5 4 8.5 6S10 10 12 10 15.5 8 15.5 6 14 2 12 2zm0 12c-2 0-6 1-6 4v2h12v-2c0-3-4-4-6-4z" />
          </svg>
        </div>
        <div>
          {isEditMode ? (
            <div className="max-w-[115px] truncate font-semibold text-white">{portfolio.name}</div>
          ) : (
            <div className="max-w-[200px] truncate font-semibold text-white">{portfolio.name}</div>
          )}
          <div className="text-gray-300 text-xs">
            USD {portfolio.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
      </button>

      {isEditMode && (
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
              className="h-6 w-6"
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
            <div className="absolute right-0 top-full mt-1 w-24 rounded bg-gray-700 p-1 shadow-lg z-10">
              <button
                type="button"
                onClick={handleEdit}
                className="block w-full rounded px-2 py-1 text-left text-white hover:bg-gray-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="block w-full rounded px-2 py-1 text-left text-white hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
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
  const [isEditMode, setIsEditMode] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const prevEditMode = useRef(isEditMode);

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

        const savedOrder = localStorage.getItem(LS_KEY);
        let orderedPortfolios = data;

        if (savedOrder) {
          const order = JSON.parse(savedOrder) as number[];
          orderedPortfolios = order
            .map((id) => data.find((p) => p.id === id))
            .filter(Boolean) as Portfolio[];

          const missingPortfolios = data.filter((p) => !order.includes(p.id));
          orderedPortfolios = [...orderedPortfolios, ...missingPortfolios];
        }

        setPortfolios(orderedPortfolios);

        if (orderedPortfolios.length > 0 && !selectedPortfolioId) {
          onSelectPortfolio(orderedPortfolios[0].id);
        }
      } catch (_) {
        setErrorMessage("Помилка завантаження портфоліо");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [router, onSelectPortfolio, selectedPortfolioId]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPortfolios((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
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

  if (errorMessage) return <div className="p-4 text-red-400">{errorMessage}</div>;

  return (
    <div className="hidden h-full w-80 min-w-[320px] flex-col overflow-hidden bg-[#1a1a1a] p-5 text-white md:flex">
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

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={portfolios.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {portfolios.length !== 0 &&
            portfolios.map((portfolio) => (
              <SortablePortfolioItem
                key={portfolio.id}
                portfolio={portfolio}
                isActive={selectedPortfolioId === portfolio.id}
                onSelectPortfolio={onSelectPortfolio}
                isEditMode={isEditMode}
              />
            ))}
        </SortableContext>
      </DndContext>

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
