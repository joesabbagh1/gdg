import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "GDG EPITA - Google Developer Group",
    template: "%s | GDG EPITA",
  },
  description:
    "Le club des passionnés de technologies Google à l'EPITA. Codez, apprenez et innovez avec nous.",
  openGraph: {
    type: "website",
    siteName: "GDG EPITA",
    title: "GDG EPITA - Google Developer Group",
    description:
      "Le club des passionnés de technologies Google à l'EPITA. Codez, apprenez et innovez avec nous.",
    images: [
      {
        url: "/logo_name.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GDG EPITA - Google Developer Group",
    description:
      "Le club des passionnés de technologies Google à l'EPITA. Codez, apprenez et innovez avec nous.",
    images: ["/logo_name.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
