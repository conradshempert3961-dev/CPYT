import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0d1425_0,#f7efe7_24%,#f6efe6_100%)]">
      <Header />
      {children}
      <Footer />
      <FloatingActions />
    </div>
  );
}
