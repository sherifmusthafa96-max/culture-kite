export default function FMTeamsPage() {
    const jobs = [
        { role: "Housekeeping", company: "Emerald Groups", location: "Coimbatore" },
        { role: "Security Guard", company: "Royal Enfield Units", location: "Coimbatore" },
    ];

    return (
        <div className="min-h-screen px-8 md:px-20 py-24">
            <h1 className="text-5xl font-bold text-center">
                FM Teams <span className="text-[#5AD5D7]">Jobs</span>
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