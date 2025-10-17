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
  title: "Jeevanantham Mahalingam - Full-Stack Developer & AI Enthusiast",
  description: "Portfolio of Jeevanantham Mahalingam - Full-Stack Developer specializing in modern web technologies, AI integration, and digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Alfred Bot Widget */}
        <script 
          data-tenant-id="68e68ff44d3939b192d9e216" 
          src="https://alfred-portfolio-bot.vercel.app/alfred-widget.js">
        </script>
      </body>
    </html>
  );
}
