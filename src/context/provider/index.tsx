import { ReactNode } from "react";
import { SideProvider } from "../sideBarContext";

type ProviderProps = {
  children: ReactNode;
};

export const Provider = ({ children }: ProviderProps) => {
  return <SideProvider>{children}</SideProvider>;
};
