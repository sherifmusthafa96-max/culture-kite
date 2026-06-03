"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const company = searchParams.get("company") || "";
    const role = searchParams.get("role") || "";

    // form states
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [qualification, setQualification] = useState("");
    const [jobLocation, setJobLocation] = useState("");
    const [currentLocation, setCurrentLocation] = useState("");
    const [experienceType, setExperienceType] = useState("");
    const [experienceYears, setExperienceYears] = useState("");
    const [hasResume, setHasResume] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (
            !name.trim() ||
            !dob ||
            !phone.trim() ||
            !email.trim() ||
            !address.trim() ||
            !qualification.trim() ||
            !jobLocation ||
            !currentLocation.trim() ||
            !experienceType ||
            !hasResume
        ) {
            alert("Please fill all mandatory fields");
            return;
        }

        if (hasResume === "yes" && !resume) {
            alert("Please upload your resume");
            return;
        }

        try {
            setLoading(true);

            let resumeUrl = "";

            // Upload Resume
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

            // Save Application
            const { error } = await supabase.from("applications").insert([
                {
                    name,
                    dob,
                    phone,
                    email,
                    address,
                    qualification,
                    experience_type: experienceType,
                    experience_years: experienceYears
                        ? Number(experienceYears)
                        : null,
                    job_location: jobLocation,
                    current_location: currentLocation,
                    resume_url: resumeUrl || null,
                    company,
                    role,
                },
            ]);

            if (error) throw error;

            // Send Email
            await fetch("/api/apply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    company,
                    role,
                    jobLocation,
                    currentLocation,
                    resumeUrl,
                }),
            });

            // Google Analytics
            if (typeof window !== "undefined") {
                (window as any).gtag?.("event", "job_application_submitted", {
                    company,
                    role,
                    location: jobLocation,
                });
            }

            router.push("/success");
        } catch (err) {
            console.error(err);
            alert("Submission Failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">

            <div className="w-full max-w-xl space-y-4 border bg-white p-6 rounded-xl shadow-lg">

                {/* LOGO SPACE */}
                <div className="flex justify-center">
                    <img src="/logo.png" className="h-14" />
                </div>

                <h1 className="text-2xl font-bold text-center">
                    Apply for {company}
                </h1>

                <p className="text-center text-gray-500">{role}</p>

                <div className="flex flex-col gap-3">

                    <input
                        placeholder="Name *"
                        className="border rounded-lg px-4 py-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="font-medium text-gray-700">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        className="w-full border rounded-lg px-4 py-3"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <input
                        placeholder="Phone *"
                        className="border rounded-lg px-4 py-3"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <input
                        placeholder="Email *"
                        className="border rounded-lg px-4 py-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <textarea
                        placeholder="Address *"
                        className="border rounded-lg px-4 py-3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <input
                        placeholder="Qualification *"
                        className="border rounded-lg px-4 py-3"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                    />

                    {/* LOCATION */}
                    <label className="font-medium">
                        Job Location
                    </label>

                    <select
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        className="border rounded-lg px-4 py-3"
                    >
                        <option value="">Select Job Location</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Coimbatore">Coimbatore</option>
                    </select>

                    <label className="font-medium">
                        Current Location
                    </label>

                    <input
                        type="text"
                        placeholder="Enter Current Location *"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        className="border rounded-lg px-4 py-3"
                    />

                    {/* EXPERIENCE TYPE */}
                    <select
                        className="border rounded-lg px-4 py-3"
                        value={experienceType}
                        onChange={(e) => {
                            setExperienceType(e.target.value);
                            if (e.target.value === "Fresher") {
                                setExperienceYears("");
                            }
                        }}
                    >
                        <option value="">Select Experience Type</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experienced</option>
                    </select>

                    {/* YEARS */}
                    <select
                        className="border rounded-lg px-4 py-3"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                        disabled={experienceType !== "Experienced"}
                    >
                        <option value="">Years of Experience</option>
                        {[0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((y) => (
                            <option key={y} value={y}>
                                {y} Year
                            </option>
                        ))}
                    </select>

                    {/* RESUME */}
                    <select
                        className="border rounded-lg px-4 py-3"
                        value={hasResume}
                        onChange={(e) => setHasResume(e.target.value)}
                    >
                        <option value="">Do you have resume?</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>

                    {hasResume === "yes" && (
                        <input
                            type="file"
                            className="border rounded-lg px-4 py-3"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setResume(e.target.files[0]);
                                }
                            }}
                        />
                    )}

                    {/* SUBMIT BUTTON */}
                    <button
                        onClick={handleSubmit}
                        disabled={
                            loading ||
                            !name.trim() ||
                            !dob ||
                            !phone.trim() ||
                            !email.trim() ||
                            !address.trim() ||
                            !qualification.trim() ||
                            !jobLocation ||
                            !currentLocation.trim() ||
                            !experienceType ||
                            !hasResume ||
                            (hasResume === "yes" && !resume)
                        }
                        className="w-full bg-[#123A8D] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {loading ? "Submitting..." : "Submit Application"}
                    </button>


                </div>
            </div>
        </div>
    );
}

