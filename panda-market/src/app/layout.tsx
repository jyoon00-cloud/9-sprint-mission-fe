import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import localFont from "next/font/local";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "판다마켓",
  description: "중고거래 사이트",
};

const pretendard = localFont({
  src: "./_fonts/pretendard/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.className} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="grow pt-17.5 justify-items-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
