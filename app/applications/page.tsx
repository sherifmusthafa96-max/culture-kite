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

    return (
        <div className="p-10">
            <h1 className="text-4xl font-bold mb-8">
                Submitted Applications
            </h1>

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