"use client"
import {useUserStore} from "@/context/userContext/UserContext";
import {Map, BookOpen, Send, PanelLeftClose, User, LogOut} from "lucide-react"
import {useEffect} from "react";
import {parseCookies} from "nookies";
import axios from "axios";
import Link from "next/link";
import {Accordion, Avatar, HStack, Span, Stack, Text} from "@chakra-ui/react";

export function AppSidebar() {
    const {user, clearUser, setUser} = useUserStore();
    const items =[
        {
            title: "Conteúdo",
            url: "/portal-aluno",
            icon: Map,
        },
        {
            title: "Boletim",
            url: "/portal-aluno/boletim",
            icon: BookOpen,
        },
        {
            title: "Comunidade / Avisos",
            url: "/portal-aluno/comunidade-avisos",
            icon: Send,
        }

    ]

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

    useEffect(() => {
        const { token } = parseCookies();
        if (token && !user) {
            axios
                .get("https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/auth/user", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
        }
    }, [user, setUser]);

    return (
        <aside
            className="hidden lg:flex w-[180px] md:w-[230px] lg:w-[270px] h-[100dvh] flex-col bg-white">
            <header className="flex justify-end p-3">
                <button className="flex text-gray-300 text-sm"><PanelLeftClose/></button>
            </header>
            <Link href="/"><img src="/ibec-vertical-bg-azul.png" className="w-auto flex justify-center p-3"/> </Link>
            <nav className="mt-5 mx-4 overflow-y-auto">
                <ul className="flex flex-col items-start gap-2">
                    {items.map((item) => (
                        <li className="w-full" key={item.title}>
                            <Link href={item.url}
                                  className="flex items-center gap-2 py-[0.6rem] px-3 w-full rounded-md font-medium transition-colors duration-200 text-3xs md:text-2xs hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]">
                                <div
                                    className="w-full flex justify-start items-center gap-5 ">
                                <span className="flex items-center justify-center">
                                   <item.icon/>
                                </span>
                                    <p>{item.title}</p>
                                </div>
                            </Link>
                        </li>

                    ))}
                </ul>
            </nav>
            <footer className="mt-auto  border-t border-gray-200 p-3">
                <Accordion.Root collapsible >
                <Accordion.Item value="perfil">
                        <Accordion.ItemTrigger className="pb-2">
                            <Span flex="1">
                                <HStack gap="2">
                                    <Avatar.Root colorPalette="whiteAlpha">
                                        <Avatar.Fallback name={user?.nome} />
                                        <Avatar.Image />
                                    </Avatar.Root>
                                    <Stack gap="0">
                                        <Text fontWeight="bold">{user?.nome}</Text>
                                        <Text className="text-gray-400" textStyle="xs">
                                            {user?.email}
                                        </Text>
                                    </Stack>
                                </HStack>
                            </Span>
                            <Accordion.ItemIndicator/>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            {itemsPerfil.map((item) => (
                                <Accordion.ItemBody className="w-full p-1" key={item.title}>
                                    <Link href={item.url}
                                          className="flex items-center py-[0.6rem] px-3 w-full rounded-md font-medium transition-colors duration-200 text-3xs md:text-2xs hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]">
                                        <div
                                            className="w-full flex justify-start items-center gap-5 ">
                                                <span className="flex items-center justify-center">
                                                    <item.icon/>
                                                    </span>
                                            <p>{item.title}</p>
                                        </div>
                                    </Link>
                                </Accordion.ItemBody>

                            ))}
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            </footer>
        </aside>
    )
}