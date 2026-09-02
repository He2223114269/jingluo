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
  metadataBase: new URL("https://jingluo-blond.vercel.app"),
  title: {
    default: "何郴 · 风控建模算法工程师",
    template: "%s · 何郴",
  },
  description: "风控建模算法工程师作品集：实时授信风控、策略调控、Vintage 资损预测、自动化监控与算法研究。",
  keywords: ["风控建模", "信用评分", "策略分析", "Vintage", "Python", "SQL", "Next.js"],
  authors: [{ name: "何郴" }],
  creator: "何郴",
  openGraph: {
    title: "何郴 · 风控建模算法工程师",
    description: "实时授信风控建模、策略调控、资损预测与自动化监控作品集。",
    url: "/",
    siteName: "Jingluo Portfolio",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "何郴 · 风控建模算法工程师",
    description: "实时授信风控建模、策略调控、资损预测与自动化监控作品集。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f172a] text-slate-200">
        {children}
      </body>
    </html>
  );
}
