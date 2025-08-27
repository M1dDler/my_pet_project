import { getSession } from "next-auth/react";
import { getListOfCoinsQuantitiesFromTransactions } from "@/app/api/transactions";

export async function fetchDoughnutChartData(key: Array<string>) {
  const session = await getSession();
  if (!session?.accessToken) return [];

  const portfolioId = Number(key[1]);
  return await getListOfCoinsQuantitiesFromTransactions(portfolioId, session.accessToken);
}