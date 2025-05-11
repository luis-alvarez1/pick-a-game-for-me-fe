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
import { authService } from "./services/auth.service";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
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
                            authService.isAuthenticated() ? (
                                <Navigate to="/" replace />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    <Route
                        path="/"
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
                        path="/platforms/:id"
                        element={
                            <PrivateRoute>
                                <PlatformGamesPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
};
