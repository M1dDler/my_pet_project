export type ToastType = "info" | "success" | "warning" | "error";

export interface Portfolio {
  id: number;
  name: string;
  totalValue: number;
  position: number;
  includeInTotal: boolean;
  avatarIcon: string;
  avatarColor: string;
}

export interface Transaction {
  id: number;
  coinName: string;
  quantity: string;
  pricePerUnit: string;
  transactionDate: string;
  fee: string;
  note: string;
}

export interface CoinSummary {
    coinName: string;
    currentPricePerUnit: string;
    profitChangePercentage1h: number;
    profitChangePercentage24h: number;
    profitChangePercentage7d: number;
    quantity: string;
    avgBuy: string;
    profitLoss: string;
}
