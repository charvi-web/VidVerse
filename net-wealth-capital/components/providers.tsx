"use client";

import * as React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Authenticator.Provider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </Authenticator.Provider>
  );
}
