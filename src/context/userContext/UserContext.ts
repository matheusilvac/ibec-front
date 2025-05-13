import { create } from 'zustand';
import {persist} from "zustand/middleware";
import {UsuarioProps} from "@/types/usuarioProps";
import {destroyCookie} from "nookies";
import {useRouter} from "next/navigation";

interface UserStore {
    user: UsuarioProps | null;
    setUser: (user: UsuarioProps | null) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => {
                set({ user: null })
                destroyCookie(null, 'token')
            },
        }),
        {
            name: 'user-storage',
        }
    )
);
