"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { assets } from "@/lib/assets";
import Image from "next/image";

export default function LogisticsPage() {
    const router = useRouter();
    const [selectedLocation, setSelectedLocation] =
        useState<Record<number, string>>({});

    const jobs = [
        {
            role: "Warehouse Associates",
            company: "FirstCry",
            logo: "/client-logos/firstcry.webp",
            locations: ["Chennai", "Coimbatore"],
        },
        {
            role: "Loading & Unloading",
            company: "ABT Parcel",
            logo: "/client-logos/abt.webp",
            locations: ["Chennai", "Coimbatore", "All Over Tamil Nadu"],
        },
        {
            role: "Warehouse Associates",
            company: "Meesho",
            logo: "/client-logos/meesho.webp",
            locations: ["Chennai"],
        },
        {
            role: "Warehouse Associates",
            company: "Purplle",
            logo: "/client-logos/purplle.webp",
            locations: ["Coimbatore"],
        },
        {
            role: "Warehouse Associates",
            company: "Flipkart",
            logo: "/client-logos/flipkart.webp",
            locations: ["Coimbatore"],
        },
    ];

    return (
        <>
            <div className="fixed bottom-6 left-6 opacity-10 pointer-events-none">
                <Image
                    src="/logo.webp"
                    alt="Culture Kite Logo"
                    width={288}
                    height={288}
                />
            </div>

            <div className="min-h-screen px-8 md:px-20 py-24">

                <h1 className="text-5xl font-bold text-center">
                    Logistics <span className="text-[#5AD5D7]">Jobs</span>
                </h1>

                <p className="text-center text-gray-500 mt-4 mb-12">
                    Warehouse Associates Opportunities
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    {jobs.map((job, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 shadow-lg p-8 rounded-3xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                        >

                            {/* Company Logo */}
                            <div className="flex justify-center mb-6">
                                <Image
                                    src={job.logo}
                                    alt={job.company}
                                    width={200}
                                    height={80}
                                    className="h-20 w-auto bg-white rounded-2xl p-3 shadow-lg mb-6"
                                />
                            </div>

                            {/* Job Role */}
                            <h2 className="text-2xl font-bold text-[#5AD5D7] text-center">
                                {job.role}
                            </h2>

                            {/* Company Name */}
                            <p className="mt-4 text-gray-600 text-center">
                                <strong>Company:</strong> {job.company}
                            </p>

                            {/* Location Dropdown */}
                            <div className="mt-6">
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
                            {/* Apply Button */}

                            <button
                                onClick={() =>
                                    router.push(
                                        `/apply?company=${job.company}&role=${job.role}`
                                    )
                                }
                                className="w-full mt-6 px-6 py-3 rounded-xl bg-[#123A8D] text-white font-semibold shadow-md hover:bg-[#1F84D7] hover:shadow-xl transition-all duration-300 active:scale-95"
                            >
                                Apply
                            </button>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}