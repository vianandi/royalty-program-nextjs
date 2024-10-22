import { metadata } from './metadata';
import localFont from "next/font/local";
import ClientLayout from './ClientLayout';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Layout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* Navigation */}
        <header className="bg-[#000000] text-[#E5FF5D] p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Mall Royalty Program</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-[#ffffff]">Home</a></li>
                <li><a href="/login" className="hover:text-[#ffffff]">Login</a></li>
                <li><a href="/register" className="hover:text-[#FFFFFF]">Register</a></li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto p-4">
          <ClientLayout>{children}</ClientLayout>
        </main>

        {/* Footer */}
        <footer className="bg-[#000000] text-[#E5FF5D] text-center p-4">
          <p>&copy; 2024 Mall Royalty Program. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}