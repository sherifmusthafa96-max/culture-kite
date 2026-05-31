"use client";

import { useState } from "react";

export default function EcommercePage() {
    const [selectedLocation, setSelectedLocation] =
        useState<Record<number, string>>({});

    const jobs = [
        {
            role: "Delivery Executive",
            company: "FirstCry",
            locations: ["Chennai", "Coimbatore"],
            whatsapp: "919500038959",
        },
        {
            role: "Delivery Executive",
            company: "Shree Maruthi",
            locations: ["Chennai", "Coimbatore"],
            whatsapp: "919500038959",
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
                    E-Commerce <span className="text-[#5AD5D7]">Jobs</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
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

                            <select
                                className="mt-4 w-full border border-gray-300 rounded-xl px-4 py-3"
                                value={selectedLocation[i] || ""}
                                onChange={(e) =>
                                    setSelectedLocation({
                                        ...selectedLocation,
                                        [i]: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Location</option>

                                {job.locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>

                            <a
                                href={`https://wa.me/${job.whatsapp}?text=${encodeURIComponent(
                                    `Hello Culture Kite Team,

I would like to apply for the following position:

Company: ${job.company}
Role: ${job.role}
Preferred Location: ${selectedLocation[i] || "Not Selected"}

Thank you.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-6 bg-[#123A8D] text-white px-6 py-3 rounded-xl hover:bg-[#1F84D7]"
                            >
                                Apply for {job.company}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}