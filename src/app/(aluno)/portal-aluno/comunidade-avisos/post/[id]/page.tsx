"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { Avatar, HStack, Menu, Portal, Stack, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Bookmark,
  CornerUpLeft,
  Heart,
  MessageCircle,
  Send,
  Trash,
} from "lucide-react";
import { useUserStore } from "@/context/userContext/UserContext";
import { PostProps } from "@/types/PostProps";
import { Loading } from "@/components/loading";
import { toaster } from "@/components/ui/toaster";

type PostPageProps = {
  params: {
    id: number;
  };
};

export default function PostPage({ params }: PostPageProps) {
  const id = params.id;
  const [post, setPost] = useState<PostProps>();
  const { user } = useUserStore();
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
          "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/comentarios",
          payload
        );
      } catch (err) {
        toaster.create({
          title: "Erro!",
          description: "Ocorreu um erro ao fazer o post",
          type: "error",
          meta: { closable: true },
        });
      }
    } else {
      toaster.create({
        title: "Erro!",
        description: "Escreva uma mensagem para fazer um post",
        type: "error",
        meta: { closable: true },
      });
    }
  };

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  useEffect(() => {
    const { token } = parseCookies();

    if (!token) return;

    axios
      .get(
        `https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/post/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  });

  return (
    <div className="w-full flex justify-center items-center">
      {post ? (
        <div
          key={post?.id}
          className="w-full grid gap-3 bg-white rounded-lg px-4 lg:px-7 py-5"
        >
          <div className="flex gap-2 lg:gap-3 items-start justify-between w-full">
            <HStack gap="2">
              <Avatar.Root colorPalette="blackAlpha">
                <Avatar.Fallback name={post?.autor.nome} />
                <Avatar.Image />
              </Avatar.Root>
              <Stack gap="0">
                <Text fontWeight="bold">{post?.autor.nome}</Text>
                <Text className="text-gray-400" textStyle="xs">
                  {post?.autor.email}
                </Text>
              </Stack>
            </HStack>
            <div className="flex gap-3 items-center">
              <Text className="text-gray-400" fontWeight="medium">
                {formatDistanceToNow(
                  new Date(post?.dataPost ? post.dataPost : 0),
                  { addSuffix: true, locale: ptBR }
                )}
              </Text>
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
                      <button className="w-full flex justify-start gap-2 items-center border-none outline-none hover:bg-gray-200/80 ">
                        <div className="flex pt-[2px]">
                          <Bookmark size={18} />
                        </div>
                        <p className="flex text-md">Salvar</p>
                      </button>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 py-3 text-black text-sidebar-accent text-ellipsis !line-clamp-[4]">
            {post?.titulo && (
              <h1 className="flex text-lg font-bold text-black">{post?.titulo}</h1>
            )}
            <p className=" text-gray-700">{post?.mensagem}</p>
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
              <Text className="text-gray-400" fontWeight="medium">
                {post?.comentarios?.length || 0} Comentários
              </Text>
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
            <button onClick={() => handleClickButton(post?.id)}>
              <Send />
            </button>
          </div>
          {post?.comentarios?.map((comentario) => (
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
