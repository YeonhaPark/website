import { Work_Sans, Gabarito, Wix_Madefor_Text } from "next/font/google";
import "./globals.css";
import React from "react";

export const metadata = {
  title: "Yeonha Park | Web3 | Blockchain | Frontend Developer",
  openGraph: {
    title: "Yeonha Park Portfolio | Web3 | Blockchain | Frontend Developer",
    url: "https://yeonha.vercel.app",
    siteName: "Yeonha Park | Web3 | Blockchain | Frontend Developer",
    images: [
      {
        url: "/thumbnail.png", // 도메인 루트에 올려야 함
        width: 1200,
        height: 630,
        alt: "portfolio thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeonha Park | Web3 | Blockchain | Frontend Developer",
    images: ["/thumbnail.png"],
  },
};


const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});
const wixMadeforText = Wix_Madefor_Text({
  variable: "--font-wix-madefor-text",
  subsets: ["latin"],
});
const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`${wixMadeforText.variable} ${workSans.variable} ${gabarito.variable} antialiased font-[family-name:var(--font-work-sans)]`}
    >
    <div className={"gradient-bg"}>{children}</div>
    </body>
    </html>
  );
}
