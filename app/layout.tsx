import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Dashboard } from '@/components/dashboard';
import './globals.css';
export const metadata: Metadata = { title: 'Tes Frontend Sharing Vision 2026', description: 'Dashboard artikel untuk tes frontend Sharing Vision 2026.' };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="id"><body><Dashboard>{children}</Dashboard></body></html>; }
