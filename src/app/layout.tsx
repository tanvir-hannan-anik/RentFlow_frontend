import "./globals.css";
import Notice from '@/components/notice';
import AuthNavigation from "@/components/auth-navigation";

export const metadata = {
  title: "GearRent | Equipment for Every Job",
  description: "Find and rent equipment, list your gear, and manage rental requests with GearRent.",
};

export default function RootLayout({ children }: {children:React.ReactNode}) {
  return (
    <html lang="en" data-theme="light">
      <head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" /></head>
      <body><Notice /><AuthNavigation />{children}<footer id="footer" className="site-footer"><div className="container footer-grid"><div><a className="brand" href="/">⚒ GearRent</a><p>Equipment for every job.<br />Possibilities for every project.</p></div><div><h3>Quick Links</h3><a href="/equipment">Browse Equipment</a><a href="/#how-it-works">How It Works</a><a href="/dashboard/add-equipment">List Your Equipment</a></div><div><h3>Your Account</h3><a href="/dashboard">Dashboard</a><a href="/dashboard/favorites">Saved Equipment</a><a href="/register">Create an Account</a></div><div><h3>Get Started</h3><p>Find equipment near you or share your own with the community.</p><a href="/equipment">Explore GearRent</a></div></div><div className="container footer-bottom">© {new Date().getFullYear()} GearRent. All rights reserved.</div></footer></body>
    </html>
  );
}
