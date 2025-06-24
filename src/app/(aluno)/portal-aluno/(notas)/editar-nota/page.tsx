"use client";
import { Pen, Pencil } from "lucide-react";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import Link from "next/link";
import { NotasType } from "@/types/NotasType";
import { format } from "date-fns";
import { Table } from "@chakra-ui/react";

export default function EditarNotas() {
  const [notas, setNotas] = useState<NotasType[]>([]);

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/nota`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.content)) {
          setNotas(response.data.content);
        } else {
          console.error(
            "A propriedade content da resposta da API não é uma array gu:",
            response
          );
        }
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">editar Nota</h1>
      </div>
      <div className="w-full h-full flex flex-wrap justify-center items-center gap-5 mt-10">
        {notas ? (
          <>
            <Table.Root size="lg" interactive>
              <Table.Header className="rounded-lg">
                <Table.Row className="bg-[#0A1A2D] font-medium rounded-lg">
                  <Table.ColumnHeader className="text-white">
                    Apostila
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Nome da prova
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Nome do aluno
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Nota
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Data da prova
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white"></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {notas.map((nota) => (
                  <Table.Row
                    className="bg-white hover:bg-gray-100 duration-300 transition-all"
                    key={nota.id}
                  >
                    <Table.Cell>{nota.prova.apostila.titulo}</Table.Cell>
                    <Table.Cell>{nota.prova.nome}</Table.Cell>
                    <Table.Cell>{nota.aluno.nome}</Table.Cell>
                    <Table.Cell>{nota.nota}</Table.Cell>
                    <Table.Cell>{nota.prova.dataProva}</Table.Cell>
                    <Table.Cell>
                      <Link href={`editar-nota/${nota.id}`}>
                        <Pencil />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
