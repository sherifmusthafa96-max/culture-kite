"use client";

import { useState } from "react";
export default function ManufacturingPage() {
    const [selectedLocation, setSelectedLocation] =
        useState<Record<number, string>>({});

    const jobs = [
        {
            role: "CNC Operator",
            company: "Indo Shell Cast",
            locations: ["Coimbatore"],
        },
        {
            role: "VMC Operator",
            company: "Indo Shell Cast",
            locations: ["Coimbatore"],
        },
        {
            role: "HMC Operator",
            company: "Indo Shell Cast",
            locations: ["Coimbatore"],
        },
        {
            role: "Shell Moulding",
            company: "Unique Shell Mould",
            locations: ["Coimbatore"],
        },
        {
            role: "Core Shooter",
            company: "Unique Shell Mould",
            locations: ["Coimbatore"],
        },
        {
            role: "Deburring / Fettling",
            company: "Unique Shell Mould",
            locations: ["Coimbatore"],
        },
    ];

    return (
        <>
            <div className="fixed bottom-6 left-6 opacity-10 pointer-events-none">
                <img
                    src="/logo.png"
                    alt="Culture Kite"
                    className="w-40 h-auto"
                />
            </div>
            <div className="min-h-screen px-8 md:px-20 py-24">
                <h1 className="text-5xl font-bold text-center">
                    Manufacturing <span className="text-[#5AD5D7]">Jobs</span>
                </h1>

                <p className="text-center text-gray-500 mt-4 mb-12">
                    Industrial & Production Workforce Opportunities
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {jobs.map((job, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 shadow-lg p-8 rounded-3xl"
                        >
                            <h2 className="text-2xl font-bold text-[#5AD5D7]">
                                {job.role}
                            </h2>

                            <p className="mt-4 text-gray-600">
                                <strong>Company:</strong> {job.company}
                            </p>

                            <div className="mt-4">
                                <label className="block text-gray-600 mb-2">
                                    <strong>Select Location:</strong>
                                </label>

                                <select
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                                    value={selectedLocation[i] || ""}
                                    onChange={(e) =>
                                        setSelectedLocation({
                                            ...selectedLocation,
                                            [i]: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Choose Location</option>

                                    {job.locations.map((location) => (
                                        <option key={location} value={location}>
                                            {location}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                disabled={!selectedLocation[i]}
                                onClick={() => {
                                    window.open(
                                        `https://wa.me/919500038959?text=${encodeURIComponent(
                                            `Hello Culture Kite Team,

I would like to apply for the following position:

Company: ${job.company}
Role: ${job.role}
Preferred Location: ${selectedLocation[i]}

Thank you.`
                                        )}`,
                                        "_blank"
                                    );
                                }}
                                className={`mt-6 px-6 py-3 rounded-xl text-white font-semibold ${selectedLocation[i]
                                    ? "bg-[#123A8D] hover:bg-[#1F84D7]"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Apply for {job.company}
                            </button>                       </div>
                    ))}
                </div>
            </div>
        </>
    );
}