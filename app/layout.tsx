import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UnitedHope - Donation Website",
  description: "Providing hope and support to communities across the United States. Donate today to make a difference.",
  keywords: "donation, charity, support, community, hope, assistance, help, united states, usa",
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "UnitedHope - Donation Website",
    description: "Providing hope and support to communities across the United States. Donate today to make a difference.",
    url: "https://unitedhopefoundation.com",
    siteName: "UnitedHope",
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'UnitedHope Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "UnitedHope - Donation Website",
    description: "Providing hope and support to communities across the United States. Donate today to make a difference.",
    images: ['/logo.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ToastProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
