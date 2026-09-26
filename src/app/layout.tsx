import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { StoreProvider } from '@/context/StoreContext';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/CartDrawer';
import { SizeChartModal } from '@/components/SizeChartModal';
import { TrackOrderModal } from '@/components/TrackOrderModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'RUAN | Anti-Tarnish Jewellery & Designer Ethnic Wear',
  description: 'Shop RUAN premium 18K gold-plated anti-tarnish waterproof jewellery, oxidised earrings, pure mulmul kurti sets, and trendy western wear. Cash on Delivery available across India.',
  keywords: 'RUAN, anti tarnish jewellery, oxidised earrings, mulmul anarkali, cash on delivery kurtis, jewellery online india'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E232A] antialiased selection:bg-[#C59B7B]/30">
        <AuthProvider>
          <StoreProvider>
            <AnnouncementBar />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <CartDrawer />
            <SizeChartModal />
            <TrackOrderModal />
            <FloatingWhatsApp />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
