import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppSidebar } from "@/components/sideBarAluno";
import { ProviderContext } from "@/context/provider";
import { SideBarPortalMobile } from "@/components/sideBarPortalMobile";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IBEC - Portal do Aluno",
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
      className={`${roboto.className} flex flex-col lg:flex-row  h-screen w-screen bg-[#f0f0f0] text-[#0A1A2D]`}
    >
      <ProviderContext>
        <AppSidebar />
        <main className="flex-grow overflow-x-auto p-10">{children}</main>
        <Toaster />
        <div className="block lg:hidden">
          <SideBarPortalMobile />
        </div>
      </ProviderContext>
    </div>
  );
}
