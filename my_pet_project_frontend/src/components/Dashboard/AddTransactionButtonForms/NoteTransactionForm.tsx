"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface NoteTransactionFormProps {
    initialNote?: string;
    onClose: () => void;
    onSave: (note: string) => void;
}

export default function NoteTransactionForm({
    initialNote = "",
    onClose,
    onSave,
}: NoteTransactionFormProps) {
    const [note, setNote] = useState(initialNote);
    const noteMaxLength = 100;

    const handleSave = () => {
        onSave(note.trim());
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-60" />

            <div className="relative w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-lg">
                <div className="mb-5 flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition-colors hover:text-gray-200"
                        type="button"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <h2 className="flex-1 font-semibold text-lg text-white">
                        Transaction Notes
                    </h2>
                </div>

                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your note"
                    maxLength={noteMaxLength}
                    className="w-full resize-none rounded-md border border-gray-300 bg-gray-700 px-3 py-2 text-sm text-white shadow-sm"
                    rows={4}
                />

                <div className="mb-4 ml-1 text-left text-gray-400 text-xs">
                    {note.length}/{noteMaxLength} characters
                </div>

                <button
                    onClick={handleSave}
                    type="button"
                    className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-sm text-white transition duration-50 hover:bg-blue-700 active:scale-95"
                >
                    Save Notes
                </button>

            </div>
        </div>
    );
}
