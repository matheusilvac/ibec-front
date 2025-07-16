"use client";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { UsuarioProps } from "@/types/usuarioProps";
import { Field, Group, Input, NativeSelect } from "@chakra-ui/react";
import axios from "axios";
import { Pencil, Trash, UserCheck, UserX } from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useState } from "react";

type PostPageProps = {
  params: {
    id: number;
  };
};

export default function AlunoPage({ params }: PostPageProps) {
  const id = params.id;
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    turmaId: 0,
  });

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClickCriar = () => {
    const { token } = parseCookies();
    const payload = {
      nome: form?.nome,
      email: form?.email,
      senha: form?.senha,
      turmaId: form?.turmaId,
    };
    axios
      .post(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/admin/users`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        router.push("/portal-aluno/alunos");
        toaster.create({
          title: "Sucesso!",
          description: "Aluno criado com sucesso",
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
        <h1 className="flex text-4xl font-medium uppercase">Alunos</h1>
      </div>
      <div className="w-full flex flex-col bg-white p-4 rounded-lg gap-5">
        <div className="w-full flex justify-between gap-5">
          <div className="w-full flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Nome <Field.RequiredIndicator />
              </Field.Label>
              <Input
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
                onChange={(e) => handleChange("email", e.target.value)}
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <div className="w-full flex justify-center gap-10">
              <Field.Root required>
                <Field.Label>
                  Turma <Field.RequiredIndicator />
                </Field.Label>
                <NativeSelect.Root variant="subtle">
                  <NativeSelect.Field
                    className="pl-2 text-md"
                    onChange={(e) => handleChange("turmaId", e.target.value)}
                  >
                    <option value={1}>Segunda</option>

                    <option value={2}>Terça</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Field.Root>
              <Field.Root required>
                <Field.Label>
                  Senha <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput
                  onChange={(e) => handleChange("senha", e.target.value)}
                  className="pl-2"
                  variant="subtle"
                />
              </Field.Root>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center gap-5">
          <button
            onClick={handleClickCriar}
            className="bg-[#0A1A2D] gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
          >
            <Pencil /> Criar aluno
          </button>
        </div>
      </div>
    </div>
  );
}
