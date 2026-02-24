import Navbar from "@/components/sections/shared/Navbar";
import Footer from "@/components/sections/shared/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
