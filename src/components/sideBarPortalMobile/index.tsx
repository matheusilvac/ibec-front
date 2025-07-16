"use client";
import {
  Map,
  BookOpen,
  Send,
  AlignJustify,
  User,
  LogOut,
  MegaphoneOff,
  NotebookPen,
  BookPlus,
  UserCog
} from "lucide-react";
import Link from "next/link";
import { Portal } from "@chakra-ui/react";
import { Menu } from "@chakra-ui/react";
import { useUserStore } from "@/context/userContext/UserContext";
import { HandleUserFunc } from "@/hooks/handleUserFunc";
import React from "react";

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
    title: "Faltas",
    url: "/portal-aluno/lancar-faltas",
    icon: MegaphoneOff,
    roles: ["PROFESSOR", "ADMIN"],
  },
];
export default items;

const itemsPerfil = [
  {
    title: "Meu Perfil",
    url: "/portal-aluno/",
    icon: User,
  },
  {
    title: "Sair",
    icon: LogOut,
  },
  {
    title: "Criar provas",
    url: "/portal-aluno/criar-provas",
    icon: BookPlus,
    roles: ["PROFESSOR", "ADMIN"],
  },
  {
    title: "Lançar notas ",
    url: "/portal-aluno/lancar-nota",
    icon: NotebookPen,
    roles: ["PROFESSOR", "ADMIN"],
  },
];

export const SideBarPortalMobile = () => {
  const { user } = useUserStore();
  const { handleLogout } = HandleUserFunc();

  return (
    <footer className="w-full flex bottom-0 mt-auto z-50 fixed flex-wrap items-center justify-center gap-5 bg-white p-2 overflow-y-auto">
      {user?.role &&
        items
          .filter((item) => item.roles.includes(user?.role))
          .map((item) => (
            <div
              key={item.title}
              className="flex p-4 items-center rounded-md font-medium transition-colors duration-200 text-lg hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]"
            >
              <Link href={item.url}>
                <item.icon size={28} />
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
          <Menu.Positioner>
            <Menu.Content className="bg-white text-black gap-2 p-1">
              {itemsPerfil
                .filter(
                  (item) => !item.roles || item.roles.includes(user?.role ?? "")
                )
                .map((item) => (
                  <React.Fragment key={item.title}>
                    {item.url ? (
                      <Link
                        href={item?.url}
                        className="flex items-center py-[0.6rem] px-3 w-full rounded-md font-medium transition-colors duration-200 text-3xs md:text-2xs hover:bg-[#0A1A2D] hover:text-white text-[#0A1A2D]"
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
                  </React.Fragment>
                ))}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </footer>
  );
};
