import { getSession } from "next-auth/react";
import { getCoinsSummaries } from "@/app/api/transactions";

export async function fetchCoinsSummarytData(key: Array<string>) {
  const session = await getSession();
  if (!session?.accessToken) return [];

  const portfolioId = Number(key[1]);
  return await getCoinsSummaries(portfolioId, session.accessToken);
}