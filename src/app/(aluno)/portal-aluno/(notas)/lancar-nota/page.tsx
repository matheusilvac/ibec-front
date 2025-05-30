"use client";
import {
  NativeSelect,
  NumberInput,
  Portal,
  Select,
  Stack,
  Table,
  Tabs,
} from "@chakra-ui/react";
import { BookPlus, GraduationCap, SquareMousePointer } from "lucide-react";
import { Loading } from "@/components/loading";
import { useEffect, useState } from "react";
import { useTurma } from "@/context/TurmaContext";
import { AlunosProps } from "@/types/AlunosProps";
import { useApostilaApi } from "@/hooks/handleApostilaApi";
import { useApostila } from "@/context/ApostilaContext/ApostilasContext";
import { parseCookies } from "nookies";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { ProvaType } from "@/types/ProvaType";

export default function LancarNotaPage() {
  const [value, setValue] = useState<string | null>("modulos");
  const { turma, setTurma } = useTurma();
  const [alunos, setAlunos] = useState<AlunosProps[]>([]);
  const { handleApostilaApi } = useApostilaApi();
  const { apostila } = useApostila();
  const [idApostila, setIdApostila] = useState<number | null>();
  const [nota, setNota] = useState<string>("0");
  const [provas, setProvas] = useState<ProvaType[]>([]);
  const [provaId, setProvaId] = useState<string>("");

  useEffect(() => {
    const { token } = parseCookies();
    handleApostilaApi();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/turmas`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data.content)) {
          setTurma(response.data.content);
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

  const handleClickSetTurma = (id: number) => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/turmas/${id}/alunos`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAlunos(response.data);
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
    if (idApostila) {
      axios
        .get(
          `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/prova/apostila/${idApostila}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
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

  const handleClickSetNota = (id: string) => {
    const { token } = parseCookies();
    const payload = {
      nota: Number(nota),
      aluno: id,
      prova: Number(provaId),
    };
    console.log(payload);
    axios
      .post(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/nota`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("res", response);
        toaster.create({
          title: "Sucesso!",
          description: "Nota lançada com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">lançar nota</h1>
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
          <Tabs.Trigger value="turma">
            <GraduationCap size={28} />
            Turma
          </Tabs.Trigger>
          <Tabs.Trigger value="alunos">
            <SquareMousePointer size={24} />
            Lançar Notas para Alunos
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
        <Tabs.Content value="turma">
          <div className="w-full h-full flex flex-wrap justify-center items-center gap-8 mt-10 transition-all duration-500">
            {turma?.map((turma) => (
              <button
                key={turma.id}
                className="w-44 flex flex-col items-center bg-white rounded-lg hover:shadow-lg px-4 py-2 gap-2"
                onClick={() => handleClickSetTurma(turma.id)}
              >
                <h1 className="font-medium text-2xl flex">Turma</h1>
                <h1 className="text-lg flex">{turma.dia}</h1>
              </button>
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content value="alunos">
          <Table.Root size="lg" interactive>
            <Table.Header className="rounded-lg">
              <Table.Row className="bg-white text-black font-medium rounded-lg">
                <Table.ColumnHeader className="text-black">
                  Alunos
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-black">
                  Email
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-black">
                  Prova
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-black">
                  Nota
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-black"></Table.ColumnHeader>
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
                    <select
                      className="bg-gray-100 pl-2 py-2 rounded-lg"
                      onChange={(e) => setProvaId(e.currentTarget.value)}
                    >
                      <option value="">Selecione a prova</option>
                      {provas.map((prova) => (
                        <option
                          value={prova.id}
                          key={prova.id}
                          className="bg-gray-100 pl-2 rounded-lg"
                        >
                          {prova.nome}
                        </option>
                      ))}
                    </select>
                  </Table.Cell>
                  <Table.Cell>
                    <NumberInput.Root
                      onValueChange={(e) => setNota(e.value)}
                      defaultValue="0"
                      variant="flushed"
                      width="100px"
                      min={0}
                      max={10}
                      className="bg-gray-100 pl-2 rounded-lg outline-none"
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleClickSetNota(aluno.id)}
                      className="px-3 py-2 bg-[#0A1A2D] text-white flex text-md rounded-md"
                    >
                      Lançar nota
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
