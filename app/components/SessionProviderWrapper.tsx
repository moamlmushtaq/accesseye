"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ReactNode } from "react";

export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
