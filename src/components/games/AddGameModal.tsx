import { useState } from "react";
import { Button } from "../ui/Button";
import { Platform } from "../../types/api";

interface AddGameModalProps {
    onClose: () => void;
    onAdd: (data: { name: string; platformId: number }) => void;
    platforms: Platform[];
}

export const AddGameModal = ({
    onClose,
    onAdd,
    platforms,
}: AddGameModalProps) => {
    const [name, setName] = useState("");
    const [platformId, setPlatformId] = useState<number>(platforms[0]?.id || 0);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Please enter a game name");
            return;
        }
        if (!platformId) {
            setError("Please select a platform");
            return;
        }
        onAdd({ name: name.trim(), platformId });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-100">
                        Add New Game
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-300"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 text-red-400 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Game Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                            placeholder="Enter game name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Platform
                        </label>
                        <select
                            value={platformId}
                            onChange={(e) =>
                                setPlatformId(Number(e.target.value))
                            }
                            className="w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                            required
                        >
                            {platforms.map((platform) => (
                                <option key={platform.id} value={platform.id}>
                                    {platform.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Game</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
