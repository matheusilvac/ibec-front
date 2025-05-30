"use client";
import { Tabs } from "@chakra-ui/react";
import { GraduationCap, NotebookPen, Pen } from "lucide-react";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { useApostila } from "@/context/ApostilaContext/ApostilasContext";
import { parseCookies } from "nookies";
import axios from "axios";
import { ProvaType } from "@/types/ProvaType";
import { format } from "date-fns";
import Link from "next/link";

export default function EditarProvas() {
  const [value, setValue] = useState<string | null>("modulos");
  const { apostila } = useApostila();
  const [idApostila, setIdApostila] = useState<number | null>();
  const [provas, setProvas] = useState<ProvaType[]>([]);

  useEffect(() => {
    handleSetApostila();
  }, [idApostila]);

  const handleSetApostila = () => {
    if (idApostila) {
      const { token } = parseCookies();
      axios
        .get(
          `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/prova/apostila/${idApostila}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            setProvas(response.data);
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
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">editar prova</h1>
      </div>
      <Tabs.Root
        defaultValue="members"
        fitted
        variant="plain"
        p="1"
        value={value}
        onValueChange={(e) => setValue(e.value)}
      >
        <Tabs.List bg="white" rounded="lg" p="2" className="gap-2">
          <Tabs.Trigger value="modulos">
            <GraduationCap size={28} />
            Apostila
          </Tabs.Trigger>
          <Tabs.Trigger value="prova">
            <NotebookPen size={28} />
            Editar prova
          </Tabs.Trigger>
          <Tabs.Indicator
            rounded="l2"
            bg="gray.100"
            className={"shadow-none"}
          />
        </Tabs.List>
        <Tabs.Content value="modulos">
          <div className="w-full h-full flex flex-wrap justify-center items-center gap-8 mt-10 transition-all duration-500">
            {apostila ? (
              <>
                {apostila?.map((apostila) => (
                  <button
                    onClick={() => {
                      setIdApostila(apostila.id);
                      setValue("prova");
                    }}
                    key={apostila.id}
                    className="w-[262px] flex flex-col items-center rounded-xl hover:shadow-xl shadow-black transition-all duration-300 cursor-pointer hover:scale-105"
                  >
                    <img
                      src={apostila.imagem}
                      className="w-full flex justify-center items-center h-full rounded-xl"
                    />
                  </button>
                ))}
              </>
            ) : (
              <Loading />
            )}
          </div>
        </Tabs.Content>
        <Tabs.Content value="prova">
          <div className="w-full h-full flex flex-wrap justify-center items-center gap-8 mt-10 transition-all duration-500">
            {provas ? (
              <>
                {provas.map((prova) => (
                  <Link
                    href={`/portal-aluno/editar-provas/${prova.id}`}
                    key={prova.id}
                    className="flex flex-col w-72 h-auto bg-white rounded-lg p-4 gap-2"
                  >
                    <div className="w-full flex justify-between items-center">
                      <h1 className="w-full flex justify-start font-medium text-lg">
                        Apostila: {prova.apostila.titulo}
                      </h1>
                      <button>
                        <Pen size={16} />
                      </button>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                      <div className="w-full flex justify-between items-center">
                        <p className="font-medium">Nome da Prova:</p>
                        <p>{prova.nome}</p>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <p className="font-medium">Modulos:</p>
                        <p>{prova.modulos.join(", ")}</p>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <p className="font-medium">Data da Prova:</p>
                        <p>{format(prova.dataProva, "dd/MM/yyyy")}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <Loading />
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
