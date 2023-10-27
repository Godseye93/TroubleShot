import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Trouble Shot",
  description: "The perfect partner of Trouble Shooting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
