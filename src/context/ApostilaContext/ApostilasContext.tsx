"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import {ApostilaProps} from "@/types/apostilaProps";

interface ApostilaContextType {
  apostila: ApostilaProps[] | null;
  setApostila: React.Dispatch<React.SetStateAction<ApostilaProps[] | null>>;
}
const ApostilaContext = createContext<ApostilaContextType | undefined>(undefined);

type ApostilaInterface = {
  children: ReactNode;
};

export const ApostilaProvider = ({ children }: ApostilaInterface) => {
  const [apostila, setApostila] = useState<ApostilaProps[] | null>(null);

  return (
    <ApostilaContext.Provider value={{ apostila, setApostila }}>
      {children}
    </ApostilaContext.Provider>
  );
};

export const useApostila = () => {
  const context = useContext(ApostilaContext);
  if (!context) {
    throw new Error("useApostila must be used within an ApostilaProvider");
  }
  return context;
};
