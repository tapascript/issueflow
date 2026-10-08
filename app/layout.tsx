import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IssueFlow',
  description: 'A lightweight issue tracker for engineering teams.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-950">
        {children}
      </body>
    </html>
  );
}