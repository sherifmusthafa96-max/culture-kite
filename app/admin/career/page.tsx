"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { assets } from "@/lib/assets";
import * as XLSX from "xlsx";

export default function CareerAdminPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [careerApplications, setCareerApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [careerSearch, setCareerSearch] = useState("");
    const [careerStatusFilter, setCareerStatusFilter] = useState("");
    const [activeFilter, setActiveFilter] = useState("");

    const fetchApplications = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("career_applications")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setCareerApplications(data || []);
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

    const updateCareerStatus = async (
        id: number,
        status: string
    ) => {
        const { error } = await supabase
            .from("career_applications")
            .update({ status })
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Status update failed");
            return;
        }

        fetchApplications();
    };

    const exportCareerExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            careerApplications.map((item) => ({
                Name: item.name,
                Phone: item.phone,
                Status: item.status,
                Resume: item.resume_url,
                AppliedOn: item.created_at,
            }))
        );

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Career Applications"
        );

        XLSX.writeFile(
            workbook,
            "career-applications.xlsx"
        );
    };

    const filteredCareerApplications =
        careerApplications.filter((app) => {

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
                app.name?.toLowerCase().includes(
                    careerSearch.toLowerCase()
                ) ||
                app.phone?.toLowerCase().includes(
                    careerSearch.toLowerCase()
                );

            const statusMatch =
                !careerStatusFilter ||
                app.status === careerStatusFilter;

            return searchMatch && statusMatch;
        });

    const careerTotal = careerApplications.length;

    const todayApplications =
        careerApplications.filter((item) => {
            const today = new Date().toDateString();
            return (
                new Date(item.created_at).toDateString() ===
                today
            );
        }).length;

    const weekApplications =
        careerApplications.filter((item) => {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(
                sevenDaysAgo.getDate() - 7
            );

            return (
                new Date(item.created_at) >=
                sevenDaysAgo
            );
        }).length;

    const resumeUploaded =
        careerApplications.filter(
            (item) => item.resume_url
        ).length;

    const careerUnderReview =
        careerApplications.filter(
            (a) => a.status === "Under Review"
        ).length;

    const careerInterviewScheduled =
        careerApplications.filter(
            (a) => a.status === "Interview Scheduled"
        ).length;

    const careerRejected =
        careerApplications.filter(
            (a) => a.status === "Rejected"
        ).length;

    if (!loggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Career Admin Login
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
                Career Applications
            </h1>

            <div className="grid md:grid-cols-4 gap-4 mb-6">

                <div
                    onClick={() => {
                        setActiveFilter("");
                        setCareerStatusFilter("");
                    }}
                    className="bg-blue-500 text-white p-5 rounded-xl cursor-pointer"
                >
                    <h2>Total Applications</h2>
                    <p className="text-3xl font-bold">
                        {careerTotal}
                    </p>
                </div>

                <div
                    onClick={() => setActiveFilter("today")}
                    className="bg-green-500 text-white p-5 rounded-xl cursor-pointer"
                >
                    <h2>Today's Applications</h2>
                    <p className="text-3xl font-bold">
                        {todayApplications}
                    </p>
                </div>

                <div
                    onClick={() => setActiveFilter("week")}
                    className="bg-yellow-500 text-white p-5 rounded-xl cursor-pointer"
                >
                    <h2>This Week</h2>
                    <p className="text-3xl font-bold">
                        {weekApplications}
                    </p>
                </div>

                <div
                    onClick={() => setActiveFilter("resume")}
                    className="bg-purplle-500 text-white p-5 rounded-xl cursor-pointer"
                >
                    <h2>Resume Uploaded</h2>
                    <p className="text-3xl font-bold">
                        {resumeUploaded}
                    </p>
                </div>

            </div>

            <button
                onClick={exportCareerExcel}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
            >
                Export Excel
            </button>

            <div className="grid md:grid-cols-3 gap-4 mb-6">

                <div
                    onClick={() => setCareerStatusFilter("Under Review")}
                    className="bg-sky-500 text-white p-5 rounded-xl text-center cursor-pointer"
                >
                    <p>Under Review</p>
                    <h2 className="text-3xl font-bold">
                        {careerUnderReview}
                    </h2>
                </div>

                <div
                    onClick={() => setCareerStatusFilter("Interview Scheduled")}
                    className="bg-orange-500 text-white p-5 rounded-xl text-center cursor-pointer"
                >
                    <p>Interview Scheduled</p>
                    <h2 className="text-3xl font-bold">
                        {careerInterviewScheduled}
                    </h2>
                </div>

                <div
                    onClick={() => setCareerStatusFilter("Rejected")}
                    className="bg-red-500 text-white p-5 rounded-xl text-center cursor-pointer"
                >
                    <p>Rejected</p>
                    <h2 className="text-3xl font-bold">
                        {careerRejected}
                    </h2>
                </div>

            </div>

            <input
                type="text"
                placeholder="Search Name / Phone"
                value={careerSearch}
                onChange={(e) =>
                    setCareerSearch(e.target.value)
                }
                className="border p-3 rounded-lg mb-4 w-full"
            />

            <select
                value={careerStatusFilter}
                onChange={(e) =>
                    setCareerStatusFilter(
                        e.target.value
                    )
                }
                className="border rounded-lg px-3 py-2 mb-4"
            >
                <option value="">All Status</option>
                <option value="Submitted">
                    Submitted
                </option>
                <option value="Interview Scheduled">
                    Interview Scheduled
                </option>
                <option value="Under Review">
                    Shortlisted
                </option>
                <option value="Interview Scheduled">
                    Under Review
                </option>
                <option value="Rejected">
                    Rejected
                </option>
            </select>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="w-full">

                        <thead className="bg-[#123A8D] text-white">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Resume</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Applied On</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCareerApplications.map(
                                (item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b"
                                    >
                                        <td className="p-3">
                                            {item.name}
                                        </td>

                                        <td className="p-3">
                                            {item.phone}
                                        </td>

                                        <td className="p-3">
                                            {item.resume_url ? (
                                                <a
                                                    href={item.resume_url}
                                                    target="_blank"
                                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                                >
                                                    View Resume
                                                </a>
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
                                                    updateCareerStatus(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded px-2 py-1"
                                            >
                                                <option value="Submitted">Submitted</option>
                                                <option value="Under Review">Under Review</option>
                                                <option value="Interview Scheduled">Interview Scheduled</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </td>

                                        <td className="p-3">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
}