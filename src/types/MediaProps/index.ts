import { AlunosProps } from "../AlunosProps";
import { UsuarioProps } from "../usuarioProps";

export type MediaProps = {
    apostila: string;
    media: number;
    situacao: string
    faltas: number
    notas: {
        id: number;
        nota: number;
        nomeProva: string
    }[]
}

export type MediaPorApostila = {
    mediaId: string;
    aluno: UsuarioProps;
    mediaCalculada: number;
    ajusteManual: number;
    mediaFinal: number;
    situacao: string;
    faltas: number
}
