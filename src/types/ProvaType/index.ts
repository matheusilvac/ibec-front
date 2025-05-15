import {ApostilaProps} from "@/types/apostilaProps";

export type ProvaType = {
    id: number;
    nome: string;
    modulos : {
    }[];
    apostila: ApostilaProps;
    dataProva: string;
}