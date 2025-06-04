import { ApostilaProps } from "../ApostilaProps/apostilaProps"
import { UsuarioProps } from "../usuarioProps"

export type FaltasType ={
    id: number,
    aluno: UsuarioProps,
    apostila: ApostilaProps,
    dataAt: string,
    justificada: boolean,
    motivo: string
}