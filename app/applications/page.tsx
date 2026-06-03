"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


export default function ApplicationsPage() {
    const [applications, setApplications] = useState<any[]>([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const { data, error } = await supabase
            .from("applications")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) {
            setApplications(data || []);
        }
    };
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

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Submitted Applications
            </h1>
            <div className="grid md:grid-cols-4 gap-4 mb-6">

                <div className="bg-blue-100 p-5 rounded-xl">
                    <h2>Total Applications</h2>
                    <p className="text-3xl font-bold">
                        {totalApplications}
                    </p>
                </div>

                <div className="bg-green-100 p-5 rounded-xl">
                    <h2>Today's Applications</h2>
                    <p className="text-3xl font-bold">
                        {todayApplications}
                    </p>
                </div>

                <div className="bg-yellow-100 p-5 rounded-xl">
                    <h2>This Week</h2>
                    <p className="text-3xl font-bold">
                        {weekApplications}
                    </p>
                </div>

                <div className="bg-purple-100 p-5 rounded-xl">
                    <h2>Resume Uploaded</h2>
                    <p className="text-3xl font-bold">
                        {resumeUploaded}
                    </p>
                </div>

            </div>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Role</th>
                        <th>Location</th>
                        <th>Resume</th>
                    </tr>
                </thead>

                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.name}</td>
                            <td>{app.phone}</td>
                            <td>{app.company}</td>
                            <td>{app.role}</td>
                            <td>{app.location}</td>
                            <td>
                                <a
                                    href={app.resume_url}
                                    target="_blank"
                                >
                                    View Resume
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}