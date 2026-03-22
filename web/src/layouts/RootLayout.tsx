import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
