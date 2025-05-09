import {Map, BookOpen, Send, PanelLeftClose, User, LogOut, MegaphoneOff, NotebookPen} from "lucide-react"

export const ItemsSideBarPortal = [
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