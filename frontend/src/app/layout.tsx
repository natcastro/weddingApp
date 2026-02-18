import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sigil - Elegant Wedding Invitations',
  description: 'Design, manage, and send wedding invitations with ease.',
};

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
