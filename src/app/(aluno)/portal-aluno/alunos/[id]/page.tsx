"use client";
import { Button } from "@/components/ui/button";
import { UsuarioProps } from "@/types/usuarioProps";
import { Field, Group, Input, NativeSelect } from "@chakra-ui/react";
import axios from "axios";
import { Pencil, UserCheck, UserX } from "lucide-react";
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

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/users/${id}`,
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
                <NativeSelect.Field className="pl-2 text-md">
                  <option value={aluno?.turma.id}>
                    {aluno?.turma.dia === "TERCA" ? "Terça" : "Segunda"}
                  </option>
                  {aluno?.turma.dia !== "SEGUNDA" && (
                    <option value="1">Segunda</option>
                  )}
                  {aluno?.turma.dia !== "TERCA" && (
                    <option value="2">Terça</option>
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
              <Input value={aluno?.role} className="pl-2" variant="subtle" />
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
          <button className="bg-[#0A1A2D] gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300">
              <Pencil /> Salvar
          </button>
          {aluno?.matricula.ativo === true ? (
            <button className="bg-red-500 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300">
               <UserX /> Desativar matrícula
            </button>
          ) : (
            <button className="bg-green-500 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300">
               <UserCheck /> Ativar matrcula
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
