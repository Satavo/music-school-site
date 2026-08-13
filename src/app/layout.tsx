import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { ContactModalProvider } from "@/components/ContactModalProvider";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { Footer } from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Family Music Academy | Classical Piano Lessons",
    template: "%s | Family Music Academy",
  },
  description:
    "Classical piano lessons for children, teens, and adults. One-on-one instruction, ABRSM exam preparation, and performance opportunities.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ContactModalProvider>
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingContactButton />
        </ContactModalProvider>
      </body>
    </html>
  );
}
