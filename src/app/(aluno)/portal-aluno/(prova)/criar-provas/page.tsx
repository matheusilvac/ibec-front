"use client"
import {createListCollection, Field, Portal, Select, Stack, Tabs} from "@chakra-ui/react";
import {BookPlus, GraduationCap} from "lucide-react";
import {Loading} from "@/components/loading";
import {useState} from "react";
import {useApostila} from "@/context/ApostilaContext/ApostilasContext";
import {parseCookies} from "nookies";
import axios from "axios";
import {toaster} from "@/components/ui/toaster";

const nomeProvas = createListCollection({
    items: [
        {
            value: "P1",
            label: "P1"
        },
        {
            value: "P2",
            label: "P2"
        },
        {
            value: "P3",
            label: "P3"
        },
        {
            value: "P4",
            label: "P4"
        },
        {
            value: "P5",
            label: "P5"
        },
    ],
})

const modulosProva = createListCollection({
    items: [
        {
            value: 1,
            label: 1
        },
        {
            value: 2,
            label: 2
        },
        {
            value: 3,
            label: 3
        },
        {
            value: 4,
            label: 4
        },
        {
            value: 5,
            label: 5
        },
        {
            value: 6,
            label: 6
        },
        {
            value: 7,
            label: 7
        },
        {
            value: 8,
            label: 8
        },
        {
            value: 9,
            label: 9
        },
        {
            value: 10,
            label: 10
        },
    ],
})

export default function LancarNotasProvasPage() {
    const [value, setValue] = useState<string | null>("modulos")
    const {apostila} = useApostila();
    const [idApostila, setIdApostila] = useState<number | null>()
    const [valueNome, setValueNome] = useState<string[]>([])
    const [valueModulos, setValueModulos] = useState<string[]>([])
    const [valueDate, setValueDate] = useState<string>("")


    const handleClickSetProva = () => {
        const {token} = parseCookies();
        if (token != null && idApostila != null && valueNome != null) {
            const payload = {
                nome: valueNome[0],
                modulos: valueModulos,
                apostilaID: idApostila,
                dataProva: valueDate
            }
            axios.post(`https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/prova`, payload, {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then((response) => {
                    console.log(response)
                    setValueNome([]);
                    setValueModulos([])
                    toaster.create({
                        title: "Sucesso!",
                        description: "Prova criada com sucesso",
                        type: "success",
                        meta: {closable: true},
                    })
                })
                .catch((error) => {
                    toaster.create({
                        title: "Erro!",
                        description: error.mensagem,
                        type: "error",
                        meta: {closable: true},
                    })
                });
        } else {
            toaster.create({
                title: "Erro!",
                description: "Preencha o formulario para criar uma prova",
                type: "error",
                meta: {closable: true},
            })
        }
    }

    return (
        <div className="w-full flex flex-col ">
            <div className="w-full flex justify-start p-2">
                <h1 className="flex text-4xl font-medium uppercase">Criar prova</h1>
            </div>
            <Tabs.Root defaultValue="members" fitted variant="plain" p="1" value={value}
                       onValueChange={(e) => setValue(e.value)}>
                <Tabs.List bg="white" rounded="lg" p="2" className="gap-2">
                    <Tabs.Trigger value="modulos">
                        <GraduationCap size={28}/>
                        Apostila
                    </Tabs.Trigger>
                    <Tabs.Trigger value="prova">
                        <BookPlus size={28}/>
                        Criar prova
                    </Tabs.Trigger>
                    <Tabs.Indicator rounded="l2" bg="gray.100" className={"shadow-none"}/>
                </Tabs.List>
                <Tabs.Content value="modulos">
                    <div
                        className="w-full h-full flex flex-wrap justify-center items-center gap-8 mt-10 transition-all duration-500">
                        {apostila ? (
                            <>
                                {apostila?.map((apostila) => (
                                    <button onClick={() => {
                                        setIdApostila(apostila.id)
                                        setValue("prova")
                                    }} key={apostila.id}
                                            className="w-[262px] flex flex-col items-center rounded-xl hover:shadow-xl shadow-black transition-all duration-300 cursor-pointer hover:scale-105">
                                        <img src={apostila.imagem}
                                             className="w-full flex justify-center items-center h-full rounded-xl"/>
                                    </button>
                                ))}
                            </>
                        ) : <Loading/>}
                    </div>
                </Tabs.Content>
                <Tabs.Content value="prova" className="w-full flex justify-center">
                    <Stack gap="4" align="center" maxW="lg" className="bg-white p-4 rounded-lg w-96">
                        <Select.Root collection={nomeProvas}
                                     size="md"
                                     multiple={false}
                                     value={valueNome}
                                     onValueChange={(e) => setValueNome(e.value)}
                        >
                            <Select.HiddenSelect/>
                            <Select.Label fontWeight="medium">Nome da prova </Select.Label>
                            <Select.Control className="bg-[#f0f0f0] pl-2 rounded-lg border-gray-300">
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Selecione o nome da prova"/>
                                </Select.Trigger>
                                <Select.IndicatorGroup className="text-gray-400">
                                    <Select.ClearTrigger/>
                                    <Select.Indicator/>
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content className="bg-white text-black gap-2">
                                        {nomeProvas.items.map((prova) => (
                                            <Select.Item item={prova} key={prova.value}
                                                         className="text-black text-lg cursor-pointer hover:bg-gray-100">
                                                {prova.label}
                                                <Select.ItemIndicator/>
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>

                        <Select.Root multiple collection={modulosProva} size="md"
                                     value={valueModulos}
                                     onValueChange={(e) => setValueModulos(e.value)}
                        >
                            <Select.HiddenSelect/>
                            <Select.Label fontWeight="medium">Módulos da prova</Select.Label>
                            <Select.Control className="bg-[#f0f0f0] pl-2 rounded-lg border-gray-300">
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Selecione os módulos da prova"/>
                                </Select.Trigger>
                                <Select.IndicatorGroup className="text-gray-400">
                                    <Select.ClearTrigger/>
                                    <Select.Indicator/>
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content className="bg-white text-black gap-2">
                                        {modulosProva.items.map((modulos) => (
                                            <Select.Item item={modulos} key={modulos.value}
                                                         className="text-black text-lg cursor-pointer hover:bg-gray-100">
                                                {modulos.label}
                                                <Select.ItemIndicator/>
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-medium flex text-sm">Data da prova</label>

                            <input type="date" value={valueDate}
                                   onChange={(e) => setValueDate(e.target.value)}
                                   className="bg-[#f0f0f0] text-black flex px-2 py-1 rounded-lg cursor-pointer outline-none border-gray-300 border"/>

                        </div>
                        <button onClick={handleClickSetProva} type="submit"
                                className="px-3 py-2 bg-[#0A1A2D] text-white flex text-md rounded-md">Criar prova
                        </button>
                    </Stack>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}