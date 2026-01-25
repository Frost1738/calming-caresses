import "./globals.css"; // ✅ Changed from tailwind.css

import React from "react";

import { Montserrat, Jost, Bad_Script } from "next/font/google";
import { Kanit } from "next/font/google";
import { Dancing_Script } from "next/font/google";
import { Pacifico } from "next/font/google";
import { Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Caveat } from "next/font/google";

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing-script",
});

export const kanitLight = Kanit({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-kanit-light",
});

export const montserratRegular = Montserrat({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const jostRegular = Jost({
  weight: ["900"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const badScript = Bad_Script({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bad-script",
});

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserratRegular.variable} ${jostRegular.variable} ${badScript.variable} ${kanitLight.variable} ${pacifico.variable} ${caveat.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className={montserratRegular.className}>
        {children}{" "}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              fontFamily: "Montserrat, sans-serif",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
