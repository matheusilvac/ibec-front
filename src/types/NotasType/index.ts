import { ProvaType } from "../ProvaType"
import { UsuarioProps } from "../usuarioProps"

export type NotasType = {
    id: number,
    nota: number,
    aluno: UsuarioProps
    prova: ProvaType
}