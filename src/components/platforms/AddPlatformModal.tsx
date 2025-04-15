import { useState } from "react";
import { Button } from "../ui/Button";

interface AddPlatformModalProps {
    onClose: () => void;
    onAdd: (data: { name: string }) => void;
}

export const AddPlatformModal = ({ onClose, onAdd }: AddPlatformModalProps) => {
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Please enter a platform name");
            return;
        }
        onAdd({ name: name.trim() });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-100">
                        Add New Platform
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
                            Platform Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                            placeholder="Enter platform name"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Platform</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
