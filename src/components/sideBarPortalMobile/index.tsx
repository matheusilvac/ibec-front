"use client"
import {Map, BookOpen, Send, AlignJustify, User, LogOut, MegaphoneOff, NotebookPen} from "lucide-react"
import Link from "next/link";
import {Portal} from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import {useUserStore} from "@/context/userContext/UserContext";

const items = [
    {
        title: "Conteúdo",
        url: "/portal-aluno",
        icon: Map,
        roles: ["ALUNO", "PROFESSOR", "ADMIN"]
    },
    {
        title: "Boletim",
        url: "/portal-aluno/boletim",
        icon: BookOpen,
        roles: ["ALUNO"]
    },
    {
        title: "Comunidade / Avisos",
        url: "/portal-aluno/comunidade-avisos",
        icon: Send,
        roles: ["ALUNO", "PROFESSOR", "ADMIN"]
    },
    {
        title: "Faltas",
        url: "/portal-aluno/faltas",
        icon: MegaphoneOff,
        roles: ["PROFESSOR", "ADMIN"]
    },
    {
        title: "Lançar notas e provas",
        url: "/portal-aluno/notas-provas",
        icon: NotebookPen,
        roles: ["PROFESSOR", "ADMIN"]
    }
];
export default items;

const itemsPerfil = [
    {
        title: "Meu Perfil",
        url: "/portal-aluno/meu-perfil",
        icon: User,
    },
    {
        title: "Sair",
        url: "/portal-aluno/meu-perfil",
        icon: LogOut,
    },

]

export const SideBarPortalMobile= () => {
    const { user } = useUserStore()

    return(
        <footer className="w-full flex mt-auto z-50 relative flex-wrap items-center justify-center gap-5 bg-white p-2">
            {user?.role && items
                .filter((item) => item.roles.includes(user?.role))
                .map((item) => (
                <div key={item.title} className="flex p-4 items-center rounded-md font-medium transition-colors duration-200 text-lg hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]">
                    <Link href={item.url}>
                        <item.icon size={28}/>
                    </Link>
                </div>
            ))}
            <Menu.Root>
                <Menu.Trigger asChild>
                    <button className="flex p-4 items-center rounded-md font-medium transition-colors outline-none duration-200 text-lg hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D] cursor-pointer">
                        <p>
                            <AlignJustify size={28} />
                        </p>
                    </button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner >
                        <Menu.Content className="bg-white text-black gap-2 p-1">
                            {itemsPerfil.map((item) => (
                                <button className="w-full flex justify-start gap-2 items-center border-none outline-none hover:bg-gray-200/80 pb-1" key={item.title}>
                                    <div className="flex pt-[2px]">
                                       <item.icon/>
                                    </div>
                                    <p className="flex text-md">{item.title}</p>
                                </button>
                            ))}
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </footer>
    )

}