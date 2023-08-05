import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar/index';
import { Toaster } from '@/ui/Toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next.js Boilerplate',
    description: 'Generated boilerplate for Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`antialiased ${inter.className}`}>
            <body className="min-h-screen bg-background antialiased">
                <Providers>
                    <Navbar />

                    <section className="pt-20">{children}</section>
                </Providers>

                <Toaster />

                {/* Space on mobile devices for more height */}
                <div className="h-40 md:hidden" />
            </body>
        </html>
    );
}
