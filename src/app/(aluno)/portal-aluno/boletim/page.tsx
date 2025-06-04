"use client";
import { CardNotas } from "@/components/CardNotas";
import { useNota } from "@/context/NotasContext";
import { Loading } from "@/components/loading";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { MediaProps } from "@/types/MediaProps";
import { useUserStore } from "@/context/userContext/UserContext";

export default function BoletimPage() {
  const { nota, setNota } = useNota();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const { token } = parseCookies();
    axios
      .get(
        "https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/auth/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((responseGet) => {
        setUser(responseGet.data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
    if (user != null) {
      axios
        .get<MediaProps[]>(
          `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/medias/${user?.id}/situacao`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setTimeout(() => {
            if ("error" in response.data) {
              throw new Error("Erro na resposta da API");
            }
            setNota(response.data);
          }, 300);
        })
        .catch((error) => {
          console.error("Erro durante a requisição:", error);
        });
    }
  }, []);

  return (
    <div className="w-full flex flex-col  gap-10">
      <div className="w-full flex">
        <h1 className="flex text-2xl font-bold">
          Veja aqui suas notas e faltas em todas as matérias.
        </h1>
      </div>
      <div className="w-full h-full flex gap-8 transition-all duration-500">
        {nota ? <CardNotas /> : <Loading />}
      </div>
    </div>
  );
}
