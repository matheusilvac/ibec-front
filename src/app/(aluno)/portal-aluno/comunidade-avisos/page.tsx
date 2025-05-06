"use client"
import {parseCookies} from "nookies";
import axios from "axios";
import {useEffect} from "react";
import {useUserStore} from "@/context/userContext/UserContext";
import {usePost} from "@/context/PostContext";
import {CardPost} from "@/components/CardPost";

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
        <div className="w-full flex items-center h-full flex-col p-10">
           <CardPost/>
        </div>
    )
}