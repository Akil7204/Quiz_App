"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "./store";
import Quiz from "./@quiz/page";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
  quiz: boolean; // Add any other properties if necessary
}

export default function RootLayout({ children }: LayoutProps) {
  const config = useQuiz((state: any) => state.config);
  
  let render = config.status === "start" ? <Quiz /> : children;

  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
