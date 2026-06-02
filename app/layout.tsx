import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Culture Kite",
  description: "Culture Kite Recruitment Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <GoogleAnalytics gaId="G-ABC123XYZ" />
        <Footer />
      </body>
    </html>
  );
}