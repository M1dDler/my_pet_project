import ky from "ky";
import type { CoinSummary, Transaction } from "types/types";

export async function createTransaction(portfolioId: number, transaction: Partial<Transaction>, token: string) {
  return await ky.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me/portfolios/${portfolioId}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    json: transaction,
  }).json<Transaction>();
}

export async function getCoinsSummaries(portfolioId: number, token: string) {
  return await ky.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me/portfolios/${portfolioId}/transactions/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).json<CoinSummary[]>();
}
