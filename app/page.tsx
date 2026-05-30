"use client";
import { useEffect, useState } from "react";
import Chatbot from "@/components/Chatbot";
import Image from "next/image";
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
      <div className="h-screen w-full bg-white flex flex-col items-center justify-center">

        <div className="w-20 h-20 border-4 border-[#123A8D] border-t-transparent rounded-full animate-spin"></div>

        <h1 className="mt-8 text-5xl font-black tracking-[0.2em] text-[#123A8D]">
          CULTURE KITE
        </h1>

        <p className="mt-4 text-gray-500 text-lg">
          Building the Future of Workforce & HR Solutions
        </p>

      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-hidden relative">

      {/* Animated Background Glow */}

      {/* Navbar */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#5AD5D7] rotate-45"></div>

            <div className="text-2xl font-black tracking-widest text-[#5AD5D7]">
              <div className="w-4 h-4 bg-[#5AD5D7] rotate-45"></div>
              CULTURE KITE
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>

          <a
            href="https://wa.me/919500038959"
            target="_blank"
            className="bg-white hover:bg-[#1F84D7] transition px-5 py-2 rounded-xl font-semibold"
          >
            Contact Us
          </a>

        </div>
      </nav>

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





      <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        CULTURE KITE provides modern HR services, manpower staffing,
        payroll management, and workforce solutions designed to help
        businesses scale faster with confidence.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
        <a
          href="https://wa.me/919500038959"
          target="_blank"
          className="bg-[#123A8D] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1F84D7]"
        >
          Talk To Our Team
        </a>

        <a
          href="#services"
          className="border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-gray-100"
        >
          Workforce Solutions
        </a>
      </div>

      <div className="relative z-10 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-white/5 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <p className="text-sm text-gray-600">Trusted Workforce Partner Since 2025</p>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-[0.15em] text-gray-900">
          CULTURE KITE
        </h1>

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
            href="#services"
            className="bg-white hover:bg-[#1F84D7] transition px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/30 inline-block text-center"
          >
            Hire Employees
          </a>

          <a
            href="#careers"
            className="border border-[#5AD5D7]/20 hover:bg-[#123A8D]/20 transition px-8 py-4 rounded-2xl text-lg font-semibold backdrop-blur-md inline-block text-center"
          >
            Apply for Jobs
          </a>
        </div>
      </div>

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

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Logistics",
            "Manufacturing",
            "E-commerce",
            "FM Teams",

          ].map((service) => (
            <div
              key={service}
              className="bg-white border border-gray-200 shadow-lg p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#5AD5D7]/20 flex items-center justify-center text-[#5AD5D7] text-2xl mb-6">
                ✦
              </div>
              <h3 className="text-2xl font-semibold">{service}</h3>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Premium workforce solutions tailored for growing businesses and enterprises.
              </p>
            </div>
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

        <div className="overflow-hidden relative">
          <div className="flex gap-10 whitespace-nowrap animate-marquee text-3xl font-bold text-[#5AD5D7]">

            <span>FIRSTCRY</span>
            <span>ABT</span>
            <span>FLIPKART</span>
            <span>MEESHO</span>
            <span>EMERALD</span>
            <span>INDOSHELL</span>
            <span>PURPLE</span>
            <span>UNIQUE SHELL</span>

            {/* Duplicate for smooth loop */}

            <span>FIRSTCRY</span>
            <span>ABT</span>
            <span>FLIPKART</span>
            <span>MEESHO</span>
            <span>EMERALD</span>
            <span>INDOSHELL</span>
            <span>PURPLE</span>
            <span>UNIQUE SHELL</span>

          </div>
        </div>

      </section>

      {/* Job Openings Section */}

      {/* Job Openings Section */}

      <section className="px-8 md:px-20 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Current <span className="text-[#5AD5D7]">Job Openings</span>
          </h2>


          <p className="text-gray-500 mt-5 text-lg">
            Explore the latest workforce opportunities available through <span className="text-[#5AD5D7]">CULTURE KITE</span>.
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
              company: "FirstCry",
              role: "Picking, Packing, Loading & Unloading",
              location: "Chennai & Coimbatore",
            },

            {
              company: "FirstCry",
              role: "Supervisors",
              location: "Chennai & Coimbatore",
            },

            {
              company: "Shree Maruthi",
              role: "Delivery Riders",
              location: "Chennai",
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
              company: "Purple",
              role: "Warehouse Associates",
              location: "Coimbatore",
            },

            {
              company: "Unique Shell",
              role: "Quality Inspection & Packing",
              location: "Coimbatore",
            },

            {
              company: "Emerald",
              role: "House Keeping",
              location: "Coimbatore",
            },

            {
              company: "Flipkart",
              role: "Warehouse & Delivery Staff",
              location: "Coimbatore",
            },

            {
              company: "Indoshell",
              role: "CNC Operator",
              location: "Coimbatore",
            },

          ].map((job, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 shadow-lg p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >

              <h3 className="text-2xl font-bold text-[#5AD5D7]">
                {job.role}
              </h3>

              <p className="mt-4 text-gray-500">
                <strong>Company:</strong> {job.company}
              </p>

              <p className="mt-2 text-gray-500">
                <strong>Location:</strong> {job.location}
              </p>

              <div className="mt-6">
                <label className="block text-sm text-gray-600 mb-2">
                  Select Preferred Location
                </label>

                <select className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 outline-none">
                  <option>Choose Location</option>
                  <option>Chennai</option>
                  <option>Coimbatore</option>
                  <option>All Over Tamil Nadu</option>
                </select>
              </div>

              <a
                href="https://wa.me/919500038959"
                target="_blank"
                className="inline-block mt-6 bg-whitehover:bg-[#1F84D7] transition px-6 py-3 rounded-xl font-semibold"
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
          <h2 className="text-5xl font-bold">Join Our Workforce Network</h2>
          <p className="mt-6 text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            Looking for jobs in delivery, warehouse, housekeeping, logistics, or office support?
            Apply now and grow your career with CULTURE KITE.
          </p>

          <div className="mt-10 max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-3xl p-8 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
            />

            <input
              type="file"
              className="w-full px-5 py-4 rounded-xl bg-white border border-gray-300 outline-none"
            />

            <button className="w-full bg-[#123A8D] text-white hover:bg-[#1F84D7] transition py-4 rounded-xl font-bold text-lg">
              Upload Resume
            </button>

          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 md:px-20 py-24 bg-white/[0.03]">
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
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-blue-400"
              />

              <div className="space-y-5 text-gray-600 text-lg">
                <p>
                  <strong>WhatsApp:</strong><br />
                  9500038959 / 9500038944 / 9500038909
                </p>

                <p>
                  <strong>Email:</strong><br />
                  <a
                    href="mailto:admin@culturekite.in"
                    className="text-[#5AD5D7] hover:text-blue-300"
                  >
                    admin@culturekite.in
                  </a><br />
                  <a
                    href="mailto:mathan@culturekite.in"
                    className="text-[#5AD5D7] hover:text-blue-300"
                  >
                    mathan@culturekite.in
                  </a><br />
                  <a
                    href="mailto:musthafa@culturekite.in"
                    className="text-[#5AD5D7] hover:text-blue-300"
                  >
                    musthafa@culturekite.in
                  </a><br />
                  <a
                    href="mailto:aiswarya@culturekite.in"
                    className="text-[#5AD5D7] hover:text-blue-300"
                  >
                    aiswarya@culturekite.in
                  </a>
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
      </section>

      {/* Footer */}
      <footer className="relative z-50 border-t border-gray-200 bg-white py-8 px-8 md:px-20 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div className="w-4 h-4 bg-[#5AD5D7] rotate-45"></div>
        <p>© 2026 CULTURE KITE. All Rights Reserved.</p>

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
            className="bg-[#123A8D] hover:bg-[#1F84D7] transition px-5 py-2 rounded-xl font-semibold text-white"

          >

            Email

          </a>

        </div>


        <a
          href="https://wa.me/919500038959"
          target="_blank"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl z-40 transition animate-bounce"

        >

          💬 </a>

      </footer>

      <Chatbot />

      <style jsx global>{`
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 18s linear infinite;
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
`}</style>

    </div>
  );
}