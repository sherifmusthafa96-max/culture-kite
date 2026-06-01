"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {


    const searchParams = useSearchParams();
    const router = useRouter();

    const company = searchParams.get("company") || "";
    const role = searchParams.get("role") || "";

    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [qualification, setQualification] = useState("");
    const [experienceType, setExperienceType] = useState("");
    const [experienceYears, setExperienceYears] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] =
        useState<Record<number, string>>({});
    const [hasResume, setHasResume] = useState("");
    const [resume, setResume] = useState<File | null>(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            let resumeUrl = "";

            // 1. Upload resume FIRST (if exists)
            if (hasResume === "yes" && resume) {
                const fileName = `${Date.now()}-${resume.name}`;

                const { error: uploadError } = await supabase.storage
                    .from("resumes")
                    .upload(fileName, resume);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from("resumes")
                    .getPublicUrl(fileName);

                resumeUrl = data.publicUrl;
            }
            console.log({
                name,
                dob,
                phone,
                email,
                address,
                qualification,
                experienceType,
                experienceYears,
            });

            // 2. THEN insert into DB
            const { error } = await supabase.from("applications").insert([
                {
                    name: name || null,
                    dob: dob || null,
                    phone: phone || null,
                    email: email || null,
                    address: address || null,
                    qualification: qualification || null,
                    experience_type: experienceType || null,
                    experience_years: experienceYears ? Number(experienceYears) : null,
                    company,
                    role,
                }
            ]);

            if (error) throw error;

            router.push("/success");

        } catch (err) {
            console.log("RAW ERROR:", err);
            alert("Submission Failed ❌");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-10 bg-gray-50">

            <div className="w-full max-w-xl space-y-4 border bg-white p-6 rounded-xl shadow-lg">

                <h1 className="text-2xl font-bold text-center">
                    Apply for {company}
                </h1>

                <p className="text-center text-gray-500">{role}</p>

                <div className="flex flex-col gap-3">

                    <input
                        placeholder="Name"
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="date"
                        className="w-full border rounded-lg px-4 py-3"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <input
                        placeholder="Phone"
                        className="w-full border rounded-lg px-4 py-3"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        placeholder="Email"
                        className="w-full border rounded-lg px-4 py-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <textarea
                        placeholder="Address"
                        className="w-full border rounded-lg px-4 py-3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <input
                        placeholder="Qualification"
                        className="w-full border rounded-lg px-4 py-3"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    />

                    <select
                        className="w-full border rounded-lg px-4 py-3"
                        value={experienceType}
                        onChange={(e) => {
                            const value = e.target.value;
                            setExperienceType(value);

                            // 👉 IMPORTANT FIX HERE
                            if (value === "Fresher") {
                                setExperienceYears("");
                            }
                        }}
                    >
                        <option value="">Select Experience Type</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experienced</option>
                    </select>

                    <select
                        className="w-full border rounded-lg px-4 py-3"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        disabled={experienceType !== "Experienced"}
                    >
                        <option value="">Years of Experience</option>

                        {[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                            <option key={year} value={year}>
                                {year} Year
                            </option>
                        ))}
                    </select>
                    <select
                        className="w-full border rounded-lg px-4 py-3"
                        value={hasResume}
                        onChange={(e) => setHasResume(e.target.value)}
                    >
                        <option value="">Do you have a resume?</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    {hasResume === "yes" && (
                        <input
                            type="file"
                            className="w-full border rounded-lg px-4 py-3"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setResume(e.target.files[0]);
                                }
                            }}
                        />
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#123A8D] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>

                </div>
            </div>
        </div >
    );
}