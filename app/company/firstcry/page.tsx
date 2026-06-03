import Link from "next/link";
export const metadata = {
    title: "FirstCry Careers | Culture Kite",
    description:
        "Apply for FirstCry warehouse and delivery jobs through Culture Kite.",
};

export default function FirstCryPage() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16 relative">

            {/* 🔥 WATERMARK (GLOBAL BACKGROUND) */}
            <div className="fixed bottom-6 left-6 z-10 opacity-20 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                    <img
                        src="/logo.png"
                        alt="Culture Kite Watermark"
                        className="w-[600px] md:w-[800px] opacity-5"
                    />

                </div>
                <img
                    src="/logo.png"
                    alt="Culture Kite Logo"
                    className="w-52 md:w-72 h-auto"
                />
            </div>

            {/* MAIN CARD */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden">

                {/* TOP CLIENT LOGO SECTION */}
                <div className="flex justify-center items-center gap-4">

                    <span className="text-4xl font-bold text-gray-400">
                    </span>

                    <div className="h-24 w-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                        <img
                            src="/client-logos/firstcry.png"
                            alt="FirstCry"
                            className="h-16 w-16 object-contain"
                        />
                    </div>

                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-[#123A8D] mt-8">
                    FirstCry Careers
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                    FirstCry is India’s leading baby products company offering retail & warehouse operations across major cities.
                    We are currently hiring energetic candidates for multiple roles in Tamil Nadu.
                </p>

                {/* INFO GRID */}
                <div className="grid md:grid-cols-3 gap-6 mt-10">

                    <div className="bg-blue-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">📍 Locations</h2>
                        <p className="text-gray-600 mt-2">Chennai, Coimbatore</p>
                    </div>

                    <div className="bg-green-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">🎁 Benefits</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            PF, ESI, Weekly Off, Attendance Bonus, Petrol Allowance For Delivery Executives,
                            Career Growth Opportunities
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-0 rounded-xl">
                        <h2 className="font-semibold text-lg">💼 Open Roles</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Warehouse Associate, Delivery Executive
                        </p>


                        {/* BUTTON */}
                        <Link
                            href="/apply?company=FirstCry&role=Warehouse Associate"
                            className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                        >
                            Apply - Warehouse Associate
                        </Link>

                        <Link
                            href="/apply?company=FirstCry&role=Delivery Executive"
                            className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-2"
                        >
                            Apply - Delivery Executive
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}