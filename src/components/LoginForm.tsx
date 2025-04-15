import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { Button } from "./ui/Button";
import { showError, showSuccess } from "../utils/toast";

interface LoginFormProps {
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}

const LoginForm = ({ isLogin, setIsLogin }: LoginFormProps) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { email, password, name } = formData;
            if (isLogin) {
                await authService.login({ email, password });
                showSuccess("Logged in successfully!");
                navigate("/games");
            } else {
                await authService.signup({ email, password, name });
                showSuccess("Account created successfully! Logging you in...");
                navigate("/games");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            if (error instanceof Error) {
                showError(error.message);
            } else {
                showError("Authentication failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">
                {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                            required
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-100 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                        required
                    />
                </div>
                <Button type="submit" fullWidth isLoading={isLoading}>
                    {isLogin ? "Login" : "Sign Up"}
                </Button>
            </form>
            <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin
                        ? "Need an account? Sign up"
                        : "Already have an account? Login"}
                </Button>
            </div>
        </div>
    );
};

export default LoginForm;
