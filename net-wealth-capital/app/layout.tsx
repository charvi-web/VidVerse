import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import ConfigureAmplify from "@/components/configure-amplify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NWealth Capital — Personalised Wealth Management",
    template: "%s · NWealth Capital",
  },
  description:
    "NWealth Capital delivers personalised investment advisory, taxation, insurance, retirement, estate and NRI wealth management for individuals and families.",
  keywords: [
    "wealth management",
    "investment advisory",
    "financial planning",
    "NRI wealth management",
    "retirement planning",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ConfigureAmplify />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
