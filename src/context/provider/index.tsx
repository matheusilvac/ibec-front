import { ReactNode } from "react";
import { SideProvider } from "../sideBarContext";
import { Provider } from "@/components/ui/provider"

type ProviderProps = {
  children: ReactNode;
};

export const ProviderContext = ({ children }: ProviderProps) => {
  return (
    <SideProvider>
      <Provider>
        {children}
      </Provider>
    </SideProvider>
  )
};
