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
    return authService.isAuthenticated() ? (
        <Layout>{children}</Layout>
    ) : (
        <Navigate to="/login" replace />
    );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    return !authService.isAuthenticated() ? (
        <>{children}</>
    ) : (
        <Navigate to="/games" replace />
    );
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
                        element={
                            authService.isAuthenticated() ? (
                                <Navigate to="/games" replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </Router>
        </>
    );
};
