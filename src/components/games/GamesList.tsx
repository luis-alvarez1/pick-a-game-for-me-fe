import React from "react";
import { Game } from "../../types/api";
import { GameCard } from "./GameCard";

interface GamesListProps {
    games: Game[];
    onToggleComplete: (gameId: number, completed: boolean) => void;
}

export const GamesList: React.FC<GamesListProps> = ({
    games,
    onToggleComplete,
}) => {
    if (!Array.isArray(games)) {
        return (
            <div className="text-center py-12">
                <p className="text-red-400">Games data is invalid</p>
            </div>
        );
    }

    if (games.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">No games found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
                <GameCard
                    key={game.id}
                    game={game}
                    onToggleComplete={onToggleComplete}
                />
            ))}
        </div>
    );
};
