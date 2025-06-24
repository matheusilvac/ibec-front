"use client";
import { Checkbox, Table, Tabs, Toaster } from "@chakra-ui/react";
import { GraduationCap, SquareMousePointer } from "lucide-react";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { useTurma } from "@/context/TurmaContext";
import { AlunosProps } from "@/types/AlunosProps";
import { useApostila } from "@/context/ApostilaContext/ApostilasContext";
import { Loading } from "@/components/loading";
import { useApostilaApi } from "@/hooks/handleApostilaApi";
import { toaster } from "@/components/ui/toaster";

export default function Faltas() {
  const [value, setValue] = useState<string | null>("modulos");
  const { turma, setTurma } = useTurma();
  const [alunos, setAlunos] = useState<AlunosProps[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const { apostila } = useApostila();
  const { handleApostilaApi } = useApostilaApi();
  const [idApostila, setIdApostila] = useState<number | null>();

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < alunos.length;

  useEffect(() => {
    const { token } = parseCookies();
    handleApostilaApi();
    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/turmas`,
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
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/turmas/${id}/alunos`,
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
  };

  const handleClickSetFalta = () => {
    const { token } = parseCookies();
    if (selection.length > 0) {
      const payload = {
        alunoID: selection,
        apostilaID: idApostila,
        justificada: false,
        motivo: "Faltou sem justificativa",
      };
      axios
        .post(
          `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/faltas`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setSelection([]);
          toaster.create({
            title: "Sucesso!",
            description: "Faltas criadas com sucesso",
            type: "success",
            meta: { closable: true },
          });
        })
        .catch((error) => {
          toaster.create({
            title: "Erro!",
            description: error.mensagem,
            type: "error",
            meta: { closable: true },
          });
        });
    } else {
      toaster.create({
        title: "Erro!",
        description: "Selecione pelo menos um aluno para criar uma falta",
        type: "error",
        meta: { closable: true },
      });
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">lançar faltas</h1>
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
            Alunos
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
            <Table.Header>
              <Table.Row className="bg-white text-black font-medium">
                <Table.ColumnHeader className="text-black">
                  <Checkbox.Root
                    size="sm"
                    top="0.5"
                    variant="subtle"
                    aria-label="Select all rows"
                    checked={
                      indeterminate ? "indeterminate" : selection.length > 0
                    }
                    onCheckedChange={(changes) => {
                      setSelection(
                        changes.checked ? alunos.map((item) => item.id) : []
                      );
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-black">
                  Alunos
                </Table.ColumnHeader>
                <Table.ColumnHeader className="text-black">
                  Email
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {alunos.map((aluno) => (
                <Table.Row
                  key={aluno.id}
                  data-selected={selection.includes(aluno.id) ? "" : undefined}
                  className="bg-white hover:bg-gray-100 duration-300 transition-all"
                >
                  <Table.Cell>
                    <Checkbox.Root
                      variant="subtle"
                      size="sm"
                      top="0.5"
                      aria-label="Select row"
                      checked={selection.includes(aluno.id)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) =>
                          changes.checked
                            ? [...prev, aluno.id]
                            : selection.filter((name) => name !== aluno.id)
                        );
                      }}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>
                  </Table.Cell>
                  <Table.Cell>{aluno.nome}</Table.Cell>
                  <Table.Cell>{aluno.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <div className="w-full flex justify-end mt-2">
            <button
              className="p-2 flex bg-[#0A1A2D] rounded-xl text-white font-medium"
              onClick={handleClickSetFalta}
            >
              Lançar faltas
            </button>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
