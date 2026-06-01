import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 shadow-md bg-white">

      {/* LOGO */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={120}
          height={50}
        />
      </Link>

      {/* NAV LINKS */}
      <div className="flex gap-6 font-medium items-center">

        <Link href="/logistics">Logistics</Link>
        <Link href="/manufacturing">Manufacturing</Link>
        <Link href="/ecommerce">E-Commerce</Link>
        <Link href="/fm-teams">FM-Teams</Link>

        <Link
          href="/admin"
          className="hidden"
        >
          Applications
        </Link>

      </div>

    </div>
  );
}