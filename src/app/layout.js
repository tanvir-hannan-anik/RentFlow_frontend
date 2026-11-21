import "./globals.css";

export const metadata = {
  title: "Equipment Rental Platform",
  description: "Equipment Rental Platform project setup.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
