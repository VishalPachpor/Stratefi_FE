import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "StratiFi AI Agent - DeFAI",
  description:
    "Advanced DeFi yield optimization powered by AI. Maximize your returns with intelligent strategy selection and real-time market analysis.",
  generator: "Stratefi",
  keywords: [
    "DeFi",
    "Yield Farming",
    "AI",
    "Cryptocurrency",
    "Blockchain",
    "Web3",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
