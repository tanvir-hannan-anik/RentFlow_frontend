import "./globals.css";
import Link from "next/link";
import Notice from '@/components/notice';
import AuthNavigation from "@/components/auth-navigation";

export const metadata = {
  title: "GearRent | Equipment for Every Job",
  description: "Find and rent equipment, list your gear, and manage rental requests with GearRent.",
};

const currentYear = new Date().getFullYear();

export default function RootLayout({ children }: {children:React.ReactNode}) {
  return (
    <html lang="en" data-theme="light" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Notice />
        <AuthNavigation />
        {children}
        <footer id="footer" className="site-footer">
          <div className="container footer-grid">
            <div>
              <Link className="brand" href="/">⚒ GearRent</Link>
              <p>Equipment for every job.<br />Possibilities for every project.</p>
            </div>
            <div>
              <h3>Quick Links</h3>
              <Link href="/equipment">Browse Equipment</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/dashboard/add-equipment">List Your Equipment</Link>
            </div>
            <div>
              <h3>Your Account</h3>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/favorites">Saved Equipment</Link>
              <Link href="/register">Create an Account</Link>
            </div>
            <div>
              <h3>Get Started</h3>
              <p>Find equipment near you or share your own with the community.</p>
              <Link href="/equipment">Explore GearRent</Link>
            </div>
          </div>
          <div className="container footer-bottom">© {currentYear} GearRent. All rights reserved.</div>
        </footer>
      </body>
    </html>
  );
}
