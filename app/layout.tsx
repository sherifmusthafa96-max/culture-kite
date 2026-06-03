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
  metadataBase: new URL("https://culturekite.in"),
  openGraph: {
    title: "Culture Kite HR Solutions",
    description: "Trusted manpower and recruitment solutions.",
    url: "https://culturekite.in",
    siteName: "Culture Kite",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
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
      <head>
        <link rel="preload" as="image" href="/logo.png" />
      </head>

      <body className={poppins.className}>
        {children}
        <GoogleAnalytics gaId="G-0ZLF30519D" />
        <Footer />
      </body>
    </html>
  );
}