"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { assets } from "@/lib/assets";
import OptimizedImage from "@/components/ui/OptimizedImage";
export default function CultureKiteWebsite() {
    const [careerName, setCareerName] = useState("");
    const [careerPhone, setCareerPhone] = useState("");
    const [careerEmail, setCareerEmail] = useState("");
    const [careerResume, setCareerResume] = useState<File | null>(null);
    const [careerLoading, setCareerLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const handleCareerSubmit = async () => {
        if (!careerName || !careerPhone || !careerResume) {
            alert("Please fill all fields");
            return;
        }

        try {
            setCareerLoading(true);

            const fileName = `${Date.now()}-${careerResume.name}`;

            const { error: uploadError } = await supabase.storage
                .from("resumes")
                .upload(fileName, careerResume);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from("resumes")
                .getPublicUrl(fileName);

            const resumeUrl = data.publicUrl;

            const { error } = await supabase
                .from("career_applications")
                .insert([
                    {
                        name: careerName,
                        email: careerEmail,
                        phone: careerPhone,
                        resume_url: resumeUrl,
                    },
                ]);

            if (error) throw error;

            alert("Application Submitted Successfully ✅");
            await fetch("/api/career-application", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: careerName,
                    email: careerEmail,
                    phone: careerPhone,
                    resumeUrl,
                }),
            });
            setCareerName("");
            setCareerEmail("");
            setCareerPhone("");
            setCareerResume(null);
        } catch (err) {
            console.log("UPLOAD ERROR:", JSON.stringify(err, null, 2));
            console.log("RAW ERROR:", err);
            alert("Submission Failed ❌");
        } finally {
            setCareerLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="h-screen w-full bg-white flex flex-col items-center justify-center">

                <div className="w-20 h-20 border-4 border-[#123A8D] border-t-transparent rounded-full animate-spin"></div>

                <h1
                    className="mt-8 text-5xl font-black tracking-[0.2em] text-[#123A8D]"
                    style={{
                        textShadow: "0 0 15px rgba(18,58,141,0.3)"
                    }}
                >
                    CULTURE KITE
                </h1>
                <p className="mt-4 text-gray-500 text-lg">
                    Building the Future of Workforce & HR Solutions
                </p>

            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-[#f8fbff] to-[#eef5ff] text-gray-900">

            {/* Animated Background Glow */}

            {/* Navbar */}

            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
                <div className="flex items-center justify-between px-6 py-4">

                    <OptimizedImage
                        src="/logo.png"
                        alt="Culture Kite"
                        className="w-[240px] h-auto"
                        priority
                    />

                    <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#careers">Careers</a>
                        <a href="/admin">Applications</a>
                    </div>

                    <a
                        href="https://wa.me/919500038959"
                        className="bg-[#123A8D] text-white px-6 py-2 rounded-xl"
                    >
                        Contact
                    </a>

                </div>
            </nav>

            {/* Fixed Bottom Left Logo */}
            <div className="fixed bottom-6 left-6 z-10 opacity-20 pointer-events-none">
                <OptimizedImage
                    src="/logo.png"
                    alt="Culture Kite"
                    className="w-[120px] h-auto"
                    priority
                />
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="#home" className="hover:text-[#5AD5D7] hover:scale-110 transition-all duration-300"
                >Home</a>
                <a href="#about" className="hover:text-[#5AD5D7] hover:scale-110 transition-all duration-300"
                >About</a>
                <a href="#services" className="hover:text-[#5AD5D7] hover:scale-110 transition-all duration-300"
                >Services</a>
                <a href="#careers" className="hover:text-[#5AD5D7] hover:scale-110 transition-all duration-300"
                >Careers</a>
                <a href="#contact" className="hover:text-[#5AD5D7] hover:scale-110 transition-all duration-300"
                >Contact</a>
            </div>

            <div className="text-3xl font-extrabold tracking-widest text-gray-900/10">
                ☰
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(90,213,215,0.12),transparent_70%)]"></div>

            <section
                id="home"
                className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-64"
            >

                {/* WATERMARK PASTE HERE */}

                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.05] animate-watermark">

                    <OptimizedImage
                        src="/logo.png"
                        alt="Culture Kite"
                        className="w-[120px] h-auto"
                        priority
                    />

                    {/* Split Logo Animation */}
                    <div className="relative z-20"></div>
                    <div className="fixed inset-0 pointer-events-none z-10">

                        <div className="logo-top-left animate-topLeft"></div>
                        <div className="logo-top-right animate-topRight"></div>
                        <div className="logo-bottom-left animate-bottomLeft"></div>
                        <div className="logo-bottom-right animate-bottomRight"></div>

                    </div>

                </div>
                <div className="relative z-10 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-white/5 mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <p className="text-sm text-gray-600">Trusted Workforce Partner Since 2025</p>
                    </div>

                    <OptimizedImage
                        src="/logo.png"
                        alt="Culture Kite"
                        className="w-[1000px] h-auto"
                        priority
                    />
                    <p className="mt-6 text-2xl text-[#5AD5D7] font-semibold">
                        HR Solutions • Workforce Management • Recruitment
                    </p>

                    <p className="mt-4 text-lg text-gray-500">
                        Trusted Workforce Partner Across Tamil Nadu
                    </p>

                    <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        CULTURE KITE provides modern HR services, manpower staffing, payroll management,
                        and workforce solutions designed to help businesses scale faster with confidence.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">

                        <a
                            href="https://wa.me/919500038959"
                            target="_blank"
                            className="bg-[#123A8D] hover:bg-[#1F84D7] text-white transition px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl inline-block text-center"
                        >
                            Talk To Our Team
                        </a>

                        <a
                            href="#services"
                            className="border border-[#5AD5D7]/20 hover:bg-[#123A8D]/10 transition px-8 py-4 rounded-2xl text-lg font-semibold inline-block text-center"
                        >
                            Workforce Solutions
                        </a>

                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 md:px-20 py-12">
                {[
                    ["0 → 5000+", "Candidates Placed"],
                    ["0 → 120+", "Business Clients"],
                    ["24/7", "HR Support"],
                    ["PAN India", "Operations"],
                ].map(([num, label]) => (
                    <div
                        key={label}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 hover:border-blue-400/40 hover:bg-[#123A8D]/20 transition-all duration-300 shadow-lg shadow-black/20"
                    >
                        <h2 className="text-4xl font-bold text-[#5AD5D7]">{num}</h2>
                        <p className="mt-3 text-gray-600">{label}</p>
                    </div>
                ))}
            </section>

            {/* About */}
            <section id="about" className="px-8 md:px-20 py-24">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            About <span className="text-[#5AD5D7]">CULTURE KITE</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We are a premium manpower and HR solutions company helping businesses build
                            reliable teams through modern staffing strategies, recruitment solutions,
                            and workforce management.
                        </p>

                        <p className="mt-6 text-gray-500 leading-relaxed">
                            Our mission is to connect the right talent with the right opportunity while
                            delivering seamless workforce solutions for businesses across industries.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-[32px] p-10 shadow-xl">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-semibold">Smart Recruitment</h3>
                                <p className="text-gray-500 mt-2">
                                    Fast and reliable staffing solutions for modern businesses.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-semibold">Corporate HR Services</h3>
                                <p className="text-gray-500 mt-2">
                                    Professional HR operations, payroll, and employee support.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200">
                                <h3 className="text-xl font-semibold">Scalable Workforce</h3>
                                <p className="text-gray-500 mt-2">
                                    Build flexible teams for growth-oriented companies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="px-8 md:px-20 py-24 bg-white/[0.03]">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold">
                        Our <span className="text-[#5AD5D7]">Services</span>
                    </h2>
                    <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-lg">
                        Advanced workforce and HR services designed to simplify hiring and operations.
                    </p>
                </div>
                <div className="grid md:grid-cols-4 gap-8">

                    {[
                        { name: "Logistics", link: "/Services/Logistics" },
                        { name: "Manufacturing", link: "/Services/Manufacturing" },
                        { name: "E-Commerce", link: "/Services/E-Commerce" },
                        { name: "FM Teams", link: "/Services/FM-Teams" },
                    ].map((service) => (

                        <a
                            key={service.name}
                            href={service.link}
                            className="bg-[#123A8D]/10 border border-[#5AD5D7]/20 rounded-3xl p-8 hover:-translate-y-2 hover:border-[#5AD5D7] transition-all duration-300 block"
                        >

                            <div className="w-14 h-14 rounded-2xl bg-[#5AD5D7]/20 flex items-center justify-center text-[#5AD5D7] text-2xl mb-6">
                                <OptimizedImage
                                    src="/logo.png"
                                    alt="Culture Kite"
                                    className="w-[120px] h-auto"
                                    priority
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-[#123A8D]">
                                {service.name}
                            </h3>

                            <p className="mt-4 text-gray-600">
                                Click to view jobs, companies and locations.
                            </p>

                        </a>

                    ))}

                </div>

            </section>
            {/* Clients Section */}

            <section className="px-8 md:px-20 py-24 bg-white/[0.02]">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold">
                        Trusted <span className="text-[#5AD5D7]">Clients</span>
                    </h2>

                    <p className="text-gray-500 mt-5 text-lg">
                        Companies powered by <span className="text-[#5AD5D7]">CULTURE KITE</span> workforce solutions.
                    </p>

                </div>

                <div className="overflow-hidden relative py-6">
                    <div className="flex items-center gap-12 animate-marquee w-max">

                        {[
                            { name: "firstcry", link: "/company/firstcry" },
                            { name: "abt", link: "/company/abt" },
                            { name: "shree-maruti", link: "/company/shree-maruti" },
                            { name: "flipkart", link: "/company/flipkart" },
                            { name: "meesho", link: "/company/meesho" },
                            { name: "emerald", link: "/company/emerald-jewellers" },
                            { name: "indoshell", link: "/company/indoshell" },
                            { name: "purplle", link: "/company/purplle" },
                            { name: "unique-shell", link: "/company/unique-shell-mould" },
                            { name: "royal-enfield", link: "/company/royal-enfield" },
                        ].map((client) => (
                            <Link key={client.name} href={client.link}>
                                <img
                                    src={`/client-logos/${client.name}.png`}
                                    alt={client.name}
                                    className="h-16 w-auto bg-white rounded-2xl p-2 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                                />
                            </Link>
                        ))}

                        {/* duplicate ONLY for smooth infinite loop */}
                        {[
                            "firstcry",
                            "abt",
                            "shree-maruti",
                            "flipkart",
                            "meesho",
                            "emerald",
                            "indoshell",
                            "purplle",
                            "unique-shell",
                            "royal-enfield",
                        ].map((name) => (
                            <Link key={`dup-${name}`} href={`/company/${name}`}>
                                <img
                                    src={`/client-logos/${name}.png`}
                                    alt={name}
                                    className="h-16 w-auto bg-white rounded-2xl p-2 shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
                                />
                            </Link>
                        ))}

                    </div>
                </div>
            </section >
            {/* Careers */}
            < section id="careers" className="px-8 md:px-20 py-24" >
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[40px] p-12 md:p-16 text-center shadow-2xl shadow-blue-900/40">
                    <h2 className="text-5xl font-bold text-white">
                        Join Our Workforce Network
                    </h2>
                    <p className="mt-6 text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
                        Looking for jobs in delivery, warehouse, housekeeping, logistics, or office support?
                        Apply now and grow your career with CULTURE KITE.
                    </p>

                    <div className="mt-10 max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-3xl p-8 space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={careerName}
                            onChange={(e) => setCareerName(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={careerPhone}
                            onChange={(e) => setCareerPhone(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={careerEmail}
                            onChange={(e) => setCareerEmail(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
                        />

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setCareerResume(e.target.files[0]);
                                }
                            }}
                            className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
                        />

                        <button
                            onClick={handleCareerSubmit}
                            disabled={careerLoading}
                            className="w-full bg-[#123A8D] text-white hover:bg-[#1F84D7] transition py-4 rounded-xl font-bold text-lg"
                        >
                            {careerLoading ? "Uploading..." : "Upload Resume"}
                        </button>

                    </div>

                </div>
            </section >

            {/* Contact */}
            < section id="contact" className="px-8 md:px-20 py-24 bg-white/[0.03]" >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-5xl font-bold leading-tight">
                            Let’s Build Your
                            <span className="text-[#5AD5D7]"> Workforce Together</span>
                        </h2>

                        <p className="mt-6 text-gray-500 text-lg leading-relaxed">
                            Contact CULTURE KITE today for premium HR services, manpower staffing,
                            and business workforce solutions.
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-lg p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                        <div className="space-y-5">

                            <div className="space-y-5 text-gray-600 text-lg">
                                <p>
                                    <strong>WhatsApp:</strong><br />
                                    9500038959 / 9500038944 / 9500038909
                                </p>

                                <p>
                                    <strong>Email:</strong><br />
                                    <a
                                        href="mailto:info@culturekite.in"
                                        className="text-[#5AD5D7] hover:text-blue-300"
                                    >
                                        info@culturekite.in
                                    </a><br />
                                </p>
                                <p>
                                    <strong>Registered Office:</strong><br />
                                    No. 30F-A, Peon Colony,<br />
                                    Eachanari, Coimbatore – 641021
                                </p>

                                <p>
                                    <strong>Corporate Office:</strong><br />
                                    No. 54, Chinnaiyan Chettiyar Street,<br />
                                    Chettipalayam, Coimbatore – 641201
                                </p>
                            </div>
                            <div className="mt-8 rounded-3xl overflow-hidden border border-white/10">
                                <iframe
                                    src="https://www.google.com/maps?q=Chettipalayam,Coimbatore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                ></iframe>
                            </div>


                        </div>
                    </div>
                </div>
            </section >


            <style jsx global>{`
           .logo-top-left,
.logo-top-right,
.logo-bottom-left,
.logo-bottom-right {
  width: 220px;
  height: 220px;
  background-image: url('/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.15;
  position: absolute;
}
.logo-top-left {
  top: 50px;
  left: 50px;
}

.logo-top-right {
  top: 50px;
  right: 50px;
}

.logo-bottom-left {
  bottom: 50px;
  left: 50px;
}

.logo-bottom-right {
  bottom: 50px;
  right: 50px;
}
@keyframes floatLogo {
  0%, 100% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
}
.animate-topLeft {
  animation: topLeft 8s infinite ease-in-out;
}

.animate-topRight {
  animation: topRight 8s infinite ease-in-out;
}

.animate-bottomLeft {
  animation: bottomLeft 8s infinite ease-in-out;
}

.animate-bottomRight {
  animation: bottomRight 8s infinite ease-in-out;
}

.animate-logoGlow {
  animation: logoGlow 3s infinite ease-in-out;
}
  @keyframes watermarkFloat {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}

.animate-watermark {
  animation: watermarkFloat 8s ease-in-out infinite;
}
  @keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
`}</style>

        </div >
    );
}