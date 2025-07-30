"use client";

import { useState } from "react";
import { Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getSession } from "next-auth/react";
import ky from "ky";
import type { Portfolio } from "./Sidebar/types";
import AvatarPickerButton from "./Sidebar/AvatarPickerButton";
import AvatarPickerModal from "./Sidebar/AvatarPickerModal";
import { Toast } from "./Toast";
import type { ToastType } from "types/toastTypes";

interface CreatePortfolioModalProps {
  onClose: () => void;
  onSubmit: (newCreatedPortfolio: Portfolio, includeInTotal: boolean) => void;
}

export default function CreatePortfolioForm({ onClose, onSubmit }: CreatePortfolioModalProps) {
  const [portfolioName, setPortfolioName] = useState("");
  const [includeInTotal, setIncludeInTotal] = useState(true);
  const MAX_LENGTH = 30;
  const [avatar, setAvatar] = useState("👻");
  const [color, setColor] = useState("#8b5cf6");
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("info");
  const [toastDescription, setToastDescription] = useState("")
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async () => {
    if (!portfolioName.trim()) {
      setToastMessage("Field Empty");
      setToastDescription("Please, enter portfolio name")
      setToastType("info");
      setShowToast(true)
      return;
    }

    const session = await getSession();
    if (!session?.accessToken) {
      alert("Unauthorized");
      return;
    }

    try {
      const response = await ky.post("http://localhost:8080/api/v1/users/me/portfolios", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        json: { name: portfolioName.trim(), 
                includeInTotal: includeInTotal,
                avatarIcon: avatar,
                avatarColor: color,
              },
      });

      if (!response.ok) throw new Error("Failed to create a new portfolio");

      const newCreatedPortfolio = await response.json() as Portfolio

      onSubmit(newCreatedPortfolio, includeInTotal);
      setPortfolioName("");
    } catch (_) {
      alert("Failed to create a new portfolio");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-60" />
      {showToast && (
        <Toast
          type={toastType}
          message={toastMessage}
          description={toastDescription}
          onClose={() => setShowToast(false)}
        />
      )}
      {showAvatarModal ? (
        <AvatarPickerModal
          selectedAvatar={avatar}
          selectedColor={color}
          onClose={() => setShowAvatarModal(false)}
          onSave={(newAvatar, newColor) => {
            setAvatar(newAvatar);
            setColor(newColor);
            setShowAvatarModal(false);
          }}
        />
      ) : (
        <div className="relative w-full max-w-md rounded-xl bg-gray-800 p-6 shadow-lg">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            type="button"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          <h2 className="mb-4 font-semibold text-gray-900 text-xl dark:text-white">
            Create New Portfolio
          </h2>

          <div className="flex items-center">
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => {
                if (e.target.value.length <= MAX_LENGTH) {
                  setPortfolioName(e.target.value);
                }
              }}
              placeholder="Enter portfolio name"
              className="mb w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
            />
            <div className="ml-4">
              <AvatarPickerButton
                selectedAvatar={avatar}
                selectedColor={color}
                onChange={(newAvatar, newColor) => {
                  setAvatar(newAvatar);
                  setColor(newColor);
                }}
                onClick={() => setShowAvatarModal(true)}
              />
            </div>
          </div>

          <div className="mt-1 mb-4 ml-2 text-gray-400 text-xs">
            {portfolioName.length}/{MAX_LENGTH} characters
          </div>

          <div className="border-gray-700 border-t">
            <div className="mt-2 mb-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-gray-700 text-sm dark:text-gray-300">
                  Count as my portfolio
                </span>
                <span className="text-gray-500 text-xs dark:text-gray-400">
                  Assets in this portfolio will be included in total value
                </span>
              </div>
              <Switch
                checked={includeInTotal}
                onChange={setIncludeInTotal}
                className={`${includeInTotal ? "bg-blue-600" : "bg-gray-400"} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${includeInTotal ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition hover:bg-blue-700"
            type="button"
          >
            Create Portfolio
          </button>
        </div>
      )}
    </div>
  );
}
