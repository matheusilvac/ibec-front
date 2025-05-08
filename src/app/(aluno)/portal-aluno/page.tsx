"use client"
import {useUserStore} from "@/context/userContext/UserContext";
import {useEffect, useState} from "react";
import {parseCookies} from "nookies";
import axios from "axios";
import {HStack, Skeleton, Stack} from "@chakra-ui/react";
import {ApostilaProps} from "@/types/apostilaProps";
import {CardApostila} from "@/components/CardApostila";
import {useApostila} from "@/context/ApostilaContext/ApostilasContext";
import {Loading} from "@/components/loading";
import {useApostilaApi} from "@/hooks/handleApostilaApi";

export default function Dashboard() {
  const {user, setUser} = useUserStore();
  const { apostila } = useApostila();
  const {handleApostilaApi} = useApostilaApi()

  useEffect(() => {
    const { token } = parseCookies();
    handleApostilaApi();
    if (token && !user) {
      axios
          .get("https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/auth", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUser(res.data))
          .catch(() => setUser(null));
    }
  }, [user, setUser]);

  console.log(apostila)


  if (!user) {
    return (
      <div className="w-full flex items-center h-full flex-col p-10 text-black">
          <HStack gap="5">
              <Skeleton height="5" variant="pulse"/>
              <Stack flex="1">
                  <Skeleton height="5" variant="pulse"/>
                  <Skeleton height="5" width="80%" variant="pulse"/>
              </Stack>
              <Skeleton height="200px" variant="shine"/>
          </HStack>
      </div>
    )
  }

  return (
      <div className="w-full flex items-center h-full flex-col p-10">
        <div className="w-full flex flex-col h-auto justify-start items-center">
          <div className="w-full flex h-auto flex-col gap-5 border-b border-gray-300">
            <h1 className="text-5xl font-bold">Portal do aluno</h1>
            <div className="w-full flex items-center gap-10 pb-5">
              <p>Nome: <strong className="uppercase">{user.nome}</strong></p>
              <p>Matricula:  <strong>{user.matricula.id}</strong></p>
            </div>
          </div>
            <div className="w-full h-full flex flex-wrap justify-center items-center gap-8 mt-10 transition-all duration-500">
                {apostila  ?  (<CardApostila/>) : (<Loading/>)}
            </div>
        </div>
      </div>
  );
}
