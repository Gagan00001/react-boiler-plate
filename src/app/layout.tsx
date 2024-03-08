"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";

import ErrorBoundary from "src/components/ErrorBoundary";
import muiTheme from "../styles/muiTheme";
import theme from "../styles/theme";
import { store } from "../redux";

import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
    }
    if (pathName === "/" && token) {
      router.push("/dashboard/projects");
    }
  }, [pathName]);

  return (
    <html lang='en'>
      <body>
        <MUIThemeProvider theme={muiTheme}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Provider>
          </ThemeProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
