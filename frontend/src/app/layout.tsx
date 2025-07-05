import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevConnect - Connect with Developers',
  description: 'The social platform built for developers. Share projects, collaborate, and grow your network.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Aurora Background Container */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="aurora-bg"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}