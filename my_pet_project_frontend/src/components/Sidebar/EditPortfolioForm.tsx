"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getSession } from "next-auth/react";
import ky from "ky";
import type { Portfolio } from "./types";
import AvatarPickerButton from "./AvatarPickerButton";
import AvatarPickerModal from "./AvatarPickerModal";
import { Toast } from "../Toast";
import type { ToastType } from "types/types";

interface EditPortfolioModalProps {
  portfolioToEdit: Portfolio;
  onClose: () => void;
  onSubmit: (newEditPortfolio: Portfolio) => void;
}

export default function EditPortfolioForm({portfolioToEdit, onClose, onSubmit }: EditPortfolioModalProps) {
  const [portfolioName, setPortfolioName] = useState(portfolioToEdit.name);
  const MAX_LENGTH = 30;
  const [avatar, setAvatar] = useState(portfolioToEdit.avatarIcon);
  const [color, setColor] = useState(portfolioToEdit.avatarColor);
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
      const response = await ky.put(`http://localhost:8080/api/v1/users/me/portfolios/${portfolioToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        json: { name: portfolioName.trim(),
                avatarIcon: avatar,
                avatarColor: color,
              },
      });

      if (!response.ok) throw new Error("Failed to edit a new portfolio");

      const newEditedPortfolio = await response.json() as Portfolio
      portfolioToEdit.name = newEditedPortfolio.name;
      portfolioToEdit.avatarIcon = newEditedPortfolio.avatarIcon;
      portfolioToEdit.avatarColor = newEditedPortfolio.avatarColor;
      onSubmit(newEditedPortfolio);
      setPortfolioName("");
    } catch (_) {
      alert("Failed to edit a new portfolio");
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
            Edit Current Portfolio
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

          <button
            onClick={handleSubmit}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition hover:bg-blue-700"
            type="button"
          >
            Edit Portfolio
          </button>
        </div>
      )}
    </div>
  );
}
