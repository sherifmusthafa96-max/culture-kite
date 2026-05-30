export default function ManufacturingPage() {
    const jobs = [
        { role: "CNC Operator", company: "Indo Shell Cast", location: "Coimbatore" },
        { role: "VMC Operator", company: "Indo Shell Cast", location: "Coimbatore" },
        { role: "HMC Operator", company: "Indo Shell Cast", location: "Coimbatore" },
        { role: "Shell Moulding", company: "Unique Shell Mould", location: "Coimbatore" },
        { role: "Core Shooter", company: "Unique Shell Mould", location: "Coimbatore" },
        { role: "Deburring / Fettling", company: "Unique Shell Mould", location: "Coimbatore" },
    ];

    return (
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

                        <p className="mt-2 text-gray-600">
                            <strong>Location:</strong> {job.location}
                        </p>

                        <a
                            href="https://wa.me/919500038959"
                            target="_blank"
                            className="inline-block mt-6 bg-[#123A8D] text-white px-6 py-3 rounded-xl"
                        >
                            Apply Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}