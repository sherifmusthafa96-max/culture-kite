import Link from "next/link";
import Image from "next/image";
export const metadata = {
    title: "Indoshell Cast Careers | Culture Kite",
    description:
        "Apply for Indoshell Cast warehouse and manufacturing jobs through Culture Kite.",
};

export default function IndoshellPage() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 py-16 relative">

            {/* WATERMARK */}
            <div className="fixed bottom-6 left-6 z-10 opacity-20 pointer-events-none">

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                    <Image
                        src="/logo.webp"
                        alt="Culture Kite Logo"
                        width={288}
                        height={288}
                        style={{
                            width: "auto",
                            height: "auto",
                        }}
                    />

                </div>

                <Image
                    src="/logo.webp"
                    alt="Culture Kite Logo"
                    width={288}
                    height={288}
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                />

            </div>

            {/* MAIN CARD */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 relative overflow-hidden">

                {/* CLIENT LOGO */}
                <div className="flex justify-center items-center">

                    <div className="h-24 w-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">

                        <Image
                            src="/client-logos/indoshell.webp"
                            alt="ABT"
                            width={120}
                            height={60}
                            className="w-auto h-auto"
                        />

                    </div>

                </div>

                {/* TITLE */}
                <h1 className="text-4xl font-bold text-[#123A8D] mt-8">
                    Indoshell Cast Careers
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-4 text-gray-600 leading-relaxed">
                    Indoshell Cast Private Limited is a leading precision
                    investment casting manufacturer serving automotive,
                    engineering, and industrial sectors. We are hiring
                    talented candidates for production and manufacturing
                    operations.
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
                            Career Growth Opportunities
                        </p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl">
                        <h2 className="font-semibold text-lg">
                            💼 Open Roles
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            VMC Operator,
                            CNC Operator,
                            HMC Operator
                        </p>
                    </div>

                </div>

                {/* APPLY BUTTON */}
                <Link
                    href="/apply?company=Indoshell Cast&role=VMC Operator"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - VMC Operator
                </Link>
                <Link
                    href="/apply?company=Indoshell Cast&role=CNC Operator"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - CNC Operator
                </Link>
                <Link
                    href="/apply?company=Indoshell Cast&role=HMC Operator"
                    className="bg-[#123A8D] text-white px-4 py-2 rounded-lg text-center block mt-3"
                >
                    Apply - HMC Operator
                </Link>

            </div>

        </div>
    );
}