import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Props {
    selectedAvatar: string;
    selectedColor: string;
    onClose: () => void;
    onSave: (avatar: string, color: string) => void;
}

export default function AvatarPickerModal({ selectedAvatar, selectedColor, onClose, onSave }: Props) {
    const colorOptions = [
        "#6366f1", "#10b981", "#f59e0b", "#ef4444",
        "#8b5cf6", "#ec4899", "#14b8a6", "#f43f5e",
    ];

    const avatarOptions = [
        { id: "skull_and_crossbonus", emoji: "☠️" },
        { id: "smile", emoji: "😋" },
        { id: "heart", emoji: "❤️" },
        { id: "ghost", emoji: "👻" },
        { id: "zap", emoji: "⚡" },
        { id: "key", emoji: "🔑" },
        { id: "pickaxe", emoji: "⛏️" },
        { id: "fox", emoji: "🦊" },
        { id: "dog", emoji: "🐶" },
        { id: "moon", emoji: "🌕" },
        { id: "burger", emoji: "🍔" },
        { id: "airplane", emoji: "✈️" }

        
    ];

    const [tempAvatar, setTempAvatar] = useState(selectedAvatar);
    const [tempColor, setTempColor] = useState(selectedColor);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="w-[350px] rounded-xl bg-gray-800 p-6 text-white">
                <div className="mb-4 flex items-center gap-2">
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-400"
                        type="button"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <h2 className="font-semibold text-lg">Change Avatar</h2>
                </div>

                <div className="mb-4 flex justify-center">
                    <div
                        className="flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                        style={{ backgroundColor: tempColor }}
                    >
                        {tempAvatar}
                    </div>
                </div>

                <div className="mb-4 flex justify-center gap-2">
                    {colorOptions.map((color) => (
                        <button
                            key={color}
                            className={`h-6 w-6 rounded-full border-2 duration-200 hover:brightness-120 active:scale-85 ${color === tempColor ? "border-white" : "border-transparent"}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setTempColor(color)}
                            aria-label={`Choose color ${color}`}
                            type="button"
                        />
                    ))}
                </div>

                <p className="mb-2 text-gray-400 text-sm">Choose an avatar for your new portfolio</p>

                <div className="mb-6 grid grid-cols-6 gap-2">
                    {avatarOptions.map((avatar) => (
                        <button
                            key={avatar.id}
                            className={`rounded-xl p-1 text-2xl duration-200 hover:bg-white/10 hover:brightness-120 active:scale-85 ${avatar.emoji === tempAvatar ? "bg-white/20" : ""}`}
                            onClick={() => setTempAvatar(avatar.emoji)}
                            aria-label={`Choose avatar ${avatar.emoji}`}
                            type="button"
                        >
                            {avatar.emoji}
                        </button>
                    ))}
                </div>

                <button
                    className="w-full rounded-lg bg-blue-600 py-2 text-white duration-200 hover:bg-blue-700 hover:brightness-120 active:scale-95"
                    onClick={() => onSave(tempAvatar, tempColor)}
                    type="button"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
