import { Work_Sans, Gabarito, Wix_Madefor_Text } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata = {
  title: "Yeonha Park | Web Developer",
  openGraph: {
    title: "Yeonha Park - Web Developer Portfolio",
    url: "https://yeonha.vercel.app",
    siteName: "Yeonha Park | Web Developer",
    images: [
      {
        url: "/thumbnail-website.png", // 도메인 루트에 올려야 함
        width: 900,
        height: 630,
        alt: "portfolio thumbnail",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeonha Park | Web Developer",
    images: ["/thumbnail-website.png"],
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
        <div className="max-w-7xl mx-auto">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
