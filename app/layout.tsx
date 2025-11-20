import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polsek Rembang Chatbot",
  description: "Asisten Virtual Layanan Kepolisian Polsek Rembang",
  icons: {
    icon: "/Untitled-design.png",
    shortcut: "/Untitled-design.png",
    apple: "/Untitled-design.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
