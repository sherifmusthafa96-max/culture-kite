import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Culture Kite HR Solutions | Recruitment & Workforce Management",

  description:
    "Trusted manpower, staffing, recruitment and HR solutions across Tamil Nadu.",

  openGraph: {
    title: "Culture Kite HR Solutions",
    description:
      "Trusted manpower and recruitment solutions.",
    images: ["/logo.png"],
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <GoogleAnalytics gaId="G-0ZLF30519D" />
        <Footer />
      </body>
    </html>

  );
}