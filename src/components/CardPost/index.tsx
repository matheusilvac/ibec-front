import {Avatar, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {usePost} from "@/context/PostContext";
import {CornerUpLeft, Forward, Heart, MessageCircle, Send} from "lucide-react";
import {useUserStore} from "@/context/userContext/UserContext";

export const CardPost = () => {
    const {post} = usePost();
    const {user} = useUserStore();

    return (
        <>
            {post?.map((post) => (
                <div
                    key={post.id}
                    className="w-full grid gap-3 bg-white rounded-lg px-4 lg:px-7 py-5"
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
                        <div>
                            <Text className="text-gray-400" fontWeight="medium">
                                Há 2 dias
                            </Text>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-2 py-3 text-sidebar-accent text-ellipsis !line-clamp-[4]">
                        {post.titulo && (
                            <h1 className="flex text-lg font-bold">{post.titulo}</h1>
                        )}
                        <p>{post.mensagem}</p>
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
                                {post.comentarios?.length || 0} Comentários
                            </Text>
                        </div>
                    </div>

                    <div className="w-full flex justify-start items-center gap-3 py-3">
                        <Avatar.Root colorPalette="blackAlpha">
                            <Avatar.Fallback name={user?.nome} />
                            <Avatar.Image />
                        </Avatar.Root>
                        <input placeholder="Escreva um comentário..." className="w-full flex py-2 px-4 rounded-xl border border-gray-300 outline-none bg-gray-100"/>
                        <button>
                            <Send />
                        </button>
                    </div>

                    {post.comentarios?.map((comentario) => (
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
    )
}