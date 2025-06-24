"use client"
import {parseCookies} from "nookies";
import axios from "axios";
import {useEffect, useState} from "react";
import {useUserStore} from "@/context/userContext/UserContext";
import {usePost} from "@/context/PostContext";
import {CardPost} from "@/components/CardPost";
import {Avatar, CloseButton, Dialog, Portal} from "@chakra-ui/react";
import {Send} from "lucide-react";
import {Loading} from "@/components/loading";
import {toaster} from "@/components/ui/toaster";

export default function ComunidadeAvisos() {
    const {user} = useUserStore();
    const {post, setPost} = usePost();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        titulo: "",
        mensagem: "",
    });

    const handleInputChange = (key: keyof typeof formData, value: string) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    useEffect(() => {
        const { token } = parseCookies();

        if (!token) return;

        const fetchPosts = () => {
            axios.get("https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/post", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => {
                    if (Array.isArray(response.data.content)) {
                        setPost(response.data.content);
                    } else {
                        console.error("A propriedade content da resposta da API não é uma array:", response);
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


    const handleClickButton = async () => {
        const payload = {
            titulo: formData.titulo,
            mensagem: formData.mensagem,
            autorID: user?.id
        };
        if (payload.mensagem != "") {
            try {
                const res = await axios.post(
                    "https://portal-aluno-app-e88e2580ba3a.herokuapp.com/api/post",
                    payload
                )
                setIsDialogOpen(false);
                toaster.create({
                    title: "Sucesso!",
                    description: "Post criadas com sucesso",
                    type: "success",
                    meta: { closable: true },
                })
            } catch (err) {
                console.error("Erro ao fazer post:", err);
                toaster.create({
                    title: "Erro!",
                    description: "Não foi possivel criar seu post",
                    type: "error",
                    meta: { closable: true },
                })
            }
        } else {
            toaster.create({
                title: "Erro!",
                description: "O campo mensagem esta vazio!",
                type: "error",
                meta: { closable: true },
            })
        }

    };

    return (
        <div className="w-full flex items-center h-full flex-col gap-3">
            <div className="w-full flex justify-start items-center gap-3 p-3 bg-white rounded-lg">
                <Avatar.Root colorPalette="blackAlpha">
                    <Avatar.Fallback name={user?.nome}/>
                    <Avatar.Image/>
                </Avatar.Root>
                <Dialog.Root open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open.open)} size="xl"
                             placement="center" motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                        <button
                            className="w-full flex py-2 px-4 rounded-xl border border-gray-300 outline-none text-gray-500 bg-gray-100">
                            Compartilhe algo com a comunidade, ou tire sua duvida...
                        </button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop/>
                        <Dialog.Positioner>
                            <Dialog.Content className="bg-[#f0f0f0]">
                                <Dialog.Header>
                                    <Dialog.Title><h1 className="font-bold flex text-2xl">Criar uma publicação</h1>
                                    </Dialog.Title>
                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm"/>
                                    </Dialog.CloseTrigger>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <input
                                        className="w-full flex justify-start p-1 pl-2 outline-none text-2xl text-black bg-transparent placeholder:text-black"
                                        placeholder="Título (opcional)"
                                        onChange={(e) => handleInputChange("titulo", e.target.value)}/>
                                    <input
                                        className="w-full h-full flex justify-start p-1 pl-2 outline-none text-lg text-gray-500 bg-transparent"
                                        placeholder="Escreva sua mensagem aqui..."
                                        onChange={(e) => handleInputChange("mensagem", e.target.value)}/>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <button className="flex p-3 bg-red-500 text-white rounded-xl">Cancelar</button>
                                    </Dialog.ActionTrigger>
                                    <button className="flex p-3 bg-[#0A1A2D] text-white rounded-xl"
                                            onClick={handleClickButton}>Publicar
                                    </button>
                                </Dialog.Footer>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
                <button>
                    <Send/>
                </button>
            </div>
            {post  ?  (<CardPost/>) : (<Loading/>)}
        </div>
    )
}