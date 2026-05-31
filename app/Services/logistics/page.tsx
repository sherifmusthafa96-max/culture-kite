<div className="flex justify-center mb-6">
    <img
        src="/logo.png"
        alt="Culture Kite"
        className="h-24 w-auto"
    />
</div>

export default function LogisticsPage() {
    const jobs = [
        {
            role: "Warehouse Associates",
            company: "FirstCry",
            location: "Chennai & Coimbatore",
        },
        {
            role: "Loading & Unloading",
            company: "ABT Parcel",
            location: "All Over Tamil Nadu",
        },
        {
            role: "Warehouse Associates",
            company: "Meesho",
            location: "Chennai",
        },
        {
            role: "Warehouse Associates",
            company: "Purple",
            location: "Coimbatore",
        },
        {
            role: "Warehouse Associates",
            company: "Flipkart",
            location: "Coimbatore",
        },
    ];

    return (
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
                        className="bg-white border border-gray-200 shadow-lg p-8 rounded-3xl hover:-translate-y-2 transition"
                    >
                        <h2 className="text-2xl font-bold text-[#5AD5D7]">
                            {job.role}
                        </h2>

                        <p className="mt-4 text-gray-600">
                            <strong>Company:</strong> {job.company}
                        </p>

                        <p className="text-gray-600 mt-2">
                            <strong>Location:</strong> {job.location}
                        </p>

                        <a
                            href="https://wa.me/919500038959"
                            target="_blank"
                            className="inline-block mt-6 bg-[#123A8D] text-white px-6 py-3 rounded-xl hover:bg-[#1F84D7]"
                        >
                            Apply Now
                        </a>
                    </div>
                ))}
            </div>
        </div>

    );
}