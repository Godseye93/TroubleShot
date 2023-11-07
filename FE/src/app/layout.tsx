import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "Trouble Shot",
  description: "The perfect partner of Trouble Shooting",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
