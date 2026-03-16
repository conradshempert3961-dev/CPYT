import type { Metadata } from "next";
import { Montserrat, Prata, Oswald } from "next/font/google";
import "./globals.css";
import LuxInteractions from "@/components/LuxInteractions";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const prata = Prata({
  subsets: ["latin", "cyrillic"],
  variable: "--font-prata",
  weight: ["400"],
});

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Спутник Камчатка",
  description: "База отдыха: 2 корпуса, коттеджи, ресторан и паб, SPA и 3 бассейна.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${prata.variable} ${oswald.variable} antialiased`}>
        <LuxInteractions />
        {children}
      </body>
    </html>
  );
}
