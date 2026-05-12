import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://finixeducationinstitute.com"),
  title: {
    default: "Finix Education Institute - Best CNC, VMC & HMC Training in Pune",
    template: "%s | Finix Education Institute",
  },
  description:
    "Finix Education Institute offers professional CNC, VMC, HMC training, CAD/CAM, and Mechanical Engineering Diploma in Sanaswadi, Pune.",
  keywords: [
    "Finix Education Institute",
    "CNC Training Pune",
    "CNC Programming Course",
    "VMC Operating Training",
    "HMC Operating Training",
    "Mechanical Engineering Diploma",
    "CNC Machining",
    "CAD CAM Training",
    "Sanaswadi CNC Institute",
    "Best CNC Institute in Pune",
    "Best CNC institute in Sanaswadi",
  ],
  authors: [{ name: "Finix Education Institute" }],
  creator: "Finix Education Institute",
  publisher: "Finix Education Institute",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://finixeducationinstitute.com",
    siteName: "Finix Education Institute",
    title: "Finix Education Institute - Best CNC & VMC Training in Pune",
    description: "Professional CNC training, VMC operating, and advanced programming courses with 100% practical training.",
    images: [
      {
        url: "/images/institute main photo.png",
        width: 1200,
        height: 630,
        alt: "Finix Education Institute CNC Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finix Education Institute - CNC & VMC Training",
    description: "Industry-ready CNC training and programming courses in Pune.",
    images: ["/images/institute main photo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased text-[17px]`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

