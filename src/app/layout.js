import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dubai to the Stars | Luxury Space Travel',
  description: 'Experience the future of space tourism with unparalleled luxury and innovation. Dubai to the Stars offers commercial spaceflights from Earth\'s premier space tourism hub.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>{children}</body>
    </html>
  );
}