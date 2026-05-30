<section
  id="home"
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
>
  {/* Background Logo */}
  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
    <img
      src="/logo.png"
      alt="Culture Kite"
      className="w-[800px]"
    />
  </div>

  <div className="relative z-10 text-center px-6">
    <img
      src="/logo.png"
      alt="Culture Kite"
      className="mx-auto w-48 mb-8"
    />

    <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.12] animate-watermark z-0">

      <img
        src="/culture-kite-logo.png"
        alt="Culture Kite Logo"
        className="w-[450px] md:w-[700px]"
      />

    </div>
    <p className="text-2xl mt-4 text-sky-500 font-semibold">
      HR Solutions Private Limited
    </p>

    <p className="mt-8 text-gray-600 max-w-3xl mx-auto text-lg">
      Delivering Workforce Solutions, Recruitment,
      Payroll Management and HR Services across Tamil Nadu.
    </p>

    <div className="mt-10 flex justify-center gap-5">
      <a
        href="#careers"
        className="bg-[#123A8D] text-white px-8 py-4 rounded-full font-bold"
      >
        Explore Jobs
      </a>

      <a
        href="#contact"
        className="border-2 border-[#123A8D] text-[#123A8D] px-8 py-4 rounded-full font-bold"
      >
        Contact Us
      </a>
    </div>
  </div>
</section>