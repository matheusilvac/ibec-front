import { ReactNode } from "react";
import { SideProvider } from "../sideBarContext";
import { Provider } from "@/components/ui/provider"
import {ApostilaProvider} from "@/context/ApostilaContext/ApostilasContext";
import {PostProvider} from "@/context/PostContext";

type ProviderProps = {
  children: ReactNode;
};

export const ProviderContext = ({ children }: ProviderProps) => {
  return (
    <SideProvider>
      <Provider>
          <ApostilaProvider>
              <PostProvider>
              {children}
              </PostProvider>
          </ApostilaProvider>
      </Provider>
    </SideProvider>
  )
};
