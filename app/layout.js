import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Python OOP Mastery — Premium Learning Platform',
  description:
    'Master Python Object-Oriented Programming from beginner to advanced with interactive slides, quizzes, and gamified progress tracking.',
  keywords: ['Python', 'OOP', 'Object-Oriented Programming', 'Learning', 'Course'],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('oop-platform-progress');
    var theme = 'dark';
    if (stored) {
      var data = JSON.parse(stored);
      if (data.theme) theme = data.theme;
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
