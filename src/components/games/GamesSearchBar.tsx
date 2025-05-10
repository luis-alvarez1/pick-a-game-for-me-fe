import React, { useState } from "react";
import { Platform } from "../../types/api";
import { Button } from "../ui/Button";

interface GamesSearchBarProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedPlatform: number | null;
    setSelectedPlatform: (value: number | null) => void;
    showCompleted: boolean | null;
    setShowCompleted: (value: boolean | null) => void;
    platforms: Platform[];
}

export const GamesSearchBar: React.FC<GamesSearchBarProps> = ({
    searchQuery,
    setSearchQuery,
    selectedPlatform,
    setSelectedPlatform,
    showCompleted,
    setShowCompleted,
    platforms,
}) => {
    const [localInput, setLocalInput] = useState(searchQuery);

    const handleSearch = () => {
        setSearchQuery(localInput);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    value={localInput}
                    onChange={(e) => setLocalInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search games..."
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                    autoComplete="off"
                />
                <Button onClick={handleSearch}>Search</Button>
                <select
                    value={selectedPlatform || ""}
                    onChange={(e) =>
                        setSelectedPlatform(
                            e.target.value ? Number(e.target.value) : null
                        )
                    }
                    className="rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                >
                    <option value="">All Platforms</option>
                    {platforms.map((platform) => (
                        <option key={platform.id} value={platform.id}>
                            {platform.name}
                        </option>
                    ))}
                </select>
                <select
                    value={
                        showCompleted === null ? "" : showCompleted.toString()
                    }
                    onChange={(e) =>
                        setShowCompleted(
                            e.target.value === ""
                                ? null
                                : e.target.value === "true"
                        )
                    }
                    className="rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-sky-500 focus:ring-sky-500"
                >
                    <option value="">All Status</option>
                    <option value="true">Completed</option>
                    <option value="false">Not Completed</option>
                </select>
            </div>
        </div>
    );
};
