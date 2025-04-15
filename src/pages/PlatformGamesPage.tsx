import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gameService } from "../services/gameService";
import { platformService } from "../services/platformService";
import { GameCard } from "../components/games/GameCard";
import { Button } from "../components/ui/Button";
import { Game, Platform } from "../types/api";

export const PlatformGamesPage = () => {
    const { id } = useParams<{ id: string }>();
    const [games, setGames] = useState<Game[]>([]);
    const [platform, setPlatform] = useState<Platform | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleToggleComplete = async (gameId: number, completed: boolean) => {
        try {
            await gameService.update(gameId, { completed });
            setGames(
                games.map((game) =>
                    game.id === gameId ? { ...game, completed } : game
                )
            );
        } catch (error) {
            console.error("Failed to update game:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const platformId = parseInt(id!, 10);
                const [platformData, gamesData] = await Promise.all([
                    platformService.getById(platformId),
                    gameService.search({ platformId }),
                ]);

                setPlatform(platformData);
                setGames(gamesData);
            } catch (err) {
                setError("Failed to load platform games");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    if (!platform) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Platform not found</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-sky-800">
                    Games for {platform.name}
                </h1>
            </div>

            {games.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">
                        No games found for this platform
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onToggleComplete={handleToggleComplete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
