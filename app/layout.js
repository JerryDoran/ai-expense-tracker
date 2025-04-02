import Footer from '@/components/footer';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Finance Maestro',
  description: 'Your personal finance assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='dark'>
      <body className={`${inter.className}`}>
        <Header />
        <main className='min-h-screen'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
