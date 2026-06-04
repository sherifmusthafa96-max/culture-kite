import Image from "next/image";
<section
  id="home"
  className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
>

  <div className="relative z-10 text-center px-6">
    <Image
      src="/logo.webp"
      alt="Culture Kite"
      width={850}
      height={250}
      priority
    />
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-[0.18] animate-watermark z-0">

      <Image
        src="/logo.webp"
        alt="Culture Kite"
        width={850}
        height={250}
        style={{
          width: "100%",
          maxWidth: "850px",
          height: "auto",
        }}
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