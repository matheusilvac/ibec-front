"use client";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
import { UsuarioProps } from "@/types/usuarioProps";
import { Field, Group, Input, NativeSelect } from "@chakra-ui/react";
import axios from "axios";
import { Pencil, Trash, UserCheck, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

type PostPageProps = {
  params: {
    id: number;
  };
};

export default function AlunoPage({ params }: PostPageProps) {
  const id = params.id;
  const [aluno, setAluno] = useState<UsuarioProps>();
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setAluno(response.data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  }, []);

  const handleChange = (field: keyof UsuarioProps, value: string) => {
    if (!aluno) return;
    setAluno({ ...aluno, [field]: value });
  };

  const handleClickUpdate = () => {
    const { token } = parseCookies();
    const payload = {
      nome: aluno?.nome,
      email: aluno?.email,
      turmaId: aluno?.turma.id,
    };
    axios
      .put(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/users/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        router.push("/portal-aluno/alunos");
        toaster.create({
          title: "Sucesso!",
          description: "Aluno atualizado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  const handleDesativarMatricula = () => {
    const { token } = parseCookies();
    axios
      .put(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/users/${id}/desativar-matricula`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
      
        router.push("/portal-aluno/alunos");
        toaster.create({
          title: "Sucesso!",
          description: "Aluno desativado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description:
            "Não foi possivel desativar a matricula, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  const handleExcluirCadastro = () => {
    const { token } = parseCookies();
    axios
      .delete(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
      
        router.push("/portal-aluno/alunos");
        toaster.create({
          title: "Sucesso!",
          description: "Cadastro excluido com sucesso!",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description: "Não foi possivel excluir o cadastro, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  const handleAtivarMatricula = () => {
    const { token } = parseCookies();
    axios
      .put(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/users/${id}/reativar-matricula`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        router.push("/portal-aluno/alunos");
        toaster.create({
          title: "Sucesso!",
          description: "Aluno reativado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description: "Não foi possivel reativar a matricula, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">Alunos</h1>
      </div>
      <div className="w-full flex flex-col bg-white p-4 rounded-lg gap-5">
        <div className="w-full flex justify-between gap-5">
          <div className="w-1/2 flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Nome <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={aluno?.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={aluno?.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Turma <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root variant="subtle">
                <NativeSelect.Field
                  className="pl-2 text-md"
                  value={aluno?.turma.id}
                  onChange={(e) =>
                    setAluno((prev) =>
                      prev
                        ? {
                            ...prev,
                            turma: {
                              ...prev.turma,
                              id: e.target.value,
                              dia:
                                prev.turma.dia === "TERCA"
                                  ? "SEGUNDA"
                                  : "TERCA",
                            },
                          }
                        : prev
                    )
                  }
                >
                  <option value={aluno?.turma.id}>
                    {aluno?.turma.dia === "TERCA" ? "Terça" : "Segunda"}
                  </option>

                  {aluno?.turma.dia === "TERCA" && (
                    <option value={1}>Segunda</option>
                  )}
                  {aluno?.turma.dia === "SEGUNDA" && (
                    <option value={2}>Terça</option>
                  )}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
          </div>
          <div className="w-1/2 flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Papel <Field.RequiredIndicator />
              </Field.Label>
              <Input value={aluno?.role} className="pl-2" variant="subtle" disabled/>
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Matrícula <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={aluno?.matricula.id}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Data Matrícula <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={aluno?.matricula.dataMatricula}
                disabled
                className="pl-2"
                variant="subtle"
                type="date"
              />
            </Field.Root>
          </div>
        </div>
        <div className="w-full flex justify-center gap-5">
          <button
            onClick={handleClickUpdate}
            className="bg-[#0A1A2D] gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
          >
            <Pencil /> Salvar
          </button>
          {aluno?.matricula.ativo === true ? (
            <button
              onClick={handleDesativarMatricula}
              className="bg-red-500 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
            >
              <UserX /> Desativar matrícula
            </button>
          ) : (
            <button
              onClick={handleAtivarMatricula}
              className="bg-green-500 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
            >
              <UserCheck /> Ativar matrcula
            </button>
          )}
          <button
            onClick={handleExcluirCadastro}
            className="bg-red-600 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
          >
            <Trash /> Excluir cadastro
          </button>
        </div>
      </div>
    </div>
  );
}
