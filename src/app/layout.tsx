import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Shahzada Muhammad Shehryar — AI/ML Engineer",
  description:
    "AI/ML Engineer and Product Analyst specializing in LLMs, RAG systems, voice AI, and fintech automation. CS '25 from LUMS Pakistan. Currently at Simpaisa.",
  keywords: [
    "Shahzada Muhammad Shehryar",
    "AI Engineer",
    "Machine Learning",
    "LangChain",
    "RAG",
    "LUMS",
    "Pakistan",
    "Fintech",
    "Chatbots",
    "Voice AI",
    "Product Analytics",
    "Simpaisa",
  ],
  authors: [{ name: "Shahzada Muhammad Shehryar" }],
  openGraph: {
    title: "Shahzada Muhammad Shehryar — AI/ML Engineer",
    description:
      "Building intelligent AI systems at the intersection of LLMs, voice AI, and fintech. CS '25 from LUMS Pakistan.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
