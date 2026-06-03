import Link from "next/link";
import Image from "next/image";
export const metadata = {
    title: "Purplle Careers | Culture Kite",
    description:
        "Apply for Purplle warehouse jobs through Culture Kite.",
};

export default function PurpllePage() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16 relative">

            {/* WATERMARK */}
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

                {/* COMPANY LOGO */}
                <div className="flex justify-center items-center">

                    <div className="h-24 w-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">

                        <Image
                            src="/client-logos/purplle.png"
                            alt="purplle"
                            width={120}
                            height={60}
                        />

                    </div>

                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-[#123A8D] mt-8 text-center">
                    Purplle Careers
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 leading-relaxed text-center">
                    Purplle is one of India's growing beauty and cosmetics
                    retail platforms. We are hiring enthusiastic candidates
                    for warehouse and logistics operations in Tamil Nadu.
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
                            PF, ESI, Weekly Off, Transport Provision,
                            & Career Growth
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">
                            💼 Open Roles
                        </h2>

                        <p className="text-sm text-gray-600 mt-2">
                            Warehouse Associate
                        </p>
                    </div>

                </div>

                {/* APPLY BUTTON */}
                <Link
                    href="/apply?company=Purplle&role=Warehouse Associate"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - Warehouse Associate
                </Link>

            </div>

        </div>
    );
}