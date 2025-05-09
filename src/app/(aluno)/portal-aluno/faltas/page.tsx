"use client"
import {Table, Tabs} from "@chakra-ui/react";
import {GraduationCap, SquareMousePointer} from "lucide-react";
import {useState} from "react";

export default function Faltas(){
    const [value, setValue] = useState<string | null>("turma")

    return(
        <div className="w-full flex flex-col gap-10">
            <Tabs.Root defaultValue="members" fitted variant="plain" p="1" value={value} onValueChange={(e) => setValue(e.value)}>
                <Tabs.List bg="white" rounded="lg" p="2" className="gap-2">
                    <Tabs.Trigger value="turma">
                        <GraduationCap size={28}/>
                        Turma
                    </Tabs.Trigger>
                    <Tabs.Trigger value="alunos">
                        <SquareMousePointer size={24}/>
                        Alunos
                    </Tabs.Trigger>

                    <Tabs.Indicator rounded="l2" bg="gray.100" className={"shadow-none"}/>
                </Tabs.List>
                <Tabs.Content value="turma">

                </Tabs.Content>
                <Tabs.Content value="alunos">
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader></Table.ColumnHeader>
                                <Table.ColumnHeader>Alunos</Table.ColumnHeader>
                                <Table.ColumnHeader>Email</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {/*{alunos.map((aluno) => (*/}
                            {/*    <Table.Row key={item.id}>*/}
                            {/*        <Table.Cell>{item.name}</Table.Cell>*/}
                            {/*        <Table.Cell>{item.category}</Table.Cell>*/}
                            {/*        <Table.Cell textAlign="end">{item.price}</Table.Cell>*/}
                            {/*    </Table.Row>*/}
                            {/*))}*/}
                        </Table.Body>
                    </Table.Root>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}