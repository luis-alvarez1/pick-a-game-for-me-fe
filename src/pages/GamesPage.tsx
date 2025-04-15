import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game, Platform } from "../types/api";
import { gameService } from "../services/gameService";
import { platformService } from "../services/platformService";
import { GameCard } from "../components/games/GameCard";
import { Button } from "../components/ui/Button";
import { authService } from "../services/authService";
import { GameModal } from "../components/games/GameModal";
import { AddGameModal } from "../components/games/AddGameModal";
import { showError, showSuccess } from "../utils/toast";

export const GamesPage = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPicking, setIsPicking] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            if (!authService.isAuthenticated()) {
                navigate("/login");
                return;
            }

            try {
                setIsLoading(true);
                const [gamesData, platformsData] = await Promise.all([
                    gameService.getAll(),
                    platformService.getAll(),
                ]);
                if (mounted) {
                    setGames(gamesData);
                    setPlatforms(platformsData);
                }
            } catch (err) {
                if (mounted) {
                    if (err instanceof Error) {
                        if (err.message.includes("401")) {
                            authService.logout();
                            navigate("/login");
                            return;
                        }
                        showError(err.message);
                    } else {
                        showError("Failed to load data");
                    }
                }
                console.error(err);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadData();

        return () => {
            mounted = false;
        };
    }, [navigate]);

    const handleToggleComplete = async (gameId: number, completed: boolean) => {
        try {
            await gameService.update(gameId, { completed });
            setGames(
                games.map((game) =>
                    game.id === gameId ? { ...game, completed } : game
                )
            );
            if (selectedGame?.id === gameId) {
                setSelectedGame({ ...selectedGame, completed });
            }
            showSuccess(
                `Game marked as ${completed ? "completed" : "not completed"}`
            );
        } catch (error) {
            console.error("Failed to update game:", error);
            showError("Failed to update game status");
        }
    };

    const handlePickRandom = async () => {
        try {
            setIsPicking(true);
            const randomGame = await gameService.pickRandom();
            setSelectedGame(randomGame);
        } catch (error) {
            console.error("Failed to pick random game:", error);
            showError("Failed to pick a random game");
        } finally {
            setIsPicking(false);
        }
    };

    const handleAddGame = async (data: {
        name: string;
        platformId: number;
    }) => {
        try {
            const newGame = await gameService.create({
                ...data,
                completed: false,
            });
            setGames([...games, newGame]);
            setShowAddModal(false);
            showSuccess("Game added successfully");
        } catch (error) {
            console.error("Failed to add game:", error);
            showError("Failed to add game");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-100">Games</h1>
                <div className="flex gap-4">
                    <Button onClick={handlePickRandom} isLoading={isPicking}>
                        Pick Random
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setShowAddModal(true)}
                    >
                        Add Game
                    </Button>
                </div>
            </div>

            {games.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400">No games found</p>
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

            {selectedGame && (
                <GameModal
                    game={selectedGame}
                    onClose={() => setSelectedGame(null)}
                />
            )}

            {showAddModal && (
                <AddGameModal
                    platforms={platforms}
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddGame}
                />
            )}
        </div>
    );
};
