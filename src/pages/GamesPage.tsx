import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game, Platform } from "../types/api";
import { gameService } from "../services/gameService";
import { platformService } from "../services/platformService";
import { Button } from "../components/ui/Button";
import { authService } from "../services/authService";
import { GameModal } from "../components/games/GameModal";
import { AddGameModal } from "../components/games/AddGameModal";
import { showError, showSuccess } from "../utils/toast";
import { GamesSearchBar } from "../components/games/GamesSearchBar";
import { Pagination } from "../components/games/Pagination";
import { GamesList } from "../components/games/GamesList";

export const GamesPage = () => {
    const navigate = useNavigate();
    const [games, setGames] = useState<Game[]>([]);
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPicking, setIsPicking] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState<number | null>(
        null
    );
    const [showCompleted, setShowCompleted] = useState<boolean | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [totalGames, setTotalGames] = useState(0);

    useEffect(() => {
        let mounted = true;

        const loadData = async () => {
            if (!authService.isAuthenticated()) {
                navigate("/login");
                return;
            }

            try {
                setIsLoading(true);
                const [gamesResponse, platformsData] = await Promise.all([
                    gameService.search({
                        name: searchQuery || undefined,
                        platformId: selectedPlatform || undefined,
                        completed:
                            showCompleted !== null ? showCompleted : undefined,
                        page,
                        limit,
                    }),
                    platformService.getAll(),
                ]);
                if (mounted) {
                    setGames(gamesResponse.data);
                    setTotalPages(gamesResponse.meta.totalPages);
                    setTotalGames(gamesResponse.meta.total);
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
    }, [navigate, searchQuery, selectedPlatform, showCompleted, page, limit]);

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

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1);
    };

    const handlePlatformChange = (platformId: number | null) => {
        setSelectedPlatform(platformId);
        setPage(1);
    };

    const handleShowCompletedChange = (value: boolean | null) => {
        setShowCompleted(value);
        setPage(1);
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

            <GamesSearchBar
                searchQuery={searchQuery}
                setSearchQuery={handleSearch}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={handlePlatformChange}
                showCompleted={showCompleted}
                setShowCompleted={handleShowCompletedChange}
                platforms={platforms}
            />

            <div className="flex justify-end mb-4">
                <select
                    value={limit}
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    className="rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                >
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                    <option value="50">50 per page</option>
                    <option value="100">100 per page</option>
                </select>
            </div>

            <GamesList games={games} onToggleComplete={handleToggleComplete} />

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

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            <div className="flex justify-center mt-2 text-gray-400 text-sm">
                Showing page {page} of {totalPages} ({totalGames} games)
            </div>
        </div>
    );
};
