"use client";
import { Pen } from "lucide-react";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import Link from "next/link";
import { NotasType } from "@/types/NotasType";
import { format } from "date-fns";

export default function EditarNotas() {
  const [notas, setNotas] = useState<NotasType[]>([]);

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/nota`,
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
            {notas.map((nota) => (
              <Link
                href={`/portal-aluno/editar-notas/${nota.id}`}
                key={nota.id}
                className="flex flex-col w-96 h-auto bg-white rounded-lg p-4 gap-2"
              >
                <div className="w-full flex justify-between items-center">
                  <h1>Apostila: {nota.prova.apostila.titulo}</h1>
                  <button>
                    <Pen size={16} />
                  </button>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Nome da prova:</p>
                    <p>{nota.prova.nome}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Nome do aluno:</p>
                    <p>{nota.aluno.nome}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Nota:</p>
                    <p>{nota.nota}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Data da prova:</p>
                    <p>{format(nota.prova.dataProva, "dd/MM/yyyy")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
