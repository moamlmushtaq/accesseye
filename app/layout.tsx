import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

export const metadata: Metadata = {
  title: "AccessEye",
  description: "Centralized Access Monitoring for Teams",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
