"use client"
import {useUserStore} from "@/context/UserContext";
import {Home, Map, BookOpen, Send, PanelLeftClose} from "lucide-react"
import {useEffect} from "react";
import {parseCookies} from "nookies";
import axios from "axios";
import Link from "next/link";
import {Avatar, HStack, Stack, Text} from "@chakra-ui/react";

export function AppSidebar() {
    const {user, clearUser, setUser} = useUserStore();
    const items =[
        {
            title: "Conteudo",
            url: "/portal-aluno",
            icon: Map,
        },
        {
            title: "Notas",
            url: "/notas",
            icon: BookOpen,
        },
        {
            title: "Comunidade / Avisos",
            url: "/comunidade-avisos",
            icon: Send,
        }

    ]

    useEffect(() => {
        const { token } = parseCookies();
        if (token && !user) {
            axios
                .get("http://localhost:8081/api/auth", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => setUser(null));
        }
    }, [user, setUser]);

    return (
        <aside
            className="hidden lg:flex w-[180px] md:w-[230px] lg:w-[270px] h-[100dvh] flex-col  bg-white p-3">
            <header className="flex justify-end">
                <button className="flex text-gray-300 text-sm"><PanelLeftClose/></button>
            </header>
            <Link href="/"><img src="/ibec-vertical-bg-azul.png" className="w-auto flex justify-center"/> </Link>
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
            <footer className="mt-auto py-5">
                <div className="w-full flex h-auto justify-center p-2">
                    <div className="w-full flex h-full justify-between items-center bg-gray-200 p-3 rounded-3xl ">
                        <HStack gap="2">
                            <Avatar.Root colorPalette="blackAlpha">
                                <Avatar.Fallback name={user?.nome} />
                                <Avatar.Image />
                            </Avatar.Root>
                            <Stack gap="0">
                                <Text fontWeight="medium">{user?.nome}</Text>
                                <Text className="text-gray-400" textStyle="xs">
                                    {user?.email}
                                </Text>
                            </Stack>
                        </HStack>
                    </div>
                </div>
            </footer>
        </aside>
    )
}