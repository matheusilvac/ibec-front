"use client";
import { Field, Stack, Input, Checkbox } from "@chakra-ui/react";
import { Roboto } from "next/font/google";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import {useEffect, useState} from "react";
import {parseCookies, setCookie} from "nookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import {useUserStore} from "@/context/userContext/UserContext";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function Login() {
  const router = useRouter();
  const {setUser} = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    const {token} = parseCookies();
    if (token) {
      router.push("/portal-aluno");
    }
  });

  const handleClickButton = async () => {
    const payload = {
      email: formData.email,
      senha: formData.senha,
    };

    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        payload
      );
      const token = res.data.token;
      if (token) {
        setCookie(null, "token", token, {
          maxAge: 2 * 24 * 60 * 60,
          path: "/",
          sameSite: "lax",
        });
        const responseGet = await axios.get("http://localhost:8081/api/auth",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
        )
        setUser(responseGet.data);
        router.push("/portal-aluno");
      } else {
        console.log("erro, token não encontrado");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
    }
  };

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <div
      className={`${roboto.className} w-full h-full flex flex-col justify-center items-center text-white pt-5 pb-5 sm:pt-28 sm:pb-10`}
    >
      <div className="w-auto sm:w-1/4 flex h-auto items-center flex-col justify-center gap-5 bg-white rounded-3xl mt-10 p-10 backdrop-blur-lg shadow-md text-[#071322]">
        <h1 className="w-full flex justify-center text-3xl font-bold">Login</h1>
        <Stack gap="5" align="flex-start" w="full">
          <Field.Root required>
            <Field.Label>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="johndoe@example.com"
              variant="flushed"
              pl="5"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Senha</Field.Label>
            <PasswordInput
              variant="flushed"
              pl="5"
              placeholder="Password"
              onChange={(e) => handleInputChange("senha", e.target.value)}
            />
          </Field.Root>
          <Checkbox.Root variant="subtle" color="#071322">
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Lembrar de mim</Checkbox.Label>
          </Checkbox.Root>
          <button
            onClick={handleClickButton}
            className="w-full flex justify-center items-center bg-[#071322] p-3 rounded-xl text-white"
          >
            Acessar
          </button>
          <div className="w-full flex justify-center items-center">
            <Link href="/public" className="flex border-b-2 border-[#071322]">
              Esqueci minha senha
            </Link>
          </div>
        </Stack>
      </div>
    </div>
  );
}
