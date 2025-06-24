"use client";
import { toaster } from "@/components/ui/toaster";
import { FaltasType } from "@/types/FaltasType";
import { NotasType } from "@/types/NotasType";
import { Field, Input, NativeSelect, NumberInput } from "@chakra-ui/react";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
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
  const [falta, setFalta] = useState<FaltasType>();
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/faltas/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setFalta(response.data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  }, []);

  const handleChange = (field: keyof FaltasType, value: string) => {
    if (!falta) return;
    setFalta({ ...falta, [field]: value });
  };

  const handleClickUpdate = () => {
    const { token } = parseCookies();
    const payload = {
      justificada: falta?.justificada,
      motivo: falta?.motivo,
    };
    axios
      .put(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/faltas/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        router.push("/portal-aluno/editar-falta");
        toaster.create({
          title: "Sucesso!",
          description: "Falta atualizado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  const handleExcluirFalta = () => {
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
          description: "Falta excluida com sucesso!",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description: "Não foi possivel excluir a Falta, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">falta</h1>
      </div>
      <div className="w-full flex flex-col bg-white p-4 rounded-lg gap-5">
        <div className="w-full flex justify-between gap-5">
          <div className="w-1/2 flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Nome da apostila <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={falta?.apostila.titulo}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Nome do aluno <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={falta?.aluno.nome}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Data da falta <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={falta?.dataAt}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
          </div>
          <div className="w-1/2 flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Justificada <Field.RequiredIndicator />
              </Field.Label>
              <NativeSelect.Root variant="subtle">
                <NativeSelect.Field
                  className="pl-2 text-md"
                  value={falta?.justificada ? "true" : "false"}
                  onChange={(e) =>
                    setFalta((prev) =>
                      prev
                        ? {
                            ...prev,
                            justificada: e.target.value === "true",
                          }
                        : prev
                    )
                  }
                >
                  <option value={falta?.justificada ? "true" : "false"}>
                    {falta?.justificada ? "Sim" : "Não"}
                  </option>
                  <option value={falta?.justificada ? "false" : "true"}>
                    {falta?.justificada ? "Não" : "Sim"}
                  </option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Motivo <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={falta?.motivo}
                onChange={(e) =>
                  handleChange("motivo", e.target.value)}
                className="pl-2"
                variant="subtle"
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
          <button
            onClick={handleExcluirFalta}
            className="bg-red-600 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
          >
            <Trash /> Excluir cadastro
          </button>
        </div>
      </div>
    </div>
  );
}
