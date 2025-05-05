"use client"
import {useUserStore} from "@/context/UserContext";
import {useEffect} from "react";
import {parseCookies} from "nookies";
import axios from "axios";
import {HStack, Skeleton, Stack} from "@chakra-ui/react";

export default function Dashboard() {
  const {user, setUser} = useUserStore();

  useEffect(() => {
    const { token } = parseCookies();
    if (token && !user) {
      axios
          .get("http://localhost:8081/api/auth", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setUser(res.data))
          .catch(() => setUser(null));
    }
  }, [user, setUser]);

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
        <div className="w-full flex h-auto justify-start items-center">
          <div className="w-full flex h-auto flex-col gap-5 border-b border-gray-300">
            <h1 className="text-5xl font-bold">Portal do aluno</h1>
            <div className="w-full flex items-center gap-10 pb-5">
              <p>Nome: <strong className="uppercase">{user.nome}</strong></p>
              <p>Matricula:  <strong>{user.matricula.id}</strong></p>
            </div>
          </div>
        </div>
      </div>
  );
}
