// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dubai to the Stars | Space Travel Experience',
  description: 'Book your luxury space travel experience from Dubai to orbital stations, lunar resorts, and Mars preparation facilities.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}