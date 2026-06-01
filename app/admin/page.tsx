"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchApplications = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("applications")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setApplications(data || []);
        }

        setLoading(false);
    };

    const updateStatus = async (
        id: number,
        status: string
    ) => {
        const { error } = await supabase
            .from("applications")
            .update({ status })
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Status update failed");
            return;
        }

        try {
            await fetch("/api/status-update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    status,
                }),
            });
        } catch (err) {
            console.log(err);
        }

        fetchApplications();
    };

    const login = () => {
        if (password === "Culture@2026") {
            setLoggedIn(true);
            fetchApplications();
        } else {
            alert("Wrong Password");
        }
    };

    const filteredApplications =
        applications.filter((app) => {
            const searchMatch =
                app.name?.toLowerCase().includes(search.toLowerCase()) ||
                app.phone?.toLowerCase().includes(search.toLowerCase()) ||
                app.email?.toLowerCase().includes(search.toLowerCase());

            const companyMatch =
                !companyFilter ||
                app.company === companyFilter;

            const statusMatch =
                !statusFilter ||
                app.status === statusFilter;

            return (
                searchMatch &&
                companyMatch &&
                statusMatch
            );
        });

    const total = applications.length;

    const shortlisted =
        applications.filter(
            (a) => a.status === "Shortlisted"
        ).length;

    const selected =
        applications.filter(
            (a) => a.status === "Selected"
        ).length;

    const rejected =
        applications.filter(
            (a) => a.status === "Rejected"
        ).length;

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
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
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

    return (
        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Submitted Applications
            </h1>

            <div className="grid grid-cols-4 gap-4 mb-6">

                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p>Total Applications</p>
                    <h2 className="text-3xl font-bold">
                        {total}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p>Shortlisted</p>
                    <h2 className="text-3xl font-bold">
                        {shortlisted}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p>Selected</p>
                    <h2 className="text-3xl font-bold">
                        {selected}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-lg p-4 text-center">
                    <p>Rejected</p>
                    <h2 className="text-3xl font-bold">
                        {rejected}
                    </h2>
                </div>

            </div>

            <input
                type="text"
                placeholder="Search Name / Phone / Email"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="border p-3 rounded-lg mb-4 w-full"
            />

            <div className="flex gap-4 mb-6">

                <select
                    value={companyFilter}
                    onChange={(e) =>
                        setCompanyFilter(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">
                        All Companies
                    </option>

                    {[...new Set(
                        applications
                            .map((a) => a.company)
                            .filter(Boolean)
                    )].map((company: any) => (
                        <option
                            key={company}
                            value={company}
                        >
                            {company}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="">All Status</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </select>

            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-lg">

                    <table className="w-full">

                        <thead className="bg-[#123A8D] text-white">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Company</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Resume</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredApplications.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.phone}</td>
                                    <td className="p-3">{item.email}</td>
                                    <td className="p-3">{item.company}</td>
                                    <td className="p-3">{item.role}</td>
                                    <td className="p-3">
                                        {item.job_location || item.location}
                                    </td>

                                    <td className="p-3">
                                        {item.resume_url ? (
                                            <div className="flex gap-2">
                                                <a
                                                    href={item.resume_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    View
                                                </a>

                                                <a
                                                    href={item.resume_url}
                                                    download
                                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        ) : (
                                            "No Resume"
                                        )}
                                    </td>

                                    <td className="p-3">
                                        <select
                                            value={
                                                item.status ||
                                                "Submitted"
                                            }
                                            onChange={(e) =>
                                                updateStatus(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="Submitted">Submitted</option>
                                            <option value="Under Review">Under Review</option>
                                            <option value="Shortlisted">Shortlisted</option>
                                            <option value="Interview Scheduled">Interview Scheduled</option>
                                            <option value="Selected">Selected</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}

        </div>
    );
}