
import "./globals.css";
import {ProviderContext} from "@/context/provider";


export const metadata = {
    title: "IBEC",
    description: "Instituto Bíblico de Educação Cristã",
    icons: {
        icon: "/arvore-ibec.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br" className="h-full w-full">
        <body className={` bg-[#f0f0f0] text-[#0A1A2D] h-full w-full`}>
        <ProviderContext>
            {children}
        </ProviderContext>
        </body>
        </html>
    );
}
