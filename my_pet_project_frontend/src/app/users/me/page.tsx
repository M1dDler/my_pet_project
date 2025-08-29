"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toast } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import DountChart from "@/components/DoughnutChart";
import LineChart from "@/components/LineChart";
import AssetsTable from "@/components/AssetsTable";
import TransactionsTable from "@/components/TransactionsTable";
import CreatePortfolioForm from "@/components/Sidebar/CreatePortfolioForm";
import DeletePortfolioForm from "@/components/Sidebar/DeletePortfolioItem";
import EditPortfolioForm from "@/components/Sidebar/EditPortfolioForm"
import CreateTransactionForm from "@/components/Dashboard/AddTransactionButtonForms/CreateTransactionForm";
import { usePortfolios } from "@/components/Sidebar/usePortfolios";
import type { CoinSummary, Portfolio, Transaction } from "types/types";
import type { ToastType } from "types/types";
import useSWR, { mutate } from "swr";
import { fetchCoinsSummarytData } from "@/app/api/swr";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "transactions", label: "Transactions" },
];

export default function UserPage() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("info");
  const [toastDescription, setToastDescription] = useState("")
  const [showToast, setShowToast] = useState(false);
  const { data: session, status } = useSession();
  const [isCreatePortfolioFormOpen, setCreatePortfolioFormOpen] = useState(false);
  const [isEditPortfolioFormOpen, setEditPortfolioFormOpen] = useState(false);
  const [isCreateTransactionFormOpen, setCreateTransactionFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isDeletePortfolioFormOpen, setDeletePortfolioFormOpen] = useState(false);
  const [portfolioIdToDelete, setPortfolioIdToDelete] = useState<number | null>(null);
  const [portfolioToEdit, setPortfolioToEdit] = useState<Portfolio | null>(null);
  const handleRequestDeletePortfolio = (id: number) => {
    setPortfolioIdToDelete(id);
    setDeletePortfolioFormOpen(true);
  };

  const handleRequestEditPortfolio = (portfolioToEdit: Portfolio) => {
    setPortfolioToEdit(portfolioToEdit);
    setEditPortfolioFormOpen(true)
  }

  const {
    portfolios,
    setPortfolios,
    loading,
    saveOrder,
  } = usePortfolios();


  const { data: coinsSummaries = [], error } = useSWR<CoinSummary[]>(
  selectedPortfolio ? ["doughnutChart", selectedPortfolio.id] : null,
  fetchCoinsSummarytData
);
  if (error) {
    setToastMessage("Error");
    setToastDescription("Coins Summaries failed to load")
    setToastType("error")
    setShowToast(true)
  }

  if (loading || status === "loading") return <LoadingSpinner />;

  return (
    <div className="flex min-h-screen flex-col bg-[#1a1a1a]">
      <Navbar />
      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          description={toastDescription}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex flex-1">
        <Sidebar
          selectedPortfolio={selectedPortfolio}
          onSelectPortfolio={setSelectedPortfolio}
          onRequestDeletePortfolio={handleRequestDeletePortfolio}
          onRequestEditPortfolio={handleRequestEditPortfolio}
          onOpenCreatePortfolioForm={() => setCreatePortfolioFormOpen(true)}
          portfolios={portfolios ?? []}
          setPortfolios={setPortfolios}
          loading={loading}
          saveOrder={saveOrder}
        />

        <main className="flex min-w-0 max-w-full grow flex-col overflow-x-auto bg-gray-900 px-3 py-3">
          <div className="flex">
            <div className="mb-6">

              <div className="w-fit rounded-xl p-4 text-white">
                <div className="mb-2 flex items-center gap-2 text-gray-400">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full"
                    style={{ backgroundColor: selectedPortfolio?.avatarColor }}>
                    {selectedPortfolio?.avatarIcon}
                  </div>
                  <span>{selectedPortfolio?.name}</span>
                </div>
                <div className="mb-2 font-semibold text-4xl text-white">UAH {selectedPortfolio?.totalValue}</div>
                <div className="text-green-400">
                  +UAH 6,250.57 <span>▲ 0.23% (24г)</span>
                </div>
              </div>

              {selectedPortfolio?.id && (
                <div className="px-3">
                  <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white shadow-md transition duration-200 hover:bg-blue-700 hover:brightness-120 active:scale-95"
                    type="button"
                    onClick={() => { setCreateTransactionFormOpen(true) }}>
                    Add Transaction
                  </button>
                </div>
              )
              }

            </div>
            <div className="my-3 ml-auto hidden sm:flex">
              {coinsSummaries && (
                <DountChart coinsSummaries={coinsSummaries} />
              )}
            </div>
          </div>
          <div>
            <ul className="flex border-gray-600 border-b-2">
              {tabs.map(({ id, label }) => {
                const isActive = id === activeTab;
                return (
                  <li key={id} className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab(id)}
                      className={`select-text font-medium text-[15px] transition-colors ${isActive ? "text-blue-400" : "text-gray-300"
                        } hover:text-blue-300`}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mb-2">
              {activeTab === "overview" && (
                <div className="mt-4">
                  <div className="text-slate-600 text-sm leading-relaxed">
                    <div className="mb-4">
                      <LineChart />
                    </div>
                    <div>
                      <AssetsTable coinsSummaries={coinsSummaries} />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "transactions" && (
                <div className="mt-4">
                  <div className="text-slate-600 text-sm leading-relaxed">
                    {selectedPortfolio && (
                      <TransactionsTable portfolioId={selectedPortfolio.id} />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {isCreatePortfolioFormOpen && session?.accessToken && (
        <CreatePortfolioForm
          onClose={() => setCreatePortfolioFormOpen(false)}
          onSubmit={(newCreatedPortfolio: Portfolio, includeInTotal: boolean) => {
            setToastMessage(`Created - (${includeInTotal})`);
            setToastDescription("Portfolio created successfully")
            setToastType("success")
            setShowToast(true);
            setSelectedPortfolio(newCreatedPortfolio);
            setPortfolios((prev) => [...prev, newCreatedPortfolio]);
            setCreatePortfolioFormOpen(false);
          }}
        />
      )}
      {isDeletePortfolioFormOpen && portfolioIdToDelete && session?.accessToken && (
        <DeletePortfolioForm
          portfolioId={portfolioIdToDelete}
          onClose={() => setDeletePortfolioFormOpen(false)}
          onDeleted={() => {
            setToastMessage("Deleted");
            setToastDescription("Portfolio deleted successfully")
            setToastType("success")
            setShowToast(true);
            setPortfolioIdToDelete(null);
            if (selectedPortfolio != null && portfolioIdToDelete === selectedPortfolio.id) {
              setSelectedPortfolio(null);
            }
            setPortfolios((prev) => prev.filter((p) => p.id !== portfolioIdToDelete));
          }}
        />
      )}
      {isEditPortfolioFormOpen && portfolioToEdit && session?.accessToken && (
        <EditPortfolioForm
          portfolioToEdit={portfolioToEdit}
          onClose={() => setEditPortfolioFormOpen(false)}
          onSubmit={(_editedPortfolio: Portfolio) => {
            setEditPortfolioFormOpen(false);
          }}
        />
      )}
      {isCreateTransactionFormOpen && selectedPortfolio?.id && session?.accessToken && (
        <CreateTransactionForm
          portfolio={selectedPortfolio}
          onClose={() => setCreateTransactionFormOpen(false)}
          onCreated={(_newCreatedTransaction: Transaction) => {
            setToastMessage("Created");
            setToastDescription("Transaction created successfully");
            setToastType("success")
            setShowToast(true);
            mutate(["doughnutChart", selectedPortfolio.id])
          }}
          onError={(message: string) => {
            setToastMessage("Error");
            setToastDescription(message)
            setToastType("error")
            setShowToast(true);
          }}
        />
      )}
    </div>
  );
}