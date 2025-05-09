export type NotaProps = {
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
