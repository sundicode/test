import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/utils/Provider";

export const metadata: Metadata = {
  title: "mediks",
  description: "Mediks help you get satisfying medical schedule",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
