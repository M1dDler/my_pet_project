import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

interface Portfolio {
  id: number;
  name: string;
  totalValue: number;
}

export default function handleDragEnd(
  event: DragEndEvent,
  portfolios: Portfolio[],
  setPortfolios: (p: Portfolio[]) => void
) {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    const oldIndex = portfolios.findIndex((item) => item.id === active.id);
    const newIndex = portfolios.findIndex((item) => item.id === over.id);
    const newOrder = arrayMove(portfolios, oldIndex, newIndex);
    setPortfolios(newOrder);
  }
}
