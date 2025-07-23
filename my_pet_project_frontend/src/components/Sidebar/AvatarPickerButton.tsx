"use client";
import { useState } from "react";
import AvatarPickerModal from "./AvatarPickerModal";

interface Props {
    selectedAvatar: string;
    selectedColor: string;
    onChange: (avatar: string, color: string) => void;
    onClick?: () => void;
}

export default function AvatarPickerButton({ selectedAvatar, selectedColor, onChange, onClick }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={onClick ?? (() => setIsOpen(true))}
                type="button"
                aria-label={`Аватар ${selectedAvatar}`}
                className="flex h-12 w-12 items-center justify-center rounded-full text-3xl transition duration-200 hover:brightness-120 active:scale-85"
                style={{ backgroundColor: selectedColor }}
            >
                {selectedAvatar}
            </button>

            {isOpen && (
                <AvatarPickerModal
                    selectedAvatar={selectedAvatar}
                    selectedColor={selectedColor}
                    onClose={() => setIsOpen(false)}
                    onSave={(a, c) => {
                        onChange(a, c);
                        setIsOpen(false);
                    }}
                />
            )}
        </>
    );
}
