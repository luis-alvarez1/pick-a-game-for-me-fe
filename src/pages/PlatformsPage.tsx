import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { platformService } from "../services/platformService";
import { Button } from "../components/ui/Button";
import { Platform } from "../types/api";
import { AddPlatformModal } from "../components/platforms/AddPlatformModal";
import { authService } from "../services/authService";
import { showError, showSuccess } from "../utils/toast";

export const PlatformsPage = () => {
    const navigate = useNavigate();
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        let mounted = true;

        const loadPlatforms = async () => {
            if (!authService.isAuthenticated()) {
                navigate("/login");
                return;
            }

            try {
                setIsLoading(true);
                const data = await platformService.getAll();
                if (mounted) {
                    setPlatforms(data);
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
                        showError("Failed to load platforms");
                    }
                }
                console.error(err);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadPlatforms();

        return () => {
            mounted = false;
        };
    }, [navigate]);

    const handleAddPlatform = async (data: { name: string }) => {
        try {
            const newPlatform = await platformService.create(data);
            setPlatforms([...platforms, newPlatform]);
            setShowAddModal(false);
            showSuccess("Platform added successfully");
        } catch (error) {
            console.error("Failed to add platform:", error);
            showError("Failed to add platform");
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
                <h1 className="text-3xl font-bold text-gray-100">Platforms</h1>
                <Button
                    variant="secondary"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Platform
                </Button>
            </div>

            {platforms.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-400">No platforms found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {platforms.map((platform) => (
                        <div
                            key={platform.id}
                            className="bg-gray-800 rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-sky-500"
                            onClick={() =>
                                navigate(`/platforms/${platform.id}/games`)
                            }
                        >
                            <h3 className="text-xl font-semibold text-gray-100">
                                {platform.name}
                            </h3>
                        </div>
                    ))}
                </div>
            )}

            {showAddModal && (
                <AddPlatformModal
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddPlatform}
                />
            )}
        </div>
    );
};
