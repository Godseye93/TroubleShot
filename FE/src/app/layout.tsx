import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Trouble Shot",
  description: "The perfect partner of Trouble Shooting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
