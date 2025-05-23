import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/LoginPage";
import { GamesPage } from "./pages/GamesPage";
import { GameDetailsPage } from "./pages/GameDetailsPage";
import { PlatformsPage } from "./pages/PlatformsPage";
import { PlatformGamesPage } from "./pages/PlatformGamesPage";
import { authService } from "./services/authService";
import { Layout } from "./components/layout/Layout";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Layout>{children}</Layout>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
        return <Navigate to="/games" replace />;
    }
    return <>{children}</>;
};

export const App = () => {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/games"
                        element={
                            <PrivateRoute>
                                <GamesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/games/:id"
                        element={
                            <PrivateRoute>
                                <GameDetailsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/platforms"
                        element={
                            <PrivateRoute>
                                <PlatformsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/platforms/:id/games"
                        element={
                            <PrivateRoute>
                                <PlatformGamesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate to="/games" replace />}
                    />
                </Routes>
            </Router>
        </>
    );
};
