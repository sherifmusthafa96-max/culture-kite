"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchApplications = async () => {
        setLoading(true);

        const { data, error, count } = await supabase
            .from("applications")
            .select("*", { count: "exact" })
            .order("id", { ascending: false });

        console.log("DATA:", data);
        console.log("COUNT:", count);
        console.log("ERROR:", error);

        setApplications(data || []);
        setLoading(false);

        if (error) {
            console.error(error);
        } else {
            setApplications(data || []);
        }

        setLoading(false);
    };

    const login = () => {
        if (password === "Culture@2026") {
            setLoggedIn(true);
            fetchApplications();
        } else {
            alert("Wrong Password");
        }
    };

    // LOGIN SCREEN
    if (!loggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

                    <h1 className="text-2xl font-bold text-center mb-6">
                        Admin Login
                    </h1>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                    />

                    <button
                        onClick={login}
                        className="w-full bg-[#123A8D] text-white py-3 rounded-lg"
                    >
                        Login
                    </button>

                </div>
            </div>
        );
    }

    // DASHBOARD
    return (
        <div className="p-8">

            <h1 className="text-3xl font-bold mb-6">
                Submitted Applications
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full border border-gray-300">

                    <thead className="bg-[#123A8D] text-white">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Company</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Resume</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.phone}</td>
                                <td className="p-3">{item.email}</td>
                                <td className="p-3">{item.company}</td>
                                <td className="p-3">{item.role}</td>
                                <td className="p-3">{item.location}</td>
                                <td className="p-3">
                                    {item.resume_url ? (
                                        <a
                                            href={item.resume_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Download
                                        </a>
                                    ) : (
                                        "No Resume"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            )}

        </div>
    );
}