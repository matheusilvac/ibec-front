"use client";
import { Field, Stack, Input, Checkbox } from "@chakra-ui/react";
import { Roboto } from "next/font/google";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/context/userContext/UserContext";
import { toaster } from "@/components/ui/toaster";
import { Loading } from "@/components/loading";
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  useEffect(() => {
    const { token } = parseCookies();
    if (token && user) {
      router.push("/portal-aluno");
    }
  });

  const handleClickButton = async () => {
    const payload = {
      email: formData.email,
      senha: formData.senha,
    };
    setLoading(true);
    try {
      const res = await axios.post(
        "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/auth/login",
        payload
      );
      const token = res.data.token;
      const mustChangePassword = res.data.mustChangePassword;
      setCookie(null, "token", token, {
        maxAge: 2 * 60 * 60,
        path: "/",
        sameSite: "lax",
      });
      if (mustChangePassword == true) {
        toaster.create({
          title: "Sucesso!",
          description: "Redirecionando...",
          type: "success",
        });
        setTimeout(() => {
          router.push("/trocar-senha");
        }, 2000);
      } else {
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
          toaster.create({
            title: "Sucesso!",
            description: "Redirecionando...",
            type: "success",
          });
          setUser(responseGet.data);
          setTimeout(() => {
            router.push("/portal-aluno");
          }, 2000);
        } else {
          setLoading(false);
          console.log("erro, token não encontrado");
        }
      }
    } catch (err) {
      setLoading(false);
      toaster.create({
        title: "Erro ao fazer login",
        description: "Verifique seu email e senha.",
        type: "error",
      });
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
        <h1 className="w-full flex justify-center text-3xl font-bold">Login</h1>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleClickButton();
          }}
        >
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
