"use client";
import { toaster } from "@/components/ui/toaster";
import { NotasType } from "@/types/NotasType";
import {
  Field,
  Input,
  NumberInput,
} from "@chakra-ui/react";
import axios from "axios";
import { Pencil, Trash} from "lucide-react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

type PostPageProps = {
  params: {
    id: number;
  };
};

export default function NotaPage({ params }: PostPageProps) {
  const id = params.id;
  const [nota, setNota] = useState<NotasType>();
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/nota/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setNota(response.data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  }, []);

  const handleChange = (field: keyof NotasType, value: string) => {
    if (!nota) return;
    setNota({ ...nota, [field]: value });
  };

  const handleClickUpdate = () => {
    const { token } = parseCookies();
    const payload = {
      nota: nota?.nota,
    };
    axios
      .put(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/nota/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        router.push("/portal-aluno/editar-nota");
        toaster.create({
          title: "Sucesso!",
          description: "Nota atualizado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  const handleExcluirNota = () => {
    const { token } = parseCookies();
    axios
      .delete(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/users/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        router.push("/portal-aluno/alunos");
        toaster.create({
          title: "Sucesso!",
          description: "Nota excluida com sucesso!",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description: "Não foi possivel excluir a nota, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  return (
    <div className="w-full flex flex-col ">
      <div className="w-full flex justify-start p-2">
        <h1 className="flex text-4xl font-medium uppercase">NOTA</h1>
      </div>
      <div className="w-full flex flex-col bg-white p-4 rounded-lg gap-5">
        <div className="w-full flex justify-between gap-5">
          <div className="w-1/2 flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Nome da apostila <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={nota?.prova.apostila.titulo}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Nome da prova <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={nota?.prova.nome}
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
                value={nota?.aluno.nome}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
          </div>
          <div className="w-1/2 flex justify-start flex-col gap-5">
            <Field.Root required>
              <Field.Label>
                Data da prova <Field.RequiredIndicator />
              </Field.Label>
              <Input
                value={nota?.prova.dataProva}
                disabled
                className="pl-2"
                variant="subtle"
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>
                Nota <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root max={10} min={0} allowMouseWheel variant="subtle">
                <NumberInput.Control />
                <NumberInput.Input
                  value={nota?.nota}
                  onChange={(e) => handleChange("nota", e.target.value)}
                  className="pl-2"
                />
              </NumberInput.Root>
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
            onClick={handleExcluirNota}
            className="bg-red-600 gap-2 text-white flex py-1 px-4 justify-center rounded-lg hover:opacity-80 transition-all duration-300"
          >
            <Trash /> Excluir cadastro
          </button>
        </div>
      </div>
    </div>
  );
}
