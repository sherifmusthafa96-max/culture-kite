"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { assets } from "@/lib/assets";
import * as XLSX from "xlsx";

export default function AdminPage() {
    const [activeFilter, setActiveFilter] = useState("");
    const [search, setSearch] = useState("");
    const [companyFilter, setCompanyFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const totalApplications = applications.length;

    const todayApplications = applications.filter((item) => {
        const today = new Date().toDateString();
        return new Date(item.created_at).toDateString() === today;
    }).length;

    const weekApplications = applications.filter((item) => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        return new Date(item.created_at) >= sevenDaysAgo;
    }).length;

    const resumeUploaded = applications.filter(
        (item) => item.resume_url
    ).length;
    const exportToExcel = () => {
        const totalApplications = applications.length;

        const todayApplications = applications.filter((item) => {
            const today = new Date().toDateString();
            return new Date(item.created_at).toDateString() === today;
        }).length;

        const weekApplications = applications.filter((item) => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            return new Date(item.created_at) >= sevenDaysAgo;
        }).length;

        const resumeUploaded = applications.filter(
            (item) => item.resume_url
        ).length;

        const worksheet =
            XLSX.utils.json_to_sheet(
                applications
            );

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Applications"
        );

        XLSX.writeFile(
            workbook,
            "applications.xlsx"
        );
    };

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
        const { data: checkData } = await supabase
            .from("applications")
            .select("*")
            .eq("id", id);

        console.log("FOUND RECORD:", checkData);

        const { data, error } = await supabase
            .from("applications")
            .update({ status })
            .eq("id", id)
            .select();

        console.log("UPDATED DATA:", data);
        console.log("UPDATE ERROR:", error);


        if (error) {
            console.error(error);
            alert("Status update failed");
            return;
        }

        try {
            const response = await fetch("/api/status-update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    status,
                    interview_date:
                        applications.find(
                            (a) => a.id === id
                        )?.interview_date,

                    interview_time:
                        applications.find(
                            (a) => a.id === id
                        )?.interview_time,
                }),
            });

            const result = await response.json();

            console.log(
                "MAIL API RESPONSE:",
                JSON.stringify(result, null, 2)
            );

        } catch (err) {
            console.error("STATUS UPDATE ERROR:", err);
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

            if (activeFilter === "today") {
                const today = new Date().toDateString();

                if (
                    new Date(app.created_at).toDateString() !== today
                ) {
                    return false;
                }
            }

            if (activeFilter === "week") {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(
                    sevenDaysAgo.getDate() - 7
                );

                if (
                    new Date(app.created_at) < sevenDaysAgo
                ) {
                    return false;
                }
            }

            if (activeFilter === "resume") {
                if (!app.resume_url) {
                    return false;
                }
            }

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

    const interviewScheduled =
        applications.filter(
            (a) => a.status === "Interview Scheduled"
        ).length;

    const shortlisted =
        applications.filter(
            (a) => a.status === "Shortlisted"
        ).length;

    const rejected =
        applications.filter(
            (a) => a.status === "Rejected"
        ).length;
    const updateInterviewDate = async (
        id: number,
        interview_date: string
    ) => {

        await supabase
            .from("applications")
            .update({
                interview_date,
            })
            .eq("id", id);

        fetchApplications();
    };

    const updateInterviewTime = async (
        id: number,
        interview_time: string
    ) => {

        await supabase
            .from("applications")
            .update({
                interview_time,
            })
            .eq("id", id);

        fetchApplications();
    };

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
            <div className="grid md:grid-cols-4 gap-4 mb-6">

                <div
                    onClick={() => setActiveFilter("all")}
                    className="bg-blue-500 text-white p-5 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition"
                >
                    <h2>Total Applications</h2>
                    <p className="text-3xl font-bold">
                        {totalApplications}
                    </p>
                </div>

                <div
                    onClick={() => setActiveFilter("today")}
                    className="bg-green-500 text-white p-5 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition"
                >
                    <h2>Today's Applications</h2>
                    <p className="text-3xl font-bold">
                        {todayApplications}
                    </p>
                </div>

                <div
                    onClick={() => setActiveFilter("week")}
                    className="bg-yellow-500 text-white p-5 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition"
                >
                    <h2>This Week</h2>
                    <p className="text-3xl font-bold">
                        {weekApplications}
                    </p>
                </div>

                <div
                    onClick={() => setActiveFilter("month")}
                    className="bg-purplle-500 text-white p-5 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition"
                >
                    <h2>This Month</h2>
                    <p className="text-3xl font-bold">
                        {resumeUploaded}
                    </p>
                </div>

            </div>
            <button
                onClick={exportToExcel}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
            >
                Export Excel
            </button>

            <div className="grid md:grid-cols-4 gap-4 mb-6">

                <div
                    onClick={() => setStatusFilter("Interview Scheduled")}
                    className="bg-orange-500 text-white shadow-lg rounded-xl p-5 text-center cursor-pointer hover:scale-105 transition"
                >
                    <p>Interview Scheduled</p>
                    <h2 className="text-3xl font-bold">
                        {interviewScheduled}
                    </h2>
                </div>

                <div
                    onClick={() => setStatusFilter("Shortlisted")}
                    className="bg-green-600 text-white shadow-lg rounded-xl p-5 text-center cursor-pointer hover:scale-105 transition"
                >
                    <p>Shortlisted</p>
                    <h2 className="text-3xl font-bold">
                        {shortlisted}
                    </h2>
                </div>
                <div
                    onClick={() => setStatusFilter("Under Review")}
                    className="bg-sky-500 text-white shadow-lg rounded-xl p-5 text-center cursor-pointer hover:scale-105 transition"
                >
                    <p>Under Review</p>
                    <h2 className="text-3xl font-bold">
                        {total}
                    </h2>
                </div>

                <div
                    onClick={() => setStatusFilter("Rejected")}
                    className="bg-red-500 text-white shadow-lg rounded-xl p-5 text-center cursor-pointer hover:scale-105 transition"
                >
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
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                        <input
                                            type="date"
                                            value={item.interview_date || ""}
                                            onChange={(e) =>
                                                updateInterviewDate(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                            className="border p-1 mt-2 w-full"
                                        />

                                        <input
                                            type="time"
                                            value={item.interview_time || ""}
                                            onChange={(e) =>
                                                updateInterviewTime(
                                                    item.id,
                                                    e.target.value
                                                )
                                            }
                                            className="border p-1 mt-2 w-full"
                                        />

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