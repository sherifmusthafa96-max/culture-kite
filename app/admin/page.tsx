"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
    const router = useRouter();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem("admin-auth");

        if (auth !== "true") {
            router.push("/admin/login");
            return;
        }

        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const { data, error } = await supabase
            .from("applications")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setApplications(data || []);
        }

        setLoading(false);
    };

    return (
        <div className="p-8">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                    Applications Dashboard
                </h1>

                <button
                    onClick={() => {
                        localStorage.removeItem("admin-auth");
                        router.push("/admin/login");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full border border-gray-300">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-3">Name</th>
                                <th className="border p-3">Phone</th>
                                <th className="border p-3">Email</th>
                                <th className="border p-3">Company</th>
                                <th className="border p-3">Role</th>
                                <th className="border p-3">Location</th>
                                <th className="border p-3">Resume</th>
                            </tr>
                        </thead>

                        <tbody>

                            {applications.map((app) => (
                                <tr key={app.id}>

                                    <td className="border p-3">{app.name}</td>
                                    <td className="border p-3">{app.phone}</td>
                                    <td className="border p-3">{app.email}</td>
                                    <td className="border p-3">{app.company}</td>
                                    <td className="border p-3">{app.role}</td>
                                    <td className="border p-3">{app.location}</td>

                                    <td className="border p-3">
                                        {app.resume_url ? (
                                            <a
                                                href={app.resume_url}
                                                target="_blank"
                                                className="text-blue-600 underline"
                                            >
                                                View Resume
                                            </a>
                                        ) : (
                                            "No Resume"
                                        )}
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