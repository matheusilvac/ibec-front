import {UsuarioProps} from "@/types/usuarioProps";

export type ComentarioProps = {
    id: string;
    mensagem: string;
    dataPost: string;
    autor: UsuarioProps;
}

export type PostProps = {
    id: string
    titulo: string
    mensagem: string
    dataPost: string
    autor: UsuarioProps
    comentarios: ComentarioProps[];
    fixado: boolean
}