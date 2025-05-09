"use client";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import {TurmaProps} from "@/types/TurmaProps";

interface TurmaContextType {
    turma: TurmaProps[] | null;
    setTurma: React.Dispatch<React.SetStateAction<TurmaProps[] | null>>;
}
const TurmaContext = createContext<TurmaContextType | undefined>(undefined);

type TurmaInterface = {
    children: ReactNode;
};

export const TurmaProvider = ({ children }: TurmaInterface) => {
    const [turma, setTurma] = useState<TurmaProps[] | null>(null);

    return (
        <TurmaContext.Provider value={{ turma, setTurma }}>
            {children}
        </TurmaContext.Provider>
    );
};

export const useTurma = () => {
    const context = useContext(TurmaContext);
    if (!context) {
        throw new Error("useTurma must be used within an TurmaProvider");
    }
    return context;
};
