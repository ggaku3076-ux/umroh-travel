import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Nunito } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Soraya Tour | Travel Haji & Umroh Premium Bintang 5",
  description: "Soraya Tour melayani paket Umroh Reguler, Umroh Plus Turki/Al-Aqsa, dan Perjalanan Ibadah Haji Khusus dengan pelayanan VIP bintang 5 dan pembimbing ibadah berpengalaman.",
  keywords: [
    "Soraya Tour",
    "Travel Umroh",
    "Travel Haji Khusus",
    "Paket Umroh Bintang 5",
    "Umroh VIP",
    "Travel Haji Umroh Terpercaya",
    "Umroh Plus Turki"
  ],
  authors: [{ name: "Soraya Tour Team" }],
  openGraph: {
    title: "Soraya Tour | Travel Haji & Umroh Premium Bintang 5",
    description: "Soraya Tour melayani paket Umroh Reguler, Umroh Plus, dan Perjalanan Ibadah Haji Khusus dengan pelayanan VIP bintang 5 dan pembimbing ibadah berpengalaman.",
    siteName: "Soraya Tour",
    locale: "id_ID",
    type: "website",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { AdminContentProvider } from "@/context/AdminContentContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${nunito.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-full flex-col font-sans bg-[#0E0C0A] text-white antialiased selection:bg-amber-500/30 selection:text-amber-300">
        <AdminContentProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Chatbot />
        </AdminContentProvider>
      </body>
    </html>
  );
}
