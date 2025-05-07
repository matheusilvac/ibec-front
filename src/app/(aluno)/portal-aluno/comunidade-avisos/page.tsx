"use client"
import {parseCookies} from "nookies";
import axios from "axios";
import {useEffect} from "react";
import {useUserStore} from "@/context/userContext/UserContext";
import {usePost} from "@/context/PostContext";
import {CardPost} from "@/components/CardPost";
import {Avatar} from "@chakra-ui/react";
import {Send} from "lucide-react";

export default function ComunidadeAvisos() {
    const {user} = useUserStore();
    const {post, setPost} = usePost();

    useEffect(() => {
        const { token } = parseCookies();
        if (token) {
            axios.get("http://localhost:8081/api/post", {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then((response) => {
                    console.log(response)
                    setTimeout(() => {
                        if ("error" in response) {
                            throw new Error("Erro na resposta da API");
                        }

                        if (Array.isArray(response.data.content)) {
                            setPost(response.data.content);
                        } else {
                            console.error(
                                "A propriedade content da resposta da API não é uma array:",
                                response
                            );
                        }
                    }, 50);
                })
                .catch((error) => {
                    console.error("Erro durante a requisição:", error);
                });
        }
    }, []);

    console.log("post", post)

    return(
        <div className="w-full flex items-center h-full flex-col p-10 gap-3">
            <div className="w-full flex justify-start items-center gap-3 p-3 bg-white rounded-lg">
                <Avatar.Root colorPalette="blackAlpha">
                    <Avatar.Fallback name={user?.nome} />
                    <Avatar.Image />
                </Avatar.Root>
                <input placeholder="Compartilhe sua dúvida, ou algo com a comunidade..." className="w-full flex py-2 px-4 rounded-xl border border-gray-300 outline-none bg-gray-100"/>
                <button>
                    <Send />
                </button>
            </div>
           <CardPost/>
        </div>
    )
}