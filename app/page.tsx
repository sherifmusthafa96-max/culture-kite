"use client";

import { useEffect, useState } from "react";

export default function CultureKiteWebsite() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#06152B] flex flex-col items-center justify-center text-white px-6 text-center">
        <div className="w-24 h-24 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

        <h1 className="mt-8 text-4xl font-bold tracking-widest text-blue-400">
          CULTURE KITE
        </h1>

        <div className="mt-8">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Building the Future of
            <span className="block text-blue-400">
              Workforce & HR Solutions
            </span>
          </h2>

          <p className="mt-6 text-gray-300 max-w-3xl leading-8">
            Culture Kite delivers professional manpower, recruitment,
            warehouse staffing, delivery workforce, industrial staffing,
            and HR solutions across Tamil Nadu with trusted client
            partnerships and scalable workforce operations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06152B] text-white font-sans overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"></div>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-[#06152B]/80">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Culture Kite Logo"
            className="w-12 h-12 object-contain"
          />

          <h1 className="text-2xl font-bold tracking-wide">
            Culture Kite
          </h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#home" className="hover:text-blue-400 transition">
            Home
          </a>

          <a href="#about" className="hover:text-blue-400 transition">
            About
          </a>

          <a href="#services" className="hover:text-blue-400 transition">
            Services
          </a>

          <a href="#jobs" className="hover:text-blue-400 transition">
            Jobs
          </a>

          <a href="#contact" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>

        <div className="flex gap-4">
          <a
            href="https://wa.me/919500038959"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 font-semibold"
          >
            Contact on WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center text-center px-6 py-32"
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#2563eb,_transparent_60%)]"></div>

        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-white/5 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

            <p className="text-sm text-gray-300">
              Premium HR & Manpower Solutions
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Empowering Businesses with
            <span className="text-blue-400">
              {" "}
              Smart Workforce Solutions
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Culture Kite provides modern HR services, manpower staffing,
            payroll management, and workforce solutions designed to help
            businesses scale faster with confidence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 md:px-20 py-12">
        {[
          ["5000+", "Candidates Placed"],
          ["120+", "Business Clients"],
          ["24/7", "HR Support"],
          ["PAN India", "Operations"],
        ].map(([num, label]) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:scale-105 hover:border-blue-400/40 hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20"
          >
            <h2 className="text-4xl font-bold text-blue-400">
              {num}
            </h2>

            <p className="mt-3 text-gray-300">{label}</p>
          </div>
        ))}
      </section>

      {/* About */}
      <section id="about" className="px-8 md:px-20 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-blue-400">Culture Kite</span>
            </h2>

            <p className="text-gray-300 leading-relaxed text-lg">
              We are a premium manpower and HR solutions company helping
              businesses build reliable teams through modern staffing
              strategies, recruitment solutions, and workforce management.
            </p>

            <p className="mt-6 text-gray-400 leading-relaxed">
              Our mission is to connect the right talent with the right
              opportunity while delivering seamless workforce solutions
              for businesses across industries.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="px-8 md:px-20 py-24 bg-white/[0.03]"
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Our <span className="text-blue-400">Services</span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
            Advanced workforce and HR services designed to simplify hiring
            and operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Unskilled Workforce",
            "Delivery Riders",
            "Supervisors",
            "Picking & Packing",
            "Loading & Unloading",
            "Housekeeping Services",
            "CNC Operator",
            "Core Cleaning",
            "Quality Inspection",
            "Shell Moulding",
            "Melting & Deburring",
          ].map((service) => (
            <div
              key={service}
              className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 p-8 rounded-3xl hover:border-blue-400/40 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl mb-6">
                ✦
              </div>

              <h3 className="text-2xl font-semibold">
                {service}
              </h3>

              <p className="mt-4 text-gray-400 leading-relaxed">
                Premium workforce solutions tailored for growing
                businesses and enterprises.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Openings */}
      <section id="jobs" className="px-8 md:px-20 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Current <span className="text-blue-400">Job Openings</span>
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Explore the latest workforce opportunities available through Culture Kite.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              company: "FirstCry",
              role: "Delivery Riders",
              location: "Chennai & Coimbatore",
            },

            {
              company: "ABT",
              role: "Loader & Unloader",
              location: "All Over Tamil Nadu",
            },

            {
              company: "Meesho",
              role: "Warehouse Staff",
              location: "Chennai",
            },

            {
              company: "Flipkart",
              role: "Warehouse & Delivery Staff",
              location: "Coimbatore",
            },
          ].map((job, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-bold text-blue-400">
                {job.role}
              </h3>

              <p className="mt-4 text-gray-300">
                <strong>Company:</strong> {job.company}
              </p>

              <p className="mt-2 text-gray-400">
                <strong>Location:</strong> {job.location}
              </p>

              <div className="mt-6">
                <label className="block text-sm text-gray-400 mb-2">
                  Select Preferred Location
                </label>

                <select className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white outline-none">
                  <option>Choose Location</option>
                  <option>Chennai</option>
                  <option>Coimbatore</option>
                  <option>All Over Tamil Nadu</option>
                </select>
              </div>

              <a
                href="https://wa.me/919500038959"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Careers */}
<section id="careers" className="px-8 md:px-20 py-24">
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[40px] p-12 md:p-16 text-center shadow-2xl shadow-blue-900/40">
    
    <h2 className="text-5xl font-bold">
      Join Our Workforce Network
    </h2>

    <p className="mt-6 text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
      Looking for jobs in delivery, warehouse, housekeeping,
      logistics, or office support?
      Apply now and grow your career with Culture Kite.
    </p>

    <div className="mt-10 max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-5">

      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 outline-none"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 outline-none"
      />

      <input
        type="file"
        className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 outline-none"
      />

      <button className="w-full bg-white text-blue-700 hover:bg-gray-100 transition py-4 rounded-xl font-bold text-lg">
        Upload Resume
      </button>

    </div>
  </div>
</section>
      {/* Contact */}
      <section
        id="contact"
        className="px-8 md:px-20 py-24 bg-white/[0.03]"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Let’s Build Your
              <span className="text-blue-400">
                {" "}
                Workforce Together
              </span>
            </h2>

            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Contact Culture Kite today for premium HR services,
              manpower staffing, and business workforce solutions.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/20 p-10 rounded-[32px]">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none"
              />

              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none"
              ></textarea>

              <button className="w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-xl font-bold text-lg">
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-50 border-t border-white/10 py-8 px-8 md:px-20 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
        <p>© 2026 Culture Kite. All Rights Reserved.</p>

        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="https://wa.me/919500038901"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 transition px-5 py-2 rounded-xl font-semibold text-white"
          >
            WhatsApp
          </a>

          <a
            href="mailto:admin@culturekite.in"
            className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-xl font-semibold text-white"
          >
            Email
          </a>
        </div>

        <a
          href="https://wa.me/919500038959"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl z-40 transition animate-bounce"
        >
          💬
        </a>
      </footer>
    </div>
  );
}