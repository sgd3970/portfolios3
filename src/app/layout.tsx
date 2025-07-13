import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Portfolio - Alex Creative",
  description: "창의적인 디지털 아트와 혁신적인 디자인을 통해 브랜드와 사용자를 연결하는 디자이너의 포트폴리오",
  keywords: ["디자인", "포트폴리오", "그래픽디자인", "UI/UX", "브랜딩", "아트"],
  authors: [{ name: "Alex Creative" }],
  creator: "Alex Creative",
  publisher: "Alex Creative",
  openGraph: {
    title: "Creative Portfolio - Alex Creative",
    description: "창의적인 디지털 아트와 혁신적인 디자인을 통해 브랜드와 사용자를 연결하는 디자이너의 포트폴리오",
    url: "#",
    siteName: "Alex Creative Portfolio",
    images: [
      {
        url: "#",
        width: 1200,
        height: 630,
        alt: "Alex Creative Portfolio",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Portfolio - Alex Creative",
    description: "창의적인 디지털 아트와 혁신적인 디자인을 통해 브랜드와 사용자를 연결하는 디자이너의 포트폴리오",
    images: ["https://alexcreative.com/twitter-image.jpg"],
    creator: "@alexcreative",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
