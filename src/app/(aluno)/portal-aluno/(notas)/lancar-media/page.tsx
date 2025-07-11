"use client";
import { FormatNumber, NumberInput, Table, Tabs } from "@chakra-ui/react";
import { GraduationCap, SquareMousePointer } from "lucide-react";
import { Loading } from "@/components/loading";
import { useState } from "react";
import { useApostila } from "@/context/ApostilaContext/ApostilasContext";
import { parseCookies } from "nookies";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { MediaPorApostila } from "@/types/MediaProps";

export default function LancarMediaPage() {
  const [value, setValue] = useState<string | null>("modulos");
  const { apostila } = useApostila();
  const [media, setMedia] = useState<MediaPorApostila[]>([]);
  const [notas, setNotas] = useState<Record<string, number>>({});
  const [apostilaId, setApostilaId] = useState<number | null>(null);

  const handleClickSetApostila = (id: number) => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/medias/apostila/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMedia(response.data);
          const notasIniciais: Record<string, number> = {};
          response.data.forEach((item: MediaPorApostila) => {
            notasIniciais[item.aluno.id] = item.ajusteManual ?? 0;
          });

          setNotas(notasIniciais);
        } else {
          console.error(
            "A propriedade content da resposta da API não é uma array:",
            response
          );
        }
        setValue("alunos");
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  const handleClickSetNota = (id: string) => {
    const { token } = parseCookies();
    const payload = {
      alunoId: id,
      apostilaId: apostilaId,
      ajuste: notas[id] ?? 0,
    };
    axios
      .put(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/medias/ajuste`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toaster.create({
          title: "Sucesso!",
          description: "Média ajustada com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description:
            "Não foi possivel lançar a média, tente novamente mais tarde",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">lançar média</h1>
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
            Módulo
          </Tabs.Trigger>
          <Tabs.Trigger value="alunos">
            <SquareMousePointer size={24} />
            Lançar Média para Alunos
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
                      handleClickSetApostila(apostila.id);
                      setApostilaId(apostila.id);
                      setValue("turma");
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

        <Tabs.Content value="alunos">
          <Table.Root size="lg" interactive>
            <Table.Header className="rounded-lg">
              <Table.Row className="bg-[#0A1A2D] text-black font-medium rounded-lg">
                <Table.ColumnHeader className="text-white">
                  Nome Aluno
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-white">
                  Media Calculada
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-white">
                  Ajuste Manual
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-white">
                  Media Final
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-white">
                  Situação
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-white">
                  Faltas
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-white"></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {media.map((media) => (
                <Table.Row
                  key={media.mediaId}
                  className="bg-white hover:bg-gray-100 duration-300 transition-all"
                >
                  <Table.Cell>{media.aluno.nome}</Table.Cell>
                  <Table.Cell>
                    <FormatNumber value={media.mediaCalculada} />
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      onChange={(e) =>
                        setNotas((prev) => ({
                          ...prev,
                          [media.aluno.id]: parseFloat(e.target.value),
                        }))
                      }
                      value={notas[media.aluno.id] ?? 0}
                      className="w-full pl-2 rounded-md py-2 border-black/10 border-[1px] outline-none"
                    />{" "}
                  </Table.Cell>
                  <Table.Cell>
                    <FormatNumber value={media.mediaFinal} />
                  </Table.Cell>
                  <Table.Cell>{media.situacao}</Table.Cell>
                  <Table.Cell>{media.faltas}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleClickSetNota(media.aluno.id)}
                      className="px-3 py-2 bg-[#0A1A2D] text-white flex text-md rounded-md"
                    >
                      Lançar ajuste na média
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
