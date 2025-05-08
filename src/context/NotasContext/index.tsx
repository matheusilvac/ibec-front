"use client";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import {NotaProps} from "@/types/NotaProps";

interface NotaContextType {
    nota: NotaProps[] | null;
    setNota: React.Dispatch<React.SetStateAction<NotaProps[] | null>>;
}
const NotaContext = createContext<NotaContextType | undefined>(undefined);

type NotaInterface = {
    children: ReactNode;
};

export const NotaProvider = ({ children }: NotaInterface) => {
    const [nota, setNota] = useState<NotaProps[] | null>(null);

    return (
        <NotaContext.Provider value={{ nota, setNota }}>
            {children}
        </NotaContext.Provider>
    );
};

export const useNota = () => {
    const context = useContext(NotaContext);
    if (!context) {
        throw new Error("useNota must be used within an NotaProvider");
    }
    return context;
};
