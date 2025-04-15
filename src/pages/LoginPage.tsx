import { useState } from "react";

import WelcomeMessage from "../components/WelcomeMessage";
import LoginForm from "../components/LoginForm";

export const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex h-screen bg-gray-900">
            <div className="w-1/2 bg-gray-800 border-r border-gray-700 flex items-center justify-center">
                <WelcomeMessage />
            </div>
            <div className="w-1/2 flex items-center justify-center bg-gray-900">
                <LoginForm isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
        </div>
    );
};
