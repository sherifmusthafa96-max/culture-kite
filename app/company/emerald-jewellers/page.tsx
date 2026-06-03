import Link from "next/link";
export const metadata = {
    title: "Emerald Jewellers Careers | Culture Kite",
    description:
        "Apply for Emerald Jewellers housekeeping jobs through Culture Kite.",
};

export default function EmeraldJewellersPage() {

    return (

        <div className="min-h-screen bg-gray-50 px-6 py-16 relative">

            {/* SMALL WATERMARK */}
            <div className="fixed bottom-6 left-6 z-10 opacity-20 pointer-events-none">
                <img
                    src="/logo.png"
                    alt="Culture Kite Logo"
                    className="w-52 md:w-72 h-auto"
                />
            </div>

            {/* BIG CENTER WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                <img
                    src="/logo.png"
                    alt="Culture Kite Watermark"
                    className="w-[600px] md:w-[800px] opacity-5"
                />

            </div>

            {/* MAIN CARD */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden">

                {/* LOGO SECTION */}
                <div className="flex justify-center items-center gap-4">

                    <span className="text-4xl font-bold text-gray-400">
                    </span>

                    <div className="h-24 w-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">

                        <img
                            src="/client-logos/emerald.png"
                            alt="Emerald Jewellers"
                            className="h-16 w-16 object-contain"
                        />

                    </div>

                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-[#123A8D] mt-8">
                    Emerald Jewellers Careers
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                    Emerald Jewellers is one of Tamil Nadu’s leading jewellery retail brands,
                    known for excellence in customer service and premium shopping experience.
                    We are currently hiring dedicated candidates for House Keeping positions.
                </p>

                {/* INFO GRID */}
                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    <div className="bg-blue-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">
                            📍 Location
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Coimbatore
                        </p>
                    </div>

                    <div className="bg-green-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">
                            🎁 Benefits
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            PF, ESI, Weekly Off,
                            Growth Opportunities
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">
                            💼 Open Role
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            House Keeping
                        </p>
                    </div>

                </div>

                {/* APPLY BUTTON */}
                <Link
                    href="/apply?company=Emerald%20Jewellers&role=House%20Keeping"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - House Keeping
                </Link>

            </div>

        </div>

    );
}