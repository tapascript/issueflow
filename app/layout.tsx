import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from './components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'IssueFlow',
  description: 'A lightweight issue tracker for engineering teams.',
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('issueflow-theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
