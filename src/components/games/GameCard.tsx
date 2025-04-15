import { useNavigate } from "react-router-dom";
import { Game } from "../../types/api";
import { Button } from "../ui/Button";

interface GameCardProps {
    game: Game;
    onToggleComplete: (gameId: number, completed: boolean) => void;
}

export const GameCard = ({ game, onToggleComplete }: GameCardProps) => {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/games/${game.id}`);
    };

    const handleToggleComplete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onToggleComplete(game.id, !game.completed);
    };

    return (
        <div
            className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-700 hover:border-sky-500"
            onClick={handleCardClick}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-100">
                        {game.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {game.platform?.name || "No platform"}
                    </p>
                </div>
                <Button
                    variant={game.completed ? "primary" : "secondary"}
                    size="sm"
                    onClick={handleToggleComplete}
                >
                    {game.completed ? "Completed" : "Not Completed"}
                </Button>
            </div>
        </div>
    );
};
