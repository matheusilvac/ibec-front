import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "../globals.css";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProviderContext } from "@/context/provider";


const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IBEC - Home",
  description: "Instituto Biblíco de Educação Cristã",
  icons: {
    icon: "/arvore-ibec.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

      <div
        className={`${lora.className} bg-[#f0f0f0] text-[#0A1A2D] w-full h-full flex flex-col`}
      >
        <ProviderContext>
          <NavBar />
          <main className="flex-grow w-auto h-auto bg-[#f0f0f0]">{children}</main>
          <footer className="w-full relative bottom-0">
            <Footer />
          </footer>
        </ProviderContext>
      </div>

  );
}
