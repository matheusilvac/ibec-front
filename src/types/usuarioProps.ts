export enum Role {
    ADMIN = "ADMIN",
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR"
}

export type UsuarioProps = {
    id: string;
    nome: string;
    email: string;
    role: Role;
    matricula: {
        id: string;
        dataMatricula: string;
        ativo: boolean;
    },
    turma: {
        id: string;
        dia: string;
    }
}