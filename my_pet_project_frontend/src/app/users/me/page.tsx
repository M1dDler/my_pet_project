"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toast } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import DountChart from "@/components/DountChart";
import LineChart from "@/components/LineChart";
import TransactionsTable from "@/components/AssetsTable";
import CreatePortfolioForm from "@/components/CreatePortfolioForm";
import DeletePortfolioForm from "@/components/Sidebar/DeletePortfolioItem";
import EditPortfolioForm from "@/components/Sidebar/EditPortfolioForm"
import { usePortfolios } from "@/components/Sidebar/usePortfolios";
import type { Portfolio } from "@/components/Sidebar/types";
import type { ToastType } from "types/toastTypes";

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
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);
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
          selectedPortfolioId={selectedPortfolioId}
          onSelectPortfolio={setSelectedPortfolioId}
          onRequestDeletePortfolio={handleRequestDeletePortfolio}
          onRequestEditPortfolio={handleRequestEditPortfolio}
          onOpenCreatePortfolioForm={() => setCreatePortfolioFormOpen(true)}
          portfolios={portfolios ?? []}
          setPortfolios={setPortfolios}
          loading={loading}
          saveOrder={saveOrder}
        />

        <main className="flex min-w-0 max-w-full grow flex-col overflow-x-auto bg-gray-900 px-3 py-3">
          {selectedPortfolioId && (
            <div className="mb-4 text-gray-400 text-sm">
              Portfolio ID: {selectedPortfolioId}
            </div>
          )}
          <div className="flex">
            <div className="mb-6">

              <div className="w-fit rounded-xl p-4 text-white">
                <div className="mb-2 flex items-center gap-2 text-gray-400">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="white"
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                    >
                      <title id="iconTitle">User icon</title>
                      <path d="M12 2C10 2 8.5 4 8.5 6S10 10 12 10 15.5 8 15.5 6 14 2 12 2zm0 12c-2 0-6 1-6 4v2h12v-2c0-3-4-4-6-4z" />
                    </svg>
                  </div>
                  <span>MyPortfolio</span>
                </div>
                <div className="mb-2 font-semibold text-4xl text-white">UAH 2,728,786.88</div>
                <div className="text-green-400">
                  +UAH 6,250.57 <span>▲ 0.23% (24г)</span>
                </div>
              </div>

              <div className="px-3">
                <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-sm text-white shadow-md transition hover:bg-blue-700" type="button">
                  Add Transaction
                </button>
              </div>

            </div>
            <div className="my-3 ml-auto hidden sm:flex">
              <DountChart />
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

            <div className="">
              {activeTab === "overview" && (
                <div>
                  <h4 className="font-semibold text-base text-slate-900">Overview</h4>
                  <div className="text-slate-600 text-sm leading-relaxed">
                    <div className="mb-4">
                      <LineChart />
                    </div>
                    <div>
                      <TransactionsTable />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "transactions" && (
                <div>
                  <h4 className="font-semibold text-base text-slate-900">Transactions</h4>
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    Transactions.
                  </p>
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
            setSelectedPortfolioId(newCreatedPortfolio.id);
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
            if (portfolioIdToDelete === selectedPortfolioId) {
              setSelectedPortfolioId(null);
            }
            setPortfolios((prev) => prev.filter((p) => p.id !== portfolioIdToDelete));
          }}
        />
      )}
      {isEditPortfolioFormOpen && portfolioToEdit && session?.accessToken && (
        <EditPortfolioForm
          portfolioToEdit={portfolioToEdit}
          onClose={() => setEditPortfolioFormOpen(false)}
          onSubmit={(_newCreatedPortfolio: Portfolio) => {
            setEditPortfolioFormOpen(false);
          }}
        />
      )}
    </div>
  );
}