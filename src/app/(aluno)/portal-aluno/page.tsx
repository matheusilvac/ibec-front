"use client";
import { useUserStore } from "@/context/userContext/UserContext";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
import { CardApostila } from "@/components/CardApostila";
import { useApostila } from "@/context/ApostilaContext/ApostilasContext";
import { Loading } from "@/components/loading";
import { useApostilaApi } from "@/hooks/handleApostilaApi";
import { usePost } from "@/context/PostContext";
import { BarList, BarListData, useChart } from "@chakra-ui/charts";

export default function Dashboard() {
  const { user, setUser } = useUserStore();
  const { apostila } = useApostila();
  const { handleApostilaApi } = useApostilaApi();
  const [versiculo, setVersiculo] = useState({ texto: "", ref: "" });
  const [mediaGeral, setMediaGeral] = useState({ mediaFinal: 0, faltas: 0, materiasCursadas: 0 });
  const { post, setPost } = usePost();

  useEffect(() => {
    handleApostilaApi();
    const { token } = parseCookies();
    if (token && !user) {
      axios
        .get(
          "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/auth/user",
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

   useEffect(() => {
    async function fetchMedia() {
      const { token } = parseCookies();
      try {
        const res = await axios.get(
          `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/medias/${user?.id}/resumo`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = res.data;
        setMediaGeral({ mediaFinal: data.mediaFinal, faltas: data.faltas, materiasCursadas:data.materiasCursadas });
      } catch (error) {
        console.error("Erro ao buscar versículo:", error);
      } finally {
      }
    }
    fetchMedia();
  }, [user]);

  useEffect(() => {
    const { token } = parseCookies();

    if (!token) return;

    const fetchPosts = () => {
      axios
        .get(
          "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/post/fixados",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (Array.isArray(response.data.content)) {
            setPost(response.data.content);
          } else {
            console.error(
              "A propriedade content da resposta da API não é uma array:",
              response
            );
          }
        })
        .catch((error) => {
          console.error("Erro durante a requisição:", error);
        });
    };

    fetchPosts();

    const intervalId = setInterval(fetchPosts, 2000);
    return () => clearInterval(intervalId);
  }, []);

   const chart = useChart<BarListData>({
    sort: { by: "value", direction: "desc" },
    data: [
      { name: "Média geral", value: mediaGeral.mediaFinal },
      { name: "Faltas", value: mediaGeral.faltas },
      { name: "Módulos completos", value: mediaGeral.materiasCursadas },
    ],
    series: [{ name: "name", color: "blue.950" }],
  })


  return (
    <div className="w-full flex items-center h-full flex-col">
      <div className="w-full flex flex-col h-auto justify-start items-center ">
        <section className="w-full flex h-auto flex-col gap-5 border-b mb-5 border-gray-300">
          <h1 className="text-5xl font-bold">Portal do aluno</h1>
          <div className="w-full flex items-center gap-10 pb-5">
            <p>
              Nome: <strong className="uppercase">{user?.nome}</strong>
            </p>
            <p>
              Matricula: <strong>{user?.matricula.id}</strong>
            </p>
          </div>
        </section>
        <div className="w-full flex flex-col gap-5">
          <section className="p-4 bg-white rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Versículo do Dia</h2>
            <blockquote className="italic text-lg font-400">
              “Assim,toda árvore boa dá frutas boas, e a árvore que não presta
              dá frutas ruins. A árvore boa não pode dar frutas ruins, e a
              árvore que não presta não pode dar frutas boas. Toda árvore que
              não dá frutas boas é cortada e jogada no fogo. Portanto, vocês
              conhecerão os falsos profetas pelas coisas que eles fazem.”
            </blockquote>
            <cite className="block mt-2 font-bold">- “Mateus 7:17-20“</cite>
          </section>
          <div className="w-full flex flex-col md:flex-row justify-center gap-5">
            <section className="flex flex-col flex-1 gap-5">
              <div className="w-full flex flex-col bg-white rounded-lg p-4 gap-2">
                <h1 className="text-2xl flex font-bold">Média geral do aluno</h1>
                <BarList.Root chart={chart}>
                  <BarList.Content>
                    <BarList.Bar className="text-[#e6a44ee7]"/>
                    <BarList.Value />
                  </BarList.Content>
                </BarList.Root>
              </div>
              <div className="w-full flex flex-col gap-2 bg-white p-4 rounded-lg">
                <div className="w-full flex justify-start ">
                  <h1 className="flex text-2xl font-medium">Módulos</h1>
                </div>
                <div className="w-full h-full flex flex-wrap justify-center items-center gap-4 mt-10 transition-all duration-500">
                  {apostila ? <CardApostila /> : <Loading />}
                </div>
              </div>
            </section>
            <section className="flex flex-col flex-[0.3] bg-white p-4 rounded-lg gap-4">
              <h1 className="w-full flex text-4xl font-light">Avisos 📢</h1>
              <div className="w-full flex flex-col gap-5 h-full overflow-y-auto">
                {post?.map((post) => (
                  <div
                    key={post.id}
                    className="w-full mb-2 flex flex-col gap-1"
                  >
                    <HStack gap="2">
                      <Avatar.Root colorPalette="blackAlpha">
                        <Avatar.Fallback name={post.autor.nome} />
                        <Avatar.Image />
                      </Avatar.Root>
                      <Stack gap="0">
                        <Text fontWeight="bold">{post.autor.nome}</Text>
                        <Text className="text-gray-400" textStyle="xs">
                          {post.autor.email}
                        </Text>
                      </Stack>
                    </HStack>
                    <h1 className="flex text-lg font-semibold">
                      {post.titulo}
                    </h1>
                    <p className="flex border-b-[1px] pb-2 text-sm text-wrap break-words whitespace-pre-wrap">
                      {post.mensagem}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
