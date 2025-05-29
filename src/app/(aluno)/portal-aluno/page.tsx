"use client";
import { useUserStore } from "@/context/userContext/UserContext";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { HStack, Skeleton, Stack } from "@chakra-ui/react";
import { CardApostila } from "@/components/CardApostila";
import { useApostila } from "@/context/ApostilaContext/ApostilasContext";
import { Loading } from "@/components/loading";
import { useApostilaApi } from "@/hooks/handleApostilaApi";

export default function Dashboard() {
  const { user, setUser } = useUserStore();
  const { apostila } = useApostila();
  const { handleApostilaApi } = useApostilaApi();
   const [versiculo, setVersiculo] = useState({ texto: "", ref: "" });

  useEffect(() => {
    handleApostilaApi();
    const { token } = parseCookies();
    if (token && !user) {
      axios
        .get(
          "https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/auth/user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [user, setUser]);

   useEffect(() => {
    async function fetchVersiculo() {
      try {
        const res = await axios.get(
          "https://beta.ourmanna.com/api/v1/get/?format=json&order=random"
        );
        const data = res.data.verse.details;
        setVersiculo({ texto: data.text, ref: data.reference });
      } catch (error) {
        console.error("Erro ao buscar versículo:", error);
      } finally {
      }
    }
    fetchVersiculo();
  }, []);

  if (!user) {
    return (
      <div className="w-full flex items-center h-full flex-col text-black">
        <HStack gap="5">
          <Skeleton height="5" variant="pulse" />
          <Stack flex="1">
            <Skeleton height="5" variant="pulse" />
            <Skeleton height="5" width="80%" variant="pulse" />
          </Stack>
          <Skeleton height="200px" variant="shine" />
        </HStack>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center h-full flex-col">
      <div className="w-full flex flex-col h-auto justify-start items-center">
        <div className="w-full flex h-auto flex-col gap-5 border-b border-gray-300">
          <h1 className="text-5xl font-bold">Portal do aluno</h1>
          <div className="w-full flex items-center gap-10 pb-5">
            <p>
              Nome: <strong className="uppercase">{user.nome}</strong>
            </p>
            <p>
              Matricula: <strong>{user.matricula.id}</strong>
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <section className="mb-8 mt-5 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Versículo do Dia</h2>
            <blockquote className="italic text-lg font-400">
              “Assim,toda árvore boa dá frutas boas, e a árvore que não presta dá frutas ruins. A árvore boa não pode dar frutas ruins, e a árvore que não presta não pode dar frutas boas. Toda árvore que não dá frutas boas é cortada e jogada no fogo. Portanto, vocês conhecerão os falsos profetas pelas coisas que eles fazem.”
            </blockquote>
            <cite className="block mt-2 font-bold">- “Mateus 7:17-20“</cite>
          </section>
          <div className="w-full flex justify-start ">
            <h1 className="flex text-lg font-medium">Módulos</h1>
          </div>
          <div className="w-full h-full flex flex-wrap justify-center items-center gap-4 mt-10 transition-all duration-500">
            {apostila ? <CardApostila /> : <Loading />}
          </div>
        </div>
      </div>
    </div>
  );
}
