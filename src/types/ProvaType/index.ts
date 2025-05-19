import {ApostilaProps} from "@/types/ApostilaProps/apostilaProps";

export type ProvaType = {
    id: number;
    nome: string;
    modulos: number[];
    apostila: ApostilaProps;
    dataProva: string;
}