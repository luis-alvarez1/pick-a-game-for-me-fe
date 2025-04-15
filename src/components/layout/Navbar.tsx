import { Link, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

export const Navbar = () => {
    const location = useLocation();
    const userName = authService.getUserName();

    const handleLogout = () => {
        authService.logout();
        window.location.href = "/login";
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex space-x-8">
                        <Link
                            to="/games"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                location.pathname === "/games"
                                    ? "text-sky-400 border-b-2 border-sky-400"
                                    : "text-gray-300 hover:text-sky-400"
                            }`}
                        >
                            Games
                        </Link>
                        <Link
                            to="/platforms"
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                location.pathname === "/platforms"
                                    ? "text-sky-400 border-b-2 border-sky-400"
                                    : "text-gray-300 hover:text-sky-400"
                            }`}
                        >
                            Platforms
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {userName && (
                            <span className="text-gray-300 text-sm">
                                Welcome, {userName}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-sky-400 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
