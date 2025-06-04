import { Avatar, HStack, Menu, Portal, Stack, Text } from "@chakra-ui/react";
import { usePost } from "@/context/PostContext";
import {
  Bookmark,
  CornerUpLeft,
  Heart,
  Maximize2,
  MessageCircle,
  Send,
  Trash,
} from "lucide-react";
import { useUserStore } from "@/context/userContext/UserContext";
import axios from "axios";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { parseCookies } from "nookies";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";

export const CardPost = () => {
  const { post } = usePost();
  const { user } = useUserStore();
  const router = useRouter();
  const [formData, setFormData] = useState({
    mensagem: "",
  });

  const handleClickButton = async (postID: any) => {
    const payload = {
      mensagem: formData.mensagem,
      autorID: user?.id,
      postID: postID,
    };
    if (payload.mensagem != "") {
      try {
        const res = await axios.post(
          "https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/comentarios",
          payload
        );
        toaster.create({
          title: "Sucesso!",
          description: "Post criado com sucesso.",
          type: "success",
        });
      } catch (err) {
        toaster.create({
          title: "Erro!",
          description: "Ocorreu um erro ao tentar fazer um post.",
          type: "error",
        });
      }
    } else {
      toaster.create({
        title: "Erro!",
        description: "Digite uma mensagem para continuar.",
        type: "error",
      });
    }
  };

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleFixarPost = (id: string) => {
    const { token } = parseCookies();
    axios
      .post(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/post/${id}/fixar-post`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toaster.create({
          title: "Sucesso!",
          description: "Post fixado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description: "Não foi possivel fixar o post, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  const handleDesafixarPost = (id: string) => {
    const { token } = parseCookies();
    axios
      .post(
        `https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/post/${id}/desafixar-post`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toaster.create({
          title: "Sucesso!",
          description: "Post desafixado com sucesso",
          type: "success",
          meta: { closable: true },
        });
      })
      .catch((error) => {
        toaster.create({
          title: "Erro!",
          description: "Não foi possivel desafixar o post, tente novamente",
          type: "error",
          meta: { closable: true },
        });
      });
  };

  return (
    <>
      {post?.map((post) => (
        <div
          key={post.id}
          className="w-full grid gap-3 bg-white text-black rounded-lg px-4 lg:px-7 py-5"
        >
          <div className="flex gap-2 lg:gap-3 items-start justify-between w-full">
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
            <div className="flex gap-3 items-center">
              <Text className="text-gray-400" fontWeight="medium">
                {formatDistanceToNow(new Date(post.dataPost), {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </Text>
              <Link
                href={`/portal-aluno/comunidade-avisos/post/${post.id}`}
                className="text-sm"
              >
                <Maximize2 size={18} />
              </Link>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <button className="flex text-xl font-bold">...</button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content className="bg-[#f0f0f0] text-black gap-1 p-1">
                      <button className="w-full flex justify-start gap-2 items-center border-none outline-none hover:bg-gray-200/80 ">
                        <div className="flex pt-[2px]">
                          <Trash size={18} />
                        </div>
                        <p className="flex text-md">Apagar</p>
                      </button>
                      {user?.role == "ADMIN" || user?.role === "PROFESSOR" ? (
                        <>
                          {post.fixado === true ? (
                            <button
                              onClick={() => handleDesafixarPost(post.id)}
                              className="w-full flex justify-start gap-2 items-center border-none outline-none hover:bg-gray-200/80 "
                            >
                              <div className="flex pt-[2px]">
                                <Bookmark size={18} />
                              </div>
                              <p className="flex text-md">Desafixar</p>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleFixarPost(post.id)}
                              className="w-full flex justify-start gap-2 items-center border-none outline-none hover:bg-gray-200/80 "
                            >
                              <div className="flex pt-[2px]">
                                <Bookmark size={18} />
                              </div>
                              <p className="flex text-md">Fixar</p>
                            </button>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </div>
          </div>

          <div className="w-full flex text-black flex-col gap-2 py-3 text-sidebar-accent text-ellipsis !line-clamp-[4]">
            {post.titulo && (
              <h1 className="flex text-lg text-black font-bold">
                {post.titulo}
              </h1>
            )}
            <p className="text-black">{post.mensagem}</p>
          </div>

          <div className="w-full flex justify-between border-b border-gray-300 pb-5">
            <div className="flex justify-start gap-3">
              <button>
                <Heart />
              </button>
              <button>
                <MessageCircle />
              </button>
            </div>
            <div className="flex justify-end">
              <Link href={`/portal-aluno/comunidade-avisos/post/${post.id}`}>
                <Text
                  className="text-gray-900 hover:border-b border-black"
                  fontWeight="medium"
                >
                  {post.comentarios?.length || 0} Comentários
                </Text>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-start items-center gap-3 py-3">
            <Avatar.Root colorPalette="blackAlpha">
              <Avatar.Fallback name={user?.nome} />
              <Avatar.Image />
            </Avatar.Root>
            <input
              placeholder="Escreva um comentário..."
              className="w-full flex py-2 px-4 rounded-xl border border-gray-300 outline-none bg-gray-100"
              onChange={(e) => handleInputChange("mensagem", e.target.value)}
            />
            <button onClick={() => handleClickButton(post.id)}>
              <Send />
            </button>
          </div>
          {post.comentarios?.slice(0, 2).map((comentario) => (
            <div key={comentario.id}>
              <div className="flex gap-2 lg:gap-3 items-start justify-between w-full">
                <HStack gap="2">
                  <Avatar.Root colorPalette="blackAlpha">
                    <Avatar.Fallback name={comentario.autor.nome} />
                    <Avatar.Image />
                  </Avatar.Root>
                  <Stack gap="0">
                    <Text fontWeight="bold">{comentario.autor.nome}</Text>
                    <Text className="text-gray-400" textStyle="xs">
                      {comentario.autor.email}
                    </Text>
                  </Stack>
                </HStack>
              </div>

              <div className="w-full flex flex-col gap-2 py-3 text-ellipsis !line-clamp-[4]">
                <p>{comentario.mensagem}</p>
              </div>

              <div className="w-full flex justify-between pb-3">
                <div className="flex justify-start gap-3">
                  <button>
                    <Heart />
                  </button>
                  <button>
                    <CornerUpLeft />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
