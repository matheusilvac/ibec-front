import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IBEC",
  description: "Instituto Biblíco de Educação Cristã",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="w-full h-screen">
     <body className={`${lora.className} bg-[#f0f0f0] text-black w-full h-full flex flex-col`}>
        <NavBar />
        <main className="flex-grow">{children}</main>
        <footer className="w-full relative bottom-0 pt-20">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
