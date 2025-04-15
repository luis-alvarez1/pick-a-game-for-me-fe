import { Game } from "../../types/api";
import { Button } from "../ui/Button";

interface GameModalProps {
    game: Game;
    onClose: () => void;
}

export const GameModal = ({ game, onClose }: GameModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-sky-800">
                        {game.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
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

                <div className="space-y-4">
                    <div className="text-gray-700">
                        <p className="mb-2">
                            <span className="font-semibold">Platform:</span>{" "}
                            {game.platform.name}
                        </p>
                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            {game.completed ? "Completed" : "Not Completed"}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
