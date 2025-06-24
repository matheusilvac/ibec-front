"use client";
import { useUserStore } from "@/context/userContext/UserContext";
import {
  Map,
  BookOpen,
  Send,
  PanelLeftClose,
  User,
  LogOut,
  MegaphoneOff,
  NotebookPen,
  BookPlus,
  UserCog,
} from "lucide-react";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import Link from "next/link";
import { Accordion, Avatar, HStack, Span, Stack, Text } from "@chakra-ui/react";
import { HandleUserFunc } from "@/hooks/handleUserFunc";

export function AppSidebar() {
  const { user, setUser } = useUserStore();
  const { handleLogout } = HandleUserFunc();
  const items = [
    {
      title: "Conteúdo",
      url: "/portal-aluno",
      icon: Map,
      roles: ["ALUNO", "PROFESSOR", "ADMIN"],
    },
    {
      title: "Boletim",
      url: "/portal-aluno/boletim",
      icon: BookOpen,
      roles: ["ALUNO"],
    },
    {
      title: "Comunidade / Avisos",
      url: "/portal-aluno/comunidade-avisos",
      icon: Send,
      roles: ["ALUNO", "PROFESSOR", "ADMIN"],
    },
    {
      title: "Alunos",
      url: "/portal-aluno/alunos",
      icon: UserCog,
      roles: ["ADMIN"],
    },
  ];

  const groupedItems = [
    {
      title: "Provas",
      icon: BookPlus,
      roles: ["PROFESSOR", "ADMIN"],
      children: [
        {
          title: "Criar Provas",
          url: "/portal-aluno/criar-provas",
        },
        {
          title: "Editar Provas",
          url: "/portal-aluno/editar-provas",
        },
      ],
    },
    {
      title: "Notas",
      icon: NotebookPen,
      roles: ["PROFESSOR", "ADMIN"],
      children: [
        {
          title: "Lançar notas",
          url: "/portal-aluno/lancar-nota",
        },
        {
          title: "Editar notas",
          url: "/portal-aluno/editar-nota",
        },
      ],
    },
    {
      title: "Faltas",
      icon: MegaphoneOff,
      roles: ["PROFESSOR", "ADMIN"],
      children: [
        {
          title: "Lançar faltas",
          url: "/portal-aluno/lancar-faltas",
        },
        {
          title: "Editar faltas",
          url: "/portal-aluno/editar-falta",
        },
      ],
    },
  ];

  const itemsPerfil = [
    {
      title: "Meu Perfil",
      url: "/portal-aluno/meu-perfil",
      icon: User,
    },
    {
      title: "Sair",
      icon: LogOut,
    },
  ];

  useEffect(() => {
    const { token } = parseCookies();
    if (token && !user) {
      axios
        .get(
          "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [user, setUser]);

  return (
    <aside className="hidden lg:flex w-[180px] md:w-[230px] lg:w-[270px] h-[100dvh] flex-col bg-white">
      <header className="flex justify-end p-3">
        <button className="flex text-gray-300 text-sm">
          <PanelLeftClose />
        </button>
      </header>
      <Link href="/">
        <img
          src="/ibec-vertical-bg-azul.png"
          className="w-auto flex justify-center p-3"
        />{" "}
      </Link>
      <nav className="mt-5 mx-4 overflow-y-auto">
        <ul className="flex flex-col items-start gap-2">
          {user?.role &&
            items
              .filter((item) => item.roles.includes(user?.role))
              .map((item) => (
                <li className="w-full" key={item.title}>
                  <Link
                    href={item.url}
                    className="flex items-center gap-2 py-[0.6rem] px-3 w-full rounded-md font-medium transition-colors duration-200 text-3xs md:text-2xs active:bg-[#0A1A2D] hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]"
                  >
                    <div className="w-full flex justify-start items-center gap-5 ">
                      <span className="flex items-center justify-center">
                        <item.icon />
                      </span>
                      <p>{item.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
          {user?.role &&
            groupedItems
              .filter((group) => group.roles.includes(user?.role))
              .map((group) => (
                <Accordion.Root
                  collapsible
                  key={group.title}
                  className="w-full"
                >
                  <Accordion.Item value={group.title}>
                    <Accordion.ItemTrigger className=" justify-between flex items-center gap-2 py-[0.6rem] px-3 w-full font-medium rounded-md  text-[#0A1A2D]">
                      <div className="flex gap-5">
                        <group.icon />
                        <span>{group.title}</span>
                      </div>
                      <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      {group.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.url}
                          className="flex items-center gap-2 py-[0.5rem] pl-8 pr-3 w-full rounded-md text-3xs md:text-2xs transition-colors duration-200 active:bg-[#0A1A2D] hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]"
                        >
                          <span>{child.title}</span>
                        </Link>
                      ))}
                    </Accordion.ItemContent>
                  </Accordion.Item>
                </Accordion.Root>
              ))}
        </ul>
      </nav>
      <footer className="mt-auto  border-t border-gray-200 p-3">
        <Accordion.Root collapsible>
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
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              {itemsPerfil.map((item) => (
                <Accordion.ItemBody className="w-full p-1" key={item.title}>
                  {item.url ? (
                    <Link
                      href={item?.url}
                      className="flex items-center py-[0.6rem] px-3 w-full rounded-md font-medium transition-colors duration-200 active:bg-[#0A1A2D] text-3xs md:text-2xs hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]"
                    >
                      <div className="w-full flex justify-start items-center gap-5 ">
                        <span className="flex items-center justify-center">
                          <item.icon />
                        </span>
                        <p>{item.title}</p>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="flex items-center py-[0.6rem] px-3 w-full rounded-md font-medium transition-colors duration-200 text-3xs md:text-2xs hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]"
                    >
                      <div className="w-full flex justify-start items-center gap-5 ">
                        <span className="flex items-center justify-center">
                          <item.icon />
                        </span>
                        <p>{item.title}</p>
                      </div>
                    </button>
                  )}
                </Accordion.ItemBody>
              ))}
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>
      </footer>
    </aside>
  );
}
