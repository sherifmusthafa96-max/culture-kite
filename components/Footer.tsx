import Link from "next/link";
import Image from "next/image";
export default function Footer() {
    return (
        <footer className="relative z-50 border-t border-gray-200 bg-white py-8 px-8 md:px-20 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">

            {/* Logo */}
            <Image
                src="/logo.webp"
                alt="Culture Kite"
                width={200}
                height={60}
                style={{
                    width: "auto",
                    height: "auto",
                }}
            />

            {/* Copyright */}
            <p className="mt-4 md:mt-0 text-center">
                © {new Date().getFullYear()} CULTURE KITE. All Rights Reserved.
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4 md:mt-0">
                <a
                    href="https://wa.me/919500038901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-400 transition px-5 py-2 rounded-xl font-semibold text-white"
                >
                    WhatsApp
                </a>

                <a
                    href="mailto:admin@culturekite.in"
                    className="bg-[#123A8D] hover:bg-[#1F84D7] transition px-5 py-2 rounded-xl font-semibold text-white"
                >
                    Email
                </a>
            </div>

            {/* Policy Links */}
            <div className="flex gap-4 mt-4 md:mt-0">
                <Link href="/privacy-policy" className="hover:underline">
                    Privacy Policy
                </Link>

                <Link href="/terms-and-conditions" className="hover:underline">
                    Terms & Conditions
                </Link>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/919500038959"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-400 text-white w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl z-40 transition animate-bounce"
            >
                💬
            </a>

        </footer>
    );
}