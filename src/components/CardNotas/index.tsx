"use client"
import {useNota} from "@/context/NotasContext";
import {useEffect} from "react";
import {parseCookies} from "nookies";
import axios from "axios";
import {useUserStore} from "@/context/userContext/UserContext";

export const CardNotas = () => {
    const {nota, setNota} = useNota();
    const {user} = useUserStore()

    useEffect(() => {
        const { token } = parseCookies();
        axios.get(`https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/medias/${user?.id}/situacao`, {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then((response) => {
                if (!response.data) {
                    throw new Error(
                        `Erro na requisição: ${response.status} - ${response.statusText}`
                    );
                }
                return response.data;
            })
            .then((data) => {
                setTimeout(() => {
                    if ("error" in data) {
                        throw new Error("Erro na resposta da API");
                    }

                        setNota(data.content);
                }, 10000);
            })
            .catch((error) => {
                console.error("Erro durante a requisição:", error);
            });
    }, []);

    return (
        <>
            {nota?.map((nota, index) => (
                <div className="bg-white w-52 h-auto flex flex-col p-2 " key={index}>
                    <div className="w-full flex justify-start h-auto">
                        <h1 className="flex text-xl">Matéria: <strong>{nota.apostila}</strong></h1>
                    </div>
                    oi
                </div>
            ))}
        </>
    )
}