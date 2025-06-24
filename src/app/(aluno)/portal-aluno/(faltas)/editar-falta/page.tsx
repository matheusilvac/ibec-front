"use client";
import { Pen, Pencil } from "lucide-react";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { FaltasType } from "@/types/FaltasType";
import { Table } from "@chakra-ui/react";

export default function EditarFaltas() {
  const [faltas, setFaltas] = useState<FaltasType[]>([]);

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/faltas`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.content)) {
          setFaltas(response.data.content);
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
        <h1 className="flex text-4xl font-medium uppercase">editar falta</h1>
      </div>
      <div className="w-full h-full flex flex-wrap justify-center items-center gap-5 mt-10">
        {faltas ? (
          <>
            <Table.Root size="lg" interactive>
              <Table.Header className="rounded-lg">
                <Table.Row className="bg-[#0A1A2D] font-medium rounded-lg">
                  <Table.ColumnHeader className="text-white">
                    Apostila
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Nome do aluno
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Data
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Justificada
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white">
                    Motivo
                  </Table.ColumnHeader>
                  <Table.ColumnHeader className="text-white"></Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {faltas.map((falta) => (
                  <Table.Row
                    className="bg-white hover:bg-gray-100 duration-300 transition-all"
                    key={falta.id}
                  >
                    <Table.Cell>{falta.apostila.titulo}</Table.Cell>
                    <Table.Cell>{falta.aluno.nome}</Table.Cell>
                    <Table.Cell>{falta.dataAt}</Table.Cell>
                    <Table.Cell>{falta.justificada == true ? "Sim" : "Não"}</Table.Cell>
                    <Table.Cell>{falta.motivo}</Table.Cell>
                    <Table.Cell>
                      <Link href={`editar-falta/${falta.id}`}>
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
