"use client";
import { Field, Stack, Input, Checkbox } from "@chakra-ui/react";
import { Roboto } from "next/font/google";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/userContext/UserContext";
import { toaster } from "@/components/ui/toaster";
import { Loading } from "@/components/loading";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function TrocarSenhaPage() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const { token } = parseCookies();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleClickButton = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toaster.create({
        title: "As senhas não coincidem",
        description: "A nova senha e a confirmação precisam ser iguais.",
        type: "error",
      });
      return;
    }

    const payload = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };

    setLoading(true);
    try {
      const res = await axios.post(
        "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/auth/change-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (token) {
        const responseGet = await axios.get(
          "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/auth/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setUser(responseGet.data);
        toaster.create({
          title: "Sucesso!",
          description: "Redirecionando...",
          type: "success",
        });
        setTimeout(() => {
          router.push("/portal-aluno");
        }, 2000);
      } else {
        setLoading(false);
        console.log("erro, token não encontrado");
      }
    } catch (err: any) {
      setLoading(false);
      if (err.response?.status === 400) {
        toaster.create({
          title: "Erro!",
          description: "Senha atual incorreta.",
          type: "error",
        });
      } else {
        toaster.create({
          title: "Erro ao trocar senha",
          description: "Verifique os campos.",
          type: "error",
        });
      }
    }
  };

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <div
      className={`${roboto.className} w-full h-full flex flex-col justify-center items-center text-white pt-28 pb-10 px-10`}
    >
      <div className="w-full md:w-3/4 lg:w-2/4 xl:w-1/4 flex h-auto items-center flex-col justify-center gap-5 bg-white rounded-3xl mt-10 p-10 backdrop-blur-lg shadow-md text-[#071322]">
        <h1 className="w-full flex justify-center text-3xl font-bold">
          Trocar senha
        </h1>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickButton();
          }}
        >
          <Field.Root required>
            <Field.Label>
              Senha atual <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Senha antiga"
              variant="flushed"
              pl="5"
              onChange={(e) => handleInputChange("oldPassword", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Nova senha <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput
              variant="flushed"
              pl="5"
              placeholder="Nova senha"
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>
              Confirme a nova senha <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput
              variant="flushed"
              pl="5"
              placeholder="Confirme a senha"
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
            />
          </Field.Root>
          <Checkbox.Root variant="subtle" color="#071322">
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Lembrar de mim</Checkbox.Label>
          </Checkbox.Root>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClickButton();
            }}
            className="w-full flex justify-center items-center bg-[#071322] p-3 rounded-xl text-white"
          >
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <>Acessar</>
            )}
          </button>
          <div className="w-full flex justify-center items-center">
            <Link href="/" className="flex border-b-2 border-[#071322]">
              Esqueci minha senha
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
