"use client"
import {useEffect, useState} from "react";
import {ProvaType} from "@/types/ProvaType";
import {parseCookies} from "nookies";
import axios from "axios";
import {createListCollection, Field, Group, Input, Portal, Select} from "@chakra-ui/react";
import {Check, Trash2} from "lucide-react";
import {format, parseISO, isValid} from "date-fns";

type ProvaPageProps = {
    params: {
        id: number;
    };
};

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

export default function EditarProvaId({params}: ProvaPageProps){
    const id = params.id;
    const [prova, setProva] = useState<ProvaType>();
    const [valueNome, setValueNome] = useState<string>("")
    const [valueModulos, setValueModulos] = useState<string[]>([])
    const [valueDate, setValueDate] = useState<string>("")
    const [valueApostila, setValueApostila] = useState<string>("")


    useEffect(() => {
        const {token} = parseCookies();

        if (!token) return;
            axios.get(`https://portal-aluno-ibec-cgdhfngvhfb2g3f6.canadacentral-01.azurewebsites.net/api/admin/prova/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
                .then((response) => {
                    const data = response.data;
                    setProva(response.data)
                    setValueNome(data.nome || "");
                    setValueApostila(data.apostila?.titulo || "");
                    setValueModulos(data.modulos?.map((mod: any) => String(mod)) || []);
                    setValueDate(data.dataProva || "");
                })
                .catch((error) => {
                    console.error("Erro durante a requisição:", error);
                });
    },[id]);

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-full flex flex-col h-auto bg-white rounded-lg p-4 gap-4">
                <div className="w-full flex justify-start">
                    <h1 className="font-medium text-2xl flex">Edite a prova</h1>
                </div>
                    <Group grow className="gap-2">
                        <div className="gap-4 flex flex-col">
                            <Field.Root required>
                                <Field.Label>
                                    Nome da prova <Field.RequiredIndicator />
                                </Field.Label>
                                <Input placeholder="P1..." value={valueNome} onChange={(e) => setValueNome(e.target.value)} className="bg-gray-100 rounded-lg pl-2 border-gray-300"/>
                            </Field.Root>
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
                        </div>
                       <div className="gap-4 flex flex-col">
                           <Field.Root required>
                               <Field.Label>
                                   Apostila da prova <Field.RequiredIndicator />
                               </Field.Label>

                               <Input disabled placeholder="Bibliologia..." value={valueApostila}  onChange={(e) => setValueApostila(e.target.value)} className="bg-gray-100 pl-2 border-gray-300"/>
                           </Field.Root>
                           <Field.Root required>
                               <Field.Label>
                                   Data da prova <Field.RequiredIndicator />
                               </Field.Label>
                               <input type="date"
                                      value={valueDate}
                                      onChange={(e) => setValueDate(e.target.value)}
                                      className="bg-[#f0f0f0] text-black flex px-2 py-2 rounded-lg cursor-pointer outline-none  w-full"/>
                           </Field.Root>
                       </div>
                    </Group>
                <div className="w-full flex justify-center items-center gap-5">
                    <button className="flex px-3 py-2 text-white gap-2 rounded-lg bg-green-600 hover:opacity-80 transition-all duration-300">
                        <Check /> Editar
                    </button>
                    <button className="flex px-3 text-white py-2 gap-2 rounded-lg bg-red-600 hover:opacity-80 transition-all duration-300">
                        <Trash2 /> Remover
                    </button>
                </div>

            </div>
        </div>
    )
}