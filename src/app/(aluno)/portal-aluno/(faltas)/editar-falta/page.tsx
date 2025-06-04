"use client";
import { Pen } from "lucide-react";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { FaltasType } from "@/types/FaltasType";

export default function EditarFaltas() {
  const [faltas, setFaltas] = useState<FaltasType[]>([]);

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/faltas`,
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
            {faltas.map((falta) => (
              <Link
                href={`/portal-aluno/editar-notas/${falta.id}`}
                key={falta.id}
                className="flex flex-col w-96 h-auto bg-white rounded-lg p-4 gap-2"
              >
                <div className="w-full flex justify-between items-center">
                  <h1>Apostila: {falta.apostila.titulo}</h1>
                  <button>
                    <Pen size={16} />
                  </button>
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Nome do aluno:</p>
                    <p>{falta.aluno.nome}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Data da prova:</p>
                    <p>{format(falta.dataAt, "dd/MM/yyyy")}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Justificada:</p>
                    <p>{falta.justificada == true ? "Sim" : "Não"}</p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="font-medium">Motivo:</p>
                    <p>{falta.motivo}</p>
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
