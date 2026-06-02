import Link from "next/link";

export default function UniqueShellPage() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16 relative">

            {/* WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img
                    src="/logo.png"
                    alt="Culture Kite Watermark"
                    className="w-[600px] md:w-[800px] opacity-5"
                />
            </div>

            {/* SMALL LOGO */}
            <div className="fixed bottom-6 left-6 z-10 opacity-20 pointer-events-none">
                <img
                    src="/logo.png"
                    alt="Culture Kite Logo"
                    className="w-52 md:w-72 h-auto"
                />
            </div>

            {/* MAIN CARD */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden">

                {/* CLIENT LOGO */}
                <div className="flex justify-center items-center">
                    <div className="h-24 w-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                        <img
                            src="/client-logos/unique-shell.png"
                            alt="Unique Shell Mould"
                            className="h-16 w-16 object-contain"
                        />
                    </div>
                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-[#123A8D] mt-8 text-center">
                    Unique Shell Mould Careers
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 leading-relaxed text-center">
                    Unique Shell Mould is a leading manufacturer specializing in
                    precision casting and shell mould components. We are hiring
                    dedicated candidates for production and manufacturing operations.
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
                            PF, ESI, accommodation for outstation candidates,
                            Weekly Off, Overtime Benefits,
                            Career Growth Opportunities
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">
                            💼 Open Roles
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            Shell Moulding,
                            Core Shooter,
                            Deburring & Fettling
                        </p>
                    </div>

                </div>

                {/* APPLY BUTTON */}
                <Link
                    href="/apply?company=Unique Shell Mould&role=Production Operator"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - Shell Moulding
                </Link>
                <Link
                    href="/apply?company=Unique Shell Mould&role=Production Operator"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - Core Shooter
                </Link>
                <Link
                    href="/apply?company=Unique Shell Mould&role=Production Operator"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - Deburring & Fettling
                </Link>

            </div>

        </div>
    );
}