import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar";
import { nohemi, spaceGrotesk } from "@/lib/fonts";

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
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
  openGraph: {
    title: "StratiFi AI Agent - DeFAI",
    description:
      "Advanced DeFi yield optimization powered by AI. Maximize your returns with intelligent strategy selection and real-time market analysis.",
    type: "website",
    locale: "en_US",
    siteName: "StratiFi",
  },
  twitter: {
    card: "summary_large_image",
    title: "StratiFi AI Agent - DeFAI",
    description:
      "Advanced DeFi yield optimization powered by AI. Maximize your returns with intelligent strategy selection and real-time market analysis.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body
        className={`${nohemi.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-screen w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
