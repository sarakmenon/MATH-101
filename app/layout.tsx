import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "High School & SAT Math Tutoring | Math-101",
  description: "Expert high school math tutoring and SAT preparation with 30+ years of experience. Personalized online math tutoring for algebra, geometry, calculus, and standardized test prep.",
  keywords: "math tutor, high school math tutoring, SAT math prep, algebra tutor, online math tutoring, calculus tutor, geometry tutor, ACT math prep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
