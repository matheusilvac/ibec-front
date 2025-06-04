"use client";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import {MediaProps} from "@/types/MediaProps";

interface NotaContextType {
    nota: MediaProps[] | null;
    setNota: React.Dispatch<React.SetStateAction<MediaProps[] | null>>;
}
const NotaContext = createContext<NotaContextType | undefined>(undefined);

type NotaInterface = {
    children: ReactNode;
};

export const NotaProvider = ({ children }: NotaInterface) => {
    const [nota, setNota] = useState<MediaProps[] | null>(null);

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
