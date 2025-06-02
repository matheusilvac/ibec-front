"use client";
import { AlunosProps } from "@/types/AlunosProps";
import { UsuarioProps } from "@/types/usuarioProps";
import { Table } from "@chakra-ui/react";
import axios from "axios";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<UsuarioProps[]>([]);

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.content)) {
          setAlunos(response.data.content);
        } else {
          console.error(
            "A propriedade content da resposta da API não é uma array:",
            response
          );
        }
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">Alunos</h1>
      </div>
      <Table.Root size="lg" interactive>
        <Table.Header className="rounded-lg">
          <Table.Row className="bg-[#0A1A2D] font-medium rounded-lg">
            <Table.ColumnHeader className="text-white">Nome</Table.ColumnHeader>
            <Table.ColumnHeader className="text-white">
              Email
            </Table.ColumnHeader>
            <Table.ColumnHeader className="text-white">
              Turma
            </Table.ColumnHeader>
            <Table.ColumnHeader className="text-white">
              Matricula
            </Table.ColumnHeader>
            <Table.ColumnHeader className="text-white"></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {alunos.map((aluno) => (
            <Table.Row
              key={aluno.id}
              className="bg-white hover:bg-gray-100 duration-300 transition-all"
            >
              <Table.Cell>{aluno.nome}</Table.Cell>
              <Table.Cell>{aluno.email}</Table.Cell>
              <Table.Cell>
                {aluno.turma.dia === "TERCA" ? "Terça" : "Segunda"}
              </Table.Cell>
              <Table.Cell>{aluno.matricula.id}</Table.Cell>
              <Table.Cell>
                <Link href={`alunos/${aluno.id}`}>
                  <Pencil />
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
