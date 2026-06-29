import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/locales/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://swapcar.sa"),

  title: {
    default: "سواب كار | سوق السيارات والسيارات الكورية في السعودية",
    template: "%s | سواب كار",
  },

  description:
    "سواب كار منصة لبيع وشراء السيارات الجديدة والمستعملة في السعودية، مع قسم متخصص للسيارات الكورية مثل هيونداي وكيا وجينيسيس، وعروض مباشرة من البائعين بأسعار تنافسية.",

  keywords: [
    "سواب كار",
    "Swap Car",
    "بيع سيارات",
    "شراء سيارات",
    "سيارات للبيع",
    "سيارات مستعملة",
    "سيارات جديدة",
    "سوق السيارات",
    "سيارات السعودية",
    "سيارات كورية",
    "سيارات كوري",
    "سيارات كورية للبيع",
    "سيارات كورية مستعملة",
    "سيارات كورية جديدة",
    "هيونداي للبيع",
    "كيا للبيع",
    "جينيسيس للبيع",
    "Hyundai",
    "Kia",
    "Genesis",
    "Marketplace",
    "Automotive",
    "Saudi Arabia",
  ],

  authors: [{ name: "Swap Car" }],
  creator: "Swap Car",
  publisher: "Swap Car",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon1.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "سواب كار | بيع وشراء السيارات والسيارات الكورية في السعودية",
    description:
      "اعرض سيارتك للبيع أو تصفح أفضل عروض السيارات الجديدة والمستعملة، مع قسم متخصص للسيارات الكورية مثل هيونداي وكيا وجينيسيس داخل السعودية.",
    url: "https://swapcar.sa",
    siteName: "Swap Car",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "/swapcar-og-image.png",
        width: 1200,
        height: 630,
        alt: "سواب كار | سوق السيارات والسيارات الكورية في السعودية",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "سواب كار | سوق السيارات والسيارات الكورية",
    description:
      "بيع وشراء السيارات الجديدة والمستعملة في السعودية، مع قسم متخصص للسيارات الكورية.",
    images: ["/swapcar-og-image.png"],
  },

  applicationName: "Swap Car",
  category: "Automotive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
