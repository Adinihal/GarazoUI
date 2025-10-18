import { Geist, Geist_Mono } from "next/font/google";
import { metadata } from "./metadata";
import "./globals.css";

// Load fonts at the module level for consistent SSR
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Ensure text is visible while font loads
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // Ensure text is visible while font loads
});

export { metadata };

// Separate client-side wrapper component
function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning // Suppress hydration warnings for dynamic class names
    >
      {children}
    </body>
  );
}

// Server component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientLayout>
        {children}
      </ClientLayout>
    </html>
  );
}
