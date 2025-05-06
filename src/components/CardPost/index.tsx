import {Avatar, HStack, Stack, Text} from "@chakra-ui/react";
import {usePost} from "@/context/PostContext";
import {Heart, MessageCircle} from "lucide-react";

export const CardPost = () => {
    const {post} = usePost();

    return (
        <>
        {post?.map((post) => (
            <div key={post.id} className=" w-full grid gap-3 bg-white rounded-lg px-4 lg:px-7 py-5">
                <div className="flex gap-2 lg:gap-3 items-start justify-between w-full">
                    <HStack gap="2">
                        <Avatar.Root colorPalette="blackAlpha">
                            <Avatar.Fallback name={post.autor.nome}/>
                            <Avatar.Image/>
                        </Avatar.Root>
                        <Stack gap="0">
                            <Text fontWeight="medium">{post.autor.nome}</Text>
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
                <div className="w-full flex flex-col gap-2 pt-5 pb-5 text-sidebar-accent text-ellipsis !line-clamp-[4]">
                    {post.titulo ? (<h1 className="flex text-lg font-bold">{post.titulo}</h1>) : ""}
                    <p>{post.mensagem}</p>
                </div>
                <div className="w-full flex justify-between border-b border-gray-300 pb-5">
                    <div className="flex justify-start gap-5">
                        <button>
                            <Heart/>
                        </button>
                        <button>
                            <MessageCircle/>
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <Text className="text-gray-400" fontWeight="medium">
                            {post && post.comentarios && post.comentarios.length} Comentários
                        </Text>
                    </div>
                </div>
                {post.comentarios.map((comentario) => (
                    <>
                        <div className="flex gap-2 lg:gap-3 items-start justify-between w-full">
                            <HStack gap="2">
                                <Avatar.Root colorPalette="blackAlpha">
                                    <Avatar.Fallback name={comentario.autor.nome}/>
                                    <Avatar.Image/>
                                </Avatar.Root>
                                <Stack gap="0">
                                    <Text fontWeight="medium">{comentario.autor.nome}</Text>
                                    <Text className="text-gray-400" textStyle="xs">
                                        {comentario.autor.email}
                                    </Text>
                                </Stack>
                            </HStack>
                        </div>
                        <div
                            className="w-full flex flex-col gap-2 pt-5 pb-5 text-sidebar-accent text-ellipsis !line-clamp-[4]">
                            <p>{comentario.mensagem}</p>
                        </div>
                        <div className="w-full flex justify-between border-b border-gray-300 pb-5">
                            <div className="flex justify-start gap-5">
                                <button>
                                    <Heart/>
                                </button>
                                <button>
                                    <MessageCircle/>
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <Text className="text-gray-400" fontWeight="medium">
                                    {post && post.comentarios && post.comentarios.length} Comentários
                                </Text>
                            </div>
                        </div>
                    </>
                )) : (<></>)}
        </div>
    )
)}
</>

)
}