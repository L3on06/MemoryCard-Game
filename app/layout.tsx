import type { Metadata } from "next";
import { Nabla } from "next/font/google";
import "./globals.css";

const nabla = Nabla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Memory Card Game",
  description: "Step into the Pokémon Memory Card Game, where your memory skills are put to the test! Flip over cards to reveal Pokémon characters, and try to find pairs. It's a race against the clock to match them up. Can you remember where they are? Challenge yourself and have fun with friends as you become a Pokémon memory master!",
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/favicon.ico'],
    shortcut: ['/favicon.ico']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nabla.className}>{children}</body>
    </html>
  );
}
