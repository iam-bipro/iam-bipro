import type { Metadata } from "next";
import type { ReactNode } from "react";
import FluidBackground from "@/components/canvas/FluidBackground";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bipradip Nandy — Full-Stack Web Developer",
  description: "Portfolio of Bipradip Nandy, a full-stack web developer and Computer Science student from West Bengal, India.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <div className="relative min-h-screen overflow-hidden">
          <FluidBackground />
          <div className="relative z-[1]">
            <MotionProvider>{children}</MotionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
