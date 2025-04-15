import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Game } from "../types/api";
import { gameService } from "../services/gameService";
import { Button } from "../components/ui/Button";
import { authService } from "../services/authService";

export const GameDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [game, setGame] = useState<Game | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const loadGameDetails = async () => {
            if (!id || !authService.isAuthenticated()) {
                navigate("/login");
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const data = await gameService.getById(parseInt(id));
                if (mounted) {
                    setGame(data);
                }
            } catch (err) {
                if (mounted) {
                    if (err instanceof Error) {
                        if (err.message.includes("401")) {
                            authService.logout();
                            navigate("/login");
                            return;
                        }
                        setError(err.message);
                    } else {
                        setError("Failed to load game details");
                    }
                }
                console.error(err);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadGameDetails();

        return () => {
            mounted = false;
        };
    }, [id, navigate]);

    const handleToggleComplete = async () => {
        if (!game) return;

        try {
            await gameService.update(game.id, { completed: !game.completed });
            setGame({ ...game, completed: !game.completed });
        } catch (error) {
            console.error("Failed to update game:", error);
            setError("Failed to update game status");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-sky-500 border-t-transparent"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-red-400 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-400 mb-4">Game not found</p>
                <Button onClick={() => navigate("/games")}>
                    Back to Games
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-100">
                        {game.name}
                    </h1>
                    <Button
                        onClick={() => navigate("/games")}
                        variant="outline"
                    >
                        Back to Games
                    </Button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-300 mb-2">
                        <span className="font-semibold">Platform:</span>{" "}
                        <Link
                            to={`/platforms/${game.platform.id}/games`}
                            className="text-sky-400 hover:text-sky-300 transition-colors duration-200"
                        >
                            {game.platform.name}
                        </Link>
                    </p>
                    <p className="text-gray-300 mb-2">
                        <span className="font-semibold">Status:</span>{" "}
                        {game.completed ? "Completed" : "Not Completed"}
                    </p>
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleToggleComplete}>
                        {game.completed
                            ? "Mark as Not Completed"
                            : "Mark as Completed"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
