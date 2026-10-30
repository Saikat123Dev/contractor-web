import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanguard InfraBuild & Civil Engineers Pvt. Ltd. | Turnkey Civil Construction",
  description: "Class-I Turnkey Civil Engineering, High-Rise Construction, Industrial PEB Plants, Piling Foundations & Highway Infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
