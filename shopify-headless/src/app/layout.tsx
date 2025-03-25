import type { Metadata } from "next";
import { Inter, Tenor_Sans, Roboto } from "next/font/google";
import "./globals.css";

// Import layout components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShopifyChat from "@/components/ShopifyChat";

// Define the Tenor Sans font (for headings) - using Google Fonts temporarily
const tenorSans = Tenor_Sans({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-tenor',
  display: 'swap',
});

// Define a replacement for Twentieth Century font (for body text) - using Roboto temporarily
const twentiethCentury = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-twentieth',
  display: 'swap',
});

// Note: When you have the actual font files, you can switch back to using localFont:
// import localFont from 'next/font/local';
// const tenorSans = localFont({
//   src: '../fonts/TenorSans-Regular.woff2',
//   variable: '--font-tenor',
//   display: 'swap',
// });
// const twentiethCentury = localFont({
//   src: [
//     {
//       path: '../fonts/TwentiethCentury-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../fonts/TwentiethCentury-Medium.woff2',
//       weight: '500',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-twentieth',
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: "Beard and Bones | Premium Beard Care Products",
  description: "Handcrafted beard care products for the modern gentleman. Discover our range of beard oils, balms, and grooming kits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${tenorSans.variable} ${twentiethCentury.variable}`}>
      <body className="bg-black text-white font-twentieth">
        <Header />
        {children}
        <Footer />
        <ShopifyChat />
      </body>
    </html>
  );
}
