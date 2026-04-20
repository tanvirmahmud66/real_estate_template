import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Houzez Real Estate",
  description: "Find your dream home with Houzez - Your trusted real estate platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f5f7fa] text-[#222]" suppressHydrationWarning>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}