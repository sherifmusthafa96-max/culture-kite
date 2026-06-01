"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        if (password === "Culture@2026") {
            localStorage.setItem("admin-auth", "true");
            router.push("/admin");
        } else {
            alert("Wrong Password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border p-8 rounded-xl">
                <h1 className="text-2xl font-bold mb-4">
                    Admin Login
                </h1>

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 w-full"
                />

                <button
                    onClick={handleLogin}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}