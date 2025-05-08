import {useApostila} from "@/context/ApostilaContext/ApostilasContext";
import axios from "axios";
import {parseCookies} from "nookies";

export const useApostilaApi = () => {
    const {setApostila} = useApostila();
    const {token} = parseCookies();


    const handleApostilaApi = () => {
        setApostila(null);
        axios.get("https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/apostilas", {
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

                    if (Array.isArray(data.content)) {
                        setApostila(data.content);
                    } else {
                        console.error(
                            "A propriedade content da resposta da API não é uma array:",
                            data
                        );
                    }
                }, 50);
            })
            .catch((error) => {
                console.error("Erro durante a requisição:", error);
            });
    }

    return {
        handleApostilaApi
    }
}