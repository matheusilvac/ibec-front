"use client"
import {useNota} from "@/context/NotasContext";
import {Accordion, FormatNumber, LocaleProvider} from "@chakra-ui/react";

export const CardNotas = () => {
    const {nota} = useNota();

    return (
        <>
            <Accordion.Root collapsible>
                {nota?.map((nota, index) => (
                    <Accordion.Item key={index} value={nota.apostila} className="mb-5 bg-white p-4 rounded-lg">
                        <Accordion.ItemTrigger className="pb-4">
                            <div className="w-full flex justify-start h-auto gap-2 items-center">
                                <h1 className="flex text-xl">Matéria: </h1>
                                <strong className="flex text-xl">{nota.apostila}</strong>
                            </div>
                            <Accordion.ItemIndicator/>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            {nota.notas.map((notas => (
                                <Accordion.ItemBody className="flex w-full justify-between items-center text-lg" key={notas.id}>
                                    <h1>{notas.nomeProva}</h1>
                                    <h1>Nota:
                                        <span className="pl-2">
                                            <LocaleProvider locale="pt-BR">
                                                <FormatNumber value={notas.nota}/>
                                            </LocaleProvider>
                                        </span>
                                    </h1>
                                </Accordion.ItemBody>
                            )))}
                            <Accordion.ItemBody className="flex w-full justify-between items-center text-lg">
                                <h1 className="font-medium">Média: </h1>
                                <p className="font-medium">
                                    <LocaleProvider locale="pt-BR">
                                        <FormatNumber value={nota.media} />
                                    </LocaleProvider>
                                </p>
                            </Accordion.ItemBody>
                            <Accordion.ItemBody className="flex w-full justify-between items-center text-lg">
                                <h1 className="font-medium">Faltas: </h1>
                                <p className="font-medium">{nota.faltas}</p>
                            </Accordion.ItemBody>
                            <Accordion.ItemBody className="flex w-full justify-between items-center text-lg">
                                <h1 className="font-medium">Situação: </h1>
                                <p className="font-medium">{nota.situacao}</p>
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </>
    )
}